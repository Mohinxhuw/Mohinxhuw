"""Make pptxgenjs output conform to the OOXML schema so strict readers
(PowerPoint for Android/iOS, Open XML SDK) accept the package.

Fixes, all without changing any visible content:
  1. [Content_Types].xml Overrides that point at parts which do not exist.
  2. Duplicate shape ids (p:cNvPr/@id) inside a slide, layout or master.
  3. Extra <a:pPr> elements emitted after runs inside one paragraph.
  4. Chart XML children out of schema order, or not allowed at all.
  5. notesMasterIdLst out of order in presentation.xml, and a notes master
     that shares the slide master's theme part.
"""
import os, re, shutil, collections
from lxml import etree

C_NS = 'http://schemas.openxmlformats.org/drawingml/2006/chart'
A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main'
P_NS = 'http://schemas.openxmlformats.org/presentationml/2006/main'
XS = '{http://www.w3.org/2001/XMLSchema}'
CHART_XSD = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'schemas', 'dml-chart.xsd')


# ---------- 4. chart ordering, derived from the official schema ----------
def _load_chart_schema(path):
    """Return, per complexType, a {child name: rank} map. Members of one
    xsd:choice share a rank, so their existing relative order is preserved
    (e.g. barChart/lineChart order in a combo chart = draw order)."""
    doc = etree.parse(path).getroot()
    groups = {g.get('name'): g for g in doc.findall(XS + 'group')}
    types = {t.get('name'): t for t in doc.findall(XS + 'complexType')}
    order, child_type = {}, {}

    def walk(node, tname, ranks, state, fixed=None):
        for ch in node:
            tag = etree.QName(ch).localname
            if tag == 'element':
                name = ch.get('name') or ch.get('ref', '').split(':')[-1]
                if name not in ranks:
                    if fixed is None:
                        ranks[name] = state[0]; state[0] += 1
                    else:
                        ranks[name] = fixed
                if ch.get('type'):
                    child_type[(tname, name)] = ch.get('type')
            elif tag == 'choice':
                r = fixed if fixed is not None else state[0]
                if fixed is None:
                    state[0] += 1
                walk(ch, tname, ranks, state, r)
            elif tag in ('sequence', 'all', 'complexContent', 'extension'):
                walk(ch, tname, ranks, state, fixed)
            elif tag == 'group':
                walk(groups[ch.get('ref').split(':')[-1]], tname, ranks, state, fixed)

    for name, t in types.items():
        ranks = {}
        walk(t, name, ranks, [0])
        order[name] = ranks
    root_type = doc.find(XS + "element[@name='chartSpace']").get('type')
    return order, child_type, root_type


_SCHEMA = None


def _fix_chart(root):
    global _SCHEMA
    if _SCHEMA is None:
        _SCHEMA = _load_chart_schema(CHART_XSD)
    order, child_type, root_type = _SCHEMA
    removed = collections.Counter()

    def visit(el, tname):
        seq = order.get(tname)
        if seq is None:
            return
        kids = [k for k in el if isinstance(k.tag, str)]
        keep = []
        for k in kids:
            q = etree.QName(k)
            if q.namespace == C_NS and q.localname not in seq:
                el.remove(k)
                removed[f'{tname}/{q.localname}'] += 1
            else:
                keep.append(k)
        ordered = sorted(keep, key=lambda k: seq.get(etree.QName(k).localname, len(seq)))
        if ordered != keep:
            for k in keep:
                el.remove(k)
            for k in ordered:
                el.append(k)
        for k in ordered:
            q = etree.QName(k)
            ct = child_type.get((tname, q.localname))
            if q.namespace == C_NS and ct and ct.startswith('CT_'):
                visit(k, ct)

    visit(root, root_type)

    # dangling axis references (pptxgenjs adds a third, non-existent axId to 2-D charts)
    c = lambda t: '{%s}%s' % (C_NS, t)
    for pa in root.iter(c('plotArea')):
        axes = {ax.find(c('axId')).get('val') for ax in pa if etree.QName(ax).localname in ('catAx', 'valAx', 'dateAx', 'serAx') and ax.find(c('axId')) is not None}
        for ch in pa:
            name = etree.QName(ch).localname
            if not name.endswith('Chart'):
                continue
            for a in ch.findall(c('axId')):
                if a.get('val') not in axes:
                    ch.remove(a)
                    removed['dangling axId'] += 1
            # required <c:grouping> missing from line charts
            if name in ('lineChart', 'line3DChart') and ch.find(c('grouping')) is None:
                g = etree.Element(c('grouping'))
                g.set('val', 'standard')
                ch.insert(0, g)
                removed['added missing lineChart grouping'] += 1
    return removed


