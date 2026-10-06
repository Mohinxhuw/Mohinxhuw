"""Business Presentation Pro (Vanta Template 02) — three 9:16 retargeting ads (r1 value, r2 professional result,
r3 overcome hesitation). Every slide image is a render of template02/Vanta_Business_Presentation_Template_02.pptx
(reel2/slides/sNN.png). The brand-colour answer in r3 uses renders of the same file with only its theme colours
changed (rt/slides_alt/alt_sNN.png) and only on slides where the whole design follows the theme.
Built on the Business Presentation Pro ad helpers (ads/ads.py) and the 3D card compositor (reel2/reel2.py).

usage: python3 rt.py r1|r2|r3 stills t1 t2 ...  |  python3 rt.py r1|r2|r3 render out.mp4
"""
import os, sys, math, subprocess, functools
import numpy as np, cv2
HERE = os.path.dirname(os.path.abspath(__file__))
for p in (os.path.join(HERE, '..', 'ads'), os.path.join(HERE, '..', 'business-presentation-pro-ads'), os.path.join(HERE, '..', 'reel2'), os.path.join(HERE, '..', 'vanta02')):
    sys.path.insert(0, p)
import ads as A
import reel2 as R
from reel2 import Card, pose, blend, clamp01, ease_io, ease_out, ease_out5, ease_in, ease_back, lerp, win, rise, text, text_mask, tw, stamp, pill, dot, W, H, CX, CY, AR, FOCAL, hexbgr
from reel2 import DEEP, DEEP2, COBALT, CORAL, IVORY, SKY, INK, WHITE, MIST, STONE, PEACH
from ads import pop, words_line, rect, arrow_cursor, scrim, card_rect, reflect, light_sweep, circle_wipe, BG1, BG2, NIGHT, GREY, LGREY, CORALD

