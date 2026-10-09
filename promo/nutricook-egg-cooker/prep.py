"""Turn the supplied product photos into clean layers (no English labels, leader lines removed)."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
CREAM = np.array([244, 241, 234], float)
def arr(p): return np.asarray(Image.open(p).convert('RGB')).astype(float)
def unline(a, rows, x0, x1):
    """Remove 2-px leader lines by interpolating vertically across them."""
    for y in rows:
        top, bot = a[y - 6, x0:x1].copy(), a[y + 6, x0:x1].copy()
        for k, yy in enumerate(range(y - 5, y + 6)):
            w = (k + 1) / 12; a[yy, x0:x1] = top * (1 - w) + bot * w
    return a
def key_cream(a, lo=7, hi=26):
    d = np.sqrt(((a - CREAM) ** 2).sum(2))
    al = np.clip((d - lo) / (hi - lo), 0, 1)
    al = np.asarray(Image.fromarray((al * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))) / 255
    return np.dstack([a, al * 255]).clip(0, 255).astype(np.uint8)
def save(rgba, box, name): Image.fromarray(rgba).crop(box).save(f'layers/{name}.png')

# exploded view: lid / rack / base
a = unline(arr('src/01_exploded.jpg'), [125, 321, 525, 710, 910, 1078], 420, 840)
k = key_cream(a)
save(k, (120, 50, 625, 380), 'lid'); save(k, (155, 592, 630, 780), 'rack'); save(k, (100, 785, 690, 1120), 'base')
# measuring cup and the three yolk halves
b = unline(arr('src/02_measuring_cup.jpg'), [458, 649, 842], 430, 770)
k = key_cream(b)
save(k, (40, 280, 610, 1110), 'cup')
for nm, box in [('hard', (770, 385, 905, 530)), ('medium', (770, 560, 905, 730)), ('soft', (770, 755, 905, 925))]:
    save(k, box, 'egg_' + nm)
# hero on white: flood-fill the connected background only
h = Image.open('src/05_hero.jpg').convert('RGB'); m = h.copy()
W, H = m.size
for xy in [(x, 0) for x in range(0, W, 16)] + [(x, H - 1) for x in range(0, W, 16)] + \
          [(0, y) for y in range(0, H, 16)] + [(W - 1, y) for y in range(0, H, 16)]:
    if m.getpixel(xy) != (255, 0, 255): ImageDraw.floodfill(m, xy, (255, 0, 255), thresh=34)
al = (~np.all(np.asarray(m) == [255, 0, 255], 2)).astype(np.uint8) * 255
al = Image.fromarray(al).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
h.putalpha(al); h.save('layers/hero.png')
# lifestyle photos with their English headlines cropped away
Image.open('src/03_steam.jpg').crop((0, 100, 569, 569)).save('layers/steam.png')
Image.open('src/04_seven_eggs.jpg').crop((0, 100, 569, 505)).save('layers/seven.png')
print('ok')
