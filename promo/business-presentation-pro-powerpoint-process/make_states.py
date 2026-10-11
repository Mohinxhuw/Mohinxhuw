"""Build-step states of Business Presentation Pro slide 19 (Performance dashboard), made from the real product file:
each state keeps only the slide's own shapes placed so far (same positions, styles, charts). Nothing is redesigned."""
import copy, re, sys
from pptx import Presentation
SRC = '/home/user/Mohinxhuw/template02/Vanta_Business_Presentation_Template_02.pptx'
TITLE = 'Performance dashboard — fiscal 2026'
ALL = set(range(31))
base = {30}
hdr = {0, 1, 3}
k1 = {4, 5, 6}; k_rest = set(range(7, 19)); panels = {19, 27}; line = set(range(20, 27)); bar = {28, 29}
STATES = [('s00_blank', base, 0, False)]
for j, n in enumerate((4, 11, 17, 23, 29, 35)):
    STATES.append((f's{j+1:02d}_title{n}', base | {2}, n, False))
STATES += [('s07_header', base | {2} | hdr, 35, False),
           ('s08_kpi1', base | {2} | hdr | k1, 35, False),          # first KPI value still white (pre-highlight)
           ('s09_kpis', base | {2} | hdr | k1 | k_rest, 35, False),
           ('s10_highlight', base | {2} | hdr | k1 | k_rest, 35, True),
           ('s11_panels', base | {2} | hdr | k1 | k_rest | panels, 35, True),
           ('s12_line', base | {2} | hdr | k1 | k_rest | panels | line, 35, True),
           ('s13_full', ALL, 35, True)]

def keep_only_slide(prs, idx):
    sldIdLst = prs.slides._sldIdLst
    ids = list(sldIdLst)
    for i, sid in enumerate(ids):
        if i != idx:
            prs.part.drop_rel(sid.rId); sldIdLst.remove(sid)

for name, keep, tlen, highlight in STATES:
    prs = Presentation(SRC)
    keep_only_slide(prs, 18)
    s = prs.slides[0]
    shapes = list(s.shapes)
    for i, sh in enumerate(shapes):
        if i not in keep:
            sh._element.getparent().remove(sh._element)
    if 2 in keep:
        r = shapes[2].text_frame.paragraphs[0].runs[0]; r.text = TITLE[:tlen]
    if 5 in keep and not highlight:
        for el in shapes[5]._element.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}schemeClr'):
            if el.get('val') == 'accent2': el.set('val', 'bg1')
    prs.save(f'states/{name}.pptx')
print(len(STATES), 'states')