# ---------- 3. paragraph pPr ----------
def _fix_paragraphs(root):
    n = 0
    # <a:buSzPct val="100000"/> is the default and fails strict validation; drop it
    for b in list(root.iter('{%s}buSzPct' % A_NS)):
        if b.get('val') == '100000':
            b.getparent().remove(b)
    for p in root.iter('{%s}p' % A_NS):
        pprs = p.findall('{%s}pPr' % A_NS)
        for i, ppr in enumerate(pprs):
            if i == 0 and p.index(ppr) == 0:
                continue
            if i == 0:  # first pPr but not first child: move to front
                p.remove(ppr)
                p.insert(0, ppr)
            else:
                p.remove(ppr)
            n += 1
    return n


# ---------- 2. unique shape ids ----------
def _fix_ids(xml):
    counter = iter(range(1, 100000))
    return re.sub(r'(<p:cNvPr\b[^>]*?\bid=")\d+(")', lambda m: f'{m.group(1)}{next(counter)}{m.group(2)}', xml)


def _write(path, root):
    with open(path, 'wb') as f:
        f.write(etree.tostring(root, xml_declaration=True, encoding='UTF-8', standalone=True))


def sanitize(tmp):
    stats = collections.Counter()
    # 3 + 2 : slides, layouts, masters, notes
    for d in ['ppt/slides', 'ppt/slideLayouts', 'ppt/slideMasters', 'ppt/notesSlides', 'ppt/notesMasters']:
        full = os.path.join(tmp, d)
        if not os.path.isdir(full):
            continue
        for fn in os.listdir(full):
            if not fn.endswith('.xml'):
                continue
            p = os.path.join(full, fn)
            root = etree.parse(p).getroot()
            stats['paragraph pPr fixed'] += _fix_paragraphs(root)
            xml = etree.tostring(root, xml_declaration=True, encoding='UTF-8', standalone=True).decode('utf-8')
            new = _fix_ids(xml)
            if new != xml:
                stats['id-renumbered parts'] += 1
            with open(p, 'w', encoding='utf-8') as f:
                f.write(new)

    # 4 : charts
    cdir = os.path.join(tmp, 'ppt/charts')
    if os.path.isdir(cdir):
        for fn in os.listdir(cdir):
            if fn.endswith('.xml'):
                p = os.path.join(cdir, fn)
                root = etree.parse(p).getroot()
                for k, v in _fix_chart(root).items():
                    stats['chart: removed ' + k] += v
                _write(p, root)
                stats['charts reordered'] += 1

    # 5 : presentation.xml order + dedicated notes theme
    pp = os.path.join(tmp, 'ppt/presentation.xml')
    root = etree.parse(pp).getroot()
    nm = root.find('{%s}notesMasterIdLst' % P_NS)
    sl = root.find('{%s}sldIdLst' % P_NS)
    if nm is not None and sl is not None and root.index(nm) > root.index(sl):
        root.remove(nm)
        root.insert(root.index(sl), nm)
        stats['notesMasterIdLst moved'] += 1
    _write(pp, root)

    nrels_dir = os.path.join(tmp, 'ppt/notesMasters/_rels')
    ct_path = os.path.join(tmp, '[Content_Types].xml')
    ct = open(ct_path, encoding='utf-8').read()
    if os.path.isdir(nrels_dir):
        for fn in os.listdir(nrels_dir):
            rp = os.path.join(nrels_dir, fn)
            rels = open(rp, encoding='utf-8').read()
            if 'theme/theme1.xml' in rels:
                n = 2
                while os.path.exists(os.path.join(tmp, f'ppt/theme/theme{n}.xml')):
                    n += 1
                shutil.copy(os.path.join(tmp, 'ppt/theme/theme1.xml'), os.path.join(tmp, f'ppt/theme/theme{n}.xml'))
                rels = rels.replace('theme/theme1.xml', f'theme/theme{n}.xml')
                open(rp, 'w', encoding='utf-8').write(rels)
                ct = ct.replace('</Types>', f'<Override PartName="/ppt/theme/theme{n}.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/></Types>')
                stats['notes master theme separated'] += 1

    # 1 : content types
    def keep(m):
        part = m.group(1)
        if os.path.exists(os.path.join(tmp, part.lstrip('/'))):
            return m.group(0)
        stats['phantom overrides removed'] += 1
        return ''
    ct = re.sub(r'<Override PartName="([^"]+)"[^>]*/>', keep, ct)
    open(ct_path, 'w', encoding='utf-8').write(ct)
    return stats
