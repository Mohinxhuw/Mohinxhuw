"""Business Sales Template (Vertex) — two 9:16 TikTok/Reels ads (ad-03, ad-04).
Every slide image is a render of Vertex_Premium_Business_Sales_Template_FIXED.pptx (bst/slides/sNN.png).
The recolour beat (ad-03) uses renders of the same file with only its theme colour slots changed
(bst/slides_alt/), demonstrating the template's documented Design > Variants > Colors behaviour.
Built on the generic 3D card compositor in reel2.py (perspective cards, depth of field, shadows).

usage: python3 bst_ads.py ad3|ad4 stills t1 t2 ...  |  python3 bst_ads.py ad3|ad4 render out.mp4
"""
import os, sys, math, subprocess, functools
import numpy as np, cv2
HERE = os.path.dirname(os.path.abspath(__file__))
for p in (os.path.join(HERE, '..', 'reel2'), os.path.join(HERE, '..', 'vanta02')):
    sys.path.insert(0, p)
import reel2 as R
from reel2 import Card, pose, blend, clamp01, ease_io, ease_out, ease_out5, ease_in, ease_back, lerp, win, rise, text_mask, tw, stamp, W, H, CX, CY, AR, FOCAL, hexbgr

FPS = int(os.environ.get('FPS', 60))
# ---- Vertex brand (from the template's own palette slide) ----
NAVY, NAVY2, LIME, OFF = hexbgr('0A1628'), hexbgr('17253D'), hexbgr('C6F432'), hexbgr('F3F5F7')
WHITE, MIST, SLATE, STEEL, CHAR = hexbgr('FFFFFF'), hexbgr('D5DBE3'), hexbgr('6B7688'), hexbgr('2C4A74'), hexbgr('2E3645')
R.DEEP = NAVY                       # depth-of-field dimming tints toward Vertex navy
F = os.path.expanduser('~/.fonts/')
R.FONTS.update({'disp': F + 'manrope-800.ttf', 'm7': F + 'manrope-700.ttf', 'in4': F + 'inter-400.ttf', 'in5': F + 'inter-500.ttf', 'in7': F + 'inter-700.ttf'})
text = R.text

# ---- textures: Business Sales Template renders only ----
SL = os.path.join(HERE, 'slides'); ALT = os.path.join(HERE, 'slides_alt')
@functools.lru_cache(maxsize=None)
def _src(key, small):
    if isinstance(key, str) and key.startswith('G'):
        img = _src(int(key[1:]), small).copy()
        g = img.mean(2, keepdims=True)
        img = (g * 0.85 + img * 0.15) * 0.62 + 0.36       # washed-out, low-contrast "forgettable" grade
        return img.astype(np.float32)
    path = os.path.join(ALT, key + '.png') if isinstance(key, str) else os.path.join(SL, 's%02d.png' % key)
    im = cv2.imread(path, cv2.IMREAD_COLOR)[:2160, :3840]
    if small: im = cv2.resize(im, (640, 360), interpolation=cv2.INTER_AREA)
    return im.astype(np.float32) / 255

@functools.lru_cache(maxsize=None)
def _mask(lw):
    h = int(round(lw * AR))
    m = np.zeros((h * 4, lw * 4), np.uint8); r = max(int(lw * 4 * 0.006), 2)
    cv2.rectangle(m, (r, 0), (lw * 4 - r - 1, h * 4 - 1), 255, -1); cv2.rectangle(m, (0, r), (lw * 4 - 1, h * 4 - r - 1), 255, -1)
    for cx_, cy_ in [(r, r), (lw * 4 - r - 1, r), (r, h * 4 - r - 1), (lw * 4 - r - 1, h * 4 - r - 1)]: cv2.circle(m, (cx_, cy_), r, 255, -1)
    return cv2.resize(m, (lw, h), interpolation=cv2.INTER_AREA).astype(np.float32) / 255

@functools.lru_cache(maxsize=600)
def tex(n, lw):
    src = _src(n, lw <= 640)
    h = int(round(lw * AR))
    img = src if src.shape[1] == lw else cv2.resize(src, (lw, h), interpolation=cv2.INTER_AREA)
    return img, _mask(lw)
R.tex = tex
draw = R.draw_card

# ---- type & graphics helpers ----
@functools.lru_cache(maxsize=512)
def scaled_mask(s, font, size, track, sc100):
    m = text_mask(s, font, size, track)
    if sc100 == 100: return m
    sc = sc100 / 100
    return cv2.resize(m, (max(1, int(m.shape[1] * sc)), max(1, int(m.shape[0] * sc))), interpolation=cv2.INTER_AREA if sc < 1 else cv2.INTER_LINEAR)

def pop(cv, s, font, size, cx, y, t, t0, col, a=1.0, track=0, dur=0.22, from_sc=1.14):
    u = clamp01((t - t0) / dur)
    if u <= 0 or a <= 0: return
    sc = lerp(from_sc, 1.0, ease_out(u))
    m = scaled_mask(s, font, size, track, int(round(sc * 100))); base = text_mask(s, font, size, track)
    stamp(cv, m, cx - m.shape[1] / 2, y + base.shape[0] / 2 - m.shape[0] / 2 - 8, col, a * clamp01(u * 2.2))

