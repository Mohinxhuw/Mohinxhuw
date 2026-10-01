"""Subtle, premium UI sound design for the Business Sales Template reel.
All sounds are synthesised here (no samples, no music, no beat): band-swept
noise for whooshes/swipes, damped partials for clicks/taps. Cue times come
from the reel's own motion curves and were checked against measured
frame-to-frame motion in the finished video."""
import sys
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
from scipy.io import wavfile

SR = 48000
DUR = 25.0
rng = np.random.default_rng(7)
N = int(SR * DUR)
mix = np.zeros((N, 2))


def db(x): return 10 ** (x / 20)


def place(sig, t, gain_db, pan=0.0, pan_end=None):
    """Add a mono or stereo signal at time t with constant-power (optionally moving) pan."""
    i = int(round(t * SR))
    if sig.ndim == 1:
        p = np.linspace(pan, pan if pan_end is None else pan_end, len(sig))
        th = (p + 1) * np.pi / 4
        sig = np.stack([sig * np.cos(th), sig * np.sin(th)], 1) * np.sqrt(2)
    j = min(i + len(sig), N)
    mix[i:j] += sig[: j - i] * db(gain_db)


def band_noise(dur, f0, f1, bw_oct=1.1, f_mid=None, attack=0.4, curve=2.0):
    """Noise whose spectral centre glides f0 -> (f_mid) -> f1, shaped by a smooth envelope."""
    n = int(dur * SR)
    nfft, hop = 2048, 256
    win = np.hanning(nfft)
    frames = (n + nfft) // hop + 1
    out = np.zeros(frames * hop + nfft)
    freqs = np.fft.rfftfreq(nfft, 1 / SR)
    lf = np.log2(np.maximum(freqs, 1))
    for k in range(frames):
        u = min(k * hop / max(n, 1), 1.0)
        if f_mid is None:
            fc = f0 * (f1 / f0) ** u
        else:
            fc = f0 * (f_mid / f0) ** (u / 0.5) if u < 0.5 else f_mid * (f1 / f_mid) ** ((u - 0.5) / 0.5)
        spec = np.fft.rfft(rng.standard_normal(nfft) * win)
        spec *= np.exp(-0.5 * ((lf - np.log2(fc)) / (bw_oct / 2.355 * 2)) ** 2)
        out[k * hop: k * hop + nfft] += np.fft.irfft(spec) * win
    out = out[nfft // 2: nfft // 2 + n]
    tt = np.linspace(0, 1, n)
    env = np.where(tt < attack, (tt / attack) ** curve, ((1 - tt) / (1 - attack)) ** (curve * 0.9))
    env = np.sin(env * np.pi / 2)  # soften corners
    out *= env
    return out / (np.max(np.abs(out)) + 1e-9)


def whoosh(dur, f0=180, f1=1400, f_mid=None, attack=0.42):
    body = band_noise(dur, f0, f1, 1.3, f_mid, attack)
    air = band_noise(dur, f0 * 4, f1 * 3, 0.9, None if f_mid is None else f_mid * 3, attack, 2.4)
    s = body + 0.35 * air
    return s / np.max(np.abs(s))


def swipe(dur=0.32, f0=900, f1=4200):
    s = band_noise(dur, f0, f1, 0.9, None, 0.35, 1.6)
    return s / np.max(np.abs(s))


def click(f=3400, decay=0.0035, body=1200):
    n = int(0.07 * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) * np.exp(-t / decay)
    s += 0.45 * np.sin(2 * np.pi * body * t) * np.exp(-t / (decay * 3.2))
    tr = rng.standard_normal(n) * np.exp(-t / 0.0007)
    tr = sosfilt(butter(2, 2500, 'hp', fs=SR, output='sos'), tr)
    s += 0.25 * tr
    s *= np.minimum(1, t / 0.0004)  # de-click onset
    return s / np.max(np.abs(s))


def tap(f0=150, f1=95, decay=0.05):
    """Soft card landing: low thump + paper tick."""
    n = int(0.16 * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t / 0.02)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / decay)
    paper = sosfilt(butter(2, [1800, 6000], 'bp', fs=SR, output='sos'), rng.standard_normal(n)) * np.exp(-t / 0.009)
    s = s + 0.35 * paper / (np.max(np.abs(paper)) + 1e-9)
    s *= np.minimum(1, t / 0.0008)
    return s / np.max(np.abs(s))


