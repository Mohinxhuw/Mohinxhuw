"""Voiceover for the Vanta Template 02 reel: Kokoro (local neural TTS), male voice am_michael."""
from kokoro_onnx import Kokoro
import soundfile as sf, numpy as np, json
LINES = [
    "Stop building presentations from scratch.",
    "Meet Vanta: Business Presentation Template Two.",
    "Sixty premium slides, designed for real business.",
    "Over forty editable charts. Dashboards, funnels, waterfalls and forecasts.",
    "Sales, finance, strategy and market analysis, ready when you are.",
    "Every chart, every colour, every word, fully editable.",
    "Save hours on every deck. Get Vanta today.",
]
k = Kokoro('kokoro-v1.0.onnx', 'voices-v1.0.bin')
info = []
for i, s in enumerate(LINES):
    a, sr = k.create(s, voice='am_michael', speed=1.0, lang='en-us')
    env = np.abs(a) > 0.01
    idx = np.where(env)[0]
    a = a[max(idx[0] - int(0.03 * sr), 0): idx[-1] + int(0.12 * sr)]
    sf.write(f'line{i}.wav', a, sr)
    info.append(dict(i=i, text=s, dur=round(len(a) / sr, 3)))
    print(i, round(len(a) / sr, 2), s)
json.dump(info, open('lines.json', 'w'), indent=1)
print('total speech', sum(x['dur'] for x in info))
