"""NutriCook NC-EC360 egg cooker: 9:16 TikTok ad. Renders frames with PIL and pipes them to ffmpeg.
usage: python3 render.py FONT_DIR out.mp4 [--still T ...]"""
import sys, json, math, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

FONTS, OUT = sys.argv[1], sys.argv[2]
STILLS = [float(x) for x in sys.argv[sys.argv.index('--still') + 1:]] if '--still' in sys.argv else None
W, H, FPS = 1080, 1920, 30
INK, YOLK, CREAM, WHITE = (34, 31, 28), (236, 138, 30), (244, 241, 234), (255, 255, 255)
F = lambda w, s: ImageFont.truetype(f'{FONTS}/Tajawal-{w}.ttf', s)

# ---- timeline, driven by the voice-over line lengths ----
VO = json.load(open('vo/lines.json'))
LEAD, GAP = 0.20, 0.25
L = []; t = LEAD
for x in VO: L.append(t); t += x['dur'] + GAP
END = t - GAP + 0.85
json.dump(dict(starts=L, end=END), open('timeline.json', 'w'))
SC = [0.0] + [s - 0.15 for s in L[1:]] + [END]   # scene boundaries (visual leads the voice)
XF = 0.30                                       # cross-fade length

def clamp(x, a=0., b=1.): return max(a, min(b, x))
def ease(x): x = clamp(x); return x * x * (3 - 2 * x)
def eout(x): x = clamp(x); return 1 - (1 - x) ** 3
def back(x):
    x = clamp(x); c = 1.7; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2

def layer(n): return Image.open(f'layers/{n}.png').convert('RGBA')
def paste(base, im, cx, cy, s=1.0, a=1.0):
    if s != 1.0: im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    if a < 1.0:
        im = im.copy(); im.putalpha(im.getchannel('A').point(lambda v: int(v * a)))
    base.alpha_composite(im, (round(cx - im.width / 2), round(cy - im.height / 2)))

# ---- captions ----
def caption(rows, pad=(46, 26), bg=(255, 255, 255, 236), radius=44):
    """rows: [(text, font, colour)], stacked and centred on a soft white card."""
    tmp = ImageDraw.Draw(Image.new('RGBA', (8, 8)))
    boxes = [tmp.textbbox((0, 0), tx, font=fn, direction='rtl' if any('؀' <= c <= 'ۿ' for c in tx) else 'ltr', language='ar') for tx, fn, _ in rows]
    ws = [b[2] - b[0] for b in boxes]; hs = [fn.size * 1.22 for _, fn, _ in rows]
    cw, ch = int(max(ws) + 2 * pad[0]), int(sum(hs) + 2 * pad[1])
    im = Image.new('RGBA', (cw + 60, ch + 60), (0, 0, 0, 0))
    if bg:
        sh = Image.new('RGBA', im.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle((30, 40, 30 + cw, 40 + ch), radius, fill=(40, 25, 10, 60))
        im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(14)))
    d = ImageDraw.Draw(im)
    if bg: d.rounded_rectangle((30, 30, 30 + cw, 30 + ch), radius, fill=bg)
    y = 30 + pad[1]
    for (tx, fn, col), h in zip(rows, hs):
        rtl = any('؀' <= c <= 'ۿ' for c in tx)
        d.text((30 + cw / 2, y + h / 2), tx, font=fn, fill=col, anchor='mm', direction='rtl' if rtl else 'ltr', language='ar')
        y += h
    return im

def show_cap(base, im, cy, tl, dur, enter=0.28, leave=0.22):
    """Pop in with a little overshoot, fade/slide out at the end of its window."""
    if tl < 0 or tl > dur: return
    a = ease(tl / enter) * (1 - ease((tl - (dur - leave)) / leave))
    s = 0.86 + 0.14 * back(tl / (enter * 1.3))
    paste(base, im, W / 2, cy + 26 * (1 - eout(tl / enter)), s, a)

