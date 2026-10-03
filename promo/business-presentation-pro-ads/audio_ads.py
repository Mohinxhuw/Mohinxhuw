"""Soundtracks for the two Business Presentation Pro ads: AI male voiceover (Kokoro am_michael)
plus subtle synthesised UI sound effects only (no music, no samples).
The master is normalised to -14 LUFS with a true-peak limiter.

usage: python3 audio_ads.py ad1|ad2 out.wav
"""
import os, sys, math, json
import numpy as np, soundfile as sf, pyloudnorm as pyln
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import maximum_filter1d
from scipy.io import wavfile
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from sfxlib import SR, db, place, band_noise, whoosh, swipe, click, tap, pop, impact
rng = np.random.default_rng(5)

def lp(x, f, order=2): return sosfilt(butter(order, f, 'lp', fs=SR, output='sos'), x, axis=0)
def hp(x, f, order=2): return sosfilt(butter(order, f, 'hp', fs=SR, output='sos'), x, axis=0)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'bp', fs=SR, output='sos'), x, axis=0)

def sheen(dur=1.2):
    """Airy, non-tonal reveal sweep (band-limited noise, no pitch)."""
    return band_noise(dur, 2500, 8000, 0.9, attack=0.35, curve=1.4)

def sfx(ad, dur):
    S = np.zeros((int(dur * SR), 2))
    if ad == 'ad1':
        for t in (0.0, 0.32, 0.95, 1.75, 2.0): place(S, click(4200, 0.002, 1800), t, -34)
        place(S, swipe(0.55, 500, 3200), 1.30, -24, 0.7, 0.0)                 # dashboard replaces blank
        place(S, tap(170, 100, 0.05), 1.85, -26)
        g = band_noise(0.22, 2500, 600, 2.0, attack=0.05)                    # deconstruct glitch
        place(S, g, 2.95, -22); place(S, tap(110, 55, 0.12), 2.97, -22)
        for k in range(12): place(S, click(2400, 0.003, 800), 3.2 + k * 0.26, -37, 0.3)   # clock ticks
        for t in (3.6, 4.5, 5.4): place(S, click(3000, 0.004, 1100), t, -31, -0.2)       # mouse clicks
        place(S, impact(1.2), 6.30, -20); place(S, whoosh(0.6, 1800, 300, attack=0.2), 6.25, -25)  # rebuild snap
        place(S, whoosh(0.9, 200, 1600, attack=0.4), 6.75, -26)
        for k in range(12): place(S, click(5000 + 80 * k, 0.0018, 2400), 6.85 + k * 0.055, -35)
        place(S, whoosh(0.8, 150, 1200, attack=0.5), 8.55, -25)
        place(S, swipe(0.4, 1200, 400), 9.95, -27, 0.0, -0.6)
        for i in range(3): place(S, swipe(0.4, 600, 3000, attack=0.6), 9.9 + i * 0.16, -27, [-0.6, 0.6, -0.6][i], 0.0)
        place(S, whoosh(0.7, 200, 1500, attack=0.5), 11.5, -26)
        place(S, click(3000, 0.004, 1100), 12.55, -27); place(S, pop(1100), 12.62, -28)
        place(S, whoosh(1.0, 120, 1800, attack=0.6), 13.0, -21)
        place(S, impact(1.6), 13.42, -19)
        place(S, whoosh(1.0, 150, 1400, attack=0.4), 14.6, -25)
        place(S, click(3200, 0.004, 1200), 15.6, -28)
        # soft ticks on the kinetic words already on screen
        for t in (3.05, 3.40, 3.55, 4.15, 7.35, 7.65, 9.30, 9.60, 10.12, 10.30, 11.72, 11.90, 12.10, 12.25, 12.45, 13.62, 14.05, 14.25):
            place(S, click(4400, 0.0018, 1900), t, -37, 0.15)
        place(S, band_noise(0.9, 400, 2500, 1.2, attack=0.9, curve=1.5), 5.4, -27)   # soft lift into the rebuild
        place(S, sheen(1.3), 14.95, -30, -0.4, 0.4)                                    # product name reveal
        place(S, whoosh(2.2, 140, 600, attack=0.5), 16.4, -33)                          # slow push on the final hold
    else:
        place(S, impact(1.8), 0.0, -24)
        sh = band_noise(2.1, 3000, 9000, 0.8, attack=0.5, curve=1.3)        # light-sweep shimmer
        place(S, sh, 0.0, -31, -0.6, 0.6)
        place(S, whoosh(1.1, 1600, 220, attack=0.3), 2.0, -26)
        place(S, swipe(0.4, 900, 3600, attack=0.7), 3.9, -24)
        place(S, tap(150, 95, 0.05), 4.42, -27)
        place(S, impact(1.4), 5.65, -21)
        place(S, whoosh(0.7, 160, 900, attack=0.5), 6.72, -24, 0.6, -0.2)     # door swing
        place(S, whoosh(0.7, 1800, 220, attack=0.4), 7.70, -24)               # drop
        place(S, tap(120, 60, 0.09), 8.25, -24)
        place(S, whoosh(0.9, 200, 3000, attack=0.75), 8.95, -21)              # fly-through
        place(S, whoosh(1.4, 120, 1500, attack=0.35), 10.4, -24)
        for k in range(12): place(S, click(4800 + 70 * k, 0.0018, 2300), 10.78 + k * 0.058, -36)
        place(S, whoosh(1.0, 150, 1200, attack=0.45), 13.95, -24)
        place(S, impact(1.8), 14.55, -21)
        place(S, band_noise(1.4, 3500, 9000, 0.8, attack=0.5), 15.2, -32, -0.5, 0.5)
        place(S, click(3200, 0.004, 1200), 15.95, -29)
        # soft ticks on text reveals already on screen
        for t in (0.70, 1.02, 2.20, 2.75, 4.30, 5.65, 7.00, 7.90, 9.25, 11.20, 11.85, 14.15, 14.35, 15.35, 15.70):
            place(S, click(4000, 0.002, 1700), t, -37, -0.15)
        place(S, band_noise(0.9, 400, 2500, 1.2, attack=0.9, curve=1.5), 4.8, -28)    # lift into the reveal
        place(S, band_noise(0.8, 400, 2500, 1.2, attack=0.9, curve=1.5), 9.95, -29)   # lift into the wall
        place(S, whoosh(2.0, 140, 600, attack=0.5), 16.2, -33)                          # slow push on the final hold
    return S