def words_line(cv, words, font, size, cx, y, t, cols, a=1.0, gap=None, marker=None):
    """Centred line of words popping in on cue. marker=(index, t0): lime highlighter swipes behind that word."""
    gap = gap if gap is not None else size * 0.26
    ws = [tw(w_, font, size) for w_, _ in words]
    x = cx - (sum(ws) + gap * (len(words) - 1)) / 2
    for k, ((w_, t0), ww, col) in enumerate(zip(words, ws, cols)):
        if marker and marker[0] == k and a > 0:
            u = ease_out(clamp01((t - marker[1]) / 0.35))
            if u > 0:
                y0, y1 = int(y + size * 0.62), int(y + size * 1.12)
                x0, x1 = int(x - 10), int(x - 10 + (ww + 20) * u)
                if x1 > x0: cv[max(y0, 0):y1, max(x0, 0):min(x1, W)] = cv[max(y0, 0):y1, max(x0, 0):min(x1, W)] * (1 - a) + LIME * a
        pop(cv, w_, font, size, x + ww / 2, y, t, t0, col, a)
        x += ww + gap

def pill(cv, x, y, w_, h, col, a=1.0): R.pill(cv, int(x), int(y), int(w_), int(h), col, a)
def scrim(cv, y0, y1, a, col, top=True):
    if a > 0: R.gradient_band(cv, y0, y1, a, col, top)
def square_tag(cv, x, y, s, col, a):
    if a > 0: cv[int(y):int(y + s), int(x):int(x + s)] = cv[int(y):int(y + s), int(x):int(x + s)] * (1 - a) + col * a
def eyebrow(cv, s, cx, y, a, col, sq=LIME):
    w_ = tw(s, 'in7', 26, 6) + 34; x0 = cx - w_ / 2
    square_tag(cv, x0, y + 9, 16, sq, a); text(cv, s, 'in7', 26, x0 + 34, y, col, a, 6, anchor='l')
def chip(cv, s, cx, y, a, bg=LIME, fg=NAVY, size=30):
    if a <= 0: return
    w_ = tw(s, 'in7', size) + 64; h = int(size * 2.1)
    pill(cv, cx - w_ / 2, y, w_, h, bg, a); text(cv, s, 'in7', size, cx, y + (h - size * 1.2) / 2 - 2, fg, a)
def cta_button(cv, s, cx, y, a, w_=720, h=112):
    if a <= 0: return
    pill(cv, cx - w_ / 2, y, w_, h, LIME, a); text(cv, s, 'disp', 40, cx, y + 26, NAVY, a, 1)
def card_rect(x, y, w):
    h = w * AR; return CX + x - w / 2, CY + y - h / 2, w, h

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
_g = np.clip(1 - np.sqrt(((xx - W * .5) / W) ** 2 + ((yy - H * .45) / H) ** 2) * 1.3, 0, 1) ** 1.6
BG_LIGHT = (OFF[None, None] * (1 - _g[..., None]) + WHITE[None, None] * _g[..., None]).astype(np.float32)
BG_NAVY = (NAVY[None, None] * (1 - _g[..., None]) + (NAVY2 * 1.15)[None, None] * _g[..., None]).astype(np.float32)
GRID = np.zeros((H, W), np.float32)              # the template's 12-column grid, as a faint backdrop motif
for k in range(13):
    x = int(60 + k * (W - 120) / 12); GRID[:, x:x + 1] = 1.0
del yy, xx
def navy_bg(t, a=0.05):
    cv = BG_NAVY.copy(); cv += (GRID * a)[..., None] * (MIST - cv); return cv

# ======================================================================================
# AD 3 — Problem -> Solution -> Transformation ("Forgettable -> unmissable")
# ======================================================================================
AD3 = dict(dur=27.0, vo=[0.10, 1.60, 3.90, 6.75, 10.80, 13.95, 18.30, 21.55])
Y3, W3 = 190, 980
TILE_C, TILE_R = 5, 3
_perm = np.random.default_rng(3).permutation(TILE_C * TILE_R)
CF = [21, 11, 13, 64, 27, 31, 49, 67, 80, 87, 15]
PAL_T = [(0.0, None), (18.95, 'ocean'), (19.65, 'ember'), (20.35, None)]

def pal_at(t):
    cur = None; prev = None; t0 = -9
    for tt, p in PAL_T:
        if t >= tt: prev, cur, t0 = cur, p, tt
    return prev, cur, clamp01((t - t0) / 0.22)

def key(n, pal): return n if pal is None else '%s_s%02d' % (pal, n)

