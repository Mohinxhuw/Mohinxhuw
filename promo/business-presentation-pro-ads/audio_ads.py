"""Soundtracks for the two Business Presentation Pro ads: AI male voiceover (Kokoro am_michael),
original synthesised music (no samples, no stock audio) and synthesised sound effects.
The music ducks under the voice; the master is normalised to -14 LUFS with a true-peak limiter.

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

def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, f, order=2): return sosfilt(butter(order, f, 'lp', fs=SR, output='sos'), x, axis=0)
def hp(x, f, order=2): return sosfilt(butter(order, f, 'hp', fs=SR, output='sos'), x, axis=0)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'bp', fs=SR, output='sos'), x, axis=0)

def saw(f, n, phase=0.0):
    t = np.arange(n) / SR
    return 2 * ((f * t + phase) % 1.0) - 1

def env_adsr(n, a=0.01, d=0.1, s=0.7, r=0.2):
    e = np.ones(n) * s
    A, D, Rr = int(a * SR), int(d * SR), int(r * SR)
    A = min(A, n); e[:A] = np.linspace(0, 1, A)
    D2 = min(D, max(n - A, 0)); e[A:A + D2] = np.linspace(1, s, D2)
    if Rr and n > Rr: e[-Rr:] *= np.linspace(1, 0, Rr)
    return e

def pad_chord(notes, dur, bright=1400):
    n = int(dur * SR)
    out = np.zeros(n)
    for m in notes:
        for det in (-0.08, 0.0, 0.07):
            out += saw(mtof(m) * 2 ** (det / 12), n, rng.random())
    out = lp(lp(out, bright), bright * 1.3)
    return out * env_adsr(n, 0.35, 0.2, 0.9, 0.45) / (len(notes) * 3)

def bass_note(m, dur, kind='sub'):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    # upper harmonics keep the bass line audible on phone speakers
    x = np.sin(2 * np.pi * f * t) + 0.45 * np.sin(4 * np.pi * f * t) + 0.25 * np.sin(6 * np.pi * f * t)
    x = np.tanh(1.6 * x) * env_adsr(n, 0.005, 0.08, 0.75, 0.05)
    return x

def kick():
    n = int(0.4 * SR); t = np.arange(n) / SR
    f = 45 + 95 * np.exp(-t / 0.035)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.16)
    x += 0.15 * hp(rng.standard_normal(n), 3000) * np.exp(-t / 0.004)
    return x * np.minimum(1, t / 0.0015)

def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7500) * np.exp(-t / (0.06 if open_ else 0.012))

def clap():
    n = int(0.25 * SR); t = np.arange(n) / SR
    x = bp(rng.standard_normal(n), 900, 3200)
    e = np.exp(-t / 0.09) * (1 + 0.6 * (np.sin(2 * np.pi * 90 * t) > 0) * (t < 0.03))
    return x * e

def pluck(m, dur=0.35):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    x = saw(f, n) * 0.6 + np.sin(2 * np.pi * f * t)
    # cutoff closes quickly: two passes with decaying blend emulate a filter envelope
    bright = lp(x, 5000); dark = lp(x, 900)
    k = np.exp(-t / 0.05)
    return (bright * k + dark * (1 - k)) * np.exp(-t / 0.16) * np.minimum(1, t / 0.002)

def bell(m, dur=2.2):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    x = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / (dec)) for r, a, dec in [(1, 1, 1.2), (2.76, 0.4, 0.5), (5.4, 0.2, 0.25), (2.0, 0.3, 0.8)])
    return x * np.minimum(1, t / 0.003)

def riser(dur):
    x = band_noise(dur, 300, 6000, 1.2, attack=0.97, curve=1.6)
    return x

def music(ad, dur):
    N = int(dur * SR) + SR
    L = np.zeros((N, 2))
    if ad == 'ad1':
        bpm, drop, off = 115, 6.30, None
        beat = 60 / bpm; bar = beat * 4
        t0 = drop - 3 * bar                      # bar grid lands on the drop
        prog = [([62, 66, 69, 73], 38), ([61, 64, 69, 76], 45), ([59, 62, 66, 69], 47), ([64, 68, 71, 73], 40)]  # Dmaj7 A/C# Bm7 E6
        nb = int((dur - t0) / bar) + 2
        for b in range(nb):
            ts = t0 + b * bar
            notes, root = prog[b % 4]
            post_drop = ts >= drop - 0.01
            place(L, pad_chord(notes, bar + 0.5, 1500 if not post_drop else 2400), ts, -3 if post_drop else -6)
            if post_drop or ts >= drop - bar:  # bass enters a bar before the drop as a lift
                for k in range(8):
                    if k % 2 == 1 or post_drop:
                        place(L, bass_note(root, beat / 2 * 0.9), ts + k * beat / 2, -16 if post_drop else -19)
            for k in range(4):
                tb = ts + k * beat
                if post_drop and tb < dur - 0.6:
                    place(L, kick(), tb, -12)
                    if k in (1, 3): place(L, clap(), tb, -17, 0.1)
                for h in range(2):
                    th = tb + h * beat / 2
                    if th < dur - 0.6 and (post_drop or th > 1.0):
                        place(L, hat(open_=(h == 1 and post_drop)), th, -25 if post_drop else -30, 0.35)
            if post_drop:  # 16th-note arpeggio on chord tones
                arp = notes + [notes[1] + 12]
                for k in range(16):
                    tk = ts + k * beat / 4
                    if tk < dur - 0.8:
                        place(L, pluck(arp[k % len(arp)] + 12, 0.3), tk, -17 - 2 * (k % 2), -0.3 + 0.6 * ((k * 5) % 7) / 6)
        place(L, riser(drop - 5.35), 5.35, -20)
        # pain section: muted, filtered — the drop opens it up
    else:
        bpm, drop = 96, 5.65
        beat = 60 / bpm; bar = beat * 4
        t0 = drop - 3 * bar
        prog = [([62, 65, 69, 72, 76], 38), ([58, 62, 65, 69], 46), ([55, 58, 62, 65, 69], 43), ([57, 62, 64, 67], 45)]  # Dm9 Bbmaj7 Gm9 A7sus4
        nb = int((dur - t0) / bar) + 2
        for b in range(nb):
            ts = t0 + b * bar
            notes, root = prog[b % 4]
            post = ts >= drop - 0.01
            big = ts >= 10.6
            place(L, pad_chord(notes, bar + 0.6, 1300 if not post else (1900 if not big else 2500)), ts, -3)
            place(L, bell(notes[-1] + 12, 2.4), ts, -15, 0.3 * (1 if b % 2 else -1))
            for k in range(8):   # pulsing 8th-note sub
                tk = ts + k * beat / 2
                if tk >= 0.0 and tk < dur - 0.3:
                    place(L, bass_note(root - 12 if not post else root, beat / 2 * 0.8), tk, -21 if not post else -17)
            if post:
                for k in range(4):
                    tb = ts + k * beat
                    if tb < dur - 0.4:
                        if k in (0, 2) or big: place(L, kick(), tb, -14 if not big else -12)
                        if k == 2 and big: place(L, clap(), tb, -18)
                    for h in range(4 if big else 2):
                        th = tb + h * beat / (4 if big else 2)
                        if th < dur - 0.4: place(L, hat(), th, -29, 0.3)
        place(L, riser(drop - 4.6), 4.6, -21)
        place(L, riser(0.9), 9.85, -22)
    L = L[:int(dur * SR)]
    fade = np.ones(len(L)); fade[-int(0.9 * SR):] = np.linspace(1, 0, int(0.9 * SR)) ** 1.5
    return L * fade[:, None]

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
    M = music(ad, dur); S = sfx(ad, dur)
    # room for the sfx
    ir_t = np.arange(int(0.4 * SR)) / SR
    ir = rng.standard_normal((len(ir_t), 2)) * np.exp(-ir_t / 0.1)[:, None]
    ir = np.stack([bp(ir[:, c], 300, 7000) for c in range(2)], 1); ir /= np.sqrt((ir ** 2).sum(0))
    S = S + 0.15 * np.stack([fftconvolve(S[:, c], ir[:, c])[:len(S)] for c in range(2)], 1)
    Vst = np.stack([V, V], 1) + 0.05 * np.stack([fftconvolve(V, ir[:, c])[:len(V)] for c in range(2)], 1)
    # stem loudness: voice on top, music ~13 LU under it, sfx ~9 LU under
    Vst *= db(-16 - meter.integrated_loudness(Vst))
    M *= db(-26 - meter.integrated_loudness(M))
    S *= db(-25 - meter.integrated_loudness(S))
    # duck music under speech (extra ~5 dB, smooth)
    sp = fftconvolve(np.abs(V), np.ones(int(0.15 * SR)) / int(0.15 * SR), 'same')
    duck = 1 - 0.45 * np.clip(sp / (np.percentile(sp, 90) + 1e-9), 0, 1)
    M *= duck[:, None]; S *= (1 - 0.25 * (1 - duck))[:, None]
    mix = hp(Vst + M + S, 28)
    for _ in range(3):
        mix *= db(-14 - meter.integrated_loudness(mix)); mix = limit(mix)
    wavfile.write(out, SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16))
    if os.environ.get('STEMS'):
        for name, x in [('voice', Vst), ('music', M), ('sfx', S)]: wavfile.write(out.replace('.wav', f'_{name}.wav'), SR, (np.clip(x * 3, -1, 1) * 32767).astype(np.int16))
    for name, x in [('voice', Vst), ('music', M), ('sfx', S)]:
        print(name, round(meter.integrated_loudness(x), 1), 'LUFS (pre-master)')
    print('master', round(meter.integrated_loudness(mix), 2), 'LUFS; peak', round(20 * math.log10(np.max(np.abs(mix))), 2), 'dBFS', len(mix) / SR, 's')