FPS = int(os.environ.get('FPS', 60))
_base_tex = A.tex
@functools.lru_cache(maxsize=64)
def tex(n, lw):
    if isinstance(n, str) and n.startswith('alt'):
        src = cv2.imread(os.path.join(HERE, 'slides_alt', n + '.png'), cv2.IMREAD_COLOR)[:2160, :3840]
        h = int(round(lw * AR))
        img = cv2.resize(src, (lw, h), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
        return img, _base_tex(1, lw)[1]
    return _base_tex(n, lw)
R.tex = tex
draw = R.draw_card
BG_COB = R.BG_COB

def chip(cv, s, cx, y, a, bg=WHITE, fg=INK, size=28, track=3):
    if a <= 0: return
    w_ = tw(s, 'sans-b', size, track) + 60; h = int(size * 2.15)
    pill(cv, int(cx - w_ / 2), int(y), int(w_), h, bg, a); text(cv, s, 'sans-b', size, cx, y + (h - size * 1.2) / 2 - 2, fg, a, track)

def cta_button(cv, s, cx, y, a, w_=640, h=112):
    if a <= 0: return
    pill(cv, int(cx - w_ / 2), int(y), w_, h, CORAL, a); text(cv, s, 'sans-b', 38, cx, y + 31, INK, a, 2)

def check_dot(cv, cx, cy, done, a, r=20):
    if a <= 0: return
    dot(cv, int(cx), int(cy), r, CORAL if done > 0 else MIST, a)
    if done > 0:
        m = np.zeros((r * 2 + 8, r * 2 + 8), np.float32)
        pts = np.array([[r * 0.55, r * 1.05], [r * 0.9, r * 1.4], [r * 1.5, r * 0.7]], np.float32) + 4
        k = clamp01(done)
        cv2.polylines(m, [pts[:2 + (k > 0.5)].astype(np.int32)], False, 1.0, 4, lineType=cv2.LINE_AA)
        stamp(cv, m, cx - r - 4, cy - r - 4, WHITE, a)

def blank_ui(cv, x, y, w_, a=1.0):
    x0, y0, ww, hh = card_rect(x, y, w_)
    rect(cv, x0 + ww * .08, y0 + hh * .22, x0 + ww * .92, y0 + hh * .46, GREY, 0.9 * a, lw=2, dash=True)
    rect(cv, x0 + ww * .08, y0 + hh * .54, x0 + ww * .92, y0 + hh * .80, GREY, 0.9 * a, lw=2, dash=True)
    text(cv, 'Click to add title', 'sans', int(40 * w_ / 960), CX + x, y0 + hh * .29, GREY, a)
    text(cv, 'Click to add text', 'sans', int(28 * w_ / 960), CX + x, y0 + hh * .63, GREY, a)

# ======================================================================================
# R1 — VALUE / WHY BUY: "Here's exactly what you get" (ivory, building checklist)
# ======================================================================================
R1 = dict(dur=28.6, vo=[0.05, 1.40, 3.35, 6.65, 10.85, 13.85, 18.35, 20.45, 23.75])
FAN = [19, 23, 42, 30, 56]
CHECKS = [('60 finished slides', 3.35), ('42 native charts', 6.65), ('Dashboards', 10.85), ('Every business area', 13.85), ('Speaker notes', 18.35)]
NOTE19 = 'PERFORMANCE DASHBOARD. Dark dashboard: KPI strip, native line chart (actual vs dashed plan) and a native bar chart.'

def r1(t):
    cv = BG1.copy(); cards, post = [], []
    Y = 170
    # ---- HOOK 0 - 3.35: the cover opens and real slides fan out behind it ----
    if t < 3.9:
        fan = ease_out5((t - 0.12) / 1.1)
        col = ease_io((t - 3.2) / 0.6)
        for i, n in enumerate(FAN):
            k = i - 2
            cards.append(Card(n, x=k * 40 * fan, y=Y + k * 205 * fan * (1 - col), z=lerp(60, 160 + abs(k) * 70, fan) + 600 * col, rz=k * 2.5 * fan, rx=8 * fan, w=820,
                              dim=1 - 0.08 * abs(k), a=(1 - col), shadow=0.7))
        cards.sort(key=lambda c: -c.z)
        cards.append(Card(1, x=0, y=Y + 10 * math.sin(t * 1.4), z=lerp(0, -80, fan) + 900 * col, rx=0, w=920, a=1 - col, shadow=1.0))
        def hook_text(cv):
            f = 1 - clamp01((t - 3.15) / 0.2)
            scrim(cv, 0, 600, 0.9 * f, IVORY)
            a, d = rise(t, -0.4, 0.4, 16)
            text(cv, "You've already looked at it.", 'serif-i', 62, CX, 190 + d, INK, a * f)
            words_line(cv, [("HERE'S", 1.40), ('EXACTLY', 1.62)], 'sans-b', 92, CX, 290, t, [INK, INK], f)
            words_line(cv, [('WHAT', 2.05), ('YOU', 2.25), ('GET.', 2.4)], 'sans-b', 92, CX, 402, t, [CORALD, CORALD, CORALD], f)
        post.append(hook_text)

    # ---- checklist rail (persistent from 3.35 to the CTA) ----
    def rail(cv):
        a = clamp01((t - 3.3) / 0.3) * (1 - clamp01((t - 20.3) / 0.25))
        if a <= 0: return
        n = len(CHECKS); gap = 150; x0 = CX - gap * (n - 1) / 2
        for i, (lab, t0) in enumerate(CHECKS):
            done = clamp01((t - (t0 + 0.35)) / 0.25)
            check_dot(cv, x0 + i * gap, 1530, done, a)
            if i < n - 1:
                ln = clamp01((t - (CHECKS[i + 1][1])) / 0.3)
                cv[1529:1532, int(x0 + i * gap + 24):int(x0 + i * gap + 24 + (gap - 48) * ln)] = CORAL
        cur = max([i for i, (_, t0) in enumerate(CHECKS) if t >= t0] or [0])
        text(cv, f'{cur + 1} / {n}', 'sans-b', 22, CX + gap * (n - 1) / 2 + 50, 1518, STONE, a, 2, anchor='l')
    post.append(rail)

    # ---- 1. 60 finished slides 3.35 - 6.65: the whole deck as a contact sheet ----
    if 3.2 <= t < 7.0:
        u = t - 3.2; e = ease_out5(u / 0.9); ex = ease_in((t - 6.5) / 0.45)
        Rm = R.rot(14, 0, -6); tile, gap = 150, 12
        T = np.array([0, lerp(900, 120, e) - 90 * u, 300])
        for k in range(60):
            c, r = k % 6, k // 6
            P = Rm @ np.array([(c - 2.5) * (tile + gap), (r - 4.5) * (tile * AR + gap), 0]) + T
            cards.append(Card(k + 1, x=P[0], y=P[1], z=P[2] + 900 * ex, rx=14, rz=-6, w=tile, a=clamp01(u / 0.35) * (1 - ex), shadow=0.0))
        def t1(cv):
            f = win(t, 3.35, 6.5, 0.2, 0.2); scrim(cv, 0, 620, 0.94 * f, IVORY)
            n = int(round(60 * ease_out(clamp01((t - 3.4) / 0.7))))
            pop(cv, str(n), 'sans-b', 200, CX, 215, t, 3.38, CORALD, f, dur=0.25)
            words_line(cv, [('FINISHED', 3.8), ('SLIDES', 4.05)], 'sans-b', 56, CX, 440, t, [INK, INK], f)
            a, d = rise(t, 5.0, 0.4, 12); text(cv, 'from agenda to next steps', 'serif-i', 44, CX, 520 + d, STONE, a * f)
        post.append(t1)

    # ---- 2. 42 native charts 6.65 - 10.7 ----
    if 6.5 <= t < 11.0:
        e = ease_out5((t - 6.55) / 0.7); ex = ease_in((t - 10.55) / 0.4)
        for n, x, z, ry, t0 in [(41, -300, 420, 22, 9.0), (42, 300, 420, -22, 9.12)]:
            if t > t0:
                e2 = ease_out5((t - t0) / 0.6)
                cards.append(Card(n, x=x * e2, y=Y + 40, z=lerp(900, z, e2) + 900 * ex, ry=ry * e2, w=820, dim=0.85, blur=1.4, a=clamp01((t - t0) / 0.2) * (1 - ex), shadow=0.6))
        cards.append(Card(23, x=0, y=lerp(1400, Y + 80, e), z=lerp(500, 0, e) + 900 * ex, rx=lerp(-25, 0, e), w=940, a=clamp01((t - 6.55) / 0.2) * (1 - ex), shadow=1.0))
        def t2(cv):
            f = win(t, 6.65, 10.6, 0.2, 0.2); scrim(cv, 0, 620, 0.94 * f, IVORY)
            pop(cv, '42', 'sans-b', 200, CX, 215, t, 6.68, CORALD, f, dur=0.25)
            words_line(cv, [('NATIVE', 7.1), ('CHARTS', 7.35)], 'sans-b', 56, CX, 440, t, [INK, INK], f)
            a = clamp01((t - 8.45) / 0.25) * f
            if a > 0: chip(cv, 'RIGHT-CLICK  ›  EDIT DATA', CX, 520 + 16 * (1 - ease_back((t - 8.45) / 0.35, 1.3)), a, bg=INK, fg=WHITE, size=26)
        post.append(t2)

    # ---- 3. Dashboards 10.85 - 13.7: the three named in the file ----
    if 10.7 <= t < 14.0:
        ex = ease_in((t - 13.6) / 0.4); labs = []
        for i, (n, lab, sd) in enumerate([(19, 'PERFORMANCE', -1), (20, 'KPI', 1), (56, 'CAMPAIGN', -1)]):
            t0 = 10.85 + i * 0.55
            if t < t0 - 0.05: continue
            e = ease_out5((t - t0) / 0.6)
            y = 20 + i * 340
            cards.append(Card(n, x=lerp(sd * 1300, sd * -20, e) - sd * 1500 * ex, y=y, z=lerp(400, -i * 10, e), ry=lerp(-sd * 35, sd * 5, e), rz=sd * 1.2, w=760, shadow=0.9))
            labs.append((lab, y, e, t0))
        def t3(cv):
            f = win(t, 10.85, 13.6, 0.2, 0.2); scrim(cv, 0, 330, 0.9 * f, IVORY)
            words_line(cv, [('DASHBOARDS', 10.88)], 'sans-b', 72, CX, 190, t, [INK], f)
            for lab, y, e, t0 in labs:
                a = clamp01((t - (t0 + 0.3)) / 0.2) * f
                x0, y0, ww, hh = card_rect(0, y, 760)
                chip(cv, lab, x0 + 120, y0 - 18, a, bg=CORAL, fg=INK, size=22)
        post.append(t3)

    # ---- 4. Every business area 13.85 - 18.2: 2x2 sections ----
    if 13.7 <= t < 18.5:
        ex = ease_in((t - 18.05) / 0.4); pile = ease_io((t - 16.9) / 0.6)
        quad = [(30, 'SALES', 13.9, -1, -1), (38, 'FINANCE', 14.4, 1, -1), (44, 'STRATEGY', 15.05, -1, 1), (14, 'MARKET ANALYSIS', 15.6, 1, 1)]
        info = []
        for n, lab, t0, cx_, cy_ in quad:
            if t < t0 - 0.05: continue
            e = ease_out5((t - t0) / 0.55)
            tx, ty = cx_ * 262, Y + 60 + cy_ * 175
            px, py = lerp(tx, cx_ * 30, pile), lerp(ty, Y + 60 + cy_ * 26, pile)
            cards.append(Card(n, x=lerp(cx_ * 1200, tx, e) * (1 - pile) + px * pile if pile > 0 else lerp(cx_ * 1200, tx, e), y=lerp(cy_ * 1400, ty, e) if pile == 0 else py,
                              z=lerp(300, 0, e) + 900 * ex, rz=cx_ * 3 * pile, w=lerp(500, 780, pile), a=clamp01((t - t0 + 0.05) / 0.2) * (1 - ex), shadow=0.8))
            info.append((lab, tx, ty, t0))
        def t4(cv):
            f = win(t, 13.85, 18.0, 0.2, 0.2); scrim(cv, 0, 470, 0.92 * f, IVORY)
            a, d = rise(t, 13.88, 0.35, 16)
            text(cv, 'EVERY BUSINESS AREA', 'sans-b', 60, CX, 210 + d, INK, a * f, 1)
            a2, d2 = rise(t, 16.9, 0.4, 16)
            text(cv, 'already structured.', 'serif-i', 56, CX, 300 + d2, CORALD, a2 * f)
            for lab, tx, ty, t0 in info:
                a = clamp01((t - (t0 + 0.25)) / 0.2) * f * (1 - pile)
                x0, y0, ww, hh = card_rect(tx, ty, 500)
                chip(cv, lab, x0 + ww / 2, y0 + hh - 30, a, bg=INK, fg=WHITE, size=20)
        post.append(t4)

    # ---- 5. Speaker notes 18.35 - 20.3: the real note under the real slide ----
    if 18.2 <= t < 20.6:
        e = ease_out5((t - 18.25) / 0.6); ex = ease_in((t - 20.25) / 0.35)
        cards.append(Card(19, x=0, y=lerp(1300, -90, e) - 1400 * ex, z=lerp(500, 0, e), rx=lerp(-20, 0, e), w=900, a=clamp01((t - 18.25) / 0.2), shadow=1.0))
        def t5(cv):
            f = win(t, 18.35, 20.25, 0.2, 0.15); scrim(cv, 0, 460, 0.92 * f, IVORY)
            words_line(cv, [('SPEAKER', 18.38), ('NOTES', 18.62)], 'sans-b', 72, CX, 210, t, [INK, INK], f)
            a, d = rise(t, 18.95, 0.35, 12); text(cv, 'on every slide', 'serif-i', 52, CX, 305 + d, CORALD, a * f)
            # notes pane (PowerPoint-style), typing the slide's actual note
            pa = clamp01((t - 18.7) / 0.25) * f * (1 - ex)
            if pa > 0:
                x0, y0 = 90, 1240 - 1400 * ex
                rect(cv, x0, y0, W - 90, y0 + 230, MIST, pa, fill=WHITE, lw=2)
                text(cv, 'Click to add notes', 'sans', 20, x0 + 24, y0 + 14, GREY, pa * 0.0, anchor='l')
                text(cv, 'NOTES', 'sans-b', 20, x0 + 24, y0 + 18, STONE, pa, 3, anchor='l')
                n = int(len(NOTE19) * clamp01((t - 18.9) / 1.0))
                words = NOTE19[:n].split(' '); line = ''; lines = []
                for w_ in words:
                    if tw(line + ' ' + w_, 'sans', 30) > W - 240: lines.append(line); line = w_
                    else: line = (line + ' ' + w_).strip()
                lines.append(line)
                for j, ln in enumerate(lines[:4]): text(cv, ln, 'sans', 30, x0 + 24, y0 + 62 + j * 42, INK, pa, anchor='l')
        post.append(t5)

    # ---- 6. From a blank slide... 20.45 - 23.6 ----
    if 20.3 <= t < 23.9:
        e = ease_out5((t - 20.35) / 0.6); ex = ease_in((t - 23.45) / 0.4)
        burst = ease_out5((t - 21.9) / 1.0)
        rng = np.random.default_rng(2)
        for k in range(24):
            ang = rng.uniform(0, 2 * math.pi); rad = rng.uniform(380, 900)
            n = int(rng.integers(2, 61))
            cards.append(Card(n, x=math.cos(ang) * rad * burst, y=Y + 60 + math.sin(ang) * rad * 1.3 * burst, z=600 + rng.uniform(0, 600), rz=rng.uniform(-14, 14),
                              w=420, a=burst * (1 - ex), dim=0.85, blur=1.5, shadow=0.4))
        cards.sort(key=lambda c: -c.z)
        cards.append(Card('blank', x=0, y=lerp(1300, Y + 60, e), z=900 * ex, rx=lerp(-20, 0, e), w=760, shadow=1.0))
        def t6(cv):
            blank_ui(cv, 0, lerp(1300, Y + 60, e), 760, clamp01((t - 20.6) / 0.3) * (1 - ex))
            f = win(t, 20.45, 23.5, 0.2, 0.2); scrim(cv, 0, 520, 0.92 * f, IVORY)
            words_line(cv, [('FROM', 20.48), ('A', 20.65), ('BLANK', 20.75), ('SLIDE,', 21.0)], 'sans-b', 74, CX, 240, t, [INK, INK, INK, INK], f)
            a, d = rise(t, 21.9, 0.35, 14)
            text(cv, "you'd build all of this yourself.", 'serif-i', 54, CX, 345 + d, CORALD, a * f)
        post.append(t6)

    # ---- CTA 23.6 - 28.6 ----
    wipe = ease_in(clamp01((t - 23.4) / 0.5)) * 2400
    layer = None
    if wipe > 0:
        layer = BG_COB.copy(); R.orbit_layer(layer, t, clamp01((t - 23.6) / 0.6))
        for n, x, y, z, ry, rz, d in [(23, -250, -60, 420, 18, -6, 0.0), (19, 250, -60, 420, -18, 6, 0.08), (1, 0, -30, 0, 0, 0, 0.16)]:
            e = ease_out5((t - (23.75 + d)) / 0.8); hold = clamp01((t - 24.8) / 3.8)
            draw(layer, Card(n, x=x * e, y=lerp(1200, y, e), z=lerp(900, z - 40 * hold, e), ry=ry * e, rz=rz * e, rx=lerp(-30, 0, e), w=780,
                             dim=1 if n == 1 else 0.8, blur=0 if n == 1 else 1.4, a=clamp01((t - (23.75 + d)) / 0.2), shadow=1.0))
        a, d = rise(t, 23.8, 0.45, 20); text(layer, 'Business Presentation Pro', 'serif', 74, CX, 250 + d, WHITE, a)
        n = len(CHECKS); gap = 150; x0 = CX - gap * (n - 1) / 2
        for i in range(n): check_dot(layer, x0 + i * gap, 400, clamp01((t - 24.0 - i * 0.08) / 0.2), clamp01((t - 23.9) / 0.3))
        a, d = rise(t, 24.4, 0.4, 16); text(layer, '60 SLIDES  ·  42 NATIVE CHARTS  ·  SPEAKER NOTES', 'sans-b', 24, CX, 1190 + d, SKY, a, 3)
        a, d = rise(t, 24.9, 0.45, 18); cta_button(layer, 'GET IT — LINK IN BIO', CX, 1250 + d, a, w_=640)
    if wipe < 2300:
        for c in cards: draw(cv, c)
        for fn in post: fn(cv)
    if layer is not None:
        cv = circle_wipe(cv, layer, CX, 1100, wipe) if wipe < 2300 else layer
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

# ======================================================================================
# R2 — PROFESSIONAL RESULT: "Picture this on the screen in your next meeting" (dark presentation mode)
# ======================================================================================
R2 = dict(dur=22.2, vo=[0.05, 3.0, 5.4, 8.2, 11.0, 13.5, 16.4])
# (time the slide arrives, slide, focus (u, v, zoom) during its stay, top label)
DECK = [(0.0, 1, None, None), (3.0, 3, (0.30, 0.55, 1.35), 'A CLEAR AGENDA'), (5.4, 19, (0.50, 0.30, 1.45), 'RESULTS ON A REAL DASHBOARD'),
        (8.2, 23, (0.83, 0.50, 1.6), 'NUMBERS, EXPLAINED'), (9.6, 42, None, 'NUMBERS, EXPLAINED'), (11.0, 44, None, 'STRATEGY AS A PLAN'),
        (12.15, 46, None, 'STRATEGY AS A PLAN'), (13.5, 59, (0.80, 0.62, 1.55), 'THE DECISION YOU NEED'), (15.25, 60, None, None)]
SW = 1000; SY = 140

def slide_pose(t, i):
    """Pose of DECK[i] at time t: pushed in from the right on arrival, out to the left when the next arrives."""
    t0, n, foc, _ = DECK[i]
    t1 = DECK[i + 1][0] if i + 1 < len(DECK) else 99
    ein = 1.0 if i == 0 else ease_out5((t - t0) / 0.55)
    eout = ease_in((t - t1) / 0.45)
    x = lerp(SW * 1.15, 0, ein) - SW * 1.15 * eout
    z = 160 * (1 - ein) + 160 * eout
    w_ = SW
    y = SY
    if foc is not None:
        u, v, zm = foc
        k = ease_io((t - (t0 + 0.7)) / 1.2) * (1 - ease_io((t - (t1 - 0.5)) / 0.45))
        w_ = SW * lerp(1, zm, k)
        x += -(u - 0.5) * (w_ - SW); y += -(v - 0.5) * (w_ - SW) * AR
    return dict(x=x, y=y, z=z, w=w_, a=1.0 if eout < 1 else 0.0)

def r2(t):
    cv = BG2.copy(); cards, post = [], []
    end = ease_io((t - 16.25) / 1.0)
    # projector glow behind the screen
    glow = 0.22 * clamp01(t / 0.35) * (1 - 0.6 * end)
    g = np.zeros((H, W), np.float32); x0, y0, ww, hh = card_rect(0, SY, SW)
    cv2.rectangle(g, (int(x0), int(y0)), (int(x0 + ww), int(y0 + hh)), 1.0, -1)
    g = cv2.GaussianBlur(g, (0, 0), 70) * glow
    cv += g[..., None] * (SKY - cv)
    for i in range(len(DECK)):
        t0 = DECK[i][0]; t1 = DECK[i + 1][0] if i + 1 < len(DECK) else 99
        if t < t0 - 0.01 or t > t1 + 0.5: continue
        p = slide_pose(t, i)
        if end > 0:
            p = blend(p, dict(x=0, y=SY + 80, z=700, w=SW, a=p['a']), end)
        c = Card(DECK[i][1], shadow=0.8, **p)
        cards.append(reflect(c)); cards.append(c)
    # projector bloom on the very first frames
    def bloom(cv):
        b = 0.0
        if b > 0:
            m = np.zeros((H, W), np.float32); cv2.rectangle(m, (int(x0), int(y0)), (int(x0 + ww), int(y0 + hh)), 1.0, -1)
            m = cv2.GaussianBlur(m, (0, 0), 25) * b; cv[:] = cv + m[..., None] * (WHITE - cv)
    post.append(bloom)
    def ui(cv):
        # slide counter + progress
        cur = max(i for i in range(len(DECK)) if t >= DECK[i][0] - 0.25)
        n = DECK[cur][1]; a = 1 - clamp01((t - 16.1) / 0.3)
        if a > 0:
            x0b, y0b, wwb, hhb = card_rect(0, SY, SW)
            yb = y0b + hhb + 300
            text(cv, f'{n:02d} / 60', 'sans-b', 26, x0b, yb - 44, SKY, a, 3, anchor='l')
            cv[int(yb):int(yb + 4), int(x0b):int(x0b + wwb)] = cv[int(yb):int(yb + 4), int(x0b):int(x0b + wwb)] * 0.5 + DEEP2 * 0.5
            cv[int(yb):int(yb + 4), int(x0b):int(x0b + wwb * n / 60)] = CORAL
        # hook
        f = 1 - clamp01((t - 2.75) / 0.25)
        if f > 0:
            scrim(cv, 0, 620, 0.9 * f, NIGHT)
            for s, font, y, t0, col in [('Picture this on the screen', 'serif', 260, -0.4, WHITE), ('in your next meeting.', 'serif-i', 360, 1.0, CORAL)]:
                aa, d = rise(t, t0, 0.35, 24); text(cv, s, font, 76, CX, y + d, col, aa * f)
        # beat labels
        for i, (t0, sn, foc, lab) in enumerate(DECK):
            if lab is None or (i > 0 and DECK[i - 1][3] == lab): continue
            t1 = next((DECK[j][0] for j in range(i + 1, len(DECK)) if DECK[j][3] != lab), 99)
            la = win(t, t0 + 0.05, t1 - 0.05, 0.25, 0.2)
            if la > 0:
                scrim(cv, 0, 520, 0.85 * la, NIGHT)
                aa, d = rise(t, t0 + 0.05, 0.35, 18)
                w_ = tw(lab, 'sans-b', 46, 4); dot(cv, int(CX - w_ / 2 - 26), int(330 + d + 22), 9, CORAL, aa * la)
                text(cv, lab, 'sans-b', 46, CX + 10, 330 + d, WHITE, aa * la, 4)
        # CTA
        if t > 16.3:
            scrim(cv, 0, 640, 0.92 * clamp01((t - 16.3) / 0.3), NIGHT)
            aa, d = rise(t, 16.4, 0.45, 22); text(cv, 'Business', 'serif', 104, CX, 200 + d, WHITE, aa)
            aa, d = rise(t, 16.6, 0.45, 22); text(cv, 'Presentation Pro', 'serif', 104, CX, 315 + d, WHITE, aa)
            aa, d = rise(t, 17.2, 0.4, 16); text(cv, 'Present like this.', 'serif-i', 60, CX, 460 + d, CORAL, aa)
            aa, d = rise(t, 17.7, 0.4, 16); text(cv, '60 SLIDES  ·  42 NATIVE CHARTS  ·  POWERPOINT', 'sans-b', 24, CX, 1330 + d, SKY, aa, 3)
            aa, d = rise(t, 18.0, 0.45, 18); cta_button(cv, 'GET IT — LINK IN BIO', CX, 1390 + d, aa)
    post.append(ui)
    for c in cards: draw(cv, c)
    for fn in post: fn(cv)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

# ======================================================================================
# R3 — OVERCOME HESITATION: "Will it fit my business?" (cobalt, question -> proof)
# ======================================================================================
R3 = dict(dur=26.6, vo=[0.05, 2.45, 3.5, 7.95, 11.95, 15.95, 19.8])
QS = [('YOUR NUMBERS?', 3.5, 7.8), ('YOUR BRAND?', 7.95, 11.8), ('YOUR FONTS?', 11.95, 15.8), ('YOUR CONTENT?', 15.95, 19.6)]

def r3(t):
    cv = BG_COB.copy(); cards, post = [], []
    R.orbit_layer(cv, t, 0.6)
    Y = 170
    # ---- HOOK 0 - 3.4: a scan line inspects a real dashboard ----
    if t < 3.7:
        ex = ease_in((t - 3.2) / 0.45)
        cards.append(Card(19, x=0, y=Y + 40, z=900 * ex, ry=-4 + 3 * math.sin(t), w=960, a=1 - ex, shadow=1.0))
        def hook(cv):
            x0, y0, ww, hh = card_rect(0, Y + 40, 960)
            a = 1 - ex
            # viewfinder corners
            for cx_, cy_, sx, sy in [(x0 - 20, y0 - 20, 1, 1), (x0 + ww + 20, y0 - 20, -1, 1), (x0 - 20, y0 + hh + 20, 1, -1), (x0 + ww + 20, y0 + hh + 20, -1, -1)]:
                cv[int(min(cy_, cy_ + sy * 4)):int(max(cy_, cy_ + sy * 4)), int(min(cx_, cx_ + sx * 60)):int(max(cx_, cx_ + sx * 60))] = WHITE
                cv[int(min(cy_, cy_ + sy * 60)):int(max(cy_, cy_ + sy * 60)), int(min(cx_, cx_ + sx * 4)):int(max(cx_, cx_ + sx * 4))] = WHITE
            u = (t * 0.75) % 1.0
            xs = x0 + ww * u
            band = np.exp(-((np.arange(W) - xs) / 40) ** 2).astype(np.float32)
            sl = cv[int(y0):int(y0 + hh)]
            sl[:] = sl + (band[None, :, None] * 0.35 * a) * (CORAL - sl)
            cv[int(y0):int(y0 + hh), int(xs):int(xs + 3)] = CORAL
            f = 1 - clamp01((t - 3.3) / 0.2)
            scrim(cv, 0, 640, 0.85 * f, DEEP)
            words_line(cv, [('WILL', -0.3), ('IT', -0.3), ('FIT', -0.3)], 'sans-b', 100, CX, 250, t, [WHITE, WHITE, WHITE], f)
            words_line(cv, [('MY', 1.05), ('BUSINESS?', 1.25)], 'sans-b', 100, CX, 370, t, [CORAL, CORAL], f)
            aa, d = rise(t, 2.45, 0.3, 14); text(cv, "Let's check.", 'serif-i', 60, CX, 510 + d, SKY, aa * f)
        post.append(hook)

    # ---- question chip + check (persistent per question) ----
    def qchip(cv):
        for i, (q, t0, t1) in enumerate(QS):
            f = win(t, t0, t1, 0.2, 0.2)
            if f <= 0: continue
            scrim(cv, 0, 560, 0.85 * f, DEEP)
            aa, d = rise(t, t0, 0.3, 20)
            chip(cv, q, CX, 190 + d, aa * f, bg=WHITE, fg=INK, size=40, track=4)
            for k in range(4): dot(cv, int(CX - 54 + k * 36), 160, 7, CORAL if k == i else DEEP2, f)
    post.append(qchip)

    # ---- Q1 numbers 3.5 - 7.9: native chart, right-click > Edit Data ----
    if 3.45 <= t < 8.2:
        e = ease_out5((t - 3.5) / 0.6); ex = ease_in((t - 7.75) / 0.4)
        cards.append(Card(41, x=0, y=lerp(1400, Y + 60, e), z=lerp(500, 0, e) + 900 * ex, rx=lerp(-25, 0, e), w=1000, a=clamp01((t - 3.5) / 0.2) * (1 - ex), shadow=1.0))
        def q1(cv):
            f = win(t, 4.3, 7.8, 0.2, 0.2)
            aa, d = rise(t, 4.35, 0.3, 14); text(cv, 'All 42 charts are native.', 'serif-i', 52, CX, 330 + d, WHITE, aa * f)
            mx, my = lerp(980, 430, ease_io((t - 5.6) / 0.5)), lerp(1500, 1150, ease_io((t - 5.6) / 0.5))
            if t > 6.2:
                k = ease_back((t - 6.2) / 0.25, 1.6); mw, mh = int(330 * k), int(150 * k)
                if mw > 10 and mh > 10:
                    rect(cv, mx + 18, my + 18, mx + 18 + mw, my + 18 + mh, MIST, f, fill=WHITE, lw=2)
                    if k > 0.8:
                        rect(cv, mx + 26, my + 28, mx + 10 + mw, my + 92, CORAL, f, fill=PEACH, lw=0)
                        text(cv, 'Edit Data…', 'sans-b', 30, mx + 44, my + 41, INK, f, anchor='l')
                        text(cv, 'Change Chart Type…', 'sans', 28, mx + 44, my + 104, STONE, f, anchor='l')
            if 6.15 < t < 6.45:
                r_ = int(10 + 50 * (t - 6.15) / 0.3); ring = np.zeros((r_ * 2 + 8, r_ * 2 + 8), np.float32)
                cv2.circle(ring, (r_ + 4, r_ + 4), r_, 1.0, 3, lineType=cv2.LINE_AA); stamp(cv, ring, mx - r_ - 4, my - r_ - 4, CORAL, 1 - (t - 6.15) / 0.3)
            arrow_cursor(cv, mx, my, clamp01((t - 5.5) / 0.2) * f)
        post.append(q1)

    # ---- Q2 brand 7.95 - 11.8: real theme-colour change on slides that follow the theme ----
    if 7.9 <= t < 12.1:
        e = ease_out5((t - 7.95) / 0.65); ex = ease_in((t - 11.65) / 0.4)
        alt = clamp01((t - 9.55) / 0.3) * (1 - clamp01((t - 10.95) / 0.3))
        for n, x, z, ry, w_, dm in [(59, -320, 380, 22, 760, 0.85), (23, 320, 380, -22, 760, 0.85), (1, 0, 0, 0, 920, 1.0)]:
            base = dict(x=x * e, y=lerp(1300, Y + 80, e), z=z + 900 * ex, ry=ry * e, w=w_, dim=dm, shadow=0.9 if n == 1 else 0.6)
            cards.append(Card(n, a=1 - ex, **base))
            if alt > 0: cards.append(Card('alt_s%02d' % n, a=alt * (1 - ex), **base))
        def q2(cv):
            f = win(t, 8.9, 11.7, 0.2, 0.2)
            aa, d = rise(t, 8.92, 0.3, 14); text(cv, 'Set the theme colours once.', 'serif-i', 52, CX, 330 + d, WHITE, aa * f)
            on = alt > 0.5
            for i, (dk, ac) in enumerate([(DEEP, CORAL), (hexbgr('0F3B33'), hexbgr('E8A23A'))]):
                cx_ = CX + (i - 0.5) * 140; cy_ = 1440
                if (i == 1) == on: dot(cv, int(cx_), cy_, 50, WHITE, f)
                dot(cv, int(cx_), cy_, 44, DEEP2, f); dot(cv, int(cx_), cy_, 40, dk, f)
                m = np.zeros((84, 84), np.float32); cv2.ellipse(m, (42, 42), (40, 40), 0, -90, 90, 1.0, -1, lineType=cv2.LINE_AA); stamp(cv, m, cx_ - 42, cy_ - 42, ac, f)
            text(cv, 'Theme colours', 'sans', 28, CX, 1515, SKY, f)
        post.append(q2)

    # ---- Q3 fonts 11.95 - 15.8: Georgia + Arial on a real slide ----
    if 11.9 <= t < 16.1:
        e = ease_out5((t - 11.95) / 0.6); ex = ease_in((t - 15.65) / 0.4)
        push = ease_io((t - 12.8) / 2.5)
        fu, fv = 0.40, 0.45; zw = lerp(1000, 1500, push)
        cards.append(Card(59, x=-(fu - 0.5) * (zw - 1000), y=lerp(1400, Y + 60, e) - (fv - 0.5) * (zw - 1000) * AR, z=lerp(500, 0, e) + 900 * ex, rx=lerp(-25, 0, e), w=zw, a=1 - ex, shadow=1.0))
        def q3(cv):
            f = win(t, 12.85, 15.7, 0.2, 0.2)
            aa, d = rise(t, 12.88, 0.3, 14); text(cv, 'Georgia + Arial', 'serif', 64, CX, 320 + d, WHITE, aa * f)
            aa2, d2 = rise(t, 13.6, 0.3, 14); text(cv, 'standard on Windows and Mac', 'serif-i', 46, CX, 410 + d2, SKY, aa2 * f)
            for lab, tt, yy in [('GEORGIA  ·  HEADLINES', 13.2, 1480), ('ARIAL  ·  BODY TEXT', 13.5, 1550)]:
                a = clamp01((t - tt) / 0.25) * f
                chip(cv, lab, CX, yy, a, bg=CORAL if 'GEORGIA' in lab else WHITE, fg=INK, size=22)
        post.append(q3)

    # ---- Q4 content 15.95 - 19.6: riffle through all 60 slides ----
    if 15.9 <= t < 19.9:
        e = ease_out5((t - 15.95) / 0.5); ex = ease_in((t - 19.45) / 0.4)
        pos = 60 * ease_io((t - 16.9) / 2.2)
        k0 = int(pos)
        for k in range(max(0, k0 - 3), min(60, k0 + 4)):
            d = k - pos
            if d < -1.2: continue
            y = Y + 80 + d * 70 + (1 - e) * 1300
            z = max(d, 0) * 120 + 900 * ex
            a = (1 - clamp01(-d / 1.0)) * (1 - ex)
            cards.append(Card(k + 1, x=0, y=y - 900 * clamp01(-d) , z=z, rx=-max(-d, 0) * 40, w=920, a=a, dim=1 - 0.12 * max(d, 0), shadow=0.8))
        cards.sort(key=lambda c: -c.z)
        def q4(cv):
            f = win(t, 16.95, 19.5, 0.2, 0.2)
            n = min(60, max(1, int(pos) + 1))
            pop(cv, str(n), 'sans-b', 150, CX, 300, t, 16.95, CORAL, f, dur=0.2)
            aa, d = rise(t, 17.6, 0.3, 14); text(cv, 'slides, from agenda to next steps', 'serif-i', 46, CX, 470 + d, WHITE, aa * f)
        post.append(q4)

    # ---- CTA 19.8 - 26.6 ----
    if t >= 19.65:
        e = ease_out5((t - 19.7) / 0.9); hold = clamp01((t - 20.8) / 5.8)
        cards.append(Card(1, x=0, y=lerp(1300, 40, e), z=lerp(700, -40 * hold, e), rx=lerp(-28, 0, e), w=900, a=clamp01((t - 19.7) / 0.2), shadow=1.0))
        def cta(cv):
            scrim(cv, 0, 640, 0.9 * clamp01((t - 19.7) / 0.3), DEEP)
            words_line(cv, [('NO', 19.82), ('MORE', 19.98), ('BLANK', 20.15), ('SLIDES.', 20.4)], 'sans-b', 74, CX, 200, t, [WHITE, WHITE, CORAL, CORAL])
            aa, d = rise(t, 21.1, 0.45, 20); text(cv, 'Business Presentation Pro', 'serif', 70, CX, 320 + d, WHITE, aa)
            # the four answered questions, ticked
            for i, q in enumerate(['NUMBERS', 'BRAND', 'FONTS', 'CONTENT']):
                a = clamp01((t - (21.5 + i * 0.12)) / 0.2)
                cx_ = CX + (i - 1.5) * 230
                check_dot(cv, cx_ - 70, 470, a, a, r=16)
                text(cv, q, 'sans-b', 22, cx_ - 46, 458, WHITE, a, 3, anchor='l')
            aa, d = rise(t, 22.2, 0.45, 18); cta_button(cv, 'GET IT — LINK IN BIO', CX, 1350 + d, aa)
        post.append(cta)

    for c in cards: draw(cv, c)
    for fn in post: fn(cv)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

ADS = {'r1': (r1, R1), 'r2': (r2, R2), 'r3': (r3, R3)}

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
