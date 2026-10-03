"""Business Presentation Pro (Vanta Template 02) — two 9:16 TikTok/Reels ads.
Every slide image is a render of the real template (reel2/slides/sNN.png, 3840 px).
Built on the 3D card compositor in reel2.py (perspective cards, depth of field, shadows).

usage: python3 ads.py ad1|ad2 stills t1 t2 ...   |   python3 ads.py ad1|ad2 render out.mp4
"""
import os, sys, math, json, subprocess, functools
import numpy as np, cv2
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', 'reel2')); sys.path.insert(0, os.path.join(HERE, '..', 'vanta02'))  # compositor: promo/vanta02/reel2.py
import reel2 as R
from reel2 import (Card, pose, blend, clamp01, ease_io, ease_out, ease_out5, ease_in, ease_back, lerp, win, rise,
                   text, text_mask, tw, stamp, pill, dot, gradient_band, W, H, CX, CY, AR, FOCAL,
                   DEEP, DEEP2, COBALT, CORAL, IVORY, SKY, INK, WHITE, MIST, STONE, PEACH, hexbgr)

FPS = int(os.environ.get('FPS', 60))
GREY = hexbgr('9AA0AE'); LGREY = hexbgr('EEEFF3'); NIGHT = hexbgr('070C2A'); CORALD = hexbgr('D9482A')

# ---------- textures: real slides, plus a blank slide and vertically mirrored reflections ----------
_orig_tex = R.tex
@functools.lru_cache(maxsize=64)
def tex(n, lw):
    if n == 'blank':
        h = int(round(lw * AR))
        img = np.ones((h, lw, 3), np.float32)
        _, m = _orig_tex(1, lw)
        return img, m
    if isinstance(n, str) and n.startswith('R'):
        img, m = _orig_tex(int(n[1:]), lw)
        h = m.shape[0]
        ramp = np.clip(1 - np.arange(h, dtype=np.float32) / (h * 0.55), 0, 1) ** 1.6 * 0.30
        return img[::-1].copy(), (m[::-1] * ramp[:, None]).astype(np.float32)
    return _orig_tex(n, lw)
R.tex = tex

def card_rect(x, y, w):
    """Screen rect of a frontal card at z=0."""
    h = w * AR
    return CX + x - w / 2, CY + y - h / 2, w, h

def reflect(c, gap=14):
    """Mirror a near-frontal card below itself (floor reflection)."""
    h = c.w * AR
    return Card('R%d' % c.n, x=c.x, y=c.y + h + gap, z=c.z, rx=-c.rx, ry=c.ry, rz=-c.rz, w=c.w, a=c.a, blur=c.blur + 1.5, dim=c.dim, shadow=0)

# ---------- type helpers ----------
@functools.lru_cache(maxsize=512)
def scaled_mask(s, font, size, track, sc100):
    m = text_mask(s, font, size, track)
    if sc100 == 100: return m
    sc = sc100 / 100
    return cv2.resize(m, (max(1, int(m.shape[1] * sc)), max(1, int(m.shape[0] * sc))), interpolation=cv2.INTER_AREA if sc < 1 else cv2.INTER_LINEAR)

def pop(cv, s, font, size, cx, y, t, t0, col, a=1.0, track=0, dur=0.22, from_sc=1.14):
    """Word pops in: scale from_sc -> 1 with a quick fade. y is the top of the line at scale 1."""
    u = clamp01((t - t0) / dur)
    if u <= 0 or a <= 0: return
    sc = lerp(from_sc, 1.0, ease_out(u))
    m = scaled_mask(s, font, size, track, int(round(sc * 100)))
    base = text_mask(s, font, size, track)
    stamp(cv, m, cx - m.shape[1] / 2, y + base.shape[0] / 2 - m.shape[0] / 2 - 8, col, a * clamp01(u * 2.2))

def words_line(cv, words, font, size, cx, y, t, cols, a=1.0, gap=None):
    """A centred line of words, each popping in at its own time. words = [(word, t0), ...]."""
    gap = gap if gap is not None else size * 0.28
    ws = [tw(w_, font, size) for w_, _ in words]
    x = cx - (sum(ws) + gap * (len(words) - 1)) / 2
    for (w_, t0), ww, col in zip(words, ws, cols):
        pop(cv, w_, font, size, x + ww / 2, y, t, t0, col, a)
        x += ww + gap

def scrim(cv, y0, y1, a, col):
    if a > 0: gradient_band(cv, y0, y1, a, col)

def arrow_cursor(cv, x, y, a=1.0, sc=1.0):
    pts = np.array([[0, 0], [0, 34], [9, 26], [16, 41], [22, 38], [15, 24], [27, 24]], np.float32) * sc
    big = np.zeros((int(60 * sc) + 8, int(40 * sc) + 8), np.float32)
    cv2.fillPoly(big, [(pts + 4).astype(np.int32)], 1.0, lineType=cv2.LINE_AA)
    out = cv2.dilate(big, np.ones((5, 5), np.uint8))
    stamp(cv, out, x - 4, y - 4, WHITE, a)
    stamp(cv, big, x - 4, y - 4, INK, a)

