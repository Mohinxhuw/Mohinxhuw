"""Soundtrack for business-presentation-pro-powerpoint-process.mp4: male voiceover (Kokoro am_michael)
plus subtle synthesised UI sound effects only — NO music. Cues follow pp.py's timeline (clicks, typing, edits).
The effects are sidechained under the voice; master -14 LUFS with a true-peak limiter.

usage: python3 pp_audio.py out.wav
"""
import os, sys, math, json
import numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import maximum_filter1d
from scipy.io import wavfile
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from sfxlib import SR, db, place, band_noise, whoosh, swipe, click, tap, pop, impact
rng = np.random.default_rng(9)
def hp(x, f): return sosfilt(butter(2, f, 'hp', fs=SR, output='sos'), x, axis=0)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'bp', fs=SR, output='sos'), x, axis=0)
def tick(S, t, g=-37, pan=0.0): place(S, click(4300, 0.0018, 1900), t, g, pan)
def sheen(d=1.0): return band_noise(d, 2500, 8000, 0.9, attack=0.35, curve=1.4)

def sfx(ad, dur):
    import pp
    S = np.zeros((int(dur * SR), 2)); r = np.random.default_rng(4)
    def key(t, g=-34): place(S, click(2300 + r.integers(0, 900), 0.0035, 600 + r.integers(0, 300)), t, g + r.uniform(-2, 1), r.uniform(-0.15, 0.15))
    def mclick(t, g=-28): place(S, click(2700, 0.006, 900), t, g); place(S, click(1900, 0.004, 700), t + 0.07, g - 8)   # press + release
    place(S, sheen(0.9), 0.0, -33, -0.4, 0.4)
    place(S, whoosh(0.8, 2400, 300, attack=0.2), 0.88, -29)                                   # rewind
    for k in range(13): place(S, click(4200 - 140 * k, 0.002, 1600), 0.92 + k * 0.053, -37)
    for t in (-0.3, 1.3, 1.45, 1.95): tick(S, max(t, 0.02))
    for t in pp.CLICKS: mclick(t)
    ts = np.sort(3.02 + np.cumsum(r.uniform(0.05, 0.13, 40)))                                   # typing the title
    for t in ts[ts < 4.33]: key(t)
    place(S, tap(170, 110, 0.03), 4.75, -31)                                                   # eyebrow + subtitle land
    place(S, tap(170, 110, 0.03), 5.55, -30)                                                   # first KPI text box
    for i in range(3): place(S, tap(175, 115, 0.03), 6.05 + i * 0.05, -32, (i - 1) * 0.3)      # duplicated KPIs
    place(S, click(5200, 0.0015, 2400), 6.12, -36); place(S, click(5200, 0.0015, 2400), 6.2, -37)   # guides snap
    place(S, pop(950), 7.18, -31)                                                              # colour palette opens
    place(S, band_noise(0.35, 2500, 7000, 0.8, attack=0.4), 7.45, -36)                         # colour applied
    for t0, t1 in ((8.2, 8.6), (8.7, 9.05)): place(S, band_noise(t1 - t0, 300, 900, 1.2, attack=0.3, curve=1.2), t0, -38)   # drag
    place(S, tap(150, 100, 0.04), 9.1, -30)
    for t in (10.0, 10.85): place(S, whoosh(0.4, 400, 2000, attack=0.6), t - 0.15, -32); place(S, tap(160, 105, 0.04), t + 0.02, -30)
    place(S, pop(1050), 11.48, -32)                                                            # context menu
    for t in (2.95, 5.0, 7.6, 9.6, 11.2): place(S, whoosh(0.7, 150, 800, attack=0.5), t, -37)  # camera moves
    place(S, whoosh(1.1, 1600, 200, attack=0.35), 12.8, -26)                                   # pull back from the editor
    place(S, impact(1.5), 13.4, -25); place(S, sheen(1.2), 13.2, -33, -0.4, 0.4)
    for i in range(6): place(S, swipe(0.4, 600, 3200, attack=0.6), 15.08 + 0.07 * i, -31, [-0.6, 0.6, 0, -0.7, 0.7, 0][i], 0.0)
    place(S, whoosh(0.9, 200, 1600, attack=0.45), 17.55, -27)
    for t in (17.8, 18.0, 18.2, 19.0): tick(S, t)
    place(S, impact(1.6), 18.05, -24)
    place(S, click(3200, 0.004, 1200), 19.45, -28); place(S, pop(950), 19.5, -31)
    place(S, whoosh(2.4, 140, 600, attack=0.5), 20.6, -35)
    return S

