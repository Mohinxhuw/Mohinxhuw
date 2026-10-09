"""NutriCook NC-EC360 egg cooker: English 9:16 TikTok ad. PIL frames piped to ffmpeg.
usage: python3 render.py FONT_DIR out.mp4 [--still T ...]
Product layers come from ../nutricook-egg-cooker/layers (built by that folder's prep.py from the supplied photos)."""
import sys, json, math, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONTS, OUT = sys.argv[1], sys.argv[2]
STILLS = [float(x) for x in sys.argv[sys.argv.index('--still') + 1:]] if '--still' in sys.argv else None
W, H, FPS = 1080, 1920, 30
INK, YOLK, CREAM, WHITE, GREY = (28, 26, 24), (232, 132, 26), (244, 241, 234), (255, 255, 255), (112, 106, 98)
LAYERS = '../nutricook-egg-cooker/layers'
F = lambda w, s: ImageFont.truetype(f'{FONTS}/Poppins-{w}.ttf', s)

# ---- timeline: voice lines with a visual beat after each ----
VO = json.load(open('vo/lines.json'))
GAPS = [0.35, 0.50, 0.65, 0.40, 0.85]           # pause after each line (last line is followed by the end hold)
L = []; t = 0.20
for i, x in enumerate(VO):
    L.append(t); t += x['dur'] + (GAPS[i] if i < len(GAPS) else 0)
END = round(t + 1.30, 2)
json.dump(dict(starts=L, end=END), open('timeline.json', 'w'))
SC = [0.0] + [s - 0.18 for s in L[1:]] + [END]
XF = 0.32

def clamp(x, a=0., b=1.): return max(a, min(b, x))
def ease(x): x = clamp(x); return x * x * (3 - 2 * x)
def eout(x): x = clamp(x); return 1 - (1 - x) ** 3
def back(x): x = clamp(x); c = 1.7; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2

def layer(n): return Image.open(f'{LAYERS}/{n}.png').convert('RGBA')
def paste(base, im, cx, cy, s=1.0, a=1.0):
    if s != 1.0: im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    if a < 0.999:
        im = im.copy(); im.putalpha(im.getchannel('A').point(lambda v: int(v * a)))
    base.alpha_composite(im, (round(cx - im.width / 2), round(cy - im.height / 2)))

# ---- kinetic type: each line slides up out of a mask, staggered ----
def text_line(tx, fn, col, glow=True):
    b = ImageDraw.Draw(Image.new('RGBA', (8, 8))).textbbox((0, 0), tx, font=fn)
    w, h = b[2] - b[0] + 80, int(fn.size * 1.32) + 40
    im = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    if glow:   # soft light halo keeps dark type readable over photos
        m = Image.new('L', (w, h), 0)
        ImageDraw.Draw(m).text((w / 2, h / 2), tx, font=fn, fill=200, anchor='mm', stroke_width=14, stroke_fill=200)
        g = Image.new('RGBA', (w, h), (255, 252, 246, 0)); g.putalpha(m.filter(ImageFilter.GaussianBlur(12)))
        im.alpha_composite(g)
    ImageDraw.Draw(im).text((w / 2, h / 2), tx, font=fn, fill=col, anchor='mm')
    return im

class Title:
    def __init__(self, rows, gap=0): self.rows = [text_line(*r) for r in rows]; self.gap = gap
    def draw(self, base, cy, tl, dur, stagger=0.13, enter=0.42, at=None):
        """at: optional per-line start offsets (to sync a line with a spoken word)."""
        hs = [r.height - 40 + self.gap for r in self.rows]; y = cy - sum(hs) / 2
        out_a = 1 - ease((tl - (dur - 0.25)) / 0.25)
        for i, (r, h) in enumerate(zip(self.rows, hs)):
            t0 = at[i] if at else i * stagger
            p = eout((tl - t0) / enter)
            if p <= 0: y += h; continue
            off = (1 - p) * r.height * 0.75
            vis = r.crop((0, 0, r.width, max(1, round(r.height - off))))   # mask: rises out of its own baseline
            vis = vis.copy(); vis.putalpha(vis.getchannel('A').point(lambda v: int(v * min(1, p * 1.6) * out_a)))
            base.alpha_composite(vis, (round(W / 2 - r.width / 2), round(y + h / 2 - r.height / 2 + off)))
            y += h

