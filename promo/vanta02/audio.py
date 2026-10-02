"""Soundtrack for the Vanta Template 02 reel: AI male voiceover (Kokoro, am_michael) plus
synthesised sound design (no samples, no music). Cue times come from reel2.py's timeline."""
import sys, os, math, json
import numpy as np
import soundfile as sf
from scipy.signal import fftconvolve, butter, sosfilt, resample_poly
from scipy.io import wavfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import reel2 as R

SR = 48000
DUR = R.DUR
N = int(SR * DUR)
rng = np.random.default_rng(11)
sfx = np.zeros((N, 2))
def db(x): return 10 ** (x / 20)

def place(buf, sig, t, gain_db, pan=0.0, pan_end=None):
    i = int(round(t * SR))
    if sig.ndim == 1:
        p = np.linspace(pan, pan if pan_end is None else pan_end, len(sig))
        th = (p + 1) * np.pi / 4
        sig = np.stack([sig * np.cos(th), sig * np.sin(th)], 1) * np.sqrt(2)
    j = min(i + len(sig), N)
    if j > i: buf[i:j] += sig[: j - i] * db(gain_db)

def band_noise(dur, f0, f1, bw_oct=1.1, attack=0.4, curve=2.0):
    n = int(dur * SR); nfft, hop = 2048, 256
    win = np.hanning(nfft); frames = (n + nfft) // hop + 1
    out = np.zeros(frames * hop + nfft)
    lf = np.log2(np.maximum(np.fft.rfftfreq(nfft, 1 / SR), 1))
    for k in range(frames):
        u = min(k * hop / max(n, 1), 1.0)
        fc = f0 * (f1 / f0) ** u
        spec = np.fft.rfft(rng.standard_normal(nfft) * win)
        spec *= np.exp(-0.5 * ((lf - np.log2(fc)) / (bw_oct / 2.355 * 2)) ** 2)
        out[k * hop: k * hop + nfft] += np.fft.irfft(spec) * win
    out = out[nfft // 2: nfft // 2 + n]
    tt = np.linspace(0, 1, n)
    env = np.where(tt < attack, (tt / attack) ** curve, ((1 - tt) / (1 - attack)) ** (curve * 0.9))
    out *= np.sin(env * np.pi / 2)
    return out / (np.max(np.abs(out)) + 1e-9)

def whoosh(dur, f0=180, f1=1400, attack=0.42):
    s = band_noise(dur, f0, f1, 1.3, attack) + 0.35 * band_noise(dur, f0 * 4, f1 * 3, 0.9, attack, 2.4)
    return s / np.max(np.abs(s))

def swipe(dur=0.32, f0=900, f1=4200, attack=0.35):
    return band_noise(dur, f0, f1, 0.9, attack, 1.6)

def click(f=3400, decay=0.0035, body=1200):
    n = int(0.07 * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) * np.exp(-t / decay) + 0.45 * np.sin(2 * np.pi * body * t) * np.exp(-t / (decay * 3.2))
    tr = sosfilt(butter(2, 2500, 'hp', fs=SR, output='sos'), rng.standard_normal(n) * np.exp(-t / 0.0007))
    s = (s + 0.25 * tr) * np.minimum(1, t / 0.0004)
    return s / np.max(np.abs(s))

def tap(f0=150, f1=90, decay=0.06):
    n = int(0.2 * SR); t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t / 0.02)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / decay)
    paper = sosfilt(butter(2, [1800, 6000], 'bp', fs=SR, output='sos'), rng.standard_normal(n)) * np.exp(-t / 0.009)
    s = (s + 0.3 * paper / (np.max(np.abs(paper)) + 1e-9)) * np.minimum(1, t / 0.0008)
    return s / np.max(np.abs(s))

def pop(f=900):
    n = int(0.09 * SR); t = np.arange(n) / SR
    fr = f * (1 + 0.6 * np.exp(-t / 0.01))
    s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / 0.022) * np.minimum(1, t / 0.0006)
    return s / np.max(np.abs(s))

