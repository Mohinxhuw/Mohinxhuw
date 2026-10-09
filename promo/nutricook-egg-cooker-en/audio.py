"""Soundtrack: American male VO + subtle synthesised natural SFX. No music of any kind."""
import sys, json, numpy as np, soundfile as sf
from scipy.signal import resample_poly, butter, sosfilt
sys.path.insert(0, '../business-presentation-pro-ads')
from sfxlib import SR, place, band_noise, whoosh, swipe, click, tap, pop, rng
TL = json.load(open('timeline.json')); L, END = TL['starts'], TL['end']
SC = [0.0] + [s - 0.18 for s in L[1:]]
VO = json.load(open('vo/lines.json'))
N = int(END * SR) + SR // 2
vo = np.zeros((N, 2)); sfx = np.zeros((N, 2))
for i, s in enumerate(L):
    a, sr = sf.read(f'vo/l{i}.wav'); a = resample_poly(a, SR, sr)
    place(vo, sosfilt(butter(2, 70, 'hp', fs=SR, output='sos'), a) / np.max(np.abs(a)) * 0.9, s, 0)

def bubbles(dur, rate=34):
    n = int(dur * SR); out = np.zeros(n)
    for _ in range(int(dur * rate)):
        i = rng.integers(0, n - 4000); m = int(rng.uniform(0.012, 0.03) * SR); t = np.arange(m) / SR
        f = rng.uniform(350, 1100) * (1 + 3 * t / t[-1])
        out[i:i + m] += np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / (t[-1] / 3)) * rng.uniform(0.2, 1)
    rum = sosfilt(butter(2, [80, 400], 'bp', fs=SR, output='sos'), rng.standard_normal(n))
    out = out / np.max(np.abs(out)) + rum / np.max(np.abs(rum)) * 0.3
    env = np.minimum(1, np.minimum(np.arange(n) / (0.4 * SR), (n - np.arange(n)) / (0.6 * SR)))
    return out * env / np.max(np.abs(out))
def hiss(dur):
    n = int(dur * SR); s = sosfilt(butter(2, [3000, 9000], 'bp', fs=SR, output='sos'), rng.standard_normal(n))
    env = np.minimum(1, np.minimum(np.arange(n) / (0.5 * SR), (n - np.arange(n)) / (0.8 * SR)))
    return s * env / np.max(np.abs(s))
def pour(dur):
    n = int(dur * SR); s = band_noise(dur, 900, 2200, 1.0, 0.15, 1.2); t = np.arange(n) / SR
    s *= 0.7 + 0.3 * np.sin(2 * np.pi * 13 * t + 3 * np.sin(2 * np.pi * 3 * t)); return s / np.max(np.abs(s))

# 1 hook: parts lock together, light sweep
place(sfx, whoosh(0.55, 170, 1000), 0.0, -24)
for k, dt in enumerate((0.52, 0.62, 0.74)): place(sfx, tap(230 - 20 * k, 120, 0.05), dt, -20 + k)
place(sfx, band_noise(0.9, 3000, 7500, 0.8, 0.3, 1.5), 0.95, -33)
# 2 meet: the cooker simmering under its steamy dome
place(sfx, whoosh(0.5, 200, 1200), SC[1] - 0.2, -26)
place(sfx, bubbles(SC[2] - SC[1] + 0.3), SC[1] - 0.1, -25); place(sfx, hiss(SC[2] - SC[1] + 0.2), SC[1], -33)
# 3 seven eggs: a soft "tok" per count
for k in range(7): place(sfx, tap(f0=520, f1=300, decay=0.025), SC[2] + 0.25 + k * 0.12, -17 - (k % 2), -0.4 + 0.13 * k)
# 4 measuring cup: water pours, tops up at each word
words = dict(soft=2.15, medium=2.62, hard=3.20)
place(sfx, pour(1.0), L[3] + words['soft'] - 0.95, -25)
for k, w in enumerate(('soft', 'medium', 'hard')):
    if k: place(sfx, pour(0.4), L[3] + words[w] - 0.28, -27)
    place(sfx, pop(780 + 140 * k), L[3] + words[w] - 0.05, -25)
# 5 button press (on "press")
place(sfx, click(2600, 0.004, 900), L[4] + 0.62, -13)
# 6 CTA
place(sfx, whoosh(0.6, 200, 1300), SC[5] - 0.25, -24)
place(sfx, pop(900), SC[5] + 0.55, -22)

env = np.abs(vo).max(1); k = int(0.05 * SR)
env = np.convolve(env, np.ones(k) / k, 'same'); duck = 1 - 0.6 * np.clip(env / 0.15, 0, 1)
mix = (vo + sfx * duck[:, None])[: int(END * SR)]
fade = int(0.3 * SR); mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
sf.write(sys.argv[1], mix / np.max(np.abs(mix)) * 0.8, SR, subtype='PCM_24')
print('audio', round(len(mix) / SR, 2))
