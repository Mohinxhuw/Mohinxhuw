"""business-presentation-pro-powerpoint-process.mp4 — a technically honest *simulation* of building one real
Business Presentation Pro slide (slide 19, "Performance dashboard") in a presentation editor.

Honesty notes
- Every slide image is a real render: states/sNN_*.png are the product's own slide 19 with only the first N of its
  own 31 shapes kept (same positions, styles and native charts), rendered by LibreOffice. The final state equals the
  original slide. The colour step changes "$96.4M" from white to the theme's Accent 2, its real final colour.
- The editor chrome, cursor, guides, colour palette and context menu are drawn here; nothing is a screen recording.
  The status bar says so on screen. No vendor logos are shown.

usage: python3 pp.py stills t1 t2 ... | python3 pp.py render out.mp4
"""
import os, sys, math, glob, json, subprocess, functools
import numpy as np, cv2
HERE = os.path.dirname(os.path.abspath(__file__))
SCR = os.path.join(HERE, '..')
sys.path.insert(0, os.path.join(SCR, 'reel2'))   # compositor whose slides/ holds the 60 Template 02 renders
import reel2 as R
from reel2 import Card, clamp01, ease_io, ease_out, ease_out5, ease_in, ease_back, lerp, win, rise, text, text_mask, tw, stamp, pill, dot, W, H, CX, CY, AR, hexbgr
from reel2 import DEEP, DEEP2, COBALT, CORAL, IVORY, SKY, INK, WHITE, MIST, STONE, PEACH

def stamp(cv, m, x, y, col, a):
    """reel2.stamp clipped to the target canvas (it assumed the 1080x1920 frame, which cut editor-space text past x=1080)."""
    x, y = int(round(x)), int(round(y))
    h, w_ = m.shape; Hc, Wc = cv.shape[:2]
    x0, y0, x1, y1 = max(x, 0), max(y, 0), min(x + w_, Wc), min(y + h, Hc)
    if x1 <= x0 or y1 <= y0 or a <= 0: return
    mm = m[y0 - y:y1 - y, x0 - x:x1 - x][..., None] * a
    reg = cv[y0:y1, x0:x1]
    reg[:] = reg * (1 - mm) + col * mm
R.stamp = stamp

FPS = int(os.environ.get('FPS', 60))
DUR = 23.0
VO = [0.05, 3.0, 5.3, 8.1, 9.6, 13.0, 17.8]
NIGHT = hexbgr('070C2A')

# ---------------- editor geometry (editor image space) ----------------
EW, EH = 2400, 1500
SX0, SY0, SWD, SHT = 420, 300, 1880, 1058
def spx(xin, yin): return SX0 + xin / 13.333 * SWD, SY0 + yin / 7.5 * SHT
CHROME = hexbgr('F3F3F3'); RIB = hexbgr('FAFAFA'); EDGE = hexbgr('D6D6D6'); TXT = hexbgr('3B3B3B'); ACT = hexbgr('2340C8'); CANVAS = hexbgr('E6E6E6')

