"""Post-process a pptxgenjs deck into a theme-driven template:
1. Replace the Office colour scheme with the Vertex scheme (and name the theme).
2. Re-point every brand hex in slides, layouts, masters and charts to its theme slot,
   so Design > Variants > Colors recolours the whole template.
3. Attach the SVG original to every icon picture (PNG stays as fallback), so icons are
   vector, recolourable (Graphics Fill) and convertible to shapes.
"""
import os, re, sys, zipfile, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

src, dst, icon_dir = sys.argv[1], sys.argv[2], sys.argv[3]

SCHEME = [('dk1', '0A1628', 'tx1'), ('lt1', 'FFFFFF', 'bg1'), ('dk2', '2E3645', 'tx2'), ('lt2', 'F3F5F7', 'bg2'),
          ('accent1', 'C6F432', 'accent1'), ('accent2', '2C4A74', 'accent2'), ('accent3', '6B7688', 'accent3'),
          ('accent4', 'D5DBE3', 'accent4'), ('accent5', '17253D', 'accent5'), ('accent6', '5B7A0C', 'accent6')]
HEX2SLOT = {h: slot for _, h, slot in SCHEME}

clr = '<a:clrScheme name="Vertex">' + ''.join(f'<a:{n}><a:srgbClr val="{h}"/></a:{n}>' for n, h, _ in SCHEME) + \
      '<a:hlink><a:srgbClr val="2C4A74"/></a:hlink><a:folHlink><a:srgbClr val="6B7688"/></a:folHlink></a:clrScheme>'

tmp = dst + '.d'
shutil.rmtree(tmp, ignore_errors=True)
with zipfile.ZipFile(src) as z:
    z.extractall(tmp)

# 1. theme
for fn in os.listdir(os.path.join(tmp, 'ppt/theme')):
    p = os.path.join(tmp, 'ppt/theme', fn)
    x = open(p, encoding='utf-8').read()
    x = re.sub(r'<a:clrScheme name="[^"]*">.*?</a:clrScheme>', clr, x, flags=re.S)
    x = x.replace('name="Office Theme"', 'name="Vertex"', 1).replace('<a:fontScheme name="Office">', '<a:fontScheme name="Vertex">')
    open(p, 'w', encoding='utf-8').write(x)

# 2. brand hex -> scheme colour
def to_scheme(x):
    def self_closing(m):
        h = m.group(1).upper()
        return f'<a:schemeClr val="{HEX2SLOT[h]}"/>' if h in HEX2SLOT else m.group(0)
    def open_close(m):
        h = m.group(1).upper()
        return f'<a:schemeClr val="{HEX2SLOT[h]}">{m.group(2)}</a:schemeClr>' if h in HEX2SLOT else m.group(0)
    x = re.sub(r'<a:srgbClr val="([0-9A-Fa-f]{6})"\s*/>', self_closing, x)
    x = re.sub(r'<a:srgbClr val="([0-9A-Fa-f]{6})">(.*?)</a:srgbClr>', open_close, x)
    return x

for d in ['ppt/slides', 'ppt/slideLayouts', 'ppt/slideMasters', 'ppt/charts']:
    full = os.path.join(tmp, d)
    if not os.path.isdir(full):
        continue
    for fn in os.listdir(full):
        if fn.endswith('.xml'):
            p = os.path.join(full, fn)
            x = open(p, encoding='utf-8').read()
            open(p, 'w', encoding='utf-8').write(to_scheme(x))

# 3. SVG icons
media = os.path.join(tmp, 'ppt/media')
os.makedirs(media, exist_ok=True)
svg_added = set()
n_icons = 0
sdir = os.path.join(tmp, 'ppt/slides')
for fn in sorted(os.listdir(sdir)):
    if not fn.endswith('.xml'):
        continue
    p = os.path.join(sdir, fn)
    relp = os.path.join(sdir, '_rels', fn + '.rels')
    x = open(p, encoding='utf-8').read()
    rels = open(relp, encoding='utf-8').read()
    ids = [int(i) for i in re.findall(r'Id="rId(\d+)"', rels)]
    nxt = max(ids + [0]) + 1
    new_rels = []

    def pic(m):
        global n_icons
        nonlocal_state = pic.state
        block = m.group(0)
        nm = re.search(r'name="Icon (\w+) ([0-9A-F]{6})"', block)
        if not nm or 'svgBlip' in block:
            return block
        key = f'{nm.group(1)}_{nm.group(2)}'
        target = f'vx-{key}.svg'
        if target not in svg_added:
            shutil.copy(os.path.join(icon_dir, key + '.svg'), os.path.join(media, target))
            svg_added.add(target)
        rid = f'rId{nonlocal_state["n"]}'
        nonlocal_state['n'] += 1
        new_rels.append(f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/{target}"/>')
        ext = ('<a:extLst><a:ext uri="{96DAC541-7B7A-43D3-8B79-37D633B846F1}">'
               f'<asvg:svgBlip xmlns:asvg="http://schemas.microsoft.com/office/drawing/2016/SVG/main" r:embed="{rid}"/>'
               '</a:ext></a:extLst>')
        block = re.sub(r'<a:blip r:embed="(rId\d+)"\s*/>', lambda b: f'<a:blip r:embed="{b.group(1)}">{ext}</a:blip>', block, count=1)
        block = re.sub(r'(<a:blip r:embed="rId\d+">)(?!<a:extLst)', lambda b: b.group(1) + ext, block, count=1) if ext not in block else block
        n_icons += 1
        return block
    pic.state = {'n': nxt}
    x = re.sub(r'<p:pic>.*?</p:pic>', pic, x, flags=re.S)
    if new_rels:
        rels = rels.replace('</Relationships>', ''.join(new_rels) + '</Relationships>')
        open(relp, 'w', encoding='utf-8').write(rels)
        open(p, 'w', encoding='utf-8').write(x)

ct = os.path.join(tmp, '[Content_Types].xml')
x = open(ct, encoding='utf-8').read()
if 'Extension="svg"' not in x:
    x = x.replace('<Default Extension="xml"', '<Default Extension="svg" ContentType="image/svg+xml"/><Default Extension="xml"', 1)
    open(ct, 'w', encoding='utf-8').write(x)

# 4. schema conformance for strict readers (PowerPoint mobile)
from sanitize import sanitize
for k, v in sorted(sanitize(tmp).items()):
    print(f'sanitize: {k}: {v}')

# document properties
cp = os.path.join(tmp, 'docProps/core.xml')
if os.path.exists(cp):
    x = open(cp, encoding='utf-8').read()
    x = re.sub(r'<dc:title>.*?</dc:title>', '<dc:title>Vertex — Premium Business &amp; Sales PowerPoint Template</dc:title>', x)
    x = re.sub(r'<dc:creator>.*?</dc:creator>', '<dc:creator>Vertex Studio</dc:creator>', x)
    open(cp, 'w', encoding='utf-8').write(x)

if os.path.exists(dst):
    os.remove(dst)
with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as z:
    # [Content_Types].xml first
    z.write(ct, '[Content_Types].xml')
    for root, _, files in os.walk(tmp):
        for f in files:
            full = os.path.join(root, f)
            arc = os.path.relpath(full, tmp)
            if arc == '[Content_Types].xml':
                continue
            z.write(full, arc)
shutil.rmtree(tmp)
print(f'post: {n_icons} icons vectorised, {len(svg_added)} svg parts')