# ---- backgrounds ----
def photo_assets(name):
    src = Image.open(f'layers/{name}.png').convert('RGB')
    big = src.resize((src.width * 2, src.height * 2), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2.2, 70, 2))
    s = max(W / src.width, H / src.height) * 1.12
    bg = src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(38))
    bg = Image.blend(bg, Image.new('RGB', bg.size, CREAM), 0.30)
    fw, fh = W, round(src.height * W / src.width)
    m = np.ones((fh, fw), np.float32)
    f = 110; r = np.linspace(0, 1, f)[:, None] ** 1.4
    m[:f] *= r; m[-f:] *= r[::-1]
    c = 40; cc = np.linspace(0, 1, c)[None, :]
    m[:, :c] *= cc; m[:, -c:] *= cc[:, ::-1]
    return dict(big=big, bg=bg, mask=Image.fromarray((m * 255).astype(np.uint8)), fw=fw, fh=fh)

def photo_frame(P, zoom, cy=1010, fx=0.5, fy=0.5):
    can = Image.new('RGBA', (W, H))
    bg = P['bg']; can.paste(bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H)))
    w, h = round(P['fw'] * zoom), round(P['fh'] * zoom)
    fg = P['big'].resize((w, h), Image.LANCZOS).convert('RGBA')
    fg.putalpha(P['mask'].resize((w, h)))
    can.alpha_composite(fg, (round(W / 2 - w * fx), round(cy - h * fy)))
    return can

def kitchen_bg():
    """Clean, bright kitchen-inspired studio: warm wall, white marble counter, window light."""
    y = np.arange(H)[:, None].astype(np.float32); x = np.arange(W)[None, :].astype(np.float32)
    hz = 1290
    wall = np.stack([248 - 10 * (y / hz), 245 - 12 * (y / hz), 240 - 16 * (y / hz)], -1) * np.ones((1, W, 1))
    glow = np.exp(-(((x - 820) / 520) ** 2 + ((y - 380) / 520) ** 2))[..., None] * np.array([10, 9, 6])
    ctr = np.stack([238 - 0 * y, 235 - 0 * y, 231 - 0 * y], -1) * np.ones((1, W, 1)) - ((y - hz) / (H - hz)).clip(0, 1)[..., None] * 18
    img = np.where(y[..., None] < hz, wall + glow, ctr)
    rng = np.random.default_rng(4)
    vein = Image.new('L', (W, H), 0); d = ImageDraw.Draw(vein)
    for _ in range(9):
        x0 = rng.uniform(-200, W); yy = rng.uniform(hz + 40, H); pts = []
        for k in range(14): pts.append((x0 + k * 110, yy + 60 * math.sin(k * 0.7 + x0) + k * rng.uniform(-6, 14)))
        d.line(pts, fill=int(rng.uniform(40, 90)), width=int(rng.uniform(2, 5)))
    v = np.asarray(vein.filter(ImageFilter.GaussianBlur(3)), np.float32)[..., None] / 255
    img = img - v * 26
    edge = np.exp(-((y - hz) / 5) ** 2)[..., None] * 22          # counter front edge highlight / line
    img = img - edge * (y < hz)[..., None] * 0.6 + edge * (y >= hz)[..., None] * 0.3
    return Image.fromarray(img.clip(0, 255).astype(np.uint8)).convert('RGBA'), hz

KIT, HZ = kitchen_bg()
HERO = layer('hero')

def hero_on_kitchen(s, cx=W / 2, base_y=None, glow=0.0):
    base_y = base_y or HZ + 170
    can = KIT.copy()
    hw, hh = HERO.width * s, HERO.height * s
    sh = Image.new('L', (W, H), 0)
    ImageDraw.Draw(sh).ellipse((cx - hw * 0.47, base_y - 26 * s / 1.6, cx + hw * 0.47, base_y + 30 * s / 1.6), fill=120)
    can.paste(Image.new('RGBA', (W, H), (60, 45, 30, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(24 * s / 1.6)))
    paste(can, HERO, cx, base_y - hh / 2 + 6 * s, s)
    if glow > 0:   # power-button indicator light (button centre is ~(285, 430) in the hero photo)
        bx, by = cx + (285 - HERO.width / 2) * s, base_y - hh / 2 + 6 * s + (430 - HERO.height / 2) * s
        g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g); r = 58 * s
        d.ellipse((bx - r, by - r, bx + r, by + r), outline=(255, 196, 120, int(255 * glow)), width=int(7 * s))
        can.alpha_composite(g.filter(ImageFilter.GaussianBlur(9 * s / 1.6)))
        can.alpha_composite(g.filter(ImageFilter.GaussianBlur(2)))
    return can