STATE_FILES = sorted(glob.glob(os.path.join(HERE, 'states', 's*.png')))
SN = {os.path.basename(f)[:3]: f for f in STATE_FILES}
@functools.lru_cache(maxsize=None)
def state_img(key, w=SWD, h=SHT):
    im = cv2.imread(SN[key], cv2.IMREAD_COLOR)
    return cv2.resize(im, (w, h), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
@functools.lru_cache(maxsize=None)
def real_slide(n, w):
    im = cv2.imread(os.path.join(SCR, 'reel2', 'slides', 's%02d.png' % n), cv2.IMREAD_COLOR)[:2160, :3840]
    return cv2.resize(im, (w, int(round(w * AR))), interpolation=cv2.INTER_AREA).astype(np.float32) / 255

def t_state(t):
    """Which real build state is on the canvas at time t (forward build, plus the reverse 'rewind' in the hook)."""
    seq = [(2.95, 's00'), (3.05, 's01'), (3.3, 's02'), (3.55, 's03'), (3.8, 's04'), (4.05, 's05'), (4.3, 's06'), (4.75, 's07'),
           (5.55, 's08'), (6.05, 's09'), (7.45, 's10'), (9.1, 's11'), (10.0, 's12'), (10.85, 's13')]
    if t < 0.9: return 's13'
    if t < 1.65:                                    # rewind: 13 -> 0
        k = int(13 - 13 * clamp01((t - 0.9) / 0.7)); return 's%02d' % k
    cur = 's00'
    for tt, s in seq:
        if t >= tt: cur = s
    return cur

# ---------------- static chrome ----------------
def _txt(img, s, x, y, size, col, font='sans', track=0, anchor='l', a=1.0):
    text(img, s, font, size, x, y, col, a, track, anchor=anchor)

@functools.lru_cache(maxsize=4)
def chrome(tab):
    img = np.empty((EH, EW, 3), np.float32); img[:] = CANVAS
    img[:44] = hexbgr('E3E3E3')
    for i, c in enumerate([hexbgr('FF5F57'), hexbgr('FEBC2E'), hexbgr('28C840')]): dot(img, 26 + i * 26, 22, 8, c)
    _txt(img, 'Vanta_Business_Presentation_Template_02.pptx', EW / 2, 8, 24, TXT, anchor='c')
    img[44:96] = CHROME
    tabs = ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Animations', 'Slide Show', 'Review', 'View']
    x = 30
    for tname in tabs:
        wdt = tw(tname, 'sans', 24) + 44
        if tname == tab:
            img[88:96, x + 10:x + wdt - 10] = ACT
            _txt(img, tname, x + 22, 58, 24, ACT, font='sans-b')
        else:
            _txt(img, tname, x + 22, 58, 24, TXT)
        x += wdt
    img[96:236] = RIB; img[235:237] = EDGE
    groups = {'Home': [('Paste', 'clip'), ('New Slide', 'slide'), (None, None), ('B  I  U', 'font'), ('Font Color', 'fcolor'), (None, None), ('Shapes', 'shapes'), ('Arrange', 'arrange'), ('Shape Fill', 'fill')],
              'Insert': [('New Slide', 'slide'), ('Table', 'table'), ('Pictures', 'pic'), (None, None), ('Text Box', 'textbox'), ('Shapes', 'shapes'), ('Chart', 'chart'), ('Icons', 'icons')]}[tab]
    x = 40
    for lab, ic in groups:
        if lab is None:
            img[110:222, x + 10:x + 12] = EDGE; x += 40; continue
        cx_ = x + 70
        g = np.zeros((70, 70), np.float32)
        if ic in ('slide', 'textbox'): cv2.rectangle(g, (12, 14), (58, 50), 1.0, 3); cv2.line(g, (20, 26), (50, 26), 1.0, 3)
        elif ic == 'chart':
            for k, hh in enumerate((18, 32, 24, 40)): cv2.rectangle(g, (12 + k * 12, 56 - hh), (20 + k * 12, 56), 1.0, -1)
        elif ic == 'shapes': cv2.rectangle(g, (10, 30), (36, 56), 1.0, 3); cv2.circle(g, (46, 26), 14, 1.0, 3)
        elif ic == 'fcolor': cv2.line(g, (20, 46), (35, 10), 1.0, 4, cv2.LINE_AA); cv2.line(g, (35, 10), (50, 46), 1.0, 4, cv2.LINE_AA); cv2.line(g, (26, 32), (44, 32), 1.0, 3, cv2.LINE_AA)
        elif ic == 'table':
            for k in range(3): cv2.line(g, (12, 18 + k * 16), (58, 18 + k * 16), 1.0, 2)
            cv2.rectangle(g, (12, 12), (58, 58), 1.0, 2)
        elif ic == 'clip': cv2.rectangle(g, (18, 14), (52, 58), 1.0, 3); cv2.rectangle(g, (28, 8), (42, 18), 1.0, -1)
        elif ic == 'arrange': cv2.rectangle(g, (12, 12), (40, 40), 1.0, 3); cv2.rectangle(g, (28, 28), (58, 58), 1.0, -1)
        elif ic == 'fill': cv2.rectangle(g, (14, 14), (56, 46), 1.0, 3); cv2.rectangle(g, (12, 52), (58, 60), 1.0, -1)
        elif ic == 'icons': cv2.circle(g, (35, 35), 20, 1.0, 3); cv2.circle(g, (35, 35), 6, 1.0, -1)
        elif ic == 'pic': cv2.rectangle(g, (10, 14), (60, 56), 1.0, 3); cv2.circle(g, (24, 28), 6, 1.0, -1)
        else: cv2.rectangle(g, (14, 14), (56, 56), 1.0, 3)
        col = CORAL if ic == 'fcolor' else TXT
        stamp(img, g, cx_ - 35, 112, TXT, 1.0)
        if ic == 'fcolor': img[164:172, cx_ - 23:cx_ + 23] = CORAL
        _txt(img, lab, cx_, 190, 21, TXT, anchor='c')
        BTN[(tab, ic)] = (cx_, 150)
        x += 140
    # thumbnails pane
    img[236:1456, 0:340] = hexbgr('EDEDED'); img[236:1456, 339:341] = EDGE
    img[1456:] = hexbgr('2B579A') * 0 + hexbgr('E3E3E3')
    return img
BTN = {}
for _t in ('Home', 'Insert'): chrome(_t)

@functools.lru_cache(maxsize=None)
def thumb(n, cur=None):
    w, h = 250, 141
    im = state_img(cur, w, h) if cur else real_slide(n, w)
    return im

def editor(t, tab, st, overlays):
    img = chrome(tab).copy()
    img[SY0:SY0 + SHT, SX0:SX0 + SWD] = state_img(st)
    # slide shadow
    img[SY0 + SHT:SY0 + SHT + 6, SX0 + 6:SX0 + SWD + 6] *= 0.85
    # thumbnails (real slides 17-21; 19 shows the live state)
    for k, n in enumerate((17, 18, 19, 20, 21)):
        y = 270 + k * 230
        _txt(img, str(n), 30, y + 52, 22, TXT)
        th = thumb(n, st if n == 19 else None)
        if n == 19: img[y - 6:y + 147, 64:320] = ACT
        img[y:y + 141, 70:320] = th
    # status bar
    _txt(img, 'Slide 19 of 60', 30, 1466, 22, TXT)
    _txt(img, 'Simulated edit — build recreated from this slide\'s own elements', EW - 30, 1466, 22, hexbgr('6B6B6B'), anchor='r')
    for fn in overlays: fn(img)
    return img

# ---------------- overlay primitives (editor space) ----------------
def sel_box(img, x0, y0, x1, y1, a=1.0):
    if a <= 0: return
    m = np.zeros((EH, EW), np.uint8); cv2.rectangle(m, (int(x0), int(y0)), (int(x1), int(y1)), 255, 2)
    mm = (m.astype(np.float32) / 255)[..., None] * a; img[:] = img * (1 - mm) + hexbgr('8AB4F8') * mm
    for hx, hy in [(x0, y0), (x1, y0), (x0, y1), (x1, y1), ((x0 + x1) / 2, y0), ((x0 + x1) / 2, y1), (x0, (y0 + y1) / 2), (x1, (y0 + y1) / 2)]:
        dot(img, int(hx), int(hy), 7, WHITE, a);
        r = np.zeros((18, 18), np.float32); cv2.circle(r, (9, 9), 7, 1.0, 2, lineType=cv2.LINE_AA); stamp(img, r, hx - 9, hy - 9, hexbgr('5F8DE8'), a)

def guide_h(img, y, x0, x1, a):
    if a <= 0: return
    for xx in range(int(x0), int(x1), 20): img[int(y):int(y) + 2, xx:min(xx + 11, int(x1))] = img[int(y):int(y) + 2, xx:min(xx + 11, int(x1))] * (1 - a) + hexbgr('FF3B30') * a

def dashed_rect(img, x0, y0, x1, y1, col, a, lw=2):
    if a <= 0: return
    for (ax, ay, bx, by) in [(x0, y0, x1, y0), (x1, y0, x1, y1), (x1, y1, x0, y1), (x0, y1, x0, y0)]:
        L = max(abs(bx - ax), abs(by - ay)); n = max(int(L // 16), 1)
        for k in range(0, n, 2):
            p0 = (int(ax + (bx - ax) * k / n), int(ay + (by - ay) * k / n)); p1 = (int(ax + (bx - ax) * (k + 1) / n), int(ay + (by - ay) * (k + 1) / n))
            cv2.line(img, p0, p1, tuple(float(v) for v in col * a + img[min(max(p0[1], 0), EH - 1), min(max(p0[0], 0), EW - 1)] * (1 - a)), lw)

def cursor(img, x, y, a=1.0, kind='arrow'):
    if a <= 0: return
    if kind == 'ibeam':
        img[int(y) - 22:int(y) + 22, int(x) - 1:int(x) + 2] = INK; img[int(y) - 22:int(y) - 19, int(x) - 7:int(x) + 8] = INK; img[int(y) + 19:int(y) + 22, int(x) - 7:int(x) + 8] = INK
        return
    pts = np.array([[0, 0], [0, 34], [9, 26], [16, 41], [22, 38], [15, 24], [27, 24]], np.float32) * 1.25
    big = np.zeros((70, 50), np.float32); cv2.fillPoly(big, [(pts + 4).astype(np.int32)], 1.0, lineType=cv2.LINE_AA)
    stamp(img, cv2.dilate(big, np.ones((5, 5), np.uint8)), x - 4, y - 4, WHITE, a); stamp(img, big, x - 4, y - 4, INK, a)

def click_ring(img, x, y, t, t0):
    u = (t - t0) / 0.3
    if 0 <= u < 1:
        r_ = int(8 + 34 * u); ring = np.zeros((r_ * 2 + 8, r_ * 2 + 8), np.float32)
        cv2.circle(ring, (r_ + 4, r_ + 4), r_, 1.0, 3, lineType=cv2.LINE_AA); stamp(img, ring, x - r_ - 4, y - r_ - 4, CORAL, 1 - u)

THEME = ['FFFFFF', '1A1D23', 'F8F5EF', '13246B', '2340C8', 'FF6B4A', 'B7C6F5', 'DCDFE6', '6B7080', 'FFD3C4']   # the file's own theme slots

# ---------------- mouse path & actions ----------------
TITLE_PT = spx(0.95, 1.05)
KPI1 = spx(0.70, 1.95); KPI1b = spx(3.28, 2.96)
VAL1 = spx(1.25, 2.45)
P1 = (spx(0.70, 3.35), spx(7.66, 6.65)); P2 = (spx(7.90, 3.35), spx(12.63, 6.65))
LINECH = spx(4.0, 5.2)
def BT(tab, ic): return BTN[(tab, ic)]
TAB_X = {'Home': 120, 'Insert': 230}
KEYS = [  # (time, (x, y), click?)
    (0.0, (1900, 1250), False), (1.7, (1900, 1250), False), (2.6, TITLE_PT, False), (2.7, TITLE_PT, True),
    (4.5, (TITLE_PT[0] + 900, TITLE_PT[1] + 20), False), (4.95, (TAB_X['Insert'], 70), False), (5.0, (TAB_X['Insert'], 70), True),
    (5.18, BT('Insert', 'textbox'), False), (5.22, BT('Insert', 'textbox'), True), (5.45, KPI1, False), (5.5, KPI1, True),
    (6.0, spx(10.5, 2.4), False), (6.6, VAL1, False), (6.75, VAL1, True), (6.95, (TAB_X['Home'], 70), False), (7.0, (TAB_X['Home'], 70), True),
    (7.12, BT('Home', 'fcolor'), False), (7.16, BT('Home', 'fcolor'), True), (7.36, None, False), (7.45, None, True),
    (7.85, (TAB_X['Insert'], 70), False), (7.9, (TAB_X['Insert'], 70), True), (8.02, BT('Insert', 'shapes'), False), (8.06, BT('Insert', 'shapes'), True),
    (8.2, P1[0], False), (8.6, P1[1], False), (8.7, P2[0], False), (9.05, P2[1], False),
    (9.55, BT('Insert', 'chart'), False), (9.6, BT('Insert', 'chart'), True), (9.95, spx(4.2, 5.0), False), (10.0, spx(4.2, 5.0), True),
    (10.45, BT('Insert', 'chart'), False), (10.5, BT('Insert', 'chart'), True), (10.8, spx(10.3, 5.0), False), (10.85, spx(10.3, 5.0), True),
    (11.3, LINECH, False), (11.4, LINECH, True), (11.75, (LINECH[0] + 60, LINECH[1] + 150), False), (12.2, (LINECH[0] + 60, LINECH[1] + 150), True), (12.8, (LINECH[0] + 300, LINECH[1] + 300), False)]
def palette_rect():
    bx, by = BT('Home', 'fcolor'); return bx - 60, 240, bx - 60 + 560, 240 + 190
def swatch_pos(i):
    x0, y0, _, _ = palette_rect(); return x0 + 40 + i * 50, y0 + 100
KEYS = [(t, (swatch_pos(5) if p is None else p), c) for t, p, c in KEYS]
CLICKS = [t for t, p, c in KEYS if c]

def mouse(t):
    for i in range(len(KEYS) - 1):
        t0, p0, _ = KEYS[i]; t1, p1, _ = KEYS[i + 1]
        if t0 <= t < t1:
            u = ease_io((t - t0) / max(t1 - t0, 1e-3))
            return lerp(p0[0], p1[0], u), lerp(p0[1], p1[1], u)
    return KEYS[-1][1]

def overlays(t):
    ov = []
    st = t_state(t)
    # empty title placeholder prompt before typing
    if 1.65 <= t < 2.72:
        x0, y0 = spx(0.70, 0.82); x1, y1 = spx(8.43, 1.82)
        ov.append(lambda img: (dashed_rect(img, x0, y0, x1, y1, hexbgr('9AA6D9'), 0.9), _txt(img, 'Click to add title', x0 + 30, y0 + 40, 54, hexbgr('9AA6D9'), font='serif')))
    if 2.7 <= t < 4.7:     # title selected while typing, caret after the text
        x0, y0 = spx(0.70, 0.82); x1, y1 = spx(8.43, 1.82)
        n = {'s00': 0, 's01': 4, 's02': 11, 's03': 17, 's04': 23, 's05': 29, 's06': 35}.get(st, 35)
        tw_ = tw('Performance dashboard — fiscal 2026'[:n], 'serif', 54) if n else 0
        ov.append(lambda img: dashed_rect(img, x0, y0, x1, y1, hexbgr('8AB4F8'), 0.9))
        if int(t * 2.6) % 2 == 0 or t < 4.4:
            cx_ = x0 + 30 + tw_ + 4
            ov.append(lambda img, cx_=cx_: img.__setitem__((slice(int(y0 + 34), int(y0 + 104)), slice(int(cx_), int(cx_ + 4))), WHITE))
    if 4.75 <= t < 5.2:
        a = 1 - clamp01((t - 5.0) / 0.2)
        ov.append(lambda img: (sel_box(img, *spx(0.70, 0.55), *spx(6.9, 0.77), a), sel_box(img, *spx(8.94, 0.86), *spx(12.64, 1.76), a)))
    if 5.55 <= t < 6.05:
        ov.append(lambda img: sel_box(img, *KPI1, *KPI1b))
    if 6.05 <= t < 6.75:
        a = 1 - clamp01((t - 6.55) / 0.2)
        def kpis(img):
            for xin in (0.70, 3.93, 6.92, 9.90): sel_box(img, *spx(xin, 1.95), *spx(xin + 2.58, 2.96), a * 0.9)
            guide_h(img, spx(0, 1.95)[1] - 4, *[spx(0.4, 0)[0], spx(12.9, 0)[0]], a)
            guide_h(img, spx(0, 2.96)[1] + 4, *[spx(0.4, 0)[0], spx(12.9, 0)[0]], a)
        ov.append(kpis)
    if 6.75 <= t < 7.6:
        ov.append(lambda img: sel_box(img, *spx(0.70, 2.21), *spx(3.28, 2.70)))
    if 7.16 <= t < 7.5:
        def pal(img):
            x0, y0, x1, y1 = palette_rect()
            img[y0 + 8:y1 + 8, x0 + 8:x1 + 8] *= 0.88
            img[y0:y1, x0:x1] = WHITE; cv2.rectangle(img, (x0, y0), (x1, y1), tuple(float(v) for v in EDGE), 2)
            _txt(img, 'Theme Colors', x0 + 30, y0 + 22, 24, TXT, font='sans-b')
            for i, hx in enumerate(THEME):
                sx, sy = swatch_pos(i)
                img[int(sy - 18):int(sy + 18), int(sx - 18):int(sx + 18)] = hexbgr(hx)
                cv2.rectangle(img, (int(sx - 18), int(sy - 18)), (int(sx + 18), int(sy + 18)), tuple(float(v) for v in EDGE), 1)
            if t > 7.3:
                sx, sy = swatch_pos(5); cv2.rectangle(img, (int(sx - 23), int(sy - 23)), (int(sx + 23), int(sy + 23)), tuple(float(v) for v in ACT), 3)
                _txt(img, 'Accent 2', sx, sy + 34, 20, TXT, anchor='c')
        ov.append(pal)
    if 8.2 <= t < 9.15:      # drawing the two real panels at their real positions
        def drag(img):
            for (a0, a1), t0, t1 in ((P1, 8.2, 8.6), (P2, 8.7, 9.05)):
                if t >= t0:
                    u = ease_io((t - t0) / (t1 - t0))
                    x1, y1 = lerp(a0[0], a1[0], u), lerp(a0[1], a1[1], u)
                    img[int(a0[1]):int(y1), int(a0[0]):int(x1)] = img[int(a0[1]):int(y1), int(a0[0]):int(x1)] * 0.75 + hexbgr('1D3283') * 0.25
                    sel_box(img, a0[0], a0[1], x1, y1)
        ov.append(drag)
    if 9.15 <= t < 9.6:
        a = 1 - clamp01((t - 9.4) / 0.2)
        ov.append(lambda img: (sel_box(img, *P1[0], *P1[1], a), sel_box(img, *P2[0], *P2[1], a)))
    if 10.0 <= t < 10.45:
        ov.append(lambda img: sel_box(img, *spx(0.80, 3.87), *spx(7.56, 6.55)))
    if 10.85 <= t < 11.3:
        ov.append(lambda img: sel_box(img, *spx(8.00, 3.87), *spx(12.53, 6.55)))
    if 11.4 <= t < 12.5:
        def menu(img):
            x0, y0 = int(LINECH[0] + 10), int(LINECH[1] + 10)
            items = ['Cut', 'Copy', 'Paste Options', None, 'Change Chart Type…', 'Select Data…', 'Edit Data…', 'Format Chart Area…']
            hgt = 52 * len([i for i in items if i]) + 12 * items.count(None) + 20
            img[y0 + 8:y0 + hgt + 8, x0 + 8:x0 + 460 + 8] *= 0.85
            img[y0:y0 + hgt, x0:x0 + 460] = WHITE; cv2.rectangle(img, (x0, y0), (x0 + 460, y0 + hgt), tuple(float(v) for v in EDGE), 2)
            y = y0 + 10
            for it in items:
                if it is None: img[y + 5:y + 7, x0 + 10:x0 + 450] = EDGE; y += 12; continue
                if it == 'Edit Data…' and t > 11.75: img[y:y + 50, x0 + 4:x0 + 456] = hexbgr('DCE6FB')
                _txt(img, it, x0 + 26, y + 12, 26, INK if it == 'Edit Data…' else TXT, font='sans-b' if it == 'Edit Data…' else 'sans'); y += 52
        ov.append(menu)
    if 0.9 <= t < 1.65:   # rewind indicator
        ov.append(lambda img: (pill(img, EW - 330, 260, 280, 70, INK, 0.85), _txt(img, '◀◀  REWIND', EW - 190, 278, 30, WHITE, font='sans-b', anchor='c')))
    # mouse
    mx, my = mouse(t)
    kind = 'ibeam' if 2.72 <= t < 4.5 else 'arrow'
    ma = clamp01((t - 1.7) / 0.2) * (1 - clamp01((t - 12.8) / 0.3))
    def m(img):
        for tc in CLICKS: click_ring(img, mx, my, t, tc)
        cursor(img, mx, my, ma, kind)
    ov.append(m)
    return ov

def tab_at(t):
    if (5.0 <= t < 7.0) or (7.9 <= t): return 'Insert'
    return 'Home'

# ---------------- camera ----------------
CAM = [(0.0, 1360, 820, 1520), (0.9, 1360, 820, 1520), (1.65, 1240, 760, 1060), (2.4, 1240, 760, 1060), (2.95, 960, 520, 1800), (4.6, 1120, 560, 1700),
       (5.0, 1000, 420, 1350), (5.35, 1150, 560, 1700), (6.0, 1300, 560, 1600), (6.8, 900, 480, 1500), (7.6, 1300, 860, 1300), (9.2, 1300, 880, 1300),
       (9.6, 1300, 860, 1350), (11.2, 1150, 960, 1550), (12.6, 1200, 860, 1300)]
def cam(t):
    for i in range(len(CAM) - 1):
        t0, *a = CAM[i]; t1, *b = CAM[i + 1]
        if t0 <= t < t1:
            u = ease_io((t - t0) / (t1 - t0)); return [lerp(x, y, u) for x, y in zip(a, b)]
    return CAM[-1][1:]

# ---------------- perspective-grid background ----------------
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
_g = np.clip(1 - np.sqrt(((xx - W * .5) / W) ** 2 + ((yy - H * .5) / H) ** 2) * 1.4, 0, 1) ** 1.6
BG = (NIGHT[None, None] * (1 - _g[..., None]) + (DEEP * 1.1)[None, None] * _g[..., None]).astype(np.float32)
del yy, xx
HOR = 760
def grid_bg(t):
    cv = BG.copy(); lay = np.zeros((H, W), np.float32)
    vx, vy = CX, HOR
    for k in range(-14, 15):                       # floor rays to the vanishing point
        cv2.line(lay, (int(vx), int(vy)), (int(vx + k * 260), H), 1.0, 1, lineType=cv2.LINE_AA)
        cv2.line(lay, (int(vx), int(vy)), (int(vx + k * 260), 0), 0.45, 1, lineType=cv2.LINE_AA)   # faint ceiling
    off = (t * 0.35) % 1.0
    for j in range(1, 26):                          # depth lines, drifting slowly toward camera
        z = (j - off) ; yb = vy + 2600 / (z + 1.2) * 0.9 - 0
        if vy < yb < H: cv2.line(lay, (0, int(yb)), (W, int(yb)), 1.0, 1, lineType=cv2.LINE_AA)
        yt = vy - 2600 / (z + 1.2) * 0.9
        if 0 < yt < vy: cv2.line(lay, (0, int(yt)), (W, int(yt)), 0.45, 1, lineType=cv2.LINE_AA)
    fade = np.clip(np.abs(np.arange(H, dtype=np.float32) - vy) / 500, 0, 1)[:, None]
    lay *= fade * 0.16
    cv += lay[..., None] * (SKY - cv)
    return cv

# ---------------- projecting an image onto the frame ----------------
def project_img(cv, img, w_on_screen, fx, fy, rx=6, ry=-4, a=1.0, shadow=True, center=(CX, 930)):
    """Place img (editor space) so that point (fx, fy) of it lands on `center`, scaled to w_on_screen, with a perspective tilt."""
    if a <= 0: return
    s = w_on_screen / img.shape[1]
    hw, hh = img.shape[1] * s / 2, img.shape[0] * s / 2
    ox, oy = (fx - img.shape[1] / 2) * s, (fy - img.shape[0] / 2) * s
    L = np.array([[-hw, -hh, 0], [hw, -hh, 0], [hw, hh, 0], [-hw, hh, 0]], np.float64) - [ox, oy, 0]
    P = L @ R.rot(rx, ry, 0).T
    z = P[:, 2] + R.FOCAL
    dst = np.stack([center[0] + P[:, 0] * R.FOCAL / z, center[1] + P[:, 1] * R.FOCAL / z], 1).astype(np.float32)
    lvl = img
    while lvl.shape[1] > w_on_screen * 1.6: lvl = cv2.pyrDown(lvl)
    src = np.float32([[0, 0], [lvl.shape[1], 0], [lvl.shape[1], lvl.shape[0]], [0, lvl.shape[0]]])
    Hm = cv2.getPerspectiveTransform(src, dst)
    m = cv2.warpPerspective(np.ones(lvl.shape[:2], np.float32), Hm, (W, H), flags=cv2.INTER_LINEAR)
    if shadow:
        sh = cv2.GaussianBlur(m, (0, 0), 30); sh = np.roll(sh, 30, axis=0)
        cv *= (1 - 0.5 * a * sh)[..., None]
    rgb = cv2.warpPerspective(lvl, Hm, (W, H), flags=cv2.INTER_LINEAR)
    mm = (m * a)[..., None]
    cv[:] = cv * (1 - mm) + rgb * mm

# ---------------- captions ----------------
CAPS = [  # (t0, t1, [(word, emphasis)])
    (3.0, 4.35, [('A', 0), ('CLEAR', 0), ('TITLE.', 1)]),
    (5.3, 6.02, [('KEY', 1), ('NUMBERS,', 1)]), (6.02, 6.66, [('LINED', 0), ('UP', 0)]), (6.66, 7.75, [('&', 0), ('HIGHLIGHTED.', 1)]),
    (8.1, 9.35, [('CLEAN', 0), ('PANELS.', 1)]),
    (9.6, 10.77, [('AND', 0), ('NATIVE', 1), ('CHARTS', 1)]), (10.77, 12.75, [('YOU', 0), ('CAN', 0), ('EDIT', 0), ('WITH', 0), ('YOUR', 1), ('OWN', 1), ('DATA.', 1)]),
    (13.0, 15.2, [('BUSINESS', 0), ('PRESENTATION', 0), ('PRO', 0), ('GIVES', 0), ('YOU', 0)]),
    (15.2, 16.32, [('60', 1), ('SLIDES', 1), ('LIKE', 0), ('THIS,', 0)]), (16.32, 17.65, [('ALREADY', 1), ('BUILT.', 1)]),
]
def caption(cv, t):
    for t0, t1, words in CAPS:
        if not (t0 <= t < t1 + 0.12): continue
        a = clamp01((t - t0) / 0.1) * (1 - clamp01((t - t1) / 0.12))
        size = 66
        lines, cur = [], []
        for w_, e in words:
            if cur and tw(' '.join(x for x, _ in cur + [(w_, e)]), 'sans-b', size) > 900: lines.append(cur); cur = []
            cur.append((w_, e))
        lines.append(cur)
        y = 1395 - (len(lines) - 1) * 40
        sc = lerp(1.12, 1.0, ease_out(clamp01((t - t0) / 0.18)))
        for ln in lines:
            ws = [tw(w_, 'sans-b', size) for w_, _ in ln]; gap = 18
            x = CX - (sum(ws) + gap * (len(ln) - 1)) / 2
            for (w_, e), ww in zip(ln, ws):
                m = text_mask(w_, 'sans-b', size)
                if sc != 1.0: m = cv2.resize(m, (int(m.shape[1] * sc), int(m.shape[0] * sc)))
                xx = x + ww / 2 - m.shape[1] / 2; yy = y + 40 - m.shape[0] / 2
                stamp(cv, cv2.GaussianBlur(cv2.dilate(m, np.ones((7, 7), np.uint8)), (0, 0), 3), xx, yy + 4, NIGHT, a * 0.85)
                stamp(cv, m, xx, yy, CORAL if e else WHITE, a)
                x += ww + gap
            y += 82

# ---------------- frame ----------------
FAN = [(20, -360, -570, 300, 16, -5), (23, 360, -570, 300, -16, 5), (30, 0, -620, 420, 0, 0), (42, -700, -60, 520, 32, -8), (46, 700, -60, 520, -32, 8), (56, 0, -980, 800, 0, 0)]   # (slide, x, y, z, ry, rz)
def frame(t):
    cv = grid_bg(t)
    reveal = ease_io((t - 12.85) / 0.9)
    # editor window
    if reveal < 1:
        fx, fy, wv = cam(t)
        st = t_state(t)
        img = editor(t, tab_at(t), st, overlays(t))
        wv2 = lerp(wv, 700, reveal); fy2 = lerp(fy, EH / 2, reveal); fx2 = lerp(fx, EW / 2, reveal)
        project_img(cv, img, wv2, fx2, fy2, rx=lerp(6, 14, reveal), ry=lerp(-4, 0, reveal) + 1.5 * math.sin(t * 0.6), a=1 - reveal * 0.75)
    # finished real slide lifts out of the canvas; more real slides fan in
    if t >= 12.85:
        e = ease_out5((t - 12.95) / 1.0)
        for i, (n, x, y, z, ry, rz) in enumerate(sorted(FAN, key=lambda f: -f[3])):
            t0 = 15.15 + 0.07 * i
            if t < t0: continue
            e2 = ease_out5((t - t0) / 0.7)
            R.draw_card(cv, Card(n, x=x * e2, y=lerp(-60, y, e2), z=lerp(1400, z, e2), ry=ry * e2, rz=rz * e2, w=700, dim=0.82, blur=1.0, a=clamp01((t - t0) / 0.2), shadow=0.6))
        hold = clamp01((t - 14.0) / 9.0)
        R.draw_card(cv, Card(19, x=0, y=lerp(30, -60, e), z=lerp(600, -40 * hold, e), rx=lerp(14, 0, e), w=lerp(700, 960, e), a=clamp01((t - 12.9) / 0.25), shadow=1.0))
    # hook (written hook, synced to the spoken hook)
    if t < 3.0:
        f = 1 - clamp01((t - 2.8) / 0.2)
        R.gradient_band(cv, 0, 600, 0.9 * f, NIGHT)
        for words, y in [([('WHAT', -0.3), ('GOES', -0.3), ('INTO', -0.3)], 220), ([('ONE', 1.3), ('POLISHED', 1.45)], 330), ([('SLIDE?', 1.95)], 440)]:
            ws = [tw(w_, 'sans-b', 96) for w_, _ in words]; gap = 24; x = CX - (sum(ws) + gap * (len(words) - 1)) / 2
            for (w_, t0), ww in zip(words, ws):
                u = clamp01((t - t0) / 0.2)
                if u > 0:
                    m = text_mask(w_, 'sans-b', 96); sc = lerp(1.15, 1, ease_out(u))
                    if sc != 1: m = cv2.resize(m, (int(m.shape[1] * sc), int(m.shape[0] * sc)))
                    stamp(cv, m, x + ww / 2 - m.shape[1] / 2, y + 50 - m.shape[0] / 2, CORAL if w_ in ('POLISHED',) else WHITE, f * clamp01(u * 2))
                x += ww + gap
    caption(cv, t)
    # CTA
    if t >= 17.65:
        a0 = clamp01((t - 17.65) / 0.3)
        R.gradient_band(cv, 0, 620, 0.92 * a0, NIGHT)
        R.gradient_band(cv, 1150, 1920, 0.92 * a0, NIGHT, top=False)
        aa, d = rise(t, 17.8, 0.4, 22); text(cv, 'GET', 'sans-b', 80, CX, 200 + d, WHITE, aa, 2)
        aa, d = rise(t, 18.0, 0.45, 22); text(cv, 'Business', 'serif', 100, CX, 300 + d, WHITE, aa)
        aa, d = rise(t, 18.2, 0.45, 22); text(cv, 'Presentation Pro', 'serif', 100, CX, 410 + d, WHITE, aa)
        aa, d = rise(t, 19.0, 0.4, 16); text(cv, '60 SLIDES  ·  42 NATIVE CHARTS  ·  POWERPOINT', 'sans-b', 24, CX, 1240 + d, SKY, aa, 3)
        aa, d = rise(t, 19.4, 0.45, 18)
        if aa > 0:
            pill(cv, int(CX - 330), int(1300 + d), 660, 116, CORAL, aa); text(cv, 'LINK IN BIO', 'sans-b', 48, CX, 1330 + d, INK, aa, 3)
    return np.clip(cv * 255 + 0.5, 0, 255).astype(np.uint8)

def render_range(args):
    i0, i1 = args
    return [frame(i / FPS).tobytes() for i in range(i0, i1)]

if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'stills':
        os.makedirs(os.path.join(HERE, 'stills'), exist_ok=True)
        for ts in sys.argv[2:]:
            cv2.imwrite(os.path.join(HERE, 'stills', f'{float(ts):05.2f}.png'), frame(float(ts)))
        sys.exit()
    out = sys.argv[2]
    import imageio_ffmpeg
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    p = subprocess.Popen([ff, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                          '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2',
                          '-movflags', '+faststart', '-r', str(FPS), out], stdin=subprocess.PIPE)
    N = int(round(DUR * FPS))
    from multiprocessing import Pool
    chunks = [(i, min(i + 20, N)) for i in range(0, N, 20)]
    with Pool(int(os.environ.get('JOBS', 4))) as pool:
        for k, frames in enumerate(pool.imap(render_range, chunks)):
            for fb in frames: p.stdin.write(fb)
            if k % 9 == 0: print(f'{chunks[k][1] / FPS:5.1f}s', flush=True)
    p.stdin.close(); p.wait()
    print('wrote', out)