# ---------------- cue sheet ----------------
place(whoosh(1.7, 90, 900, attack=0.32), 0.05, -21, -0.15, 0.1)            # cover rises from depth
place(click(3800, 0.003, 1500), 0.72, -33)                                   # kicker text
place(swipe(0.85, 500, 3200), 3.15, -23, 0.0, -0.25)                         # cover up, dashboard emerges
place(click(), 3.95, -32)                                                    # caption
place(swipe(0.75, 420, 2400), 4.15, -27, 0.0, 0.25)                          # bookings chart emerges
place(whoosh(1.3, 160, 1200, attack=0.55), 6.5, -25, -0.2, 0.2)              # column begins to scroll
place(click(), 7.0, -32)                                                     # caption
for i, tc in enumerate([7.468, 8.0, 8.463, 8.923, 9.437]):                   # chart passes focal centre
    place(swipe(0.42, 700, 3000), tc - 0.17, -31 - (i % 2) * 0.8, -0.45 if i % 2 else 0.45, 0.0)
place(whoosh(0.65, 260, 2200, attack=0.3), 10.36, -23)                       # column exits
for k, tl in enumerate([11.129, 11.299, 11.469, 11.639, 11.809]):            # cards land on the stack
    place(tap(150 - 6 * k, 95, 0.045), tl - 0.006, -27.5 - [0, 1.2, 0.4, 1.6, 0.8][k], 0.05 * (k - 2))
place(swipe(1.05, 300, 2600), 12.1, -24, -0.3, 0.3)                          # fan opens
place(whoosh(0.7, 300, 2600, attack=0.62), 13.58, -22, 0, 0.1)               # stack exits upward
place(whoosh(1.0, 200, 1300, attack=0.3), 14.12, -24, 0.25, -0.1)            # wall enters
place(click(), 14.72, -32)                                                   # caption
place(whoosh(1.35, 140, 1800, attack=0.58), 17.33, -23, 0, 0)                # dashboard lifts forward
place(click(2600, 0.004, 900), 18.6, -30)                                    # dashboard settles
place(whoosh(1.4, 1100, 160, attack=0.35), 19.55, -24, 0.1, -0.1)            # dashboard recedes, layers spread
place(swipe(0.5, 600, 2400), 19.72, -29, 0.6, 0.4)                           # right layer slides in
place(swipe(0.5, 560, 2200), 19.88, -30, -0.6, -0.4)                         # left layer
place(swipe(0.5, 640, 2600), 20.03, -30, 0.55, 0.35)                         # right layer
place(whoosh(0.85, 120, 1100, attack=0.6), 20.18, -21)                       # cover rises to centre
place(tap(120, 70, 0.07), 20.9, -23)                                         # cover lands
place(click(3000, 0.004, 1100), 20.92, -29)                                  # clean UI click with the landing
place(click(4200, 0.0025, 1800), 21.52, -33)                                 # tagline
place(click(5200, 0.002, 2200), 22.12, -35)                                  # lime underline

# ---------------- small room + master ----------------
ir_t = np.arange(int(0.45 * SR)) / SR
ir = rng.standard_normal((len(ir_t), 2)) * np.exp(-ir_t / 0.11)[:, None]
ir = np.stack([sosfilt(butter(2, [300, 7000], 'bp', fs=SR, output='sos'), ir[:, c]) for c in range(2)], 1)
ir /= np.sqrt((ir ** 2).sum(0))
wet = np.stack([fftconvolve(mix[:, c], ir[:, c])[:N] for c in range(2)], 1)
out = mix + 0.16 * wet
out = sosfilt(butter(2, 35, 'hp', fs=SR, output='sos'), out, axis=0)          # remove sub rumble
peak = np.max(np.abs(out))
out *= db(-7.0) / peak                                                        # peak -7 dBFS (subtle, ~-20 LUFS)
fade = np.ones(N); fade[-int(0.25 * SR):] = np.linspace(1, 0, int(0.25 * SR))
out *= fade[:, None]
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'sfx.wav', SR, (out * 32767).astype(np.int16))
print('peak dBFS', round(20 * np.log10(np.max(np.abs(out))), 2), 'samples', len(out))