# ---- assets ----
STEAM, SEVEN = photo_assets('steam'), photo_assets('seven')
LID, RACK, BASE, CUP = layer('lid'), layer('rack'), layer('base'), layer('cup')
EGGS = {k: layer('egg_' + k) for k in ('soft', 'medium', 'hard')}

C_HOOK = caption([('جهّزي بيضك', F('ExtraBold', 116), INK), ('بدون وجع راس!', F('ExtraBold', 116), YOLK)], pad=(60, 30))
C_PROB = caption([('لا قِدر… ولا وقفة', F('ExtraBold', 92), INK), ('عند النار', F('ExtraBold', 92), YOLK)])
C_REVEAL = caption([('جهاز سلق البيض', F('ExtraBold', 92), INK), ('NutriCook  NC-EC360', F('Bold', 60), YOLK)])
C_SEVEN = caption([('٧ بيضات مرّة وحدة', F('ExtraBold', 92), INK), ('تكفي فطور العيلة', F('Bold', 66), YOLK)])
C_CUP = caption([('الكوب المدرّج', F('ExtraBold', 92), INK), ('يضبط لك كمية الماء', F('Bold', 66), YOLK)])
C_BTN = caption([('ضغطة زر…', F('ExtraBold', 100), INK), ('ويطفّي لحاله', F('ExtraBold', 100), YOLK)])
C_CTA = caption([('اطلبيه الحين', F('ExtraBold', 118), INK)], pad=(64, 22))
C_BRAND = caption([('NutriCook  NC-EC360', F('Bold', 54), (110, 104, 96))], bg=None)
LBL = {k: caption([(t, F('ExtraBold', 62), INK)], pad=(26, 10), radius=30)
       for k, t in [('soft', 'برشت'), ('medium', 'نُص'), ('hard', 'مستوي')]}