def voice(ad, starts, dur):
    V = np.zeros(int(dur * SR))
    info = json.load(open(os.path.join(HERE, 'vo', 'lines.json')))
    for x, t0 in zip(info, starts):
        a, sr = sf.read(os.path.join(HERE, 'vo', f"l{x['i']}.wav"))
        a = resample_poly(a, SR, sr); i = int(t0 * SR); V[i:i + len(a)] += a[:len(V) - i]
    V = hp(V, 90); V = V + 0.22 * bp(V, 2500, 6000)
    env = np.sqrt(fftconvolve(V ** 2, np.ones(int(.02 * SR)) / int(.02 * SR), 'same').clip(0))
    thr = np.percentile(env[env > 1e-3], 70)
    V = V * np.where(env > thr, (np.maximum(env, 1e-9) / thr) ** -0.35, 1.0)
    return V / np.max(np.abs(V))

def limit(x, ceil_db=-1.2, look=0.004, rel=0.08):
    up = resample_poly(x, 4, 1, axis=0); pk = np.abs(up).max(1).reshape(-1, 4).max(1)[:len(x)]
    need = np.minimum(1.0, db(ceil_db) / np.maximum(pk, 1e-9))
    L = int(look * SR); g = -maximum_filter1d(-need, size=2 * L + 1)
    a = math.exp(-1 / (rel * SR)); out = np.empty_like(g); cur = 1.0
    for i, v in enumerate(g):
        cur = v if v < cur else v + (cur - v) * a; out[i] = cur
    return x * out[:, None]

if __name__ == '__main__':
    out = sys.argv[1]; ad = 'pp'
    import pp
    cfg = dict(dur=pp.DUR, vo=pp.VO); dur = cfg['dur']
    meter = pyln.Meter(SR)
    V = voice(ad, cfg['vo'], dur); S = sfx(ad, dur)
    ir_t = np.arange(int(0.4 * SR)) / SR
    ir = rng.standard_normal((len(ir_t), 2)) * np.exp(-ir_t / 0.1)[:, None]
    ir = np.stack([bp(ir[:, c], 300, 7000) for c in range(2)], 1); ir /= np.sqrt((ir ** 2).sum(0))
    S = S + 0.15 * np.stack([fftconvolve(S[:, c], ir[:, c])[:len(S)] for c in range(2)], 1)
    Vst = np.stack([V, V], 1) + 0.05 * np.stack([fftconvolve(V, ir[:, c])[:len(V)] for c in range(2)], 1)
    Vst *= db(-16 - meter.integrated_loudness(Vst))
    S *= db(-19 - meter.integrated_loudness(S))
    # sidechain: while the voice speaks, effects stay >= 10 dB under it; full level between phrases
    def env(x, ms):
        k = int(ms / 1000 * SR); return np.sqrt(fftconvolve(x ** 2, np.ones(k) / k, 'same').clip(0))
    hv = hp(Vst.mean(1), 150); hs = hp(S.mean(1), 150)
    ev, es = env(hv, 30), env(hs, 30)
    speaking = env(hv, 120) > 0.1 * np.percentile(env(hv, 120), 95)
    need = np.where(speaking, np.minimum(1.0, ev * db(-10) / np.maximum(es, 1e-9)), 1.0)
    need = -maximum_filter1d(-need, size=int(0.02 * SR))
    g = np.empty_like(need); cur = 1.0; att = math.exp(-1 / (0.008 * SR)); rel = math.exp(-1 / (0.15 * SR))
    for i, v in enumerate(need):
        cur = v + (cur - v) * (att if v < cur else rel); g[i] = cur
    S *= g[:, None]
    mix = hp(Vst + S, 28)
    for _ in range(3):
        mix *= db(-14 - meter.integrated_loudness(mix)); mix = limit(mix)
    fade = np.ones(len(mix)); fade[-int(0.35 * SR):] = np.linspace(1, 0, int(0.35 * SR)) ** 2
    mix *= fade[:, None]
    wavfile.write(out, SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16))
    if os.environ.get('STEMS'):
        for name, x in [('voice', Vst), ('sfx', S)]: wavfile.write(out.replace('.wav', f'_{name}.wav'), SR, (np.clip(x * 3, -1, 1) * 32767).astype(np.int16))
    print('voice', round(meter.integrated_loudness(Vst), 1), '| sfx', round(meter.integrated_loudness(S), 1), '| master', round(meter.integrated_loudness(mix), 2), 'LUFS; peak', round(20 * math.log10(np.max(np.abs(mix))), 2), 'dBFS', len(mix) / SR, 's')
