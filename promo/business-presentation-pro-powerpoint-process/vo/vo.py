"""Voiceover for business-presentation-pro-powerpoint-process.mp4 (Kokoro local TTS, male voice am_michael).
Claims verified against template02/Vanta_Business_Presentation_Template_02.pptx: 60 slides; slide 19 is a real slide
of the product; its charts are native PowerPoint charts with embedded data."""
import os, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
TTS = '/tmp/claude-0/-home-user-Mohinxhuw/45a03c0b-a23e-50d1-aed2-533d1a807013/scratchpad/reel2/tts'
LINES = [
    "Here's what goes into one polished business slide.",
    "A clear title.",
    "Key numbers, lined up and highlighted.",
    "Clean panels.",
    "And native charts you can edit with your own data.",
    "Business Presentation Pro gives you sixty slides like this, already built.",
    "Get Business Presentation Pro. Link in bio.",
]
k = Kokoro(os.path.join(TTS, 'kokoro-v1.0.onnx'), os.path.join(TTS, 'voices-v1.0.bin'))
here = os.path.dirname(os.path.abspath(__file__)); info = []
for i, s in enumerate(LINES):
    a, sr = k.create(s, voice='am_michael', speed=1.06, lang='en-us')
    idx = np.where(np.abs(a) > 0.01)[0]; a = a[max(idx[0] - int(0.02 * sr), 0): idx[-1] + int(0.10 * sr)]
    sf.write(os.path.join(here, f'l{i}.wav'), a, sr)
    # word onsets: energy-envelope valleys mapped onto words (for caption sync)
    hop = int(0.01 * sr); e = np.array([np.sqrt(np.mean(a[j:j + hop] ** 2)) for j in range(0, len(a) - hop, hop)])
    info.append(dict(i=i, text=s, dur=round(len(a) / sr, 3)))
json.dump(info, open(os.path.join(here, 'lines.json'), 'w'), indent=1)
print([x['dur'] for x in info], 'speech', round(sum(x['dur'] for x in info), 2))