# ---- backgrounds ----
def kitchen_bg():
    """Bright, clean kitchen studio: warm wall, white marble counter, window light."""
    y = np.arange(H)[:, None].astype(np.float32); x = np.arange(W)[None, :].astype(np.float32); hz = 1290
    wall = np.stack([249 - 12 * (y / hz), 246 - 14 * (y / hz), 241 - 18 * (y / hz)], -1) * np.ones((1, W, 1))
    glow = np.exp(-(((x - 800) / 520) ** 2 + ((y - 360) / 520) ** 2))[..., None] * np.array([9, 8, 5])
    ctr = np.array([239, 236, 232], np.float32) * np.ones((H, W, 3)) - ((y - hz) / (H - hz)).clip(0, 1)[..., None] * 20
    img = np.where(y[..., None] < hz, wall + glow, ctr)
    rng = np.random.default_rng(4); vein = Image.new('L', (W, H), 0); d = ImageDraw.Draw(vein)
    for _ in range(9):
        x0 = rng.uniform(-200, W); yy = rng.uniform(hz + 40, H)
        d.line([(x0 + k * 110, yy + 60 * math.sin(k * 0.7 + x0) + k * rng.uniform(-6, 14)) for k in range(14)],
               fill=int(rng.uniform(40, 90)), width=int(rng.uniform(2, 5)))
    img = img - np.asarray(vein.filter(ImageFilter.GaussianBlur(3)), np.float32)[..., None] / 255 * 24
    edge = np.exp(-((y - hz) / 5) ** 2)[..., None] * 22
    img = img - edge * (y < hz)[..., None] * 0.6 + edge * (y >= hz)[..., None] * 0.3
    vig = 1 - 0.10 * (((x - W / 2) / (W * 0.75)) ** 2 + ((y - H * 0.45) / (H * 0.7)) ** 2)[..., None]
    return Image.fromarray((img * vig).clip(0, 255).astype(np.uint8)).convert('RGBA'), hz
KIT, HZ = kitchen_bg()

def photo_assets(name):
    src = Image.open(f'{LAYERS}/{name}.png').convert('RGB')
    big = src.resize((src.width * 2, src.height * 2), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2.2, 70, 2))
    s = max(W / src.width, H / src.height) * 1.12
    bg = src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(38))
    bg = Image.blend(bg, Image.new('RGB', bg.size, CREAM), 0.30)
    fw, fh = W, round(src.height * W / src.width)
    m = np.ones((fh, fw), np.float32); f = 110; r = np.linspace(0, 1, f)[:, None] ** 1.4
    m[:f] *= r; m[-f:] *= r[::-1]; c = 40; cc = np.linspace(0, 1, c)[None, :]; m[:, :c] *= cc; m[:, -c:] *= cc[:, ::-1]
    return dict(big=big, bg=bg, mask=Image.fromarray((m * 255).astype(np.uint8)), fw=fw, fh=fh)

def photo_frame(P, zoom, cy=1010, fx=0.5, fy=0.5, dx=0):
    can = Image.new('RGBA', (W, H)); bg = P['bg']
    can.paste(bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H)))
    w, h = round(P['fw'] * zoom), round(P['fh'] * zoom)
    fg = P['big'].resize((w, h), Image.LANCZOS).convert('RGBA'); fg.putalpha(P['mask'].resize((w, h)))
    can.alpha_composite(fg, (round(W / 2 - w * fx + dx), round(cy - h * fy)))
    return can

