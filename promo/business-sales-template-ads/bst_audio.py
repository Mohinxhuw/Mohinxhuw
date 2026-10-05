"""Soundtrack for the Business Sales Template ads (ad-03, ad-04): male voiceover (Kokoro am_michael)
plus subtle synthesised UI sound effects only — NO music. Cues follow bst_ads.py's timeline.
The effects are sidechained under the voice; master -14 LUFS with a true-peak limiter.

usage: python3 bst_audio.py ad3|ad4 out.wav
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
    S = np.zeros((int(dur * SR), 2))
    if ad == 'ad3':
        place(S, whoosh(3.0, 1400, 220, attack=0.15), 0.0, -31)                       # slow macro pull-back
        for t in (0.45, 1.95, 2.55): tick(S, t)
        place(S, swipe(0.3, 1500, 4500), 2.15, -33)                                     # highlighter
        place(S, whoosh(1.0, 1600, 200, attack=0.3), 1.75, -29)                         # colour drains away
        for k in range(15): place(S, click(2600, 0.003, 800), 3.92 + k * 0.028, -38, 0.3 * math.sin(k))   # tiles drop out
        for k in range(15): place(S, tap(180, 120, 0.03), 4.5 + k * 0.14, -33, 0.25 * math.sin(k * 1.7))   # pieces placed by hand
        for t in (3.95, 4.2, 5.0, 5.15, 5.45): tick(S, t)
        place(S, swipe(0.3, 1500, 4500), 5.6, -33)
        place(S, impact(1.2), 6.72, -22); place(S, swipe(0.5, 800, 5200, attack=0.5), 6.68, -26)           # colour snaps back
        place(S, whoosh(0.9, 200, 1500, attack=0.4), 7.45, -27)
        for k in range(1, 10):                                                           # carousel: tick as each layout passes centre
            u = np.linspace(0, 1, 2000); p = 9.0 * np.where(u < .5, 4 * u ** 3, 1 - (-2 * u + 2) ** 3 / 2)
            tc = 7.6 + 2.9 * u[np.argmax(p >= k - 0.5)]
            place(S, click(3000, 0.003, 1000), tc, -33, 0.2 * ((-1) ** k))
        place(S, tap(170, 110, 0.04), 8.65, -29)
        for t in (9.2, 9.4): tick(S, t)
        place(S, swipe(0.3, 1500, 4500), 9.55, -33)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 10.55, -28)
        place(S, swipe(0.45, 600, 3200, attack=0.6), 10.62, -27, -0.7, 0.0)
        place(S, swipe(0.45, 600, 3200, attack=0.6), 10.8, -27, 0.7, 0.0)
        place(S, tap(170, 110, 0.04), 11.05, -29)
        for t in (11.6, 11.85, 12.75, 12.85): tick(S, t)
        place(S, swipe(0.3, 1500, 4500), 12.0, -33)
        place(S, whoosh(0.8, 200, 1600, attack=0.5), 12.55, -26)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 13.7, -28)
        place(S, whoosh(0.8, 200, 1600, attack=0.5), 13.75, -27)
        for t in (13.98, 14.3, 16.15, 16.6): tick(S, t)
        place(S, whoosh(3.0, 150, 700, attack=0.5), 14.6, -34)                           # slow push into the chart
        place(S, swipe(0.3, 1500, 4500), 16.8, -33)
        place(S, pop(1050), 16.95, -29)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 18.0, -28)
        place(S, whoosh(0.9, 200, 1500, attack=0.45), 18.15, -27)
        for t in (18.32, 18.55, 18.7, 19.15, 19.95, 20.15, 20.4): tick(S, t)
        place(S, swipe(0.3, 1500, 4500), 19.3, -33)
        for t in (18.95, 19.65, 20.35):                                                  # theme colour switches
            place(S, click(3400, 0.004, 1300), t, -29); place(S, sheen(0.6), t - 0.05, -33)
        place(S, whoosh(0.7, 200, 2400, attack=0.6), 21.1, -25)                          # panel wipe to the end card
        place(S, whoosh(1.0, 150, 1300, attack=0.4), 21.5, -27)
        place(S, impact(1.6), 22.25, -23)
        place(S, sheen(1.2), 21.7, -33, -0.4, 0.4)
        tick(S, 22.7); place(S, click(3200, 0.004, 1200), 23.45, -29); place(S, pop(950), 23.5, -31)
        place(S, whoosh(2.4, 140, 600, attack=0.5), 24.4, -34)                           # slow settle on the final hold
    else:
        place(S, impact(1.6), 0.0, -25)
        place(S, whoosh(1.5, 220, 1400, attack=0.3), 0.0, -28)                           # macro pull-back
        for t in (0.5, 1.55, 1.85, 3.05): tick(S, t)
        place(S, sheen(1.2), 1.45, -31, -0.5, 0.5)                                       # 99 slides appear
        for k in range(18): place(S, click(5200 + 90 * (k % 5), 0.0016, 2500), 1.5 + rng.random() * 0.6, -41, rng.uniform(-0.7, 0.7))
        place(S, whoosh(1.4, 160, 900, attack=0.5), 3.0, -29)                            # grid tilts away
        place(S, swipe(0.4, 700, 3200, attack=0.6), 4.35, -27)
        for i in range(5): place(S, tap(170, 115, 0.035), 4.45 + 0.05 * i, -32, (i - 2) * 0.25)   # covers fan out
        for t in (4.55, 4.7, 4.95): tick(S, t)
        place(S, whoosh(0.5, 1800, 300, attack=0.3), 5.85, -28)
        place(S, swipe(0.45, 600, 3200, attack=0.6), 5.82, -27, -0.7, 0.0)
        place(S, swipe(0.45, 600, 3200, attack=0.6), 6.07, -27, 0.7, 0.0)
        for t in (6.05, 6.3, 7.0, 7.15, 7.5): tick(S, t)
        place(S, whoosh(0.5, 1800, 300, attack=0.3), 8.12, -28)
        place(S, whoosh(0.9, 200, 1500, attack=0.45), 8.25, -26)
        for t in (8.32, 8.75): tick(S, t)
        place(S, whoosh(0.4, 1800, 300, attack=0.3), 9.82, -28)
        for t in (9.88, 10.85, 11.8): place(S, swipe(0.4, 900, 5200, attack=0.5), t, -25, 0.7, -0.7)   # whip-pans
        for t in (10.02, 10.3, 10.95, 11.1): tick(S, t)
        place(S, whoosh(0.9, 200, 1600, attack=0.45), 11.95, -26)
        for t in (12.07, 12.5): tick(S, t)
        place(S, whoosh(0.5, 1800, 300, attack=0.3), 13.42, -28)
        for i in range(4): place(S, swipe(0.4, 600, 3400, attack=0.6), 13.55 + 0.1 * i, -29, [-0.6, 0.6, -0.6, 0.6][i], 0.0)
        for t in (13.67, 13.95, 14.3, 14.45): tick(S, t)
        place(S, whoosh(1.0, 150, 900, attack=0.5), 15.2, -29)
        place(S, pop(1050), 15.6, -29)
        place(S, whoosh(0.5, 1800, 300, attack=0.3), 16.78, -28)
        place(S, whoosh(1.3, 150, 1300, attack=0.35), 16.85, -27)
        for t in (17.0, 17.2, 18.35): tick(S, t)
        place(S, whoosh(1.0, 150, 1300, attack=0.4), 17.45, -27)
        place(S, impact(1.6), 18.2, -23)
        place(S, sheen(1.2), 17.6, -33, -0.4, 0.4)
        place(S, click(3200, 0.004, 1200), 18.9, -29); place(S, pop(950), 18.95, -31)
        place(S, whoosh(2.4, 140, 600, attack=0.5), 19.8, -34)
    return S

def voice(ad, starts, dur):
    V = np.zeros(int(dur * SR))
    info = json.load(open(os.path.join(HERE, 'vo', f'{ad}.json')))
    for x, t0 in zip(info, starts):
        a, sr = sf.read(os.path.join(HERE, 'vo', f"{ad}_l{x['i']}.wav"))
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
    ad, out = sys.argv[1], sys.argv[2]
    import bst_ads
    cfg = bst_ads.ADS[ad][1]; dur = cfg['dur']
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