def ad3(t):
    cards, post = [], []
    cta_mix = clamp01((t - 21.25) / 0.45)
    cv = BG_LIGHT.copy()

    # ---------- HOOK 0 - 3.9: vivid macro on the $48.6M tile drains to a washed-out, forgettable slide ----------
    if t < 7.6:
        e = ease_io(t / 3.4)
        fu, fv = 0.22, 0.52
        w_ = lerp(2900, W3, e)
        x = lerp(-(fu - 0.5) * 2900, 0, e); y = lerp(-(fv - 0.5) * 2900 * AR + Y3, Y3, e)
        ry = lerp(-8, 0, ease_io((t - 1.0) / 2.6)) if t < 3.9 else 0
        grey = ease_io((t - 1.75) / 1.0) * (1 - ease_io((t - 6.75) / 0.3))
        blur = 1.6 * grey * (1 - clamp01((t - 3.9) / 0.3))
        if grey < 1 and t < 7.45: cards.append(Card(21, x=x, y=y, ry=ry, w=w_, shadow=1.0 if e > 0.6 else 0.3))
        if grey > 0: cards.append(Card('G21', x=x, y=y, ry=ry, w=w_, a=grey, blur=blur, shadow=0))
        def hook_text(cv):
            f = 1 - clamp01((t - 3.75) / 0.2)
            if t < 1.0: scrim(cv, 0, 640, 0.92, WHITE)
            else: scrim(cv, 0, 640, 0.92 * f, WHITE)
            words_line(cv, [('STRONG', -0.2), ('NUMBERS.', 0.45)], 'disp', 96, CX, 250, t, [NAVY, NAVY], f)
            words_line(cv, [('FORGETTABLE', 1.95)], 'disp', 96, CX, 370, t, [NAVY], f, marker=(0, 2.15))
            words_line(cv, [('SLIDES?', 2.55)], 'disp', 96, CX, 490, t, [NAVY], f)
        post.append(hook_text)
        # ---------- PAIN 3.9 - 6.75: the slide comes apart and is rebuilt tile by tile ----------
        if 3.9 <= t < 7.0:
            def tiles(cv):
                x0, y0, w_, h_ = card_rect(0, Y3, W3)
                tw_, th_ = w_ / TILE_C, h_ / TILE_R
                for rank, idx in enumerate(_perm):
                    gone_t = 3.92 + rank * 0.028
                    back_t = 4.5 + rank * 0.14
                    if gone_t <= t < back_t:
                        c, r = idx % TILE_C, idx // TILE_C
                        X0, Y0 = int(x0 + c * tw_), int(y0 + r * th_)
                        X1, Y1 = int(x0 + (c + 1) * tw_) + 1, int(y0 + (r + 1) * th_) + 1
                        cv[Y0:Y1, X0:X1] = BG_LIGHT[Y0:Y1, X0:X1]
                        cv2.rectangle(cv, (X0 + 2, Y0 + 2), (X1 - 3, Y1 - 3), tuple(float(v) for v in MIST), 2)
                # elapsed-time bar fills while tiles come back
                if t < 6.75:
                    u = clamp01((t - 4.45) / 2.2)
                    bx0, by = x0, y0 + h_ + 36
                    cv[int(by):int(by + 10), int(bx0):int(bx0 + w_)] = cv[int(by):int(by + 10), int(bx0):int(bx0 + w_)] * 0.5 + MIST * 0.5
                    cv[int(by):int(by + 10), int(bx0):int(bx0 + w_ * u)] = SLATE
            post.insert(0, tiles)
            def pain_text(cv):
                f = clamp01((t - 3.9) / 0.15) * (1 - clamp01((t - 6.6) / 0.2))
                words_line(cv, [('FROM', 3.95), ('SCRATCH,', 4.2)], 'disp', 92, CX, 290, t, [NAVY, NAVY], f)
                words_line(cv, [('IT', 5.0), ('TAKES', 5.15), ('HOURS.', 5.45)], 'disp', 92, CX, 410, t, [SLATE, SLATE, NAVY], f, marker=(2, 5.6))
            post.append(pain_text)
        # ---------- SOLUTION snap 6.75: colour comes back with a lime sweep ----------
        if 6.7 <= t < 7.6:
            def sweep(cv):
                u = clamp01((t - 6.72) / 0.45)
                if 0 < u < 1:
                    x0, y0, w_, h_ = card_rect(0, Y3, W3)
                    xs = int(x0 + (w_ + 140) * ease_io(u)) - 140
                    a0, a1 = max(xs, 0), min(xs + 70, W)
                    if a1 > a0: cv[int(y0):int(y0 + h_), a0:a1] = cv[int(y0):int(y0 + h_), a0:a1] * 0.15 + LIME * 0.85
            post.append(sweep)

    # ---------- 85+ LAYOUTS: cover-flow carousel 7.5 - 10.9 ----------
    if 7.45 <= t < 11.1:
        p = 9.0 * ease_io((t - 7.6) / 2.9)
        ex = ease_in((t - 10.55) / 0.45)
        lst = []
        for i, n in enumerate(CF):
            d = i - p
            if abs(d) > 3.2: continue
            s = max(-1.0, min(1.0, d))
            x = s * 330 + (d - s) * 150
            c = Card(n, x=x, y=Y3 - 20 * abs(s) , z=abs(s) * 300 + (abs(d) - abs(s)) * 120 + 1400 * ex, ry=-s * 52, w=W3,
                     dim=1 - 0.25 * min(abs(d), 1.5), a=(1 - clamp01((abs(d) - 2.4) / 0.8)) * (1 - ex), shadow=1.0)
            if i > 0: c.a *= clamp01((t - 7.45) / 0.35)            # side layouts fade in as the carousel opens
            c.d = abs(d)
            lst.append(c)
        # draw far-from-centre first; the two centre cards cross-dissolve where their depths tie (no pop)
        lst.sort(key=lambda c: -c.d)
        if len(lst) >= 2:
            a_, b_ = lst[-1], lst[-2]
            wt = clamp01((b_.d - a_.d) / 0.3)
            b2 = Card(b_.n, **{k: getattr(b_, k) for k in ('x', 'y', 'z', 'rx', 'ry', 'rz', 'w', 'blur', 'dim', 'shadow')}, a=b_.a * 0.5 * (1 - wt))
            b2.shadow = 0
            lst = lst[:-2] + [b_, a_, b2]
        cards += lst
        def cf_text(cv):
            f = win(t, 6.8, 10.65, 0.2, 0.25)
            scrim(cv, 0, 650, 0.93 * f, WHITE)
            a, d = rise(t, 6.8, 0.35, 16); eyebrow(cv, 'BUSINESS SALES TEMPLATE', CX, 200 + d, a * f, NAVY)
            pop(cv, '85+', 'disp', 230, CX, 255, t, 8.65, NAVY, f, dur=0.25)
            words_line(cv, [('READY', 9.2), ('LAYOUTS', 9.4)], 'disp', 64, CX, 520, t, [NAVY, NAVY], f, marker=(1, 9.55))
        post.append(cf_text)

    # ---------- 35+ NATIVE CHARTS & DASHBOARDS 10.8 - 13.9 ----------
    if 10.75 <= t < 14.3:
        ex = ease_in((t - 13.75) / 0.45)
        for n, ys, sd, t0 in [(69, -40, -1, 10.8), (71, 420, 1, 10.98)]:
            e = ease_out5((t - t0) / 0.6)
            dimk = ease_io((t - 12.75) / 0.4)
            cards.append(Card(n, x=lerp(sd * 1300, sd * -22, e), y=ys, z=lerp(300, 0, e) + 300 * dimk + 900 * ex, ry=lerp(-sd * 40, sd * 5, e), rz=sd * 1.2,
                              w=860, dim=1 - 0.35 * dimk, blur=2.2 * dimk, a=clamp01((t - t0) / 0.15) * (1 - ex), shadow=0.9))
        if t > 12.7:
            e = ease_out5((t - 12.7) / 0.6)
            cards.append(Card(63, x=0, y=lerp(1400, 190, e), z=lerp(500, -60, e) + 900 * ex, rx=lerp(-28, 0, e), w=940, a=1 - ex, shadow=1.0))
        def ch_text(cv):
            f = win(t, 10.8, 13.8, 0.2, 0.25)
            scrim(cv, 0, 600, 0.93 * f, WHITE)
            pop(cv, '35+', 'disp', 200, CX, 190, t, 11.05, NAVY, f, dur=0.25)
            words_line(cv, [('NATIVE', 11.6), ('CHARTS', 11.85)], 'disp', 60, CX, 420, t, [NAVY, NAVY], f, marker=(1, 12.0))
            words_line(cv, [('&', 12.75), ('DASHBOARDS', 12.85)], 'disp', 60, CX, 500, t, [SLATE, NAVY], f)
        post.append(ch_text)

    # ---------- NATIVE POWERPOINT, 100% EDITABLE 13.9 - 18.2 ----------
    if 13.85 <= t < 18.5:
        e = ease_out5((t - 13.85) / 0.6)
        push = ease_io((t - 14.6) / 3.2)
        fu, fv = 0.5, 0.62; zw = lerp(980, 1450, push)
        x = -(fu - 0.5) * (zw - 980) * 1.0
        y = lerp(1400, Y3, e) - (fv - 0.5) * (zw - 980) * AR
        ex = ease_in((t - 18.05) / 0.4)
        cards.append(Card(65, x=x, y=y, z=lerp(500, 0, e) + 1200 * ex, rx=lerp(-25, 0, e), w=zw, a=1 - ex, shadow=1.0))
        def ed_text(cv):
            f = win(t, 13.95, 18.1, 0.2, 0.25)
            scrim(cv, 0, 620, 0.93 * f, WHITE)
            words_line(cv, [('NATIVE', 13.98), ('POWERPOINT.', 14.3)], 'disp', 78, CX, 250, t, [NAVY, NAVY], f)
            words_line(cv, [('100%', 16.15), ('EDITABLE.', 16.6)], 'disp', 78, CX, 370, t, [NAVY, NAVY], f, marker=(1, 16.8))
            a = clamp01((t - 16.9) / 0.25) * f
            if a > 0:
                k = ease_back((t - 16.9) / 0.35, 1.3)
                chip(cv, 'Right-click  ›  Edit Data', CX, 1500 - 20 * (1 - k), a)
        post.append(ed_text)

    # ---------- CHANGE THE COLOURS ONCE: real theme-colour variants 18.3 - 21.4 ----------
    if 18.2 <= t < 21.8:
        prev, cur, mix = pal_at(t)
        e = ease_out5((t - 18.2) / 0.65)
        ex = ease_in((t - 21.25) / 0.4)
        for n, x, z, ry, w_, dm in [(21, -330, 380, 24, 760, 0.86), (64, 330, 380, -24, 760, 0.86), (1, 0, 0, 0, 900, 1.0)]:
            base = dict(x=x * e, y=lerp(1300, Y3 + 40, e), z=z + 1200 * ex, ry=ry * e, w=w_, dim=dm, shadow=0.9 if n == 1 else 0.6)
            if mix < 1 and t >= PAL_T[1][0]:
                cards.append(Card(key(n, prev), a=1 - ex, **base))
            cards.append(Card(key(n, cur), a=(mix if t >= PAL_T[1][0] else 1) * (1 - ex), **base))
        def pal_text(cv):
            f = win(t, 18.3, 21.3, 0.2, 0.2)
            scrim(cv, 0, 620, 0.93 * f, WHITE)
            words_line(cv, [('CHANGE', 18.32), ('THE', 18.55), ('COLOURS', 18.7)], 'disp', 72, CX, 250, t, [NAVY, NAVY, NAVY], f)
            words_line(cv, [('ONCE.', 19.15)], 'disp', 72, CX, 352, t, [NAVY], f, marker=(0, 19.3))
            words_line(cv, [('EVERY', 19.95), ('SLIDE', 20.15), ('FOLLOWS.', 20.4)], 'disp', 72, CX, 454, t, [SLATE, SLATE, NAVY], f)
            # theme swatches (dark + accent of each colourway) with the active one ringed
            sw = [(None, NAVY, LIME), ('ocean', hexbgr('0B2540'), hexbgr('3EE6C1')), ('ember', hexbgr('1F1410'), hexbgr('FF8A3D'))]
            for i, (pn, dk, ac) in enumerate(sw):
                cx_ = CX + (i - 1) * 130; cy_ = 1540
                act = (pn == cur)
                if act: R.dot(cv, cx_, cy_, 50, NAVY, f)
                R.dot(cv, cx_, cy_, 44, WHITE, f); R.dot(cv, cx_, cy_, 40, dk, f)
                m = np.zeros((84, 84), np.float32); cv2.ellipse(m, (42, 42), (40, 40), 0, -90, 90, 1.0, -1, lineType=cv2.LINE_AA)
                stamp(cv, m, cx_ - 42, cy_ - 42, ac, f)
            text(cv, 'Design  ›  Variants  ›  Colors', 'in5', 30, CX, 1620, SLATE, f)
        post.append(pal_text)

    # ---------- CTA 21.4 - 27.0 ----------
    if cta_mix > 0:
        layer = navy_bg(t, 0.045)
        ccards = []
        for n, x, y, z, rz, d in [(13, -250, -20, 420, -7, 0.0), (15, 250, -20, 420, 7, 0.08), (1, 0, 20, 0, 0, 0.16)]:
            e = ease_out5((t - (21.55 + d)) / 0.85)
            hold = clamp01((t - 22.6) / 4.4)
            ccards.append(Card(n, x=x * e, y=lerp(1300, y, e), z=lerp(900, z - 50 * hold, e), rz=rz * e, rx=lerp(-30, 0, e), w=860,
                               dim=1 if n == 1 else 0.7, blur=0 if n == 1 else 1.6, a=clamp01((t - (21.55 + d)) / 0.2), shadow=1.0))
        for c in ccards: draw(layer, c)
        def cta_text(cv):
            a, d = rise(t, 21.65, 0.4, 24)
            text(cv, 'BUSINESS SALES', 'disp', 96, CX, 230 + d, WHITE, a)
            a2, d2 = rise(t, 21.85, 0.4, 24)
            wt = tw('TEMPLATE', 'disp', 96)
            text(cv, 'TEMPLATE', 'disp', 96, CX - 14, 340 + d2, WHITE, a2)
            square_tag(cv, CX + wt / 2 - 6, 340 + d2 + 82, 22, LIME, a2)
            a3, d3 = rise(t, 22.7, 0.4, 16)
            text(cv, '85+ LAYOUTS   ·   35+ NATIVE CHARTS   ·   100% EDITABLE', 'in7', 26, CX, 1250 + d3, MIST, a3, 3)
            a4, d4 = rise(t, 23.4, 0.45, 18)
            cta_button(cv, 'GET YOURS — LINK IN BIO', CX, 1320 + d4, a4)
        cta_text(layer)
    for c in cards: draw(cv, c)
    for fn in post: fn(cv)
    if cta_mix > 0:
        # lime-led panel wipe from the bottom into the navy end card
        u = ease_io(cta_mix); yb = int(H * (1 - u))
        cv[yb:] = layer[yb:]
        band = 26
        if 0 < u < 1: cv[max(yb - band, 0):yb] = LIME
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