def voice(ad, starts, dur):
    V = np.zeros(int(dur * SR))
    info = json.load(open(os.path.join(HERE, 'vo', f'{ad}.json')))
    for x, t0 in zip(info, starts):
        a, sr = sf.read(os.path.join(HERE, 'vo', f"{ad}_l{x['i']}.wav"))
        a = resample_poly(a, SR, sr); i = int(t0 * SR); V[i:i + len(a)] += a[:len(V) - i]
    V = hp(V, 90)
    V = V + 0.22 * bp(V, 2500, 6000)                       # presence
    env = np.sqrt(fftconvolve(V ** 2, np.ones(int(.02 * SR)) / int(.02 * SR), 'same').clip(0))
    thr = np.percentile(env[env > 1e-3], 70)
    V = V * np.where(env > thr, (np.maximum(env, 1e-9) / thr) ** -0.35, 1.0)   # gentle compression
    return V / np.max(np.abs(V))

def limit(x, ceil_db=-1.2, look=0.004, rel=0.08):
    up = resample_poly(x, 4, 1, axis=0)
    pk = np.abs(up).max(1).reshape(-1, 4).max(1)[:len(x)]
    need = np.minimum(1.0, db(ceil_db) / np.maximum(pk, 1e-9))
    L = int(look * SR); g = -maximum_filter1d(-need, size=2 * L + 1)
    a = math.exp(-1 / (rel * SR)); out = np.empty_like(g); cur = 1.0
    for i, v in enumerate(g):
        cur = v if v < cur else v + (cur - v) * a
        out[i] = cur
    return x * out[:, None]

if __name__ == '__main__':
    ad, out = sys.argv[1], sys.argv[2]
    import ads
    cfg = ads.ADS[ad][1]; dur = cfg['dur']
    meter = pyln.Meter(SR)
    V = voice(ad, cfg['vo'], dur)
    S = sfx(ad, dur)
    # room for the sfx
    ir_t = np.arange(int(0.4 * SR)) / SR
    ir = rng.standard_normal((len(ir_t), 2)) * np.exp(-ir_t / 0.1)[:, None]
    ir = np.stack([bp(ir[:, c], 300, 7000) for c in range(2)], 1); ir /= np.sqrt((ir ** 2).sum(0))
    S = S + 0.15 * np.stack([fftconvolve(S[:, c], ir[:, c])[:len(S)] for c in range(2)], 1)
    Vst = np.stack([V, V], 1) + 0.05 * np.stack([fftconvolve(V, ir[:, c])[:len(V)] for c in range(2)], 1)
    # stem loudness: voice on top, sound effects ~6 LU under it
    Vst *= db(-16 - meter.integrated_loudness(Vst))
    S *= db(-19 - meter.integrated_loudness(S))
    # sidechain: while the voice is speaking, keep the effects >= 10 dB under it (fast attack, smooth release);
    # between phrases they play at full level so every transition still lands
    def env(x, ms):
        k = int(ms / 1000 * SR); return np.sqrt(fftconvolve(x ** 2, np.ones(k) / k, 'same').clip(0))
    hv = hp(Vst.mean(1), 150); hs = hp(S.mean(1), 150)
    ev, es = env(hv, 30), env(hs, 30)
    speaking = env(hv, 120) > 0.1 * np.percentile(env(hv, 120), 95)
    need = np.where(speaking, np.minimum(1.0, ev * db(-10) / np.maximum(es, 1e-9)), 1.0)
    need = -maximum_filter1d(-need, size=int(0.02 * SR))           # look-ahead so the dip lands before the peak
    g = np.empty_like(need); cur = 1.0; att = math.exp(-1 / (0.008 * SR)); rel = math.exp(-1 / (0.15 * SR))
    for i, v in enumerate(need):
        cur = v + (cur - v) * (att if v < cur else rel); g[i] = cur
    S *= g[:, None]
    mix = hp(Vst + S, 28)
    for _ in range(3):
        mix *= db(-14 - meter.integrated_loudness(mix)); mix = limit(mix)
    wavfile.write(out, SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16))
    if os.environ.get('STEMS'):
        for name, x in [('voice', Vst), ('sfx', S)]: wavfile.write(out.replace('.wav', f'_{name}.wav'), SR, (np.clip(x * 3, -1, 1) * 32767).astype(np.int16))
    for name, x in [('voice', Vst), ('sfx', S)]:
        print(name, round(meter.integrated_loudness(x), 1), 'LUFS (pre-master)')
    print('master', round(meter.integrated_loudness(mix), 2), 'LUFS; peak', round(20 * math.log10(np.max(np.abs(mix))), 2), 'dBFS', len(mix) / SR, 's')
