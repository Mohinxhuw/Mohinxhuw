"""English voice-over (Kokoro local TTS, American male voice am_michael).
usage: python3 vo.py <dir holding kokoro-v1.0.onnx and voices-v1.0.bin>"""
import os, sys, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
LINES = [
    "Busy mornings? Make breakfast a little easier.",
    "Meet the NutriCook electric egg cooker.",
    "Cook up to seven eggs at once.",
    "Fill the measuring cup to the line for soft, medium, or hard eggs.",
    "Then just press the button.",
    "Visit our page to learn more.",
]
k = Kokoro(os.path.join(sys.argv[1], 'kokoro-v1.0.onnx'), os.path.join(sys.argv[1], 'voices-v1.0.bin'))
here = os.path.dirname(os.path.abspath(__file__)); info = []
for i, s in enumerate(LINES):
    a, sr = k.create(s.replace('NutriCook', 'Nutri Cook'), voice='am_michael', speed=1.05, lang='en-us')
    idx = np.where(np.abs(a) > 0.01)[0]
    a = a[max(idx[0] - int(0.02 * sr), 0): idx[-1] + int(0.10 * sr)]
    sf.write(f'{here}/l{i}.wav', a, sr); info.append(dict(i=i, text=s, dur=round(len(a) / sr, 3)))
json.dump(info, open(f'{here}/lines.json', 'w'), indent=1)
print(sr, [x['dur'] for x in info], round(sum(x['dur'] for x in info), 2))