HERO = layer('hero')
SHEEN_CACHE = {}
def hero_on_kitchen(s, cx=W / 2, base_y=None, glow=0.0, sheen=-1.0, a=1.0, can=None):
    base_y = base_y or HZ + 170
    can = can if can is not None else KIT.copy()
    hw, hh = HERO.width * s, HERO.height * s; top = base_y - hh + 6 * s
    sh = Image.new('L', (W, H), 0)
    ImageDraw.Draw(sh).ellipse((cx - hw * 0.47, base_y - 16 * s, cx + hw * 0.47, base_y + 19 * s), fill=int(120 * a))
    can.paste(Image.new('RGBA', (W, H), (60, 45, 30, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(15 * s)))
    hero = HERO.resize((round(hw), round(hh)), Image.LANCZOS)
    if 0 <= sheen <= 1:   # diagonal light sweep across the steel, masked to the product
        band = Image.new('L', hero.size, 0); d = ImageDraw.Draw(band)
        x = -hero.width * 0.4 + sheen * hero.width * 1.8
        d.polygon([(x, 0), (x + 90 * s, 0), (x + 90 * s - hero.height * 0.5, hero.height), (x - hero.height * 0.5, hero.height)], fill=120)
        band = band.filter(ImageFilter.GaussianBlur(18 * s))
        lit = Image.new('RGBA', hero.size, (255, 255, 255, 0)); lit.putalpha(Image.fromarray(
            (np.asarray(band, np.float32) * np.asarray(hero.getchannel('A'), np.float32) / 255).astype(np.uint8)))
        hero = hero.copy(); hero.alpha_composite(lit)
    paste(can, hero, cx, top + hh / 2, 1.0, a)
    if glow > 0:   # power-button indicator light (button centre ≈ (285, 430) in the hero photo)
        bx, by = cx + (285 - HERO.width / 2) * s, top + 430 * s
        g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); r = 58 * s
        ImageDraw.Draw(g).ellipse((bx - r, by - r, bx + r, by + r), outline=(255, 196, 120, int(255 * glow)), width=int(7 * s))
        can.alpha_composite(g.filter(ImageFilter.GaussianBlur(9 * s / 1.6))); can.alpha_composite(g.filter(ImageFilter.GaussianBlur(2)))
    return can

def steam(can, x, y, tl, a=1.0, scale=1.0):
    """Soft wisps drifting up from the lid vent."""
    g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
    for k in range(7):
        ph = (tl * 0.55 + k / 7) % 1
        px = x + 30 * math.sin(ph * 5 + k * 1.7) * scale; py = y - ph * 380 * scale; r = (18 + ph * 70) * scale
        al = int(70 * math.sin(ph * math.pi) * a)
        d.ellipse((px - r, py - r * 1.3, px + r, py + r * 1.3), fill=(255, 255, 255, al))
    can.alpha_composite(g.filter(ImageFilter.GaussianBlur(26 * scale)))

# ---- assets ----
STEAM, SEVEN = photo_assets('steam'), photo_assets('seven')
LID, RACK, BASE, CUP = layer('lid'), layer('rack'), layer('base'), layer('cup')
EGGS = {k: layer('egg_' + k) for k in ('soft', 'medium', 'hard')}

T_HOOK1 = Title([('Busy mornings?', F('ExtraBold', 104), INK)])
T_HOOK2 = Title([('Make breakfast', F('ExtraBold', 88), INK), ('a little easier.', F('ExtraBold', 88), YOLK)])
T_MEET = Title([('Meet the NutriCook', F('ExtraBold', 82), INK), ('NC-EC360 Electric Egg Cooker', F('SemiBold', 50), YOLK)])
T_SEVEN = Title([('Up to 7 eggs', F('ExtraBold', 104), INK), ('at once', F('ExtraBold', 104), YOLK)])
T_CUP = Title([('Fill to the line', F('ExtraBold', 92), INK), ('for soft, medium, or hard', F('SemiBold', 54), YOLK)])
T_BTN = Title([('Then just', F('ExtraBold', 96), INK), ('press the button.', F('ExtraBold', 96), YOLK)])
T_CTA = Title([('Visit our page', F('ExtraBold', 100), INK), ('to learn more.', F('ExtraBold', 100), YOLK)])
T_BRAND = Title([('NutriCook  ·  NC-EC360', F('SemiBold', 46), GREY)])
LBL = {k: text_line(t, F('Bold', 54), INK) for k, t in [('soft', 'Soft'), ('medium', 'Medium'), ('hard', 'Hard')]}