def cta_button(pulse):
    fn = F('ExtraBold', 70); tx = 'ادخلي صفحتنا من الرابط'
    d0 = ImageDraw.Draw(Image.new('RGBA', (8, 8)))
    b = d0.textbbox((0, 0), tx, font=fn, direction='rtl', language='ar'); tw = b[2] - b[0]
    bw, bh = tw + 200, 132
    im = Image.new('RGBA', (bw + 80, bh + 80), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((40, 40, 40 + bw, 40 + bh), bh // 2, fill=YOLK)
    d.text((40 + bw / 2 + 34, 40 + bh / 2 + 4), tx, font=fn, fill=WHITE, anchor='mm', direction='rtl', language='ar')
    ax, ay = 40 + 64, 40 + bh / 2           # arrow pointing left (reading direction → link)
    d.polygon([(ax - 22, ay), (ax + 6, ay - 26), (ax + 6, ay + 26)], fill=WHITE)
    d.rectangle((ax + 4, ay - 9, ax + 38, ay + 9), fill=WHITE)
    halo = Image.new('RGBA', im.size, (0, 0, 0, 0))
    ImageDraw.Draw(halo).rounded_rectangle((40, 40, 40 + bw, 40 + bh), bh // 2, outline=(*YOLK, int(160 * (1 - pulse))), width=int(4 + 26 * pulse))
    out = Image.new('RGBA', im.size, (0, 0, 0, 0)); out.alpha_composite(halo.filter(ImageFilter.GaussianBlur(6))); out.alpha_composite(im)
    return out

def pot_icon(strike):
    im = Image.new('RGBA', (300, 260), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = (90, 84, 78, 255)
    d.rounded_rectangle((60, 100, 240, 220), 22, outline=c, width=12)
    d.line((30, 112, 60, 112), fill=c, width=12); d.line((240, 112, 270, 112), fill=c, width=12)
    d.rounded_rectangle((52, 80, 248, 96), 8, fill=c); d.rounded_rectangle((132, 58, 168, 80), 8, fill=c)
    for i, x in enumerate((110, 150, 190)):   # steam squiggles
        d.arc((x - 14, 10, x + 14, 40), 200, 340, fill=c, width=7)
    if strike > 0:
        x1 = 40 + 220 * strike; y1 = 20 + 210 * strike
        d.line((40, 20, x1, y1), fill=(214, 64, 52, 255), width=18)
    return im

# ---- scenes (tl = local time) ----
def s_hook(tl, d):
    can = photo_frame(STEAM, 1.10 + 0.05 * tl / d, cy=1060, fy=0.47)
    show_cap(can, C_HOOK, 470, tl + 0.35, d + 0.6)   # fully legible from frame 0 (thumbnail)
    return can

def s_problem(tl, d):
    T = SC[1]
    can = photo_frame(STEAM, 1.10 + 0.05 * (tl + T) / T, cy=1060, fy=0.47)
    show_cap(can, C_PROB, 420, tl, d + 0.3)
    badge = Image.new('RGBA', (360, 360), (0, 0, 0, 0)); db_ = ImageDraw.Draw(badge)
    db_.ellipse((20, 30, 340, 350), fill=(40, 25, 10, 50)); badge = badge.filter(ImageFilter.GaussianBlur(10))
    ImageDraw.Draw(badge).ellipse((20, 20, 340, 340), fill=(255, 255, 255, 240))
    paste(badge, pot_icon(eout((tl - 0.55) / 0.35)), 180, 185, 0.85)
    a = ease(tl / 0.3) * (1 - ease((tl - d + 0.2) / 0.2))
    paste(can, badge, 860, 760, 0.62 + 0.08 * back(tl / 0.4), a)
    return can

S_PART = 1.30
def s_reveal(tl, d):
    can = Image.new('RGBA', (W, H), CREAM + (255,))
    yb = 1560                                # base bottom on canvas
    Y = lambda oy, shift: yb - (1120 - (oy + shift)) * S_PART
    X = lambda ox: W / 2 + (ox - 395) * S_PART
    k = ease((tl - 0.45) / 0.85)             # 0 = exploded view, 1 = stacked
    arr = lambda delay: eout((tl - delay) / 0.45)
    hero_a = ease((tl - 1.25) / 0.40)
    # contact shadow
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).ellipse((W / 2 - 360, yb - 30, W / 2 + 360, yb + 26), fill=110)
    can.paste(Image.new('RGBA', (W, H), (90, 70, 50, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(26)))
    if hero_a < 1:
        a = 1 - hero_a
        paste(can, BASE, X(395), Y(785 + 335 / 2, 0) + 500 * (1 - arr(0.0)), S_PART, a * arr(0.0))
        paste(can, RACK, X(392), Y(592 + 94, 75 * k) - 700 * (1 - arr(0.10)), S_PART, a * arr(0.10))
        paste(can, LID, X(372), Y(50 + 165, 475 * k) - 900 * (1 - arr(0.18)), S_PART, a * arr(0.18))
    if hero_a > 0:
        s = 590 * S_PART / HERO.width
        paste(can, HERO, W / 2 + 4, yb - HERO.height * s / 2 + 8, s * (1 + 0.04 * ease((tl - 1.25) / (d - 1.25))), hero_a)
    show_cap(can, C_REVEAL, 380, tl - 0.9, d - 0.9 + 0.3)
    return can

def s_seven(tl, d):
    can = photo_frame(SEVEN, 1.14 - 0.06 * tl / d, cy=1080, fy=0.5)
    show_cap(can, C_SEVEN, 390, tl, d + 0.3)
    n = int(clamp((tl - 0.25) / 0.17, 0, 6.999)) + 1   # badge counts up 1..7 as eggs "land"
    sub = (tl - 0.25) % 0.17 / 0.17 if tl < 0.25 + 7 * 0.17 else 1
    b = Image.new('RGBA', (240, 240), (0, 0, 0, 0)); dd = ImageDraw.Draw(b)
    dd.ellipse((20, 20, 220, 220), fill=YOLK + (255,), outline=WHITE, width=10)
    dd.text((120, 128), '١٢٣٤٥٦٧'[n - 1], font=F('ExtraBold', 128), fill=WHITE, anchor='mm', direction='rtl', language='ar')
    paste(can, b, 860, 1480, 0.78 + 0.12 * (1 - eout(sub)), ease(tl / 0.2) * (1 - ease((tl - d + 0.2) / 0.2)))
    return can

CUP_S = 1.0
LEVEL = dict(hard=458 - 280, medium=649 - 280, soft=842 - 280)   # leader-line rows in the cup layer
def s_cup(tl, d):
    can = Image.new('RGBA', (W, H), CREAM + (255,))
    cx0, cy0 = 70, 620                         # cup layer top-left on canvas
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).ellipse((cx0 + 10, cy0 + 800, cx0 + 560, cy0 + 850), fill=90)
    can.paste(Image.new('RGBA', (W, H), (90, 70, 50, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(20)))
    t = tl - (L[4] - SC[4])                  # time since the voice line started
    # word timing inside the line: "برشت" ~2.6 s, "نص" ~3.3 s, "مستوي" ~3.8 s
    order = [('soft', 2.45), ('medium', 3.15), ('hard', 3.65)]
    lvl = 760 + (LEVEL['soft'] + 60 - 760) * ease((tl - 0.4) / 1.2)   # water pours in
    prev = LEVEL['soft'] + 60
    for k, tk in order:
        lvl = lvl + (LEVEL[k] - prev) * ease((t - tk + 0.3) / 0.5); prev = LEVEL[k]
    water = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dw = ImageDraw.Draw(water)
    pts = [(cx0 + 30 + i * 10, cy0 + lvl + 5 * math.sin(i * 0.5 + tl * 9)) for i in range(52)]
    dw.polygon(pts + [(cx0 + 540, cy0 + 765), (cx0 + 30, cy0 + 765)], fill=(120, 175, 225, 95))
    dw.line(pts, fill=(110, 165, 215, 160), width=4)
    paste(can, CUP, cx0 + CUP.width / 2, cy0 + CUP.height / 2, CUP_S, eout(tl / 0.35))
    can.alpha_composite(water)
    for k, tk in order:
        p = eout((t - tk) / 0.35)
        if p <= 0: continue
        y = cy0 + LEVEL[k]
        dl = ImageDraw.Draw(can)
        x_end = cx0 + 330 + (700 - 330) * p
        x = cx0 + 330
        while x < x_end:
            dl.line((x, y, min(x + 16, x_end), y), fill=(70, 64, 58, int(255 * p)), width=4); x += 28
        paste(can, EGGS[k], 850, y - 10, 1.2 * (0.7 + 0.3 * back(p)), p)
        paste(can, LBL[k], 850, y + 112, 0.85 + 0.15 * back(p), p)
    show_cap(can, C_CUP, 340, tl, d + 0.3)
    return can

def s_button(tl, d):
    z = 1.55 + 0.75 * ease((tl - 0.1) / 0.9)
    vo = L[5] - SC[5]
    on = ease((tl - vo - 0.15) / 0.12) * (1 - ease((tl - vo - 1.35) / 0.35))
    can = hero_on_kitchen(z, cx=W / 2 - 0 * z, base_y=HZ + 150 + 330 * (z - 1.55) / 0.75, glow=on)
    show_cap(can, C_BTN, 400, tl, d + 0.3)
    return can

def s_cta(tl, d):
    can = hero_on_kitchen(1.60 + 0.06 * tl / d, base_y=HZ + 85)
    show_cap(can, C_CTA, 330, tl, d + 5)
    paste(can, C_BRAND, W / 2, 455, 1, ease((tl - 0.3) / 0.4))
    pulse = (tl % 1.1) / 1.1
    paste(can, cta_button(pulse), W / 2, 1575, 1 + 0.03 * math.sin(tl * 5.7) * (tl > 0.6), ease((tl - 0.45) / 0.35))
    return can

SCENES = [s_hook, s_problem, s_reveal, s_seven, s_cup, s_button, s_cta]

def frame(t):
    i = max(k for k in range(len(SCENES)) if SC[k] <= t)
    d = SC[i + 1] - SC[i]
    im = SCENES[i](t - SC[i], d)
    if i + 1 < len(SCENES) and t > SC[i + 1] - XF:       # cross-fade into next scene
        nx = SCENES[i + 1](t - SC[i + 1], SC[i + 2] - SC[i + 1])
        im = Image.blend(im, nx, ease((t - (SC[i + 1] - XF)) / XF))
    return im.convert('RGB')

if STILLS:
    for t in STILLS: frame(t).save(f'still_{t:05.2f}.jpg', quality=88)
    sys.exit()
N = int(round(END * FPS))
p = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                      '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', OUT], stdin=subprocess.PIPE)
for n in range(N):
    p.stdin.write(frame(n / FPS).tobytes())
    if n % 90 == 0: print(n, '/', N, flush=True)
p.stdin.close(); p.wait(); print('done', END)