def rect(cv, x0, y0, x1, y1, col, a=1.0, fill=None, lw=3, dash=False):
    x0, y0, x1, y1 = map(int, (x0, y0, x1, y1))
    if fill is not None:
        X0, Y0, X1, Y1 = max(x0, 0), max(y0, 0), min(x1, W), min(y1, H)
        if X1 > X0 and Y1 > Y0:
            cv[Y0:Y1, X0:X1] = cv[Y0:Y1, X0:X1] * (1 - a) + fill * a
    if lw:
        m = np.zeros((H, W), np.uint8)
        if dash:
            for (ax, ay, bx, by) in [(x0, y0, x1, y0), (x1, y0, x1, y1), (x1, y1, x0, y1), (x0, y1, x0, y0)]:
                L = max(abs(bx - ax), abs(by - ay)); n = max(L // 18, 1)
                for k in range(0, n, 2):
                    p0 = (int(ax + (bx - ax) * k / n), int(ay + (by - ay) * k / n)); p1 = (int(ax + (bx - ax) * (k + 1) / n), int(ay + (by - ay) * (k + 1) / n))
                    cv2.line(m, p0, p1, 255, lw)
        else:
            cv2.rectangle(m, (x0, y0), (x1, y1), 255, lw)
        mm = (m.astype(np.float32) / 255)[..., None] * a
        cv[:] = cv * (1 - mm) + col * mm

def hline(cv, x0, x1, y, col, a, lw=2, dash=True):
    m = np.zeros((H, W), np.uint8)
    if dash:
        for xx in range(int(x0), int(x1), 22): cv2.line(m, (xx, int(y)), (min(xx + 12, int(x1)), int(y)), 255, lw)
    else: cv2.line(m, (int(x0), int(y)), (int(x1), int(y)), 255, lw)
    mm = (m.astype(np.float32) / 255)[..., None] * a
    cv[:] = cv * (1 - mm) + col * mm

def vline(cv, x, y0, y1, col, a, lw=2):
    m = np.zeros((H, W), np.uint8)
    for yy in range(int(y0), int(y1), 22): cv2.line(m, (int(x), yy), (int(x), min(yy + 12, int(y1))), 255, lw)
    mm = (m.astype(np.float32) / 255)[..., None] * a
    cv[:] = cv * (1 - mm) + col * mm

def button(cv, label, cx, y, a, w_=560, h=108, col=CORAL, tcol=INK):
    if a <= 0: return
    pill(cv, int(cx - w_ / 2), int(y), w_, h, col, a)
    text(cv, label, 'sans-b', 38, cx, y + (h - 46) / 2 - 2, tcol, a, 3)

# ---------- backgrounds ----------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
_g = np.clip(1 - np.sqrt(((xx - W * .5) / W) ** 2 + ((yy - H * .42) / H) ** 2) * 1.35, 0, 1) ** 1.8
BG1 = (IVORY[None, None] * (0.955 + 0.045 * _g[..., None])).astype(np.float32)
_s = np.clip(1 - np.sqrt(((xx - W * .5) / (W * 1.05)) ** 2 + ((yy - H * .47) / (H * .55)) ** 2), 0, 1) ** 2.2
BG2 = (NIGHT[None, None] * (1 - _s[..., None]) + (DEEP * 1.05)[None, None] * _s[..., None]).astype(np.float32)
_h = np.clip((yy - H * 0.60) / (H * 0.4), 0, 1)
BG2 = (BG2 * (1 - 0.35 * _h[..., None])).astype(np.float32)
del yy, xx

def circle_wipe(cv, other, cx, cy, r):
    if r <= 0: return cv
    m = np.zeros((H, W), np.uint8)
    cv2.circle(m, (int(cx), int(cy)), int(r), 255, -1, lineType=cv2.LINE_AA)
    mm = (m.astype(np.float32) / 255)[..., None]
    return cv * (1 - mm) + other * mm

def light_sweep(cv, t, t0, t1, x_from=-500, x_to=1600, width=260, a=0.10):
    u = clamp01((t - t0) / (t1 - t0))
    if u <= 0 or u >= 1: return
    cxp = lerp(x_from, x_to, ease_io(u))
    ys = np.arange(H, dtype=np.float32)[:, None]; xs = np.arange(W, dtype=np.float32)[None, :]
    d = (xs - cxp) + (ys - H / 2) * 0.35
    band = np.exp(-(d / width) ** 2) * a * math.sin(math.pi * u)
    cv += band[..., None] * (WHITE - cv) * 0.9

# ======================================================================================
# AD 1 — Pain -> Solution -> Transformation  ("Blank -> Built")
# ======================================================================================
AD1 = dict(dur=19.0, vo=[0.10, 3.05, 6.30, 8.75, 11.70, 13.40])
WIRE = [(0.05, 0.08, 0.60, 0.20), (0.05, 0.27, 0.23, 0.42), (0.27, 0.27, 0.45, 0.42), (0.49, 0.27, 0.67, 0.42), (0.71, 0.27, 0.95, 0.42),
        (0.05, 0.48, 0.60, 0.92), (0.64, 0.48, 0.95, 0.92)]
JIT = np.random.default_rng(4).uniform(-1, 1, (len(WIRE), 4))
CONVEY = [[5, 12, 22, 31, 39, 47, 53, 58, 9, 26], [21, 14, 36, 43, 19, 6, 28, 34, 44, 50], [25, 32, 38, 48, 55, 13, 18, 24, 27, 33]]

def ad1(t):
    cv = BG1.copy()
    cards, post = [], []
    Y0, W0 = 130, 960
    # ---------------- HOOK 0 - 3.0 ----------------
    if t < 3.4:
        # blank slide (placeholders + caret) pushed aside by the real dashboard at 1.45
        e_in = ease_out5((t - 1.42) / 0.5)
        if t < 2.2:
            b = pose(x=lerp(0, -1050, e_in), y=Y0 + 10 * math.sin(t * 2), z=lerp(0, 420, e_in), ry=lerp(0, 24, e_in), rz=lerp(-1.2, -4, e_in), w=W0)
            cards.append(Card('blank', shadow=0.8, **b))
            if e_in < 0.05:
                def blank_ui(cv):
                    x0, y0, w_, h_ = card_rect(0, Y0 + 10 * math.sin(t * 2), W0)
                    rect(cv, x0 + w_ * .08, y0 + h_ * .22, x0 + w_ * .92, y0 + h_ * .46, GREY, 0.9, lw=2, dash=True)
                    rect(cv, x0 + w_ * .08, y0 + h_ * .54, x0 + w_ * .92, y0 + h_ * .80, GREY, 0.9, lw=2, dash=True)
                    text(cv, 'Click to add title', 'sans', 40, CX, y0 + h_ * .29, GREY, 0.95)
                    text(cv, 'Click to add text', 'sans', 28, CX, y0 + h_ * .63, GREY, 0.95)
                    if int(t * 3.2) % 2 == 0:
                        cv[int(y0 + h_ * .27):int(y0 + h_ * .41), int(x0 + w_ * .5 - 170):int(x0 + w_ * .5 - 166)] = INK
                post.append(blank_ui)
        if t > 1.42:
            p = pose(x=lerp(1250, 0, e_in), y=Y0, z=lerp(300, 0, e_in), ry=lerp(-28, 0, e_in), rz=lerp(5, 0, e_in), w=W0 * (1 + 0.04 * clamp01((t - 1.9) / 1.2)))
            cards.append(Card(19, shadow=1.0, **p))
        def hook_text(cv):
            f = 1 - clamp01((t - 2.95) / 0.2)
            words_line(cv, [('STILL', -0.3), ('BUILDING', 0.32)], 'sans-b', 96, CX, 250, t, [INK, INK], f)
            words_line(cv, [('PRESENTATIONS', 0.95)], 'sans-b', 96, CX, 362, t, [INK], f)
            words_line(cv, [('FROM', 1.75), ('SCRATCH?', 2.0)], 'sans-b', 96, CX, 474, t, [INK, CORALD], f)
        post.append(hook_text)

    # ---------------- PAIN 3.0 - 6.3: the slide comes apart into boxes ----------------
    if 2.95 <= t < 7.2:
        # finished slide dissolves into the blank card (3.0-3.25) and rebuilds 6.3-6.8
        sl_a = 1 - clamp01((t - 2.95) / 0.25) + clamp01((t - 6.4) / 0.25)
        shake = 6 * math.sin(t * 61) * (clamp01((t - 2.95) / 0.1) * (1 - clamp01((t - 3.15) / 0.15)))
        if t < 6.95:
            cards.append(Card('blank', x=shake, y=Y0, w=W0, shadow=1.0))
        if sl_a > 0 and t < 6.95:
            cards.append(Card(19, x=shake, y=Y0, w=W0, a=clamp01(sl_a), shadow=0))
        def pain_ui(cv):
            x0, y0, w_, h_ = card_rect(shake, Y0, W0)
            apart = ease_io((t - 3.1) / 0.6) * (1 - ease_back((t - 6.3) / 0.35, 1.2))
            box_a = clamp01((t - 2.98) / 0.15) * (1 - clamp01((t - 6.48) / 0.22))
            drag_i = 5
            for i, (u0, v0, u1, v1) in enumerate(WIRE):
                jx = JIT[i, 0] * 46 + 16 * math.sin(t * 2.3 + i * 1.7) ; jy = JIT[i, 1] * 30 + 10 * math.cos(t * 1.9 + i)
                sw_ = 1 + JIT[i, 2] * 0.12
                if i == drag_i:   # the box being dragged by the cursor
                    jx += 60 * math.sin((t - 3.1) * 1.6); jy += 26 * math.sin((t - 3.1) * 2.3)
                bx0 = x0 + w_ * u0 + jx * apart; by0 = y0 + h_ * v0 + jy * apart
                bx1 = bx0 + w_ * (u1 - u0) * lerp(1, sw_, apart); by1 = by0 + h_ * (v1 - v0) * lerp(1, 2 - sw_, apart)
                rect(cv, bx0, by0, bx1, by1, GREY, box_a, fill=LGREY, lw=2)
                if i == drag_i and apart > 0.3:
                    for hx, hy in [(bx0, by0), (bx1, by0), (bx0, by1), (bx1, by1), ((bx0 + bx1) / 2, by0), ((bx0 + bx1) / 2, by1)]:
                        rect(cv, hx - 6, hy - 6, hx + 6, hy + 6, COBALT, box_a, fill=WHITE, lw=2)
                    arrow_cursor(cv, (bx0 + bx1) / 2 + 30, (by0 + by1) / 2 + 10, box_a * apart)
                    # smart guides flash when the dragged box nearly lines up
                    if abs(math.sin((t - 3.1) * 1.6)) < 0.35:
                        hline(cv, x0, x0 + w_, by0, CORAL, box_a * 0.9)
                        vline(cv, bx0, y0, y0 + h_, CORAL, box_a * 0.9)
            # elapsed-time chip
            if 3.2 < t < 6.4:
                secs = int(4300 + (t - 3.2) * 2400)
                s = '%d:%02d:%02d' % (secs // 3600, secs % 3600 // 60, secs % 60)
                ca = clamp01((t - 3.2) / 0.25) * (1 - clamp01((t - 6.2) / 0.2))
                pill(cv, int(x0 + w_ - 250), int(y0 - 78), 250, 60, INK, ca)
                dot(cv, int(x0 + w_ - 222), int(y0 - 48), 8, CORAL, ca)
                text(cv, s, 'sans-b', 30, x0 + w_ - 200, y0 - 66, WHITE, ca, 1, anchor='l')
        post.append(pain_ui)
        def pain_text(cv):
            f = clamp01((t - 3.0) / 0.15) * (1 - clamp01((t - 6.15) / 0.2))
            words_line(cv, [('HOURS', 3.05), ('OF', 3.4), ('ALIGNING', 3.55)], 'sans-b', 84, CX, 300, t, [CORALD, INK, INK], f)
            words_line(cv, [('BOXES', 4.15)], 'sans-b', 84, CX, 400, t, [INK], f)
            a, d = rise(t, 4.8, 0.35, 16)
            text(cv, '& rebuilding charts', 'serif-i', 58, CX, 512 + d, STONE, a * f)
        post.append(pain_text)

    # ---------------- SOLUTION 6.3 - 8.75: 60 finished slides on a parallax conveyor ----------------
    if 6.75 <= t < 9.2:
        u = t - 6.75
        e = ease_out5(u / 0.7)
        ex = ease_in((t - 8.55) / 0.5)
        rows_y = [-110, 250, 610]
        speeds = [-310, 260, -230]
        for r, row in enumerate(CONVEY):
            for k, n in enumerate(row):
                base = (k - 4.5) * 560 + speeds[r] * u + (180 if r == 1 else 0)
                base = (base + 2800) % 5600 - 2800
                z = [180, 0, 260][r] + 900 * (1 - e) + 600 * ex
                slot = pose(x=base * lerp(1.6, 1, e), y=rows_y[r] + 30 + 300 * (1 - e) * (r - 1), z=z, ry=[10, -6, 8][r], rx=6, w=520,
                            dim=[0.92, 1, 0.9][r], blur=[1.2, 0, 1.6][r] + 4 * ex, a=clamp01(u / 0.25) * (1 - ex))
                if n == 19:   # the rebuilt dashboard glides from the pain card into its moving slot
                    k_ = ease_io((t - 6.75) / 0.6)
                    slot = blend(pose(x=0, y=Y0, z=0, w=W0, a=1.0), slot, k_)
                    slot['a'] = 1.0 - ex
                cards.append(Card(n, shadow=0.7, **slot))
        cards.sort(key=lambda c: -c.z)
        def sol_text(cv):
            f = clamp01((t - 6.8) / 0.2) * (1 - clamp01((t - 8.6) / 0.2))
            scrim(cv, 0, 760, 0.94 * f, IVORY)
            n = int(round(60 * ease_out(clamp01((t - 6.85) / 0.7))))
            pop(cv, str(n), 'sans-b', 230, CX, 190, t, 6.85, CORALD, f, dur=0.25)
            words_line(cv, [('FINISHED', 7.35), ('SLIDES', 7.65)], 'sans-b', 64, CX, 460, t, [INK, INK], f)
            a, d = rise(t, 6.35, 0.3, 14)
            text(cv, 'Instead, start with', 'serif-i', 46, CX, 130 + d, STONE, a * f)
        post.append(sol_text)

    # ---------------- CHARTS 8.75 - 11.7 ----------------
    if 8.6 <= t < 12.0:
        # push into a native combo chart
        e = ease_out5((t - 8.6) / 0.6)
        fu, fv, zw = 0.38, 0.63, 1750
        p = blend(pose(x=0, y=1400, z=800, rx=-20, w=900), pose(x=-(fu - 0.5) * zw, y=-(fv - 0.5) * zw * AR + 330, z=0, w=zw), e)
        out = ease_io((t - 9.95) / 0.4)
        if out > 0:
            p = blend(p, pose(x=-900, y=150, z=900, ry=30, w=1200, blur=4, dim=0.8), out); p['a'] = 1 - out
        cards.append(Card(23, shadow=1, **p))
        # five dashboards cascade in (19, 20, 56)
        for i, (n, ys, sd) in enumerate([(19, 30, -1), (20, 330, 1), (56, 630, -1)]):
            t0 = 10.05 + i * 0.16
            if t < t0: continue
            e2 = ease_out5((t - t0) / 0.55)
            ex = ease_in((t - 11.55) / 0.4)
            cards.append(Card(n, x=lerp(sd * 1300, sd * -30, e2) + sd * 1500 * ex, y=ys, z=lerp(400, -i * 20, e2), ry=lerp(-sd * 35, sd * 6, e2), rz=sd * 1.5,
                              w=760, shadow=0.9))
        def chart_text(cv):
            f = win(t, 8.75, 10.05, 0.2, 0.2)
            if f > 0:
                scrim(cv, 0, 700, 0.95 * f, IVORY)
                pop(cv, '42', 'sans-b', 230, CX, 190, t, 8.78, CORALD, f, dur=0.25)
                words_line(cv, [('EDITABLE', 9.3), ('CHARTS', 9.6)], 'sans-b', 64, CX, 460, t, [INK, INK], f)
            g = win(t, 10.1, 11.65, 0.15, 0.2)
            if g > 0:
                scrim(cv, 0, 330, 0.9 * g, IVORY)
                words_line(cv, [('5', 10.12), ('DASHBOARDS', 10.3)], 'sans-b', 84, CX, 190, t, [CORALD, INK], g)
        post.append(chart_text)

    # ---------------- EDIT DATA 11.7 - 13.4 ----------------
    if 11.55 <= t < 13.9:
        e = ease_out5((t - 11.55) / 0.55)
        push = ease_io((t - 12.0) / 1.3)
        fu, fv = 0.36, 0.6
        w_ = lerp(980, 1500, push)
        p = pose(x=lerp(0, -(fu - 0.5) * 1500, push), y=lerp(1500, 260, e) - (fv - 0.5) * 1500 * AR * push * 0 , z=lerp(600, 0, e), rx=lerp(-25, 0, e), w=w_)
        cards.append(Card(41, shadow=1, **p))
        def edit_ui(cv):
            f = clamp01((t - 11.75) / 0.2)
            words_line(cv, [('JUST', 11.72), ('DROP', 11.9), ('IN', 12.1)], 'sans-b', 84, CX, 280, t, [INK, INK, INK], f)
            words_line(cv, [('YOUR', 12.25), ('NUMBERS.', 12.45)], 'sans-b', 84, CX, 385, t, [INK, CORALD], f)
            # cursor arrives on the chart, right-click, "Edit Data"
            mx, my = lerp(980, 470, ease_io((t - 12.05) / 0.5)), lerp(1500, 1180, ease_io((t - 12.05) / 0.5))
            ca = clamp01((t - 12.0) / 0.2)
            if t > 12.6:
                k = ease_back((t - 12.6) / 0.25, 1.6)
                mw, mh = int(330 * k), int(150 * k)
                if mw > 10 and mh > 10:
                    rect(cv, mx + 18, my + 18, mx + 18 + mw, my + 18 + mh, MIST, 1.0, fill=WHITE, lw=2)
                    if k > 0.8:
                        rect(cv, mx + 26, my + 28, mx + 10 + mw, my + 92, CORAL, 1.0, fill=PEACH, lw=0)
                        text(cv, 'Edit Data…', 'sans-b', 30, mx + 44, my + 41, INK, 1.0, anchor='l')
                        text(cv, 'Change Chart Type…', 'sans', 28, mx + 44, my + 104, STONE, 1.0, anchor='l')
            if 12.55 < t < 12.85:
                r_ = int(10 + 50 * (t - 12.55) / 0.3)
                ring = np.zeros((r_ * 2 + 8, r_ * 2 + 8), np.float32); cv2.circle(ring, (r_ + 4, r_ + 4), r_, 1.0, 3, lineType=cv2.LINE_AA)
                stamp(cv, ring, mx - r_ - 4, my - r_ - 4, CORAL, 1 - (t - 12.55) / 0.3)
            arrow_cursor(cv, mx, my, ca)
        post.append(edit_ui)

    # ---------------- CTA 13.4 - 19.0 (cobalt wipe from the cursor) ----------------
    wipe_r = ease_in(clamp01((t - 13.2) / 0.55)) * 2400
    if wipe_r > 0:
        cards_cta = []
        if t >= 14.7:
            for n, x, y, z, ry, rz, d in [(38, -250, -90, 420, 18, -6, 0.0), (47, 250, -90, 420, -18, 6, 0.08), (1, 0, -60, 0, 0, 0, 0.18)]:
                e = ease_out5((t - (14.7 + d)) / 0.8)
                hold = clamp01((t - 15.6) / 3.4)
                cards_cta.append(Card(n, x=x * e, y=lerp(1200, y, e), z=lerp(900, z - 40 * hold, e), ry=ry * e, rz=rz * e, rx=lerp(-30, 0, e), w=780,
                                      dim=1 if n == 1 else 0.82, blur=0 if n == 1 else 1.4, a=clamp01((t - (14.7 + d)) / 0.2), shadow=1))
        def cta_layer(base):
            for c in cards_cta: R.draw_card(base, c)
            return base
        def cta_text(cv):
            a1 = clamp01((t - 13.4) / 0.15)
            words_line(cv, [('STOP', 13.42), ('STARTING', 13.62)], 'sans-b', 84, CX, 230, t, [WHITE, WHITE], a1)
            words_line(cv, [('FROM', 14.05), ('SCRATCH.', 14.25)], 'sans-b', 84, CX, 335, t, [WHITE, CORAL], a1)
            a, d = rise(t, 15.05, 0.45, 18)
            text(cv, '60 SLIDES  ·  42 EDITABLE CHARTS  ·  5 DASHBOARDS', 'sans-b', 24, CX, 1150 + d, SKY, a, 3)
            a, d = rise(t, 15.0, 0.5, 22)
            text(cv, 'Business Presentation Pro', 'serif', 70, CX, 1200 + d, WHITE, a)
            a, d = rise(t, 15.55, 0.45, 18)
            button(cv, 'GET THE TEMPLATE', CX, 1318 + d, a, w_=600, h=110)
        layer = R.BG_COB.copy()
        R.orbit_layer(layer, t, clamp01((t - 13.6) / 0.6))
        layer = cta_layer(layer)
        cta_text(layer)
        cv_cards_needed = wipe_r < 2300
    else:
        layer = None; cv_cards_needed = True

    if cv_cards_needed:
        for c in cards: R.draw_card(cv, c)
        for fn in post: fn(cv)
    if layer is not None:
        cv = circle_wipe(cv, layer, 470, 1180, wipe_r) if wipe_r < 2300 else layer
    fo = clamp01((t - (AD1['dur'] - 0.25)) / 0.25)
    if fo > 0: cv = cv * (1 - fo * 0.0)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

# ======================================================================================
# AD 2 — Curiosity gap -> reveal  ("The Reveal")
# ======================================================================================
AD2 = dict(dur=18.3, vo=[0.10, 2.15, 4.25, 5.65, 10.75, 14.15])
T_EXEC, T_FUN, T_BRI, T_MAP = 5.65, 7.0, 7.9, 9.25
def grid_layout(t):
    cw, gap = 380, 26; chh = cw * AR
    Rm = R.rot(42, 0, -12)
    out = []
    for k in range(60):
        c, r = k % 6, k // 6
        u = (c - 2.5) * (cw + gap); v = (r - 4.5) * (chh + gap)
        out.append((k + 1, u, v))
    return out, Rm, cw

def ad2(t):
    cv = BG2.copy()
    cards, post = [], []
    Y0 = 120

    # ---------------- HOOK 0 - 2.1: macro tracking shot across the annotated chart ----------------
    if t < 4.3:
        pull = ease_io((t - 2.05) / 1.1)
        pan = ease_io(t / 2.2)
        w_ = lerp(4300, 960, pull)
        fu = lerp(0.80, 0.42, pan); fv = lerp(0.43, 0.58, pan)
        x = lerp(-(fu - 0.5) * 4300, 0, pull); y = lerp(-(fv - 0.5) * 4300 * AR + 150, Y0, pull)
        flip = ease_in((t - 3.95) / 0.35)
        c = Card(21, x=x, y=y, z=0, ry=lerp(-6, 0, pull) - 90 * flip, rx=0, w=w_, shadow=1.0 if pull > 0.5 else 0.0)
        cards.append(c)
        if pull > 0.6:
            r_ = reflect(c); r_.a = clamp01((pull - 0.6) / 0.4) * (1 - flip); cards.insert(0, r_)
        def hook_text(cv):
            light_sweep(cv, t, 0.0, 2.1, -400, 1500, 300, 0.12)
            f = 1 - clamp01((t - 2.0) / 0.25)
            scrim(cv, 0, 740, 0.88 * (1 - clamp01((t - 3.9) / 0.3)), NIGHT)   # holds until the pull-back clears the text area
            for s, font, y, t0, col in [('Your next deck', 'serif', 250, -0.4, WHITE), ('could look', 'serif', 352, 0.70, WHITE), ('this polished.', 'serif-i', 454, 1.02, CORAL)]:
                a, d = rise(t, t0, 0.35, 26)
                text(cv, s, font, 100, CX, y + d, col, a * f)
            g = win(t, 2.2, 4.1, 0.3, 0.25)
            if g > 0:
                a, d = rise(t, 2.2, 0.4, 20)
                text(cv, 'Without starting', 'serif', 76, CX, 300 + d, WHITE, a * g)
                a, d = rise(t, 2.75, 0.4, 20)
                text(cv, 'from a blank slide.', 'serif-i', 76, CX, 388 + d, SKY, a * g)
        post.append(hook_text)

    # ---------------- REVEAL 4.3 - 10.6: flip, swing, drop, fly-through ----------------
    if 4.3 <= t < 11.2:
        # 19 completes the card flip
        e = ease_out(clamp01((t - 4.3) / 0.4))
        p19 = pose(x=0, y=Y0, ry=90 * (1 - e), w=960)
        sw = ease_io((t - (T_FUN - 0.25)) / 0.5)
        if sw > 0: p19 = blend(p19, pose(x=-620, y=Y0 - 40, z=900, ry=70, w=960, dim=0.5, blur=3, a=0.0), sw)
        if sw < 1: cards.append(Card(19, shadow=1, **p19))
        # 29 swings in like a door from the right
        if t > T_FUN - 0.25:
            e2 = ease_out5((t - (T_FUN - 0.25)) / 0.6)
            p = pose(x=lerp(700, 0, e2), y=Y0, z=lerp(500, 0, e2), ry=lerp(-75, 0, e2), w=960)
            d2 = ease_io((t - (T_BRI - 0.2)) / 0.4)
            if d2 > 0: p = blend(p, pose(x=0, y=Y0 + 900, z=300, rx=50, w=960, a=0.0), d2)
            if d2 < 1: cards.append(Card(29, shadow=1, **p))
        # 42 drops from above with a tilt
        if t > T_BRI - 0.2:
            e3 = ease_out5((t - (T_BRI - 0.2)) / 0.65)
            p = pose(x=0, y=lerp(-1400, Y0, e3), z=lerp(300, 0, e3), rx=lerp(45, 0, e3), rz=lerp(-12, 0, e3), w=960)
            ft = ease_in((t - (T_MAP - 0.25)) / 0.45)
            if ft > 0: p = blend(p, pose(x=0, y=Y0, z=-1700, w=960, a=0.0), ft)
            if ft < 1: cards.append(Card(42, shadow=1, **p))
        # fly through 42 into 46
        if t > T_MAP - 0.25:
            e4 = ease_out5((t - (T_MAP - 0.25)) / 0.7)
            p = pose(x=0, y=Y0, z=lerp(1400, 0, e4), w=960, a=clamp01((t - (T_MAP - 0.25)) / 0.25))
            g = ease_io((t - 10.5) / 0.9)
            if g > 0: p = blend(p, pose(x=0, y=-200, z=2400, w=960, a=0.0), g)
            if g < 1: cards.insert(0, Card(46, shadow=1, **p))
        # floor reflections for the frontal hero cards
        refl = [reflect(c) for c in cards if abs(c.rx) < 8 and abs(c.ry) < 25 and isinstance(c.n, int)]
        cards = refl + cards
        def list_text(cv):
            a = win(t, 4.3, 5.6, 0.25, 0.2)
            if a > 0:
                a1, d = rise(t, 4.3, 0.35, 22)
                text(cv, "Here's what's inside.", 'serif-i', 84, CX, 330 + d, WHITE, a * a1)
            items = [('Executive', 'dashboards', T_EXEC, T_FUN), ('Sales', 'funnels', T_FUN, T_BRI), ('Revenue', 'bridges', T_BRI, T_MAP), ('Strategy', 'roadmaps', T_MAP, 10.6)]
            for i, (w1, w2, t0, t1) in enumerate(items):
                f = win(t, t0, t1, 0.18, 0.18)
                if f <= 0: continue
                a1, d1 = rise(t, t0, 0.3, 30); a2, d2 = rise(t, t0 + 0.12, 0.3, 30)
                text(cv, w1, 'serif', 96, CX, 250 + d1, WHITE, f * a1)
                text(cv, w2, 'serif-i', 96, CX, 360 + d2, CORAL, f * a2)
                # progress ticks 1-4
                for k in range(4):
                    dot(cv, int(CX - 54 + k * 36), 520, 7, CORAL if k == i else hexbgr('2A3C86'), f)
        post.append(list_text)

    # ---------------- 60 SLIDES WALL 10.6 - 14.6 ----------------
    if 10.4 <= t < 18.3:
        u = t - 10.4
        lay, Rm, cw = grid_layout(t)
        rise_ = ease_out5(u / 1.4)
        drift = clamp01((t - 11.5) / 6.0)
        T = np.array([0, lerp(1300, -240, rise_) - 220 * drift, lerp(1800, 380, rise_)])
        dimall = 1 - 0.55 * ease_io((t - 14.0) / 0.8)
        blurall = 5 * ease_io((t - 14.0) / 0.8)
        for n, uu, vv in lay:
            P = Rm @ np.array([uu, vv, 0]) + T
            if P[2] < -1500: continue
            near = clamp01(1 - (P[2] + 200) / 2600)
            cards.insert(0, Card(n, x=P[0], y=P[1], z=P[2], rx=42, rz=-12, w=cw, dim=(0.55 + 0.45 * near) * dimall, blur=(1 - near) * 2.5 + blurall,
                                 a=clamp01(u / 0.4), shadow=0.5))
        def wall_text(cv):
            f = win(t, 10.75, 14.05, 0.2, 0.3)
            if f <= 0: return
            scrim(cv, 0, 760, 0.9 * f, NIGHT)
            n = int(round(60 * ease_out(clamp01((t - 10.78) / 0.7))))
            a, d = rise(t, 10.78, 0.35, 20)
            text(cv, str(n), 'serif', 250, CX, 180 + d, WHITE, a * f)
            a, d = rise(t, 11.2, 0.4, 16)
            text(cv, 'SLIDES', 'sans-b', 34, CX, 470 + d, CORAL, a * f, 12)
            a, d = rise(t, 11.85, 0.45, 16)
            text(cv, 'Fully editable in PowerPoint.', 'serif-i', 54, CX, 545 + d, SKY, a * f)
        post.append(wall_text)

    # ---------------- CTA 14.15 - 18.3 ----------------
    if t >= 14.0:
        e = ease_out5((t - 14.0) / 1.0)
        hold = clamp01((t - 15.0) / 3.3)
        c = Card(1, x=0, y=lerp(1200, 50, e), z=lerp(700, -40 * hold, e), rx=lerp(-30, 0, e), w=900, a=clamp01((t - 14.0) / 0.2), shadow=1)
        cards.append(reflect(c)); cards.append(c)
        def cta_text(cv):
            light_sweep(cv, t, 15.2, 16.6, -300, 1400, 220, 0.07)
            scrim(cv, 0, 640, 0.9 * clamp01((t - 14.1) / 0.3), NIGHT)
            a, d = rise(t, 14.15, 0.45, 22)
            text(cv, 'Business', 'serif', 104, CX, 200 + d, WHITE, a)
            a, d = rise(t, 14.35, 0.45, 22)
            text(cv, 'Presentation Pro', 'serif', 104, CX, 315 + d, WHITE, a)
            a, d = rise(t, 15.35, 0.4, 18)
            text(cv, 'Get it today.', 'serif-i', 66, CX, 455 + d, CORAL, a)
            a, d = rise(t, 15.7, 0.45, 18)
            text(cv, '60 SLIDES  ·  42 EDITABLE CHARTS  ·  POWERPOINT', 'sans-b', 24, CX, 1312 + d, SKY, a, 3)
            a, d = rise(t, 15.95, 0.45, 18)
            button(cv, 'GET THE TEMPLATE', CX, 1368 + d, a, w_=600, h=110)
        post.append(cta_text)

    for c in cards: R.draw_card(cv, c)
    for fn in post: fn(cv)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

ADS = {'ad1': (ad1, AD1), 'ad2': (ad2, AD2)}

def render_range(args):
    name, i0, i1 = args
    fn = ADS[name][0]
    return [fn(i / FPS).tobytes() for i in range(i0, i1)]

if __name__ == '__main__':
    name, mode = sys.argv[1], sys.argv[2]
    fn, cfg = ADS[name]
    if mode == 'stills':
        os.makedirs(os.path.join(HERE, 'stills'), exist_ok=True)
        for ts in sys.argv[3:]:
            cv2.imwrite(os.path.join(HERE, 'stills', f'{name}_{float(ts):05.2f}.png'), fn(float(ts)))
        sys.exit()
    out = sys.argv[3]
    import imageio_ffmpeg
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    p = subprocess.Popen([ff, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                          '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2',
                          '-movflags', '+faststart', '-r', str(FPS), out], stdin=subprocess.PIPE)
    N = int(round(cfg['dur'] * FPS))
    from multiprocessing import Pool
    chunks = [(name, i, min(i + 30, N)) for i in range(0, N, 30)]
    with Pool(int(os.environ.get('JOBS', 4))) as pool:
        for k, frames in enumerate(pool.imap(render_range, chunks)):
            for fb in frames: p.stdin.write(fb)
            if k % 6 == 0: print(f'{chunks[k][2] / FPS:5.1f}s', flush=True)
    p.stdin.close(); p.wait()
    print('wrote', out)