def badge(n, sub):
    b = Image.new('RGBA', (300, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(b)
    d.ellipse((30, 40, 270, 280), fill=(60, 30, 0, 70)); b = b.filter(ImageFilter.GaussianBlur(10)); d = ImageDraw.Draw(b)
    d.ellipse((30, 30, 270, 270), fill=YOLK + (255,), outline=WHITE, width=10)
    d.text((150, 158), str(n), font=F('ExtraBold', 140), fill=WHITE, anchor='mm')
    return b

def cta_button(pulse):
    fn = F('Bold', 60); tx = 'Learn more'
    tw = ImageDraw.Draw(Image.new('RGBA', (8, 8))).textlength(tx, font=fn)
    bw, bh = int(tw + 210), 130
    im = Image.new('RGBA', (bw + 80, bh + 80), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((40, 40, 40 + bw, 40 + bh), bh // 2, fill=YOLK)
    d.text((40 + 70 + tw / 2, 40 + bh / 2 + 2), tx, font=fn, fill=WHITE, anchor='mm')
    ax, ay = 40 + bw - 70, 40 + bh / 2
    d.polygon([(ax + 24, ay), (ax - 4, ay - 26), (ax - 4, ay + 26)], fill=WHITE); d.rectangle((ax - 38, ay - 9, ax - 2, ay + 9), fill=WHITE)
    halo = Image.new('RGBA', im.size, (0, 0, 0, 0))
    ImageDraw.Draw(halo).rounded_rectangle((40, 40, 40 + bw, 40 + bh), bh // 2, outline=(*YOLK, int(170 * (1 - pulse))), width=int(4 + 26 * pulse))
    out = Image.new('RGBA', im.size, (0, 0, 0, 0)); out.alpha_composite(halo.filter(ImageFilter.GaussianBlur(6))); out.alpha_composite(im)
    return out

# ---- scenes (tl = local time, d = scene length) ----
S_PART = 1.10
def s_hook(tl, d):
    """Parts fly in and lock together, the assembled cooker resolves with a light sweep."""
    can = KIT.copy(); yb = 1600
    Y = lambda oy, shift: yb - (1120 - (oy + shift)) * S_PART
    X = lambda ox: W / 2 + (ox - 395) * S_PART
    arr = lambda dl: 1.0
    k = ease((tl - 0.15) / 0.60)                 # exploded → stacked
    hero_a = ease((tl - 0.70) / 0.30)
    s_hero = 590 * S_PART / HERO.width
    push = eout((tl - 0.75) / 1.6)
    zoom = 1 + 0.42 * push
    if hero_a < 1:
        sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).ellipse((W / 2 - 330, yb - 26, W / 2 + 330, yb + 22), fill=110)
        can.paste(Image.new('RGBA', (W, H), (60, 45, 30, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(22)))
        a = 1 - hero_a
        paste(can, BASE, X(395), Y(785 + 335 / 2, 0) + 600 * (1 - arr(0.0)), S_PART, a)
        paste(can, RACK, X(392), Y(592 + 94, 75 * k) - 900 * (1 - arr(0.08)), S_PART, a * arr(0.08))
        paste(can, LID, X(372), Y(50 + 165, 475 * k) - 1100 * (1 - arr(0.15)), S_PART, a * arr(0.15))
    if hero_a > 0:
        hero_on_kitchen(s_hero * zoom, base_y=yb + 8 - 40 * push, sheen=(tl - 1.0) / 0.9, a=hero_a, can=can)
    T_HOOK1.draw(can, 300, tl + 0.42, L[0] + 1.20 + 0.42 + 0.25)   # legible from frame 0
    T_HOOK2.draw(can, 300, tl - (L[0] + 1.20), d + 1)
    return can

def s_meet(tl, d):
    can = photo_frame(STEAM, 1.18 - 0.07 * ease(tl / d), cy=1090, fy=0.47)
    steam(can, W / 2 - 4, 700, tl, ease(tl / 0.6), 1.2)
    T_MEET.draw(can, 380, tl, d + 1)
    return can

def s_seven(tl, d):
    can = photo_frame(SEVEN, 1.10 + 0.07 * ease(tl / d), cy=1090, fy=0.5)
    T_SEVEN.draw(can, 380, tl, d + 1)
    step = 0.12; n = int(clamp((tl - 0.25) / step, 0, 6.999)) + 1
    sub = ((tl - 0.25) % step) / step if tl < 0.25 + 7 * step else 1
    paste(can, badge(n, sub), 850, 1500, 0.72 + 0.14 * (1 - eout(sub)), ease(tl / 0.2))
    return can

LEVEL = dict(hard=458 - 280, medium=649 - 280, soft=842 - 280)   # cup marks, in cup-layer rows
WORD = dict(soft=2.15, medium=2.62, hard=3.20)                    # when each word is spoken in line 4
def s_cup(tl, d):
    can = Image.new('RGBA', (W, H), CREAM + (255,))
    g = Image.new('L', (W, H), 0); ImageDraw.Draw(g).ellipse((-200, -300, 1300, 1100), fill=60)
    can.paste(Image.new('RGBA', (W, H), WHITE + (255,)), (0, 0), g.filter(ImageFilter.GaussianBlur(160)))
    cx0, cy0 = 60, 640
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).ellipse((cx0 + 10, cy0 + 800, cx0 + 560, cy0 + 850), fill=90)
    can.paste(Image.new('RGBA', (W, H), (90, 70, 50, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(20)))
    t = tl - (L[3] - SC[3])
    lvl = 770 + (LEVEL['soft'] - 770) * ease((t - WORD['soft'] + 0.9) / 0.9)
    prev = LEVEL['soft']
    for kk in ('medium', 'hard'):
        lvl += (LEVEL[kk] - prev) * ease((t - WORD[kk] + 0.25) / 0.45); prev = LEVEL[kk]
    paste(can, CUP, cx0 + CUP.width / 2, cy0 + CUP.height / 2, 1.0, eout(tl / 0.35))
    water = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dw = ImageDraw.Draw(water)
    if lvl < 765:
        pts = [(cx0 + 30 + i * 10, cy0 + lvl + 5 * math.sin(i * 0.5 + tl * 9)) for i in range(52)]
        dw.polygon(pts + [(cx0 + 540, cy0 + 765), (cx0 + 30, cy0 + 765)], fill=(120, 175, 225, 95))
        dw.line(pts, fill=(110, 165, 215, 170), width=4)
    can.alpha_composite(water)
    for kk in ('soft', 'medium', 'hard'):
        p = eout((t - WORD[kk] + 0.1) / 0.35)
        if p <= 0: continue
        y = cy0 + LEVEL[kk]; dl = ImageDraw.Draw(can)
        x, x_end = cx0 + 330, cx0 + 330 + 250 * p
        while x < x_end: dl.line((x, y, min(x + 16, x_end), y), fill=(70, 64, 58, int(255 * p)), width=4); x += 28
        paste(can, EGGS[kk], 715, y, 1.05 * (0.7 + 0.3 * back(p)), p)
        paste(can, LBL[kk], 905, y, 0.85 + 0.15 * back(p), p)
    T_CUP.draw(can, 380, tl, d + 1)
    return can

def s_button(tl, d):
    z = 1.55 + 0.45 * ease((tl - 0.05) / 1.0)
    press = L[4] - SC[4] + 0.62                        # "press"
    on = ease((tl - press) / 0.12)
    hh = HERO.height * z
    can = hero_on_kitchen(z, base_y=1420 + (1200 + (554 - 430) / 554 * hh - 1420) * ease((tl - 0.05) / 1.0), glow=on)
    T_BTN.draw(can, 380, tl, d + 1)
    return can

def s_cta(tl, d):
    can = hero_on_kitchen(1.55 + 0.06 * tl / d, base_y=1420, sheen=(tl - 0.5) / 1.0)
    T_CTA.draw(can, 300, tl, d + 5)
    T_BRAND.draw(can, 470, tl - 0.35, d + 5)
    paste(can, cta_button((tl % 1.1) / 1.1), W / 2, 1600, 1 + 0.025 * math.sin(tl * 5.7) * (tl > 0.7), ease((tl - 0.5) / 0.35))
    return can

SCENES = [s_hook, s_meet, s_seven, s_cup, s_button, s_cta]

def frame(t):
    i = max(k for k in range(len(SCENES)) if SC[k] <= t)
    im = SCENES[i](t - SC[i], SC[i + 1] - SC[i])
    if i + 1 < len(SCENES) and t > SC[i + 1] - XF:
        nx = SCENES[i + 1](t - SC[i + 1], SC[i + 2] - SC[i + 1])
        p = ease((t - (SC[i + 1] - XF)) / XF)
        # push transition: outgoing scene scales up slightly while the new one dissolves in
        z = 1 + 0.05 * p; im = im.resize((round(W * z), round(H * z)), Image.BILINEAR).crop(
            (round((W * z - W) / 2), round((H * z - H) / 2), round((W * z - W) / 2) + W, round((H * z - H) / 2) + H))
        im = Image.blend(im, nx, p)
    return im.convert('RGB')

if STILLS:
    for t in STILLS: frame(t).save(f'still_{t:05.2f}.jpg', quality=88)
    sys.exit()
N = int(round(END * FPS))
p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                      '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', OUT],
                     stdin=subprocess.PIPE)
for n in range(N):
    p.stdin.write(frame(n / FPS).tobytes())
    if n % 90 == 0: print(n, '/', N, flush=True)
p.stdin.close(); p.wait(); print('done', END)
