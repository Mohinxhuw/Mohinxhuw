"""Business Sales Template — vertical promo reel (1080x1920, silent).
Every visual is a rendered slide from the template; motion is a small 3D
compositor: perspective-projected cards, depth-of-field, contact shadows."""
import os, sys, math, subprocess, functools
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1080, 1920
FPS = int(os.environ.get('FPS', 60))
DUR = 25.0
FOCAL = 2200.0
CX, CY = W / 2, H / 2
SLIDE_AR = 1440 / 2560

# brand palette (BGR floats)
def hexbgr(h): return np.array([int(h[4:6], 16), int(h[2:4], 16), int(h[0:2], 16)], np.float32) / 255
NAVY, NAVY2, LIME, MIST, WHITE = hexbgr('0A1628'), hexbgr('17253D'), hexbgr('C6F432'), hexbgr('D5DBE3'), hexbgr('FFFFFF')

# ---------------- textures with mip levels + rounded-corner masks ----------------
LEVELS = [2560, 1800, 1280, 900, 640, 450, 320]
@functools.lru_cache(maxsize=None)
def tex(n, lw):
    src = cv2.imread(os.path.join(HERE, 'slides', f's{n:02d}.png'), cv2.IMREAD_COLOR)
    src = src[:, :2560]
    h = int(round(lw * SLIDE_AR))
    img = src if lw == 2560 else cv2.resize(src, (lw, h), interpolation=cv2.INTER_AREA)
    img = img.astype(np.float32) / 255
    m = np.zeros((h * 4, lw * 4), np.uint8)
    r = int(lw * 4 * 0.012)
    cv2.rectangle(m, (r, 0), (lw * 4 - r - 1, h * 4 - 1), 255, -1)
    cv2.rectangle(m, (0, r), (lw * 4 - 1, h * 4 - r - 1), 255, -1)
    for cx_, cy_ in [(r, r), (lw * 4 - r - 1, r), (r, h * 4 - r - 1), (lw * 4 - r - 1, h * 4 - r - 1)]:
        cv2.circle(m, (cx_, cy_), r, 255, -1)
    mask = cv2.resize(m, (lw, h), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
    return img, mask

def rot(rx, ry, rz):
    rx, ry, rz = map(math.radians, (rx, ry, rz))
    Rx = np.array([[1, 0, 0], [0, math.cos(rx), -math.sin(rx)], [0, math.sin(rx), math.cos(rx)]])
    Ry = np.array([[math.cos(ry), 0, math.sin(ry)], [0, 1, 0], [-math.sin(ry), 0, math.cos(ry)]])
    Rz = np.array([[math.cos(rz), -math.sin(rz), 0], [math.sin(rz), math.cos(rz), 0], [0, 0, 1]])
    return Rz @ Ry @ Rx

def project(P):
    z = P[:, 2] + FOCAL
    return np.stack([CX + P[:, 0] * FOCAL / z, CY + P[:, 1] * FOCAL / z], 1), z

class Card:
    def __init__(self, n, x=0, y=0, z=0, rx=0, ry=0, rz=0, w=960, a=1.0, blur=0.0, dim=1.0, R=None, shadow=1.0):
        self.__dict__.update(locals()); del self.__dict__['self']

def corners3d(c):
    hw, hh = c.w / 2, c.w * SLIDE_AR / 2
    L = np.array([[-hw, -hh, 0], [hw, -hh, 0], [hw, hh, 0], [-hw, hh, 0]], np.float64)
    R = c.R if c.R is not None else rot(c.rx, c.ry, c.rz)
    return L @ R.T + np.array([c.x, c.y, c.z])

def draw_card(canvas, c):
    if c.a <= 0.003: return
    P = corners3d(c)
    dst, z = project(P)
    if np.any(z < 50): return
    x0, y0 = np.floor(dst.min(0)).astype(int) - 2
    x1, y1 = np.ceil(dst.max(0)).astype(int) + 2
    if x1 < 0 or y1 < 0 or x0 > W or y0 > H: return
    sw = max(np.linalg.norm(dst[1] - dst[0]), np.linalg.norm(dst[2] - dst[3]))
    lw = next((l for l in reversed(LEVELS) if l >= sw * 1.25), LEVELS[0])
    img, mask = tex(c.n, lw)
    h, w_ = mask.shape
    src = np.float32([[0, 0], [w_, 0], [w_, h], [0, h]])
    # shadow (soft, offset downward), drawn first
    pad = int(60 + sw * 0.08)
    bx0, by0, bx1, by1 = max(x0 - pad, 0), max(y0 - pad, 0), min(x1 + pad, W), min(y1 + pad * 2, H)
    if bx1 <= bx0 or by1 <= by0: return
    Hm = cv2.getPerspectiveTransform(src, np.float32(dst - [bx0, by0]))
    size = (bx1 - bx0, by1 - by0)
    m = cv2.warpPerspective(mask, Hm, size, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    if c.shadow > 0:
        sig = 10 + sw * 0.03
        off = int(8 + sw * 0.025)
        sh = cv2.GaussianBlur(m, (0, 0), sig)
        sh = np.roll(sh, off, axis=0); sh[:off] = 0
        canvas[by0:by1, bx0:bx1] *= (1 - 0.55 * c.shadow * c.a * sh)[..., None]
    rgb = cv2.warpPerspective(img, Hm, size, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    if c.dim != 1.0:
        rgb = rgb * c.dim + NAVY * (1 - c.dim) * 0.6
    if c.blur > 0.25:
        pm = cv2.GaussianBlur(rgb * m[..., None], (0, 0), c.blur)
        m = cv2.GaussianBlur(m, (0, 0), c.blur)
        rgb = pm / np.maximum(m[..., None], 1e-4)
    a = (m * c.a)[..., None]
    reg = canvas[by0:by1, bx0:bx1]
    reg[:] = reg * (1 - a) + rgb * a

# ---------------- background ----------------
def make_bg():
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((xx - W * 0.5) / W) ** 2 + ((yy - H * 0.42) / H) ** 2)
    g = np.clip(1 - d * 1.6, 0, 1) ** 1.6
    bg = NAVY[None, None] * (1 - g[..., None]) + (NAVY2 * 1.12)[None, None] * g[..., None]
    return bg.astype(np.float32)
BG = make_bg()
DOTS = np.zeros((H + 400, W), np.float32)
for yy in range(0, H + 400, 44):
    for xx in range(22, W, 44):
        cv2.circle(DOTS, (xx, yy), 2, 1.0, -1, lineType=cv2.LINE_AA)

def background(t):
    off = int((t * 14) % 44)
    d = DOTS[off:off + H] * 0.045
    return BG + d[..., None] * (MIST[None, None] - BG)

# ---------------- text ----------------
FONTS = {'disp': os.path.expanduser('~/.fonts/manrope-800.ttf'), 'med': os.path.expanduser('~/.fonts/inter-500.ttf'), 'reg': os.path.expanduser('~/.fonts/inter-400.ttf')}
@functools.lru_cache(maxsize=None)
def text_img(s, font, size, track=0, color='FFFFFF'):
    f = ImageFont.truetype(FONTS[font], size)
    widths = [f.getlength(ch) for ch in s]
    tw = int(sum(widths) + track * (len(s) - 1)) + 8
    asc, desc = f.getmetrics()
    im = Image.new('L', (tw, asc + desc + 8), 0)
    d = ImageDraw.Draw(im); x = 4
    for ch, wd in zip(s, widths):
        d.text((x, 4), ch, font=f, fill=255); x += wd + track
    return np.asarray(im, np.float32) / 255, hexbgr(color)

def draw_text(canvas, s, font, size, cx, y, a=1.0, track=0, color='FFFFFF', anchor='c'):
    if a <= 0.003: return 0
    m, col = text_img(s, font, size, track, color)
    h, w_ = m.shape
    x = int(cx - w_ / 2) if anchor == 'c' else int(cx)
    y = int(y)
    x0, y0, x1, y1 = max(x, 0), max(y, 0), min(x + w_, W), min(y + h, H)
    if x1 <= x0 or y1 <= y0: return w_
    mm = m[y0 - y:y1 - y, x0 - x:x1 - x][..., None] * a
    reg = canvas[y0:y1, x0:x1]
    reg[:] = reg * (1 - mm) + col * mm
    return w_

def caption(canvas, s, t, t0, t1, y=150, size=58, square=True, center_w=None):
    """Headline with the template's lime-square tag motif; fades + rises in/out."""
    a = clamp01((t - t0) / 0.45) * clamp01((t1 - t) / 0.4)
    if a <= 0: return
    e = ease_out(clamp01((t - t0) / 0.6))
    dy = (1 - e) * 26
    m, _ = text_img(s, 'disp', size, 0)
    w_ = m.shape[1]
    x0 = CX - ((center_w or w_) + 34) / 2
    sq = 18
    sy = int(y + dy + size * 0.42)
    if square:
        canvas[sy:sy + sq, int(x0):int(x0) + sq] = canvas[sy:sy + sq, int(x0):int(x0) + sq] * (1 - a) + LIME * a
    draw_text(canvas, s, 'disp', size, x0 + 34, y + dy, a, anchor='l')

def top_fade(canvas, h0=430, strength=0.92, solid=0):
    ramp = np.clip(1 - (np.arange(h0, dtype=np.float32) - solid) / max(h0 - solid, 1), 0, 1) ** 1.3 * strength
    canvas[:h0] = canvas[:h0] * (1 - ramp[:, None, None]) + BG[:h0] * ramp[:, None, None]

# ---------------- easing ----------------
def clamp01(v): return max(0.0, min(1.0, v))
def ease_io(u): u = clamp01(u); return 4 * u ** 3 if u < .5 else 1 - (-2 * u + 2) ** 3 / 2
def ease_out(u): u = clamp01(u); return 1 - (1 - u) ** 3
def ease_out5(u): u = clamp01(u); return 1 - (1 - u) ** 5
def ease_in(u): u = clamp01(u); return u ** 3
def lerp(a, b, u): return a + (b - a) * u
def seg(t, t0, t1, a, b, e=ease_io): return lerp(a, b, e((t - t0) / (t1 - t0)))

def blend(p, q, u):
    return {k: lerp(p[k], q[k], u) for k in p}

# column layout shared by scenes B and C
SP = 560
def col_pose(yrel, i):
    d = min(abs(yrel) / SP, 1.6)
    return dict(x=0, y=yrel, z=-60 + 480 * d ** 1.15, rx=-7 * max(-1.4, min(1.4, yrel / SP)), ry=(6 if i % 2 else -6) * min(d, 1),
                rz=0, w=960, blur=2.6 * min(d, 1.4) ** 1.4, dim=1 - 0.28 * min(d, 1.2))

COLUMN = [11, 63, 52, 39, 69, 55, 71, 94]
FAN = [93, 77, 79, 80, 82, 83]          # bottom -> top of stack
WALL = [13, 22, 49, 15, 21, 74, 33, 24, 40, 56, 31, 46, 14, 35, 50, 87, 53, 58,
        64, 60, 62, 72, 75, 76, 78, 84, 89, 47, 98, 12]
WALL_COLS = 3
HERO_IDX = WALL.index(64)

def wall_layout(t):
    cw, gap = 430, 36
    chh = cw * SLIDE_AR
    R = rot(26, -16, -13)
    scroll = seg(t, 13.6, 18.4, 1500, -520, lambda u: u)  # linear glide
    T = np.array([60, scroll, 260])
    out = []
    rows = math.ceil(len(WALL) / WALL_COLS)
    for k, n in enumerate(WALL):
        c, r = k % WALL_COLS, k // WALL_COLS
        u = (c - (WALL_COLS - 1) / 2) * (cw + gap)
        v = (r - (rows - 1) / 2) * (chh + gap)
        p = R @ np.array([u, v, 0]) + T
        out.append((n, p, R, cw))
    return out

def frame(t):
    cv = background(t)
    cards = []
    # ---------- A: opening (0 - 3.2) ----------
    if t < 3.2:
        u = t
        e = ease_out5(u / 2.2)
        c = Card(11, y=lerp(140, 60, e), z=lerp(2600, 0, e), rx=lerp(42, 6, e), ry=lerp(-34, -8, e), rz=lerp(9, 1.2, e),
                 a=clamp01(u / 0.5), w=960)
        if u > 2.2:
            k = (u - 2.2) / 1.0
            c.rx, c.ry, c.rz = lerp(6, 3, k), lerp(-8, -4, k), lerp(1.2, 0.5, k)
        cards.append(c)
    # ---------- B: emerge into a column (3.2 - 6.6) ----------
    elif t < 6.6:
        u = t - 3.2
        start = dict(x=0, y=60, z=0, rx=3, ry=-4, rz=0.5, w=960, blur=0, dim=1)
        p11 = blend(start, col_pose(-SP, 0), ease_io(u / 1.3))
        p63 = blend(dict(start, z=6), col_pose(0, 1), ease_io((u - 0.15) / 1.3))
        p52 = blend(dict(col_pose(0, 1), z=-54), col_pose(SP, 2), ease_io((u - 1.0) / 1.2))
        if u < 1.0: p52['a'] = 0.0
        cards = [Card(52, **p52), Card(11, **p11), Card(63, **p63)]
        drift = seg(t, 5.4, 6.6, 0, 60, lambda q: q * q)
        for cd in cards:
            cd.y -= drift
    # ---------- C: chart column scroll (6.6 - 10.4) ----------
    elif t < 10.4:
        s = seg(t, 6.6, 10.4, 60, SP * 6 + 30, lambda q: (q * q * (3 - 2 * q)) * 0.82 + q * 0.18)
        lst = []
        for i, n in enumerate(COLUMN):
            yrel = (i - 1) * SP - s
            if abs(yrel) > SP * 2.2: continue
            lst.append(Card(n, **col_pose(yrel, i)))
        cards = sorted(lst, key=lambda cd: -cd.z)
    # ---------- D: stack & fan (10.4 - 14.2) ----------
    elif t < 14.2:
        u = t - 10.4
        cards = []
        # leaving column cards
        s_end = SP * 6 + 30
        for i, n in enumerate(COLUMN[:-1]):
            yrel = (i - 1) * SP - s_end
            if abs(yrel) > SP * 1.3: continue
            p = col_pose(yrel, i); p['y'] += np.sign(yrel) * 1500 * ease_in(u / 0.55); p['blur'] += 3 * ease_in(u / 0.55); p['a'] = 1.0 if u < 0.6 else 0.0
            cards.append(Card(n, **p))
        stack = dict(x=-10, y=120, z=380, rx=54, ry=0, rz=-24, w=900)
        fan_base = dict(x=-40, y=0, z=0, rx=38, ry=-10, rz=-15, w=860)
        layers = []
        for k, n in enumerate(FAN):
            sp = dict(stack, x=stack['x'] + 14 * k, y=stack['y'] - 30 * k, z=stack['z'] - 4 * k, rz=stack['rz'] + 1.6 * k)
            if k == 0:
                p = blend(dict(col_pose(0, 7), a=1), dict(sp, blur=0, dim=1, a=1), ease_io(u / 0.75))
            else:
                td = 0.35 + 0.17 * (k - 1)
                e = ease_out(clamp01((u - td) / 0.6))
                drop = dict(sp, z=sp['z'] - 120, y=sp['y'] - 1700, rx=40, rz=-30)
                p = blend(dict(drop, blur=0, dim=1, a=0), dict(sp, blur=0, dim=1, a=1), e)
                p['a'] = clamp01((u - td) / 0.12)
            # fan out
            fu = ease_io((u - 1.75) / 1.1)
            fp = dict(fan_base, x=fan_base['x'] - 30 * (k - 2.5), y=-700 + k * 285, z=-140 * (k - 2.5) + 120, blur=0, dim=1, a=1)
            fp['dim'] = 0.78 + 0.22 * k / (len(FAN) - 1)
            p = blend(dict(p, blur=p.get('blur', 0), dim=p.get('dim', 1)), fp, fu) if fu > 0 else p
            if u > 2.85:  # slow drift
                q = (u - 2.85)
                p['rz'] += q * 2.2; p['ry'] += q * 3; p['z'] -= q * 30
            # exit upward at the end
            ex = ease_in((u - 3.25) / 0.55)
            p['y'] -= 2400 * ex
            layers.append(Card(n, **p))
        cards += layers
    # ---------- E: system wall + hero lift (14.2 - 19.4) ----------
    elif t < 19.6:
        u = t - 14.2
        lay = wall_layout(t)
        enter = 1 - ease_out(clamp01(u / 0.6))
        lift = ease_io((t - 17.4) / 1.25)
        cards = []
        for k, (n, p, R, cw) in enumerate(lay):
            if k == HERO_IDX: continue
            c = Card(n, x=p[0], y=p[1] + 560 * enter, z=p[2], R=R, w=cw, dim=1 - 0.45 * lift, blur=5 * lift, shadow=0.7)
            cards.append(c)
        n, p, R, cw = lay[HERO_IDX]
        ang = np.array([26, -16, -13]) * (1 - lift)
        hero = Card(64, x=lerp(p[0], 0, lift), y=lerp(p[1] + 560 * enter, 40, lift), z=lerp(p[2], -70 - 40 * clamp01((t - 18.6) / 1.0), lift),
                    rx=ang[0], ry=ang[1], rz=ang[2], w=lerp(cw, 980, lift))
        cards.append(hero)
    # ---------- F/G: finale composition (19.6 - 25) ----------
    else:
        u = t - 19.6
        e = ease_io(u / 1.5)
        hero_from = dict(x=0, y=40, z=-110, rx=0, ry=0, rz=0, w=980, blur=0, dim=1)
        layers = [
            (64, hero_from, dict(x=-205, y=-235, z=720, rx=4, ry=10, rz=-6.5, w=960, blur=2.2, dim=0.62), 0.0),
            (71, dict(x=900, y=-420, z=900, rx=4, ry=-10, rz=8, w=960, blur=3, dim=0.6), dict(x=215, y=-190, z=780, rx=4, ry=-10, rz=6, w=960, blur=2.4, dim=0.58), 0.15),
            (63, dict(x=-900, y=700, z=900, rx=4, ry=10, rz=-8, w=960, blur=3, dim=0.6), dict(x=-200, y=200, z=640, rx=-3, ry=8, rz=5, w=960, blur=1.8, dim=0.66), 0.3),
            (82, dict(x=900, y=700, z=900, rx=4, ry=-10, rz=8, w=960, blur=3, dim=0.6), dict(x=200, y=235, z=600, rx=-3, ry=-8, rz=-5, w=960, blur=1.6, dim=0.7), 0.45),
        ]
        cards = []
        for n, a0, a1, d in layers:
            p = blend(a0, a1, ease_io((u - d) / 1.4))
            a = 1.0 if n == 64 else clamp01((u - d) / 0.4)
            cards.append(Card(n, a=a, **p))
        ue = ease_out5((u - 0.6) / 1.6)
        main = Card(11, x=0, y=lerp(1500, 0, ue), z=lerp(500, -40, ue), rx=lerp(-24, 0, ue), ry=0, rz=lerp(-4, 0, ue), w=990, a=clamp01((u - 0.6) / 0.3))
        hold = clamp01((u - 2.4) / 3.0)
        for cd in cards + [main]:
            cd.z -= 40 * hold  # slow push-in
        cards = sorted(cards, key=lambda cd: -cd.z) + [main]
    for cd in cards:
        draw_card(cv, cd)

    # ---------- typography ----------
    if t < 3.4:
        a = clamp01((t - 0.7) / 0.5) * clamp01((3.3 - t) / 0.35)
        e = ease_out(clamp01((t - 0.7) / 0.8))
        y = 330 + (1 - e) * 20
        w_ = text_img('BUSINESS SALES TEMPLATE', 'med', 30, 9)[0].shape[1]
        x0 = CX - (w_ + 30) / 2
        cv[int(y) + 13:int(y) + 27, int(x0):int(x0) + 14] = cv[int(y) + 13:int(y) + 27, int(x0):int(x0) + 14] * (1 - a) + LIME * a
        draw_text(cv, 'BUSINESS SALES TEMPLATE', 'med', 30, x0 + 30, y, a, track=9, anchor='l')
    if 3.2 <= t < 10.6:
        top_fade(cv, 480, 0.95 * clamp01((t - 3.6) / 0.6) * clamp01((10.6 - t) / 0.4), solid=120)
        caption(cv, '85+ Professional Slides', t, 3.9, 6.9, y=196, size=56)
        caption(cv, 'Editable Charts & Data', t, 7.0, 10.3, y=196, size=56)
    if 14.4 <= t < 18.2:
        top_fade(cv, 620, 0.97 * clamp01((t - 14.4) / 0.5) * clamp01((18.2 - t) / 0.4), solid=300)
        w1 = text_img('Built for Business', 'disp', 56, 0)[0].shape[1]
        caption(cv, 'Built for Business', t, 14.7, 18.1, y=190, size=56)
        caption(cv, 'Presentations', t, 14.85, 18.1, y=262, size=56, square=False, center_w=w1)
    if t >= 20.2:
        u = t - 20.2
        a1 = clamp01(u / 0.6); e1 = ease_out(clamp01(u / 0.9))
        draw_text(cv, 'BUSINESS SALES', 'disp', 98, CX, 232 + (1 - e1) * 30, a1, track=2)
        a2 = clamp01((u - 0.15) / 0.6); e2 = ease_out(clamp01((u - 0.15) / 0.9))
        draw_text(cv, 'TEMPLATE', 'disp', 98, CX, 342 + (1 - e2) * 30, a2, track=6, color='C6F432')
        a3 = clamp01((u - 1.3) / 0.6); e3 = ease_out(clamp01((u - 1.3) / 0.9))
        draw_text(cv, 'Build better presentations. Faster.', 'reg', 40, CX, 1462 + (1 - e3) * 18, a3, color='D5DBE3')
        a4 = clamp01((u - 1.9) / 0.6)
        lw_ = int(90 * ease_out(clamp01((u - 1.9) / 0.8)))
        if lw_ > 0:
            cv[1546:1550, int(CX - lw_ / 2):int(CX + lw_ / 2)] = cv[1546:1550, int(CX - lw_ / 2):int(CX + lw_ / 2)] * (1 - a4) + LIME * a4
    # fade in from navy / out at very end
    fi = clamp01(t / 0.35)
    if fi < 1: cv = cv * fi + BG * (1 - fi)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'stills':
        os.makedirs(os.path.join(HERE, 'stills'), exist_ok=True)
        for ts in sys.argv[2:]:
            cv2.imwrite(os.path.join(HERE, 'stills', f't{float(ts):05.2f}.png'), frame(float(ts)))
        sys.exit()
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'reel.mp4')
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    p = subprocess.Popen([ff, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                          '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2',
                          '-movflags', '+faststart', '-r', str(FPS), out], stdin=subprocess.PIPE)
    N = int(DUR * FPS)
    for i in range(N):
        p.stdin.write(frame(i / FPS).tobytes())
        if i % (FPS * 2) == 0: print(f'{i / FPS:5.1f}s', flush=True)
    p.stdin.close(); p.wait()
    print('wrote', out)