def impact(dur=1.4):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 46 + 70 * np.exp(-t / 0.05)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.35)
    air = band_noise(dur, 2400, 500, 1.6, 0.02, 1.0) * np.exp(-t / 0.25)
    s = s + 0.25 * air
    return s / np.max(np.abs(s))

# ---------------- cue sheet ----------------
place(sfx, whoosh(1.5, 1400, 160, attack=0.08), 0.0, -22)                           # macro pull-back
place(sfx, swipe(0.6, 500, 2600), 0.7, -28, -0.7, -0.3)                             # left card enters
place(sfx, swipe(0.6, 560, 2800), 0.9, -28, 0.7, 0.3)                               # right card enters
place(sfx, whoosh(0.9, 300, 2600, attack=0.7), 2.45, -24, 0, 0)                     # cards split apart
place(sfx, whoosh(1.0, 90, 700, attack=0.75), 2.6, -22)                             # cobalt wipe
place(sfx, whoosh(1.4, 120, 1500, attack=0.3), 2.95, -24, 0, 0)                     # cover rises
place(sfx, impact(1.6), 3.55, -24)                                                   # brand lands
for tc in (3.45, 4.15, 4.85):
    place(sfx, click(3800, 0.003, 1500), tc, -35)                                    # brand lines
place(sfx, swipe(0.6, 400, 2200), 6.3, -27)                                          # into the drum
# drum ratchet: tick each time a slide passes the front
ts = np.arange(6.5, 10.1, 1 / 600)
idx = [-R.drum_theta(x) / R.DSTEP for x in ts]
for k in range(1, R.DRUM_END + 1):
    cross = next((ts[i] for i in range(len(ts)) if idx[i] >= k - 0.5), None)
    if cross is not None:
        place(sfx, click(2600 + 60 * (k % 3), 0.004, 700), cross, -33 - (k % 2), 0.2 * math.sin(k))
place(sfx, whoosh(0.8, 200, 1800, attack=0.45), 9.9, -25)                            # lift out of the drum
place(sfx, whoosh(1.3, 120, 900, attack=0.6), 10.7, -27)                             # push into the chart
place(sfx, swipe(0.5, 1200, 400), 11.95, -29, 0, 0.4)                                # slide steps back
for tb, sd in [(R.T_DASH, 1), (R.T_FUN, -1), (R.T_WAT, 1), (R.T_FC, -1)]:
    place(sfx, swipe(0.45, 600, 3200, attack=0.55), tb - 0.4, -26, 0.7 * sd, 0.0)    # montage entrances
    place(sfx, tap(170, 110, 0.035), tb + 0.05, -31)
place(sfx, whoosh(0.7, 300, 2600, attack=0.7), 15.0, -24)                            # forecast exits upward
for tb, sd in [(R.T_SALES, -1), (R.T_FIN, 1), (R.T_STRAT, -1), (R.T_MKT, 1)]:
    place(sfx, swipe(0.5, 500, 2800, attack=0.5), tb - 0.33, -26, 0.75 * sd, 0.1 * sd)
    place(sfx, tap(140, 95, 0.05), tb + 0.15, -29, 0.2 * sd)
place(sfx, whoosh(0.9, 1600, 250, attack=0.35), R.T_READY, -25)                      # stack recombines
place(sfx, tap(120, 70, 0.08), R.T_READY + 0.72, -26)
place(sfx, whoosh(0.8, 200, 1500, attack=0.5), 19.85, -26)                           # pile -> hero
place(sfx, whoosh(0.7, 150, 900, attack=0.6), 20.3, -28)                             # push into gauge
for i in range(10):
    place(sfx, pop(700 * 2 ** (i / 12 * 1.4)), R.T_ECOL + 0.05 + i * 0.05 + 0.12, -31, (i - 4.5) / 6)  # swatches
for i in range(15):
    place(sfx, click(5200 + 300 * (i % 3), 0.0018, 2600), R.T_EFULL + i * 0.55 / 15, -38, 0.1)          # typing
