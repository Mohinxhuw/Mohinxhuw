"""Vanta — Business Presentation Template 02: vertical promo reel (1080x1920).
Every slide image is a render of the real template. The motion comes from a small
3D compositor (perspective-projected cards, depth of field, contact shadows), plus
vector typography and brand elements. Timings follow the voiceover (tts/lines.json)."""
import os, sys, math, json, subprocess, functools
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1080, 1920
FPS = int(os.environ.get('FPS', 60))
DUR = 29.4
FOCAL = 2200.0
CX, CY = W / 2, H / 2
AR = 2160 / 3841

def hexbgr(h): return np.array([int(h[4:6], 16), int(h[2:4], 16), int(h[0:2], 16)], np.float32) / 255
DEEP, DEEP2, COBALT, CORAL = hexbgr('13246B'), hexbgr('1D3283'), hexbgr('2340C8'), hexbgr('FF6B4A')
IVORY, SKY, INK, WHITE, MIST, STONE, PEACH = hexbgr('F8F5EF'), hexbgr('B7C6F5'), hexbgr('1A1D23'), hexbgr('FFFFFF'), hexbgr('DCDFE6'), hexbgr('6B7080'), hexbgr('FFD3C4')

# ---------------- voiceover timeline ----------------
VO_START = [0.25, 3.05, 6.45, 10.2, 15.6, 20.3, 24.15]
T_SALES, T_FIN, T_STRAT, T_MKT, T_READY = 15.6, 16.28, 16.9, 17.55, 18.9
T_DASH, T_FUN, T_WAT, T_FC = 12.23, 12.61, 13.1, 13.95
T_ECHART, T_ECOL, T_EWORD, T_EFULL = 20.3, 21.17, 22.05, 22.55
T_SAVE, T_GET = 24.15, 26.19

# ---------------- easing ----------------
def clamp01(v): return max(0.0, min(1.0, v))
def ease_io(u): u = clamp01(u); return 4 * u ** 3 if u < .5 else 1 - (-2 * u + 2) ** 3 / 2
def ease_out(u): u = clamp01(u); return 1 - (1 - u) ** 3
def ease_out5(u): u = clamp01(u); return 1 - (1 - u) ** 5
def ease_in(u): u = clamp01(u); return u ** 3
def ease_back(u, s=1.4): u = clamp01(u); return 1 + (s + 1) * (u - 1) ** 3 + s * (u - 1) ** 2
def lerp(a, b, u): return a + (b - a) * u
def win(t, t0, t1, fi=0.35, fo=0.35): return clamp01((t - t0) / fi) * clamp01((t1 - t) / fo)
def blend(p, q, u): return {k: lerp(p[k], q.get(k, p[k]), u) for k in p}

# ---------------- textures ----------------
LEVELS = [3840, 2560, 1800, 1280, 900, 640, 450, 320]
@functools.lru_cache(maxsize=48)
def tex(n, lw):
    src = cv2.imread(os.path.join(HERE, 'slides', f's{n:02d}.png'), cv2.IMREAD_COLOR)[:2160, :3840]
    h = int(round(lw * AR))
    img = src if lw == 3840 else cv2.resize(src, (lw, h), interpolation=cv2.INTER_AREA)
    img = img.astype(np.float32) / 255
    m = np.zeros((h * 4, lw * 4), np.uint8)
    r = max(int(lw * 4 * 0.006), 2)
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
    def __init__(self, n, x=0, y=0, z=0, rx=0, ry=0, rz=0, w=960, a=1.0, blur=0.0, dim=1.0, shadow=1.0, tint=None):
        self.__dict__.update(locals()); del self.__dict__['self']

def pose(**k):
    d = dict(x=0, y=0, z=0, rx=0, ry=0, rz=0, w=960, a=1.0, blur=0.0, dim=1.0)
    d.update(k); return d

