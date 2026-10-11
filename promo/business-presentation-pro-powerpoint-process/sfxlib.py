"""Synthesised sound-design primitives (no samples), shared by the ad soundtracks."""
import math
import numpy as np
from scipy.signal import butter, sosfilt
SR = 48000
rng = np.random.default_rng(11)
def db(x): return 10 ** (x / 20)
def place(buf, sig, t, gain_db, pan=0.0, pan_end=None):
    N = len(buf); i = int(round(t * SR))
    if sig.ndim == 1:
        p = np.linspace(pan, pan if pan_end is None else pan_end, len(sig))
        th = (p + 1) * np.pi / 4
        sig = np.stack([sig * np.cos(th), sig * np.sin(th)], 1) * np.sqrt(2)
    if i < 0: sig = sig[-i:]; i = 0
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

