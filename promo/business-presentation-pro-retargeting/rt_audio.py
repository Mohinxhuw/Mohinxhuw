"""Soundtrack for the Business Presentation Pro retargeting ads (r1-r3): male voiceover (Kokoro am_michael)
plus subtle synthesised UI sound effects only — NO music. Cues follow rt.py's timeline.
The effects are sidechained under the voice; master -14 LUFS with a true-peak limiter.

usage: python3 rt_audio.py r1|r2|r3 out.wav
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
    if ad == 'r1':
        place(S, sheen(1.0), 0.0, -33, -0.4, 0.4)
        place(S, swipe(0.6, 500, 3000, attack=0.4), 0.1, -28)                           # slides fan out of the cover
        for i in range(5): place(S, tap(175, 115, 0.035), 0.3 + i * 0.09, -33, (i - 2) * 0.25)
        for t in (1.4, 1.62, 2.05, 2.25, 2.4): tick(S, t)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 3.15, -28)
        place(S, whoosh(0.9, 200, 1400, attack=0.4), 3.25, -27)
        for k in range(12): place(S, click(5000 + 80 * k, 0.0018, 2400), 3.4 + k * 0.055, -36)
        for t in (3.8, 4.05, 7.1, 7.35, 10.88, 13.88, 18.38, 18.62, 20.48, 20.65, 20.75, 21.0): tick(S, t)
        for t0 in (3.35, 6.65, 10.85, 13.85, 18.35): place(S, pop(880), t0 + 0.4, -31)  # checklist ticks
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 6.45, -28); place(S, whoosh(0.8, 200, 1500, attack=0.45), 6.55, -27)
        place(S, tap(170, 110, 0.04), 6.7, -30)
        place(S, click(3200, 0.004, 1200), 8.45, -29); place(S, pop(1050), 8.5, -31)
        place(S, swipe(0.45, 600, 3000, attack=0.6), 8.85, -29, -0.6, 0.0); place(S, swipe(0.45, 600, 3000, attack=0.6), 8.97, -29, 0.6, 0.0)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 10.5, -28)
        for i, t0 in enumerate((10.85, 11.4, 11.95)):
            place(S, swipe(0.45, 600, 3200, attack=0.6), t0 - 0.2, -27, [-0.7, 0.7, -0.7][i], 0.0); place(S, tap(165, 110, 0.04), t0 + 0.3, -31)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 13.55, -28)
        for i, t0 in enumerate((13.9, 14.4, 15.05, 15.6)): place(S, swipe(0.4, 700, 3200, attack=0.6), t0 - 0.15, -28, [-0.6, 0.6, -0.6, 0.6][i], 0.0)
        place(S, whoosh(0.7, 1600, 300, attack=0.4), 16.85, -28); place(S, tap(140, 90, 0.06), 17.45, -28)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 18.0, -28); place(S, whoosh(0.8, 200, 1500, attack=0.45), 18.2, -27)
        for k in range(24): place(S, click(5400 + 200 * (k % 3), 0.0016, 2600), 18.9 + k * 0.042, -39, 0.1)   # notes typing
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 20.2, -28); place(S, whoosh(0.8, 200, 1500, attack=0.45), 20.35, -27)
        place(S, whoosh(1.2, 300, 2600, attack=0.3), 21.85, -25)                         # the deck bursts around the blank slide
        for i in range(6): place(S, tap(170, 120, 0.03), 21.95 + i * 0.07, -34, np.sin(i * 2.1) * 0.6)
        place(S, whoosh(0.8, 200, 2400, attack=0.6), 23.2, -25); place(S, whoosh(1.0, 150, 1300, attack=0.4), 23.7, -27)
        for i in range(5): place(S, pop(820 + 60 * i), 24.05 + i * 0.08, -33)
        place(S, impact(1.6), 24.55, -23); place(S, click(3200, 0.004, 1200), 24.95, -29)
        place(S, whoosh(2.4, 140, 600, attack=0.5), 25.8, -34)
    elif ad == 'r2':
        place(S, impact(1.4), 0.0, -26); place(S, sheen(1.0), 0.0, -32, -0.4, 0.4)     # projector on
        for t in (-0.4 + 0.45, 1.0): tick(S, max(t, 0.02))
        for t0 in (3.0, 5.4, 8.2, 9.6, 11.0, 12.15, 13.5, 15.25):                          # clicker + slide push
            place(S, click(2600, 0.006, 900), t0 - 0.05, -27); place(S, swipe(0.5, 1400, 500, attack=0.3), t0, -29, 0.5, -0.5)
        for t0 in (3.0, 5.4, 8.2, 13.5): place(S, whoosh(1.2, 150, 600, attack=0.5), t0 + 0.7, -35)   # slow push into a detail
        for t0 in (3.05, 5.45, 8.25, 11.05, 13.55): tick(S, t0)
        place(S, whoosh(1.0, 1500, 200, attack=0.3), 16.2, -27)
        for t in (16.4, 16.6, 17.2, 17.7): tick(S, t)
        place(S, impact(1.6), 16.9, -24); place(S, sheen(1.0), 16.5, -33)
        place(S, click(3200, 0.004, 1200), 18.0, -29); place(S, pop(950), 18.05, -31)
        place(S, whoosh(2.2, 140, 600, attack=0.5), 19.0, -34)
    else:
        for t in (0.0, 1.333, 2.667): place(S, band_noise(0.9, 1200, 4200, 0.8, attack=0.5, curve=1.5), t, -33, -0.6, 0.6)   # scan sweeps
        place(S, impact(1.2), 0.0, -27)
        for t in (0.02, 1.05, 1.25, 2.45): tick(S, t)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 3.15, -28)
        for t0 in (3.5, 7.95, 11.95, 15.95): place(S, pop(900), t0 + 0.05, -30); place(S, whoosh(0.8, 200, 1500, attack=0.45), t0, -28)
        tick(S, 4.35); place(S, swipe(0.4, 1500, 3800), 5.6, -36, 0.4, 0.0)
        place(S, click(3000, 0.004, 1100), 6.15, -27); place(S, pop(1100), 6.22, -29)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 7.7, -28)
        tick(S, 8.92)
        for t in (9.55, 10.95): place(S, click(3400, 0.004, 1300), t, -28); place(S, sheen(0.6), t - 0.05, -32)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 11.6, -28)
        for t in (12.88, 13.6): tick(S, t)
        for t in (13.2, 13.5): place(S, pop(1000), t, -32)
        place(S, whoosh(2.4, 150, 700, attack=0.5), 12.8, -35)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 15.6, -28)
        u = np.linspace(0, 1, 4000); pos = 60 * np.where(u < .5, 4 * u ** 3, 1 - (-2 * u + 2) ** 3 / 2)
        for k in range(1, 60):                                                              # page riffle, one soft flick per slide
            tc = 16.9 + 2.2 * u[np.argmax(pos >= k)]
            place(S, click(3600 + 40 * (k % 7), 0.0025, 1400), tc, -38, 0.3 * np.sin(k))
        tick(S, 17.6)
        place(S, whoosh(0.6, 1800, 300, attack=0.3), 19.4, -28); place(S, whoosh(1.0, 150, 1300, attack=0.4), 19.65, -27)
        for t in (19.82, 19.98, 20.15, 20.4, 21.1): tick(S, t)
        place(S, impact(1.6), 20.45, -24)
        for i in range(4): place(S, pop(840 + 60 * i), 21.55 + i * 0.12, -33)
        place(S, click(3200, 0.004, 1200), 22.25, -29)
        place(S, whoosh(2.4, 140, 600, attack=0.5), 23.4, -34)
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
    import rt
    cfg = rt.ADS[ad][1]; dur = cfg['dur']
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
