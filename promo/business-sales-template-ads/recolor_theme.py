"""Make theme-colour variants of the Business Sales Template for the ad-03 recolour beat.
Only the theme's colour slots change (Design > Variants > Colors); every slide, shape and chart is untouched,
so the renders show the template's own theme-driven recolouring. usage: python3 recolor_theme.py deck.pptx"""
import sys, zipfile, re
PAL = {'ocean': dict(dk1='0B2540', lt1='FFFFFF', dk2='2A3A4A', lt2='F2F6F8', accent1='3EE6C1', accent2='1F5F8B', accent3='64748B', accent4='D3DEE6', accent5='123552', accent6='0E8A6E'),
       'ember': dict(dk1='1F1410', lt1='FFFFFF', dk2='3A2E2A', lt2='F7F3EF', accent1='FF8A3D', accent2='7A3E1D', accent3='7B6F69', accent4='E5DCD5', accent5='2E1D16', accent6='B4521B')}
for name, pal in PAL.items():
    src = zipfile.ZipFile(sys.argv[1]); out = zipfile.ZipFile(f'deck_{name}.pptx', 'w', zipfile.ZIP_DEFLATED)
    for it in src.infolist():
        data = src.read(it.filename)
        if re.match(r'ppt/theme/theme\d+\.xml', it.filename):
            def fix(m):
                cs = m.group(0)
                for k, v in pal.items():
                    cs = re.sub(rf'(<a:{k}>\s*<a:(?:srgbClr val|sysClr val="\w+" lastClr))="[0-9A-Fa-f]{{6}}"', rf'\1="{v}"', cs)
                return cs
            data = re.sub(r'<a:clrScheme.*?</a:clrScheme>', fix, data.decode(), flags=re.S).encode()
        zi = zipfile.ZipInfo(it.filename, it.date_time); zi.compress_type = zipfile.ZIP_DEFLATED
        out.writestr(zi, data)
    out.close()
# then: soffice --convert-to pdf deck_ocean.pptx / deck_ember.pptx, export slides 1, 21, 64 to slides_alt/<name>_sNN.png