# ======================================================================================
# AD 4 — Curiosity / professional result / value ("One system")
# ======================================================================================
AD4 = dict(dur=23.0, vo=[0.10, 3.05, 4.55, 6.05, 8.30, 10.0, 12.05, 13.65, 16.95])
GC, GR = 9, 11
ORDER = list(range(1, 100))
ORDER.remove(1); ORDER.insert(5 * GC + 4, 1)          # the cover sits in the centre cell

def grid_cards(t, tile, gap, Rm, T, a=1.0, dimall=1.0, blur=0.0, skip=None):
    out = []
    th = tile * AR
    for k, n in enumerate(ORDER):
        if n == skip: continue
        c, r = k % GC, k // GC
        u = (c - (GC - 1) / 2) * (tile + gap); v = (r - (GR - 1) / 2) * (th + gap)
        P = Rm @ np.array([u, v, 0.0]) + T
        if P[2] < -FOCAL + 300: continue
        out.append(Card(n, x=P[0], y=P[1], z=P[2], rx=0, w=tile, a=a, dim=dimall, blur=blur, shadow=0.0))
    return out

def ad4(t):
    cv = navy_bg(t)
    cards, post = [], []
    Y4 = 170

    # ---------- HOOK 0 - 4.5: macro on the cover art -> pull back -> 1 of 99 slides ----------
    if t < 4.6:
        e = ease_io(t / 1.5)
        fu, fv = 0.80, 0.42
        w_ = lerp(5200, 980, e)
        cx_ = lerp(-(fu - 0.5) * 5200, 0, e); cy_ = lerp(-(fv - 0.5) * 5200 * AR + Y4, Y4, e)
        g = ease_io((t - 1.45) / 1.1)                    # cover shrinks into its grid cell
        tile, gap = 108, 8
        tilt = ease_io((t - 3.0) / 1.3)
        Rm = R.rot(52 * tilt, 0, -10 * tilt)
        T = np.array([0, Y4 + 60 - 240 * tilt, -600 * tilt])
        if g > 0:
            cards += grid_cards(t, tile, gap, Rm, T, a=clamp01((t - 1.5) / 0.35) * (1 - clamp01((t - 4.25) / 0.3)), skip=1)
        cpos = Rm @ np.array([0.0, 0.0, 0.0]) + T
        cards.append(Card(1, x=lerp(cx_, cpos[0], g), y=lerp(cy_, cpos[1], g), z=lerp(0, cpos[2], g), rx=52 * tilt, rz=-10 * tilt,
                          w=lerp(w_, tile, g), a=1 - clamp01((t - 4.25) / 0.3), shadow=0.0 if g > 0.5 else 1.0))
        def hook_text(cv):
            f = 1 - clamp01((t - 2.9) / 0.25)
            scrim(cv, 0, 700, 0.9, NAVY) if t < 3.2 else None
            pop(cv, '99', 'disp', 210, CX, 170, t, -0.3, LIME, f, dur=0.2)
            words_line(cv, [('SLIDES.', 0.5)], 'disp', 96, CX, 400, t, [WHITE], f)
            words_line(cv, [('ONE', 1.55), ('SYSTEM.', 1.85)], 'disp', 96, CX, 512, t, [WHITE, WHITE], f)
            g2 = win(t, 3.05, 4.4, 0.2, 0.2)
            if g2 > 0:
                scrim(cv, 0, 520, 0.85 * g2, NAVY)
                a, d = rise(t, 3.05, 0.35, 18); eyebrow(cv, "WHAT'S INSIDE", CX, 300 + d, a * g2, WHITE)
        post.append(hook_text)

    # ---------- FIVE COVER STYLES 4.4 - 6.0: fanned like a hand of cards ----------
    if 4.35 <= t < 6.3:
        ex = ease_in((t - 5.85) / 0.4)
        for i, n in enumerate([11, 12, 13, 14, 15]):
            k = i - 2
            e = ease_out5((t - (4.4 + 0.05 * i)) / 0.65)
            cards.append(Card(n, x=k * 150 * e, y=Y4 + 120 + abs(k) * 40 * e + 1500 * ex, z=lerp(800, abs(k) * 60, e), rz=k * 9 * e, w=760,
                              a=clamp01((t - (4.4 + 0.05 * i)) / 0.2), dim=1 - 0.12 * abs(k), shadow=0.9))
        def cov_text(cv):
            f = win(t, 4.55, 6.0, 0.15, 0.2)
            scrim(cv, 0, 560, 0.85 * f, NAVY)
            words_line(cv, [('5', 4.55), ('COVER', 4.7), ('STYLES', 4.95)], 'disp', 84, CX, 300, t, [LIME, WHITE, WHITE], f)
        post.append(cov_text)

    # ---------- SALES FUNNELS & PIPELINE 6.0 - 8.3 ----------
    if 5.95 <= t < 8.6:
        ex = ease_in((t - 8.15) / 0.4)
        for n, ys, sd, t0 in [(49, 10, -1, 6.0), (50, 470, 1, 6.25)]:
            e = ease_out5((t - t0) / 0.6)
            push = ease_io((t - 6.8) / 1.4)
            cards.append(Card(n, x=lerp(sd * 1250, 0, e) - sd * 1500 * ex, y=ys, z=lerp(300, -20, e) - 40 * push, ry=lerp(-sd * 35, sd * 4, e), w=900,
                              a=clamp01((t - t0) / 0.15), shadow=0.9))
        def fun_text(cv):
            f = win(t, 6.05, 8.2, 0.15, 0.2)
            scrim(cv, 0, 520, 0.88 * f, NAVY)
            words_line(cv, [('SALES', 6.05), ('FUNNELS', 6.3)], 'disp', 78, CX, 250, t, [WHITE, LIME], f)
            words_line(cv, [('&', 7.0), ('PIPELINE', 7.15), ('VIEWS', 7.5)], 'disp', 78, CX, 352, t, [MIST, WHITE, WHITE], f)
        post.append(fun_text)

    # ---------- EXECUTIVE DASHBOARDS 8.3 - 10.0 ----------
    if 8.25 <= t < 10.3:
        ex = ease_in((t - 9.85) / 0.35)
        e2 = ease_out5((t - 8.3) / 0.7)
        cards.append(Card(63, x=lerp(-200, -150, e2) - 1400 * ex, y=lerp(900, Y4 - 110, e2), z=lerp(900, 420, e2), rz=-4, ry=12, w=900, dim=0.7, blur=1.6, a=clamp01((t - 8.3) / 0.2)))
        e = ease_out5((t - 8.42) / 0.7)
        cards.append(Card(64, x=lerp(0, 40, e) + 1400 * ex, y=lerp(1400, Y4 + 230, e), z=lerp(500, -60, e), rx=lerp(-30, 0, e), w=980, a=clamp01((t - 8.42) / 0.2), shadow=1.0))
        def db_text(cv):
            f = win(t, 8.3, 9.95, 0.15, 0.2)
            scrim(cv, 0, 520, 0.88 * f, NAVY)
            words_line(cv, [('EXECUTIVE', 8.32)], 'disp', 84, CX, 250, t, [WHITE], f)
            words_line(cv, [('DASHBOARDS', 8.75)], 'disp', 84, CX, 360, t, [LIME], f)
        post.append(db_text)

    # ---------- PROFIT BRIDGES & FORECASTS 10.0 - 12.0: whip-pans ----------
    if 9.95 <= t < 12.3:
        for n, t0, t1 in [(71, 10.0, 11.0), (72, 10.95, 12.0)]:
            ein = ease_out5((t - t0) / 0.45); eout = ease_in((t - t1) / 0.3)
            if t < t0: continue
            x = lerp(1250, 0, ein) - 1250 * eout
            spd = abs(1250 * (ease_out5((t - t0 + 0.01) / 0.45) - ein)) + abs(1250 * (ease_in((t - t1 + 0.01) / 0.3) - eout))
            cards.append(Card(n, x=x, y=Y4 + 150, z=-40, w=1000, blur=min(spd * 0.6, 8), a=1 - eout, shadow=1.0))
        def pb_text(cv):
            f = win(t, 10.0, 11.95, 0.15, 0.2)
            scrim(cv, 0, 520, 0.88 * f, NAVY)
            words_line(cv, [('PROFIT', 10.02), ('BRIDGES', 10.3)], 'disp', 80, CX, 250, t, [WHITE, LIME], f)
            words_line(cv, [('&', 10.95), ('FORECASTS', 11.1)], 'disp', 80, CX, 355, t, [MIST, WHITE], f)
        post.append(pb_text)

    # ---------- STRATEGY ROADMAPS 12.0 - 13.6 ----------
    if 11.95 <= t < 13.9:
        ex = ease_in((t - 13.45) / 0.35)
        e = ease_out5((t - 12.0) / 0.7)
        cards.append(Card(80, x=lerp(300, 180, e), y=lerp(1500, Y4 - 60, e), z=lerp(700, 450, e) + 900 * ex, rz=5, ry=-14, w=880, dim=0.7, blur=1.6, a=1 - ex))
        e2 = ease_out5((t - 12.12) / 0.7)
        cards.append(Card(82, x=lerp(-60, -30, e2), y=lerp(1700, Y4 + 240, e2), z=lerp(600, -50, e2) + 900 * ex, rx=lerp(-40, 0, e2), w=980, a=1 - ex, shadow=1.0))
        def sr_text(cv):
            f = win(t, 12.05, 13.5, 0.15, 0.2)
            scrim(cv, 0, 520, 0.88 * f, NAVY)
            words_line(cv, [('STRATEGY', 12.07)], 'disp', 84, CX, 250, t, [WHITE], f)
            words_line(cv, [('ROADMAPS', 12.5)], 'disp', 84, CX, 360, t, [LIME], f)
        post.append(sr_text)

    # ---------- EVERY CHART IS NATIVE 13.6 - 16.9: the chart-library slides assemble 2x2 ----------
    if 13.55 <= t < 17.3:
        ex = ease_in((t - 16.8) / 0.4)
        zoom = ease_io((t - 15.25) / 1.0)
        for i, n in enumerate([93, 94, 95, 96]):
            c, r = i % 2, i // 2
            e = ease_out5((t - (13.65 + 0.1 * i)) / 0.6)
            tx, ty = (c - 0.5) * 520, Y4 + 120 + (r - 0.5) * 300
            sx, sy = (c - 0.5) * 2600, Y4 + (r - 0.5) * 2600
            x, y, w_ = lerp(sx, tx, e), lerp(sy, ty, e), 500
            if n == 95:
                x, y, w_ = lerp(x, 0, zoom), lerp(y, Y4 + 190, zoom), lerp(500, 1000, zoom)
            else:
                w_ = w_ * (1 - 0.15 * zoom)
            cards.append(Card(n, x=x, y=y, z=(0 if n == 95 else 200 * zoom) + 900 * ex, w=w_, dim=1 - 0.4 * zoom * (n != 95), blur=2 * zoom * (n != 95),
                              a=clamp01((t - (13.65 + 0.1 * i)) / 0.15) * (1 - ex), shadow=0.8))
        cards.sort(key=lambda c: -c.z)
        def nat_text(cv):
            f = win(t, 13.67, 16.8, 0.15, 0.25)
            scrim(cv, 0, 560, 0.88 * f, NAVY)
            words_line(cv, [('EVERY', 13.67), ('CHART', 13.95)], 'disp', 80, CX, 230, t, [WHITE, WHITE], f)
            words_line(cv, [('IS', 14.3), ('NATIVE.', 14.45)], 'disp', 80, CX, 335, t, [WHITE, LIME], f)
            a = clamp01((t - 15.55) / 0.25) * f
            if a > 0: chip(cv, 'Right-click  ›  Edit Data', CX, 470 + 18 * (1 - ease_back((t - 15.55) / 0.35, 1.3)), a)
        post.append(nat_text)

    # ---------- CTA 16.9 - 23.0 ----------
    if t >= 16.85:
        u = t - 16.85
        rise_ = ease_out5(u / 1.3)
        Rm = R.rot(55, 0, -12)
        T = np.array([0, lerp(1200, 330, rise_) - 60 * clamp01((t - 18.0) / 5.0), 900])
        dimk = ease_io((t - 17.6) / 0.8)
        cards += grid_cards(t, 150, 10, Rm, T, a=clamp01(u / 0.4), dimall=1 - 0.5 * dimk, blur=2.5 * dimk, skip=1)
        e = ease_out5((t - 17.5) / 1.0)
        hold = clamp01((t - 18.5) / 4.5)
        cards.append(Card(1, x=0, y=lerp(1300, -10, e), z=lerp(700, -50 * hold, e), rx=lerp(-30, 0, e), w=900, a=clamp01((t - 17.5) / 0.2), shadow=1.0))
        def cta_text(cv):
            scrim(cv, 0, 600, 0.92 * clamp01(u / 0.3), NAVY)
            a, d = rise(t, 17.0, 0.4, 24)
            text(cv, 'BUSINESS SALES', 'disp', 96, CX, 210 + d, WHITE, a)
            a2, d2 = rise(t, 17.2, 0.4, 24)
            wt = tw('TEMPLATE', 'disp', 96)
            text(cv, 'TEMPLATE', 'disp', 96, CX - 14, 320 + d2, WHITE, a2)
            square_tag(cv, CX + wt / 2 - 6, 320 + d2 + 82, 22, LIME, a2)
            scrim(cv, 1170, 1920, 0.9 * clamp01((t - 18.3) / 0.4), NAVY, top=False)
            a3, d3 = rise(t, 18.35, 0.4, 16)
            text(cv, '99 SLIDES   ·   ONE GRID, ONE PALETTE, ONE TYPE SYSTEM', 'in7', 24, CX, 1255 + d3, MIST, a3, 2)
            a4, d4 = rise(t, 18.85, 0.45, 18)
            cta_button(cv, 'EXPLORE IT — LINK IN BIO', CX, 1320 + d4, a4)
        post.append(cta_text)

    for c in cards: draw(cv, c)
    for fn in post: fn(cv)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

ADS = {'ad3': (ad3, AD3), 'ad4': (ad4, AD4)}

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
