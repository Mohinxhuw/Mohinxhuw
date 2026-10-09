"""Soundtrack: male Arabic VO + subtle synthesised natural SFX. No music of any kind."""
import sys, json, numpy as np, soundfile as sf
from scipy.signal import resample_poly, butter, sosfilt
sys.path.insert(0, '../business-presentation-pro-ads')
from sfxlib import SR, place, band_noise, whoosh, swipe, click, tap, pop, rng
TL = json.load(open('timeline.json')); L, END = TL['starts'], TL['end']
SC = [0.0] + [s - 0.15 for s in L[1:]]
N = int(END * SR) + SR // 2
vo = np.zeros((N, 2)); sfx = np.zeros((N, 2))
for i, s in enumerate(L):
    a, sr = sf.read(f'vo/l{i}.wav'); a = resample_poly(a, SR, sr)
    a = sosfilt(butter(2, 70, 'hp', fs=SR, output='sos'), a)
    place(vo, a / np.max(np.abs(a)) * 0.9, s, 0)

def bubbles(dur, rate=38):
    """Gentle simmer: many tiny rising-pitch bubble blips over a soft low rumble."""
    n = int(dur * SR); out = np.zeros(n)
    for _ in range(int(dur * rate)):
        i = rng.integers(0, n - 4000); m = int(rng.uniform(0.012, 0.03) * SR); t = np.arange(m) / SR
        f = rng.uniform(350, 1100) * (1 + 3 * t / t[-1])
        out[i:i + m] += np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / (t[-1] / 3)) * rng.uniform(0.2, 1)
    rum = sosfilt(butter(2, [80, 400], 'bp', fs=SR, output='sos'), rng.standard_normal(n)) * 0.25
    out = out / np.max(np.abs(out)) + rum / np.max(np.abs(rum)) * 0.35
    env = np.minimum(1, np.minimum(np.arange(n) / (0.3 * SR), (n - np.arange(n)) / (0.6 * SR)))
    return out * env / np.max(np.abs(out))
def hiss(dur):
    n = int(dur * SR); s = sosfilt(butter(2, [3000, 9000], 'bp', fs=SR, output='sos'), rng.standard_normal(n))
    env = np.minimum(1, np.minimum(np.arange(n) / (0.5 * SR), (n - np.arange(n)) / (0.8 * SR)))
    return s * env / np.max(np.abs(s))
def pour(dur):
    n = int(dur * SR); s = band_noise(dur, 900, 2200, 1.0, 0.15, 1.2)
    t = np.arange(n) / SR; s *= 0.7 + 0.3 * np.sin(2 * np.pi * 13 * t + 3 * np.sin(2 * np.pi * 3 * t))
    return s / np.max(np.abs(s))
def tok():   # egg set down on the plastic rack
    return tap(f0=520, f1=300, decay=0.025)

# 1-2 hook / problem: the cooker simmering under its steamy dome
place(sfx, bubbles(SC[2] + 0.3), 0.0, -24); place(sfx, hiss(SC[2] + 0.2), 0.0, -33)
place(sfx, pop(700), 0.05, -22)
place(sfx, swipe(0.3, 1200, 3800), SC[1] + 0.55, -22)                          # red strike over the pot
# 3 reveal: parts glide in and seat together
place(sfx, whoosh(0.7, 160, 1100), SC[2] - 0.2, -20, -0.3, 0.3)
for k, dt in enumerate((0.42, 0.52, 0.60)): place(sfx, tap(220, 120, 0.05), SC[2] + dt, -21 + k)
place(sfx, tap(260, 150, 0.04), SC[2] + 1.28, -19)                              # lid settles
place(sfx, band_noise(0.9, 3000, 7000, 0.8, 0.3, 1.5), SC[2] + 1.35, -32)       # soft sheen
# 4 seven eggs counting up
for k in range(7): place(sfx, tok(), SC[3] + 0.25 + k * 0.17, -17 - (k % 2), -0.4 + 0.13 * k)
# 5 measuring cup: water pours in, then tops up per level
place(sfx, pour(1.3), SC[4] + 0.4, -24)
cup_t = L[4]
for k, tk in enumerate((2.45, 3.15, 3.65)):
    place(sfx, pour(0.45), cup_t + tk - 0.3, -27); place(sfx, pop(780 + 140 * k), cup_t + tk, -24)
# 6 button press, indicator on, later off
place(sfx, click(2600, 0.004, 900), L[5] + 0.15, -14)
place(sfx, click(2200, 0.003, 800), L[5] + 1.35, -22)
# 7 CTA
place(sfx, whoosh(0.6, 200, 1300), SC[6] - 0.25, -22)
place(sfx, pop(900), SC[6] + 0.5, -21)

# keep effects well under the voice while he speaks
env = np.abs(vo).max(1); k = int(0.05 * SR)
env = np.convolve(env, np.ones(k) / k, 'same'); duck = 1 - 0.6 * np.clip(env / 0.15, 0, 1)
mix = vo + sfx * duck[:, None]
mix = mix[: int(END * SR)]
fade = int(0.25 * SR); mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
sf.write(sys.argv[1], mix / np.max(np.abs(mix)) * 0.8, SR, subtype='PCM_24')
print('audio', len(mix) / SR)