place(sfx, whoosh(1.6, 140, 1600, attack=0.4), 23.8, -23)                            # gallery forms
place(sfx, whoosh(1.0, 2200, 200, attack=0.3), 25.85, -25)                           # gallery recedes
place(sfx, impact(1.8), 26.45, -21)                                                  # end card lands
place(sfx, click(3000, 0.004, 1100), 27.1, -30)                                      # CTA button

# room
ir_t = np.arange(int(0.45 * SR)) / SR
ir = rng.standard_normal((len(ir_t), 2)) * np.exp(-ir_t / 0.11)[:, None]
ir = np.stack([sosfilt(butter(2, [300, 7000], 'bp', fs=SR, output='sos'), ir[:, c]) for c in range(2)], 1)
ir /= np.sqrt((ir ** 2).sum(0))
sfx = sfx + 0.16 * np.stack([fftconvolve(sfx[:, c], ir[:, c])[:N] for c in range(2)], 1)

# ---------------- voiceover ----------------
vo = np.zeros(N)
lines = json.load(open(os.path.join(HERE, 'tts', 'lines.json')))
for x, t0 in zip(lines, R.VO_START):
    a, sr = sf.read(os.path.join(HERE, 'tts', f"line{x['i']}.wav"))
    a = resample_poly(a, SR, sr)
    i = int(t0 * SR); vo[i:i + len(a)] += a[: N - i]
vo = sosfilt(butter(2, 90, 'hp', fs=SR, output='sos'), vo)
# gentle presence lift + soft compression
pres = sosfilt(butter(2, [2500, 6000], 'bp', fs=SR, output='sos'), vo)
vo = vo + 0.25 * pres
env = np.sqrt(fftconvolve(vo ** 2, np.ones(int(0.02 * SR)) / int(0.02 * SR), 'same').clip(0))
thr = np.percentile(env[env > 1e-3], 70)
gain = np.where(env > thr, (np.maximum(env, 1e-9) / thr) ** (-0.35), 1.0)
vo = vo * gain
vo /= np.max(np.abs(vo))
vo_st = np.stack([vo, vo], 1)
vo_st = vo_st + 0.06 * np.stack([fftconvolve(vo, ir[:, c])[:N] for c in range(2)], 1)

# duck SFX under speech
sp = fftconvolve(np.abs(vo), np.ones(int(0.12 * SR)) / int(0.12 * SR), 'same')
duck = 1 - 0.35 * np.clip(sp / (np.percentile(sp, 90) + 1e-9), 0, 1)
sfx *= duck[:, None]
sfx *= db(-6) / (np.max(np.abs(sfx)) + 1e-9)   # SFX peak -6 dB relative to VO peak

mix = vo_st * db(-1) + sfx
mix = sosfilt(butter(2, 30, 'hp', fs=SR, output='sos'), mix, axis=0)
mix *= db(-3) / np.max(np.abs(mix))
# loudness to -14 LUFS (social platforms) with a look-ahead peak limiter (true-peak ceiling -1.2 dBTP)
import pyloudnorm as pyln
from scipy.ndimage import maximum_filter1d
meter = pyln.Meter(SR)
def limit(x, ceil_db=-1.2, look=0.004, rel=0.08):
    up = resample_poly(x, 4, 1, axis=0)                    # 4x oversampled peaks ~ true peak
    pk = np.abs(up).max(1).reshape(-1, 4).max(1)[:len(x)]
    need = np.minimum(1.0, db(ceil_db) / np.maximum(pk, 1e-9))
    L = int(look * SR)
    g = -maximum_filter1d(-need, size=2 * L + 1)          # gain reaches its floor before the peak
    a = math.exp(-1 / (rel * SR)); out = np.empty_like(g); cur = 1.0
    for i, v in enumerate(g):
        cur = v if v < cur else v + (cur - v) * a
        out[i] = cur
    return x * out[:, None]
for _ in range(3):
    mix *= db(-14 - meter.integrated_loudness(mix))
    mix = limit(mix)
fade = np.ones(N); fade[-int(0.4 * SR):] = np.linspace(1, 0, int(0.4 * SR)) ** 2
mix *= fade[:, None]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'mix.wav')
wavfile.write(out, SR, (mix * 32767).astype(np.int16))
print('wrote', out, len(mix) / SR)