def draw_card(canvas, c, shadow_col=None):
    if c.a <= 0.003: return
    hw, hh = c.w / 2, c.w * AR / 2
    L = np.array([[-hw, -hh, 0], [hw, -hh, 0], [hw, hh, 0], [-hw, hh, 0]], np.float64)
    P = L @ rot(c.rx, c.ry, c.rz).T + np.array([c.x, c.y, c.z])
    dst, z = project(P)
    if np.any(z < 60): return
    x0, y0 = np.floor(dst.min(0)).astype(int) - 2
    x1, y1 = np.ceil(dst.max(0)).astype(int) + 2
    if x1 < 0 or y1 < 0 or x0 > W or y0 > H: return
    sw = max(np.linalg.norm(dst[1] - dst[0]), np.linalg.norm(dst[2] - dst[3]))
    lw = next((l for l in reversed(LEVELS) if l >= sw * 1.2), LEVELS[0])
    img, mask = tex(c.n, lw)
    h, w_ = mask.shape
    src = np.float32([[0, 0], [w_, 0], [w_, h], [0, h]])
    pad = int(50 + min(sw, 1400) * 0.07)
    bx0, by0, bx1, by1 = max(x0 - pad, 0), max(y0 - pad, 0), min(x1 + pad, W), min(y1 + pad * 2, H)
    if bx1 <= bx0 or by1 <= by0: return
    Hm = cv2.getPerspectiveTransform(src, np.float32(dst - [bx0, by0]))
    size = (bx1 - bx0, by1 - by0)
    m = cv2.warpPerspective(mask, Hm, size, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    if c.shadow > 0:
        sig = 12 + min(sw, 1400) * 0.035
        off = int(10 + min(sw, 1400) * 0.03)
        sh = cv2.GaussianBlur(m, (0, 0), sig)
        sh = np.roll(sh, off, axis=0); sh[:off] = 0
        k = 0.5 * c.shadow * c.a
        reg = canvas[by0:by1, bx0:bx1]
        reg *= (1 - k * sh)[..., None]
    rgb = cv2.warpPerspective(img, Hm, size, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)
    if c.dim != 1.0:
        rgb = rgb * c.dim + DEEP * (1 - c.dim)
    if c.blur > 0.25:
        pm = cv2.GaussianBlur(rgb * m[..., None], (0, 0), c.blur)
        m = cv2.GaussianBlur(m, (0, 0), c.blur)
        rgb = pm / np.maximum(m[..., None], 1e-4)
    a = (m * c.a)[..., None]
    reg = canvas[by0:by1, bx0:bx1]
    reg[:] = reg * (1 - a) + rgb * a

# ---------------- backgrounds ----------------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
def radial(cx, cy, s): return np.clip(1 - np.sqrt(((xx - cx) / W) ** 2 + ((yy - cy) / H) ** 2) * s, 0, 1)
g = radial(W * 0.5, H * 0.45, 1.5) ** 1.5
BG_COB = (DEEP[None, None] * (1 - g[..., None]) + (DEEP2 * 1.18)[None, None] * g[..., None]).astype(np.float32)
g2 = radial(W * 0.5, H * 0.35, 1.3) ** 2
BG_IV = (IVORY[None, None] * (0.965 + 0.035 * g2[..., None])).astype(np.float32)
RING_C = (540, 1010)
RINGS = [300, 520, 780, 1080, 1420]
del yy, xx

def orbit_layer(cv, t, a=1.0, cx=RING_C[0], cy=RING_C[1], scale=1.0):
    if a <= 0: return
    lay = np.zeros((H, W), np.float32)
    for r in RINGS:
        cv2.circle(lay, (int(cx), int(cy)), int(r * scale), 1.0, 2, lineType=cv2.LINE_AA)
    cv[:] = cv * (1 - (0.07 * a * lay)[..., None]) + SKY * (0.07 * a * lay)[..., None]
    for i, (r, sp, ph, rad, col) in enumerate([(520, 0.22, 0.6, 9, CORAL), (780, -0.15, 2.4, 7, SKY), (1080, 0.1, 4.1, 11, CORAL), (300, 0.35, 3.3, 6, SKY), (1420, -0.07, 1.2, 8, SKY)]):
        ang = ph + sp * t
        px, py = cx + r * scale * math.cos(ang), cy + r * scale * math.sin(ang)
        if -20 < px < W + 20 and -20 < py < H + 20:
            dot = np.zeros((rad * 4 + 4, rad * 4 + 4), np.float32)
            cv2.circle(dot, (rad * 2 + 2, rad * 2 + 2), rad, 1.0, -1, lineType=cv2.LINE_AA)
            stamp(cv, dot, px - rad * 2 - 2, py - rad * 2 - 2, col, a * (0.9 if col is CORAL else 0.5))

def stamp(cv, m, x, y, col, a):
    x, y = int(round(x)), int(round(y))
    h, w_ = m.shape
    x0, y0, x1, y1 = max(x, 0), max(y, 0), min(x + w_, W), min(y + h, H)
    if x1 <= x0 or y1 <= y0 or a <= 0: return
    mm = m[y0 - y:y1 - y, x0 - x:x1 - x][..., None] * a
    reg = cv[y0:y1, x0:x1]
    reg[:] = reg * (1 - mm) + col * mm

def gradient_band(cv, y0, y1, a, col=None, top=True):
    """Soft scrim behind type so it stays legible over moving slides."""
    if a <= 0: return
    col = DEEP if col is None else col
    n = y1 - y0
    ramp = np.ones(n, np.float32)
    k = min(int(n * 0.45), 170)
    if top: ramp[n - k:] = np.linspace(1, 0, k) ** 1.4
    else: ramp[:k] = np.linspace(0, 1, k) ** 1.4
    ramp *= a
    sl = cv[max(y0, 0):min(y1, H)]
    r = ramp[max(-y0, 0):max(-y0, 0) + sl.shape[0]][:, None, None]
    sl[:] = sl * (1 - r) + col * r

# ---------------- type ----------------
FONTS = {'serif': os.path.expanduser('~/.fonts/qa-georgia-400-normal.ttf'), 'serif-i': os.path.expanduser('~/.fonts/qa-georgia-400-italic.ttf'),
         'sans': '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf', 'sans-b': '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'}
@functools.lru_cache(maxsize=None)
def text_mask(s, font, size, track=0):
    f = ImageFont.truetype(FONTS[font], size)
    widths = [f.getlength(ch) for ch in s]
    tw = int(sum(widths) + track * max(len(s) - 1, 0)) + 16
    asc, desc = f.getmetrics()
    im = Image.new('L', (tw, asc + desc + 16), 0)
    d = ImageDraw.Draw(im); x = 8
    if track == 0:
        d.text((8, 8), s, font=f, fill=255)
    else:
        for ch, wd in zip(s, widths):
            d.text((x, 8), ch, font=f, fill=255); x += wd + track
    return np.asarray(im, np.float32) / 255

def tw(s, font, size, track=0): return text_mask(s, font, size, track).shape[1] - 16

def text(cv, s, font, size, x, y, col=WHITE, a=1.0, track=0, anchor='c', clip=None):
    """Draw text; y = top of the text box. anchor c/l/r. clip=(y0,y1) masks a reveal window."""
    if a <= 0.003 or not s: return
    m = text_mask(s, font, size, track)
    if clip is not None:
        m = m.copy()
        c0, c1 = int(clip[0] - y), int(clip[1] - y)
        m[:max(c0, 0)] = 0; m[max(c1, 0):] = 0
    w_ = m.shape[1] - 16
    xx = x - w_ / 2 if anchor == 'c' else (x if anchor == 'l' else x - w_)
    stamp(cv, m, xx - 8, y - 8, col, a)

def rise(t, t0, dur=0.55, dist=28):
    e = ease_out(clamp01((t - t0) / dur)); return clamp01((t - t0) / (dur * 0.7)), (1 - e) * dist

def pill(cv, x, y, w_, h, col, a=1.0):
    m = np.zeros((h * 2, w_ * 2), np.uint8)
    r = h
    cv2.rectangle(m, (r, 0), (w_ * 2 - r, h * 2 - 1), 255, -1)
    cv2.circle(m, (r, r), r, 255, -1); cv2.circle(m, (w_ * 2 - r, r), r, 255, -1)
    mm = cv2.resize(m, (w_, h), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
    stamp(cv, mm, x, y, col, a)

def dot(cv, x, y, r, col, a=1.0):
    m = np.zeros((r * 2 + 4, r * 2 + 4), np.float32)
    cv2.circle(m, (r + 2, r + 2), r, 1.0, -1, lineType=cv2.LINE_AA)
    stamp(cv, m, x - r - 2, y - r - 2, col, a)

def eyebrow(cv, s, x, y, a, col=SKY, anchor='c'):
    w_ = tw(s, 'sans-b', 24, 7) + 26
    x0 = x - w_ / 2 if anchor == 'c' else x
    dot(cv, int(x0 + 6), int(y + 15), 6, CORAL, a)
    text(cv, s, 'sans-b', 24, x0 + 26, y, col, a, 7, anchor='l')

# ---------------- scenes ----------------
DRUM = [1, 5, 9, 12, 14, 21, 25, 32, 36, 39, 47, 52, 53, 58, 23, 56]
DR, DSTEP = 1150.0, None
DW = 820
DSTEP = (DW * AR + 54) / DR
DRUM_END = 14  # slide 23 ends in front
def drum_theta(t):
    # front index advances from 0 to DRUM_END between 6.55 and 10.0
    u = clamp01((t - 6.55) / 3.45)
    e = (u * u * (3 - 2 * u)) * 0.85 + u * 0.15
    return -e * DRUM_END * DSTEP

def drum_cards(t, y0=190, extra_z=0, dimall=1.0, blur_add=0.0, alpha=1.0, skip=None, intro=1.0):
    th = drum_theta(t)
    out = []
    for k, n in enumerate(DRUM):
        if n == skip: continue
        phi = k * DSTEP + th
        phi = (phi + math.pi) % (2 * math.pi) - math.pi
        c = math.cos(phi)
        if c < 0.12: continue
        r = DR if n == 1 else DR * (0.55 + 0.45 * intro)
        out.append(Card(n, x=0, y=y0 + r * math.sin(phi), z=r - r * c + extra_z, rx=math.degrees(phi), w=DW,
                        dim=(0.55 + 0.45 * c ** 2.2) * dimall, blur=(1 - c) * 6 + blur_add, a=alpha * clamp01((c - 0.12) / 0.25), shadow=0.6))
    return out

def frame(t):
    cards = []
    post = []  # overlay draw calls after cards
    # ---- background: ivory hook, cobalt circle wipe from 2.85 ----
    wipe = ease_in(clamp01((t - 2.8) / 0.75)) * 2300
    if wipe <= 1:
        cv = BG_IV.copy()
    elif wipe >= 2250:
        cv = BG_COB.copy()
    else:
        cv = BG_IV.copy()
        m = np.zeros((H, W), np.uint8)
        cv2.circle(m, (540, 1110), int(wipe), 255, -1, lineType=cv2.LINE_AA)
        mm = (m.astype(np.float32) / 255)[..., None]
        cv = cv * (1 - mm) + BG_COB * mm
    ring_a = clamp01((t - 3.2) / 0.8)
    # rings drift; scale breathes with sections
    if ring_a > 0 and t < 24.0:
        orbit_layer(cv, t, ring_a * (1 - clamp01((t - 23.4) / 0.6)), scale=1.0 + 0.04 * math.sin(t * 0.4))

    # ================= S1 HOOK (0 - 3.2) =================
    if t < 3.25:
        e = ease_out5(t / 1.45)
        w_ = lerp(3500, 900, e)
        fu, fv = 0.30, 0.66       # focus on the dashboard line chart
        fx = lerp(-(fu - 0.5) * 3500, 0, e)
        fy = lerp(-(fv - 0.5) * 3500 * AR + 40, 0, e)
        rx_, ry_, rz_ = lerp(0, 9, e), lerp(0, -16, e), lerp(0, 2.2, e)
        cy_ = 210
        ex = ease_in(clamp01((t - 2.62) / 0.6))
        A = Card(19, x=fx + 0 * ex, y=cy_ + fy - 0 * ex, z=1300 * ex, rx=rx_, ry=ry_ + 20 * ex, rz=rz_, w=w_, a=1 - clamp01((t - 2.95) / 0.25), shadow=1.0)
        eb = ease_out5((t - 0.75) / 1.1)
        B = Card(23, x=lerp(-1500, -250, eb) - 1400 * ex, y=cy_ - 250, z=520, rx=7, ry=24, rz=-3, w=860, dim=0.9, blur=1.5 + 3 * ex, shadow=0.8)
        ec = ease_out5((t - 0.95) / 1.1)
        Cc = Card(42, x=lerp(1500, 260, ec) + 1400 * ex, y=cy_ + 290, z=600, rx=7, ry=-24, rz=3, w=860, dim=0.9, blur=1.8 + 3 * ex, shadow=0.8)
        if t > 0.75: cards.append(B)
        if t > 0.95: cards.append(Cc)
        cards.append(A)

        def hook_text(cv):
            fade = 1 - clamp01((t - 2.75) / 0.3)
            for s, font, y, t0, col in [('Stop building', 'serif', 300, 0.25, INK), ('presentations', 'serif', 392, 0.62, INK), ('from scratch.', 'serif-i', 484, 1.9, CORAL)]:
                a, dy = rise(t, t0, 0.5, 34)
                text(cv, s, font, 92, CX, y + dy, col, a * fade)
        post.append(hook_text)

    # ================= S2 BRAND (3.0 - 6.6) =================
    if 2.95 <= t < 6.95:
        u = t - 2.95
        e = ease_out5(u / 1.35)
        p = pose(x=0, y=lerp(700, -40, e), z=lerp(1900, 0, e), rx=lerp(-38, 0, e), ry=lerp(0, 2.5, e), rz=lerp(-6, 0, e), w=980, a=clamp01(u / 0.3))
        drift = clamp01((t - 4.3) / 2.2)
        p['ry'] = lerp(p['ry'], -2.5, ease_io(drift)); p['w'] = 980 * (1 + 0.035 * drift)
        # hand-off into the drum (6.35 - 6.95)
        h_ = ease_io((t - 6.35) / 0.6)
        if h_ > 0:
            th = drum_theta(t)
            p = blend(p, pose(x=0, y=190 + DR * math.sin(th), z=DR - DR * math.cos(th), rx=math.degrees(th), ry=0, rz=0, w=DW), h_)
        if t < 6.95:
            cards.append(Card(1, **p))

        def brand_text(cv):
            fade = 1 - clamp01((t - 6.1) / 0.3)
            a1, d1 = rise(t, 3.45, 0.55, 22)
            text(cv, 'V A N T A', 'sans-b', 40, CX, 1290 + d1, WHITE, a1 * fade, 4)
            a2, d2 = rise(t, 4.15, 0.6, 26)
            text(cv, 'Business Presentation', 'serif', 72, CX, 1370 + d2, WHITE, a2 * fade)
            a3, d3 = rise(t, 4.85, 0.6, 26)
            text(cv, 'Template 02', 'serif-i', 72, CX, 1460 + d3, CORAL, a3 * fade)
        post.append(brand_text)

    # ================= S3 DRUM / 60 SLIDES (6.55 - 10.6) =================
    if 6.55 <= t < 10.9:
        intro = ease_out(clamp01((t - 6.55) / 0.8))
        rec = ease_in(clamp01((t - 9.95) / 0.8))
        dc = drum_cards(t, extra_z=1500 * rec, blur_add=4 * rec, alpha=1 - clamp01((t - 10.35) / 0.4), intro=intro,
                        skip=23 if t >= 9.95 else None)
        if t < 6.95:
            dc = [c for c in dc if c.n != 1]
        # non-front cards appear progressively during the intro
        for c in dc:
            if c.n != 1: c.a *= intro
        dc = sorted(dc, key=lambda c: -c.z)
        cards[:0] = dc  # drum sits behind the cover during the hand-off

        def drum_text(cv):
            fade = 1 - clamp01((t - 9.75) / 0.35)
            gradient_band(cv, 0, 820, 0.97 * clamp01((t - 6.55) / 0.4) * fade)
            cnt = int(round(60 * ease_out(clamp01((t - 6.6) / 0.8))))
            a, d = rise(t, 6.6, 0.45, 20)
            text(cv, str(cnt), 'serif', 250, CX, 205 + d, WHITE, a * fade)
            a2, d2 = rise(t, 6.95, 0.5, 20)
            text(cv, 'PREMIUM SLIDES', 'sans-b', 30, CX, 495 + d2, CORAL, a2 * fade, 9)
            a3, d3 = rise(t, 8.3, 0.55, 20)
            text(cv, 'Designed for real business.', 'serif-i', 50, CX, 560 + d3, SKY, a3 * fade)
        post.append(drum_text)

    # ================= S4 CHARTS (9.95 - 15.75) =================
    if 9.95 <= t < 16.3:
        # 23 lifts out of the drum, then the camera pushes into its chart
        lift = ease_io((t - 9.95) / 0.75)
        p = blend(pose(x=0, y=190, z=0, w=DW), pose(x=0, y=60, z=-200, w=1000, ry=-4, rx=3), lift)
        push = ease_io((t - 10.75) / 1.25)
        fu, fv, zw = 0.36, 0.62, 1850
        p = blend(p, pose(x=-(fu - 0.5) * zw, y=-(fv - 0.5) * zw * AR + 290, z=-200, w=zw, ry=0, rx=0), push)
        back = ease_io((t - 11.72) / 0.5)
        if back > 0:
            p = blend(p, pose(x=-330, y=-40, z=750, w=1000, ry=22, rx=4, dim=0.6, blur=3.5), back)
            p['a'] = 1 - clamp01((t - 12.5) / 0.3)
        if t < 12.9: cards.append(Card(23, **p))
        # montage: each beat brings a slide to the front on alternating sides
        beats = [(T_DASH, 19, 1), (T_FUN, 29, -1), (T_WAT, 42, 1), (T_FC, 33, -1)]
        front = pose(x=0, y=40, z=-60, w=980, ry=0, rx=0)
        for i, (tb, n, sd) in enumerate(beats):
            if t < tb - 0.32: continue
            ent = ease_out5((t - (tb - 0.32)) / 0.55)
            p = blend(pose(x=sd * 1250, y=40 + 180 * sd, z=600, ry=-sd * 34, rx=6, w=980, a=1.0), front, ent)
            p['ry'] = lerp(-sd * 34, -sd * 5, ent)
            nxt = beats[i + 1][0] if i + 1 < len(beats) else 99
            back = ease_io((t - (nxt - 0.32)) / 0.5)
            if back > 0:
                p = blend(p, pose(x=sd * 330, y=-60 - 40 * i, z=760, w=980, ry=-sd * 22, rx=4, dim=0.55, blur=3.6), back)
                p['a'] = 1 - clamp01((t - (nxt + 0.6)) / 0.3)
            if i == 3:  # final forecast slide: slow push into the chart, then lift to the section stack
                hold = ease_io((t - 14.3) / 1.2)
                p['w'] = lerp(p['w'], 1180, hold); p['y'] = lerp(p['y'], 120, hold); p['x'] = lerp(p['x'], 70, hold)
                ex = ease_in((t - 15.3) / 0.5)
                p['y'] -= 2300 * ex; p['z'] += 400 * ex; p['rx'] = p['rx'] + 18 * ex
            cards.append(Card(n, **p))

        def chart_text(cv):
            # "42 editable charts"
            f1 = win(t, 10.25, 12.15, 0.3, 0.3)
            if f1 > 0:
                gradient_band(cv, 0, 800, 0.97 * f1)
                a, d = rise(t, 10.25, 0.5, 22)
                text(cv, '42', 'serif', 220, CX, 205 + d, WHITE, a * f1)
                a2, d2 = rise(t, 10.75, 0.5, 20)
                text(cv, 'NATIVE, EDITABLE CHARTS', 'sans-b', 30, CX, 470 + d2, CORAL, a2 * f1, 8)
            # chart vocabulary list builds line by line
            f2 = win(t, 12.1, 15.3, 0.2, 0.35)
            if f2 > 0:
                gradient_band(cv, 0, 650, 0.95 * f2)
                words = [('Dashboards.', T_DASH), ('Funnels.', T_FUN), ('Waterfalls.', T_WAT), ('Forecasts.', T_FC)]
                for i, (s, tb) in enumerate(words):
                    a, d = rise(t, tb - 0.05, 0.35, 24)
                    active = (t < words[i + 1][1] - 0.05) if i < 3 else True
                    text(cv, s, 'serif-i' if active else 'serif', 70, CX, 215 + i * 92 + d, CORAL if active else WHITE, a * f2 * (1 if active else 0.85))
        post.append(chart_text)

    # ================= S5 COVERAGE STACK (15.3 - 20.4) =================
    if 15.3 <= t < 20.6:
        rows = [(30, 'SALES', T_SALES, -1), (41, 'FINANCE', T_FIN, 1), (46, 'STRATEGY', T_STRAT, -1), (17, 'MARKET ANALYSIS', T_MKT, 1)]
        ys = [-525, -175, 175, 525]
        pile = ease_io((t - T_READY) / 0.75)
        out = ease_io((t - 20.05) / 0.45)
        st = []
        for i, (n, lab, tb, sd) in enumerate(rows):
            e = ease_out5((t - (tb - 0.18)) / 0.6)
            if t < tb - 0.18: continue
            p = blend(pose(x=sd * 1300, y=ys[i] + 60, z=300, ry=sd * 30, rz=sd * 4, w=860), pose(x=sd * -28, y=ys[i], z=-i * 12, ry=sd * 7, rz=sd * -1.4, w=860), e)
            pl = pose(x=sd * 18 - 10 + i * 6, y=-30 - i * 22, z=60 - i * 30, rx=10, ry=-14, rz=-3 + i * 1.5, w=900)
            p = blend(p, pl, pile)
            if out > 0 and i < 3:
                p = blend(p, pose(x=pl['x'] + sd * 120, y=pl['y'] - 80, z=900, rx=10, ry=-14, rz=pl['rz'], w=900, dim=0.5, blur=4), out)
                p['a'] = 1 - out
            st.append((Card(n, shadow=0.9, **p), lab, i, p))
        cards += [c for c, *_ in st]

        def stack_text(cv):
            fade = 1 - pile
            for c, lab, i, p in st:
                a = clamp01((t - rows[i][2]) / 0.25) * fade
                if a <= 0: continue
                # chip pinned to the card's top-left corner (cards are near-frontal here)
                hw = c.w / 2
                sx = CX + (p['x'] - hw + 30) * FOCAL / (FOCAL + p['z'])
                sy = CY + (p['y'] - hw * AR) * FOCAL / (FOCAL + p['z']) - 23
                wpx = tw(lab, 'sans-b', 24, 5) + 44
                pill(cv, int(sx), int(sy), int(wpx), 46, CORAL, a)
                text(cv, lab, 'sans-b', 24, sx + 22, sy + 9, WHITE, a, 5, anchor='l')
            a, d = rise(t, T_READY + 0.15, 0.6, 22)
            f = 1 - clamp01((t - 20.0) / 0.3)
            text(cv, 'Ready when you are.', 'serif-i', 66, CX, 1330 + d, WHITE, a * f)
        post.append(stack_text)

    # ================= S6 EDITABLE (19.95 - 24.4) =================
    if 19.95 <= t < 24.6:
        e = ease_out5((t - 19.95) / 0.8)
        p = pose(x=lerp(0, 0, e), y=lerp(-60, -40, e), z=lerp(60, 0, e), rx=lerp(10, 0, e), ry=lerp(-14, 0, e), rz=lerp(-3, 0, e), w=lerp(900, 980, e), a=clamp01((t - 19.95) / 0.25))
        # every chart: push into a gauge
        zin = ease_io((t - 20.35) / 0.55) * (1 - ease_io((t - 21.0) / 0.5))
        fu, fv, zw = 0.5, 0.33, 2050
        p = blend(p, pose(x=-(fu - 0.5) * zw, y=-(fv - 0.5) * zw * AR - 40, z=0, w=zw), zin)
        # every colour: slide lifts a little to make room for the swatches
        lift = ease_io((t - 21.05) / 0.5)
        p['y'] -= 70 * lift
        ex = ease_io((t - 23.85) / 0.6)
        if ex > 0:
            p = blend(p, pose(x=0, y=-20, z=1300, w=980, dim=0.5, blur=4), ex)
            p['a'] = 1 - ex
        cards.append(Card(20, **p))

        def edit_text(cv):
            fade = 1 - clamp01((t - 23.75) / 0.35)
            # slot-machine word: Every chart / colour / word
            a0 = clamp01((t - 20.3) / 0.3) * fade * (1 - clamp01((t - T_EFULL) / 0.25))
            if a0 > 0:
                gradient_band(cv, 0, 560, 0.9 * a0)
                wds = [('chart.', T_ECHART), ('colour.', T_ECOL), ('word.', T_EWORD)]
                wE = tw('Every ', 'serif', 86)
                wmax = max(tw(s, 'serif-i', 86) for s, _ in wds)
                x0 = CX - (wE + wmax) / 2
                text(cv, 'Every', 'serif', 86, x0, 300, WHITE, a0, anchor='l')
                for i, (s, tb) in enumerate(wds):
                    nt = wds[i + 1][1] if i < 2 else 99
                    # shared curve keeps incoming/outgoing words exactly one slot apart
                    ein = ease_io(clamp01((t - tb) / 0.32)) if i else 1.0; eout = ease_io(clamp01((t - nt) / 0.32))
                    if ein <= 0 or eout >= 1: continue
                    yy_ = 300 + 110 * (1 - ein) - 110 * eout
                    text(cv, s, 'serif-i', 86, x0 + wE, yy_, CORAL, a0, anchor='l', clip=(296, 420))
            # "Fully editable." with a text cursor
            a1, d1 = rise(t, T_EFULL, 0.45, 22)
            if a1 > 0:
                gradient_band(cv, 0, 560, 0.9 * a1 * fade)
                s = 'Fully editable.'
                n = int(len(s) * clamp01((t - T_EFULL) / 0.55))
                full_w = tw(s, 'serif', 86)
                x0 = CX - full_w / 2
                text(cv, s[:n], 'serif', 86, x0, 300, WHITE, a1 * fade, anchor='l')
                cx_ = x0 + (tw(s[:n], 'serif', 86) if n else 0) + 8
                if int(t * 2.4) % 2 == 0 or t < T_EFULL + 0.6:
                    cv[318:410, int(cx_):int(cx_) + 5] = cv[318:410, int(cx_):int(cx_) + 5] * (1 - a1 * fade) + CORAL * a1 * fade
            # theme colour swatches pop out of the slide
            sw = [CORAL, COBALT, DEEP, SKY, PEACH, MIST, STONE, IVORY, INK, WHITE]
            for i, col in enumerate(sw):
                es = ease_back((t - (T_ECOL + 0.05 + i * 0.05)) / 0.45)
                if t < T_ECOL + 0.05 + i * 0.05: continue
                tx = CX + (i - 4.5) * 92
                sx = lerp(CX + (i - 4.5) * 30, tx, es)
                sy = lerp(960, 1335, es)
                dot(cv, int(sx), int(sy), 34, WHITE, 0.25 * fade)
                dot(cv, int(sx), int(sy), 31, col, fade)
            if t > T_ECOL + 0.3:
                a, d = rise(t, T_ECOL + 0.45, 0.5, 14)
                text(cv, 'THEME COLOURS · THEME FONTS · NATIVE CHARTS', 'sans-b', 22, CX, 1410 + d, SKY, a * fade, 4)
        post.append(edit_text)

    # ================= S7 GALLERY + CTA (23.9 - end) =================
    if t >= 23.9:
        u = t - 23.9
        gal = [[53, 25, 39, 14, 47, 12], [36, 21, 56, 5, 32, 58], [9, 52, 30, 38, 48, 43]]
        R_ = 1900.0
        form = ease_out5(u / 1.5)
        yaw = 10 - 9 * ease_io(u / 5.5)
        endc = ease_io((t - 25.95) / 0.9)
        lst = []
        for r, row in enumerate(gal):
            for k, n in enumerate(row):
                ang = (k - 2.5) * 23 + yaw + (6 if r == 1 else 0)
                a_ = math.radians(ang)
                x = R_ * math.sin(a_) * lerp(1.8, 1, form)
                z = R_ - R_ * math.cos(a_) + lerp(1500, 0, form) + 350
                y = (r - 1) * 560 + lerp((r - 1) * 600, 0, form)
                c = math.cos(a_)
                if c < 0.2: continue
                lst.append(Card(n, x=x, y=y, z=z, ry=-ang, w=860, dim=(0.75 + 0.25 * c) * lerp(1, 0.42, endc), blur=lerp(0.5, 5, endc) + (1 - c) * 3,
                                a=clamp01(u / 0.4) * clamp01((c - 0.2) / 0.2), shadow=0.7))
        cards += sorted(lst, key=lambda c: -c.z)
        # end card: the cover rises to the front
        ec = ease_out5((t - 25.95) / 1.0)
        if t > 25.95:
            hold = clamp01((t - 27.0) / 2.4)
            cards.append(Card(1, x=0, y=lerp(900, 75, ec), z=lerp(700, -40 - 40 * hold, ec), rx=lerp(-28, 0, ec), w=880, a=clamp01((t - 25.95) / 0.25), shadow=1.0))

        def cta_text(cv):
            f = win(t, 24.2, 25.95, 0.3, 0.3)
            if f > 0:
                vign = 0.5 * f
                cv[:] = cv * (1 - vign) + DEEP * vign
                band = np.exp(-((np.arange(H, dtype=np.float32) - 930) / 260) ** 2)[:, None, None] * 0.6 * f
                cv[:] = cv * (1 - band) + DEEP * band
                a, d = rise(t, 24.2, 0.55, 26)
                text(cv, 'Save hours', 'serif', 120, CX, 780 + d, WHITE, a * f)
                a2, d2 = rise(t, 24.75, 0.55, 26)
                text(cv, 'on every deck.', 'serif-i', 96, CX, 925 + d2, CORAL, a2 * f)
            if t > 25.95:
                gradient_band(cv, 0, 640, 0.9 * clamp01((t - 25.95) / 0.4))
                a, d = rise(t, 26.05, 0.5, 20)
                text(cv, 'V A N T A', 'sans-b', 36, CX, 260 + d, WHITE, a, 4)
                a2, d2 = rise(t, 26.25, 0.55, 22)
                text(cv, 'Business Presentation', 'serif', 72, CX, 330 + d2, WHITE, a2)
                a3, d3 = rise(t, 26.45, 0.55, 22)
                text(cv, 'Template 02', 'serif-i', 72, CX, 420 + d3, CORAL, a3)
                a4, d4 = rise(t, 26.85, 0.5, 18)
                gradient_band(cv, 1180, 1920, 0.9 * a4, top=False)
                text(cv, '60 SLIDES  ·  42 EDITABLE CHARTS  ·  16:9', 'sans-b', 26, CX, 1272 + d4, SKY, a4, 4)
                a5, d5 = rise(t, 27.05, 0.5, 18)
                bw, bh = 520, 104
                pill(cv, int(CX - bw / 2), int(1340 + d5), bw, bh, CORAL, a5)
                text(cv, 'Get the template', 'sans-b', 40, CX, 1368 + d5, WHITE, a5)
                a6, d6 = rise(t, 27.35, 0.5, 14)
                text(cv, 'Link in bio', 'sans', 30, CX, 1476 + d6, SKY, a6)
        post.append(cta_text)

    for c in cards:
        draw_card(cv, c)
    for fn in post:
        fn(cv)
    # fades
    fi = clamp01(t / 0.12)
    if fi < 1: cv = cv * fi + BG_IV * (1 - fi)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

def render_range(args):
    i0, i1 = args
    return [frame(i / FPS).tobytes() for i in range(i0, i1)]

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'stills':
        os.makedirs(os.path.join(HERE, 'stills'), exist_ok=True)
        for ts in sys.argv[2:]:
            cv2.imwrite(os.path.join(HERE, 'stills', f't{float(ts):05.2f}.png'), frame(float(ts)))
        sys.exit()
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'video.mp4')
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    p = subprocess.Popen([ff, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                          '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2',
                          '-movflags', '+faststart', '-r', str(FPS), out], stdin=subprocess.PIPE)
    N = int(round(DUR * FPS))
    from multiprocessing import Pool
    chunks = [(i, min(i + 30, N)) for i in range(0, N, 30)]
    with Pool(int(os.environ.get('JOBS', 4))) as pool:
        for k, frames in enumerate(pool.imap(render_range, chunks)):
            for fb in frames: p.stdin.write(fb)
            if k % 4 == 0: print(f'{chunks[k][1] / FPS:5.1f}s', flush=True)
    p.stdin.close(); p.wait()
    print('wrote', out)
