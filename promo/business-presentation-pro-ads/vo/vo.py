"""Voiceover for the two Business Presentation Pro ads (Kokoro local TTS, male voice am_michael)."""
import os, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
TTS = '/tmp/claude-0/-home-user-Mohinxhuw/45a03c0b-a23e-50d1-aed2-533d1a807013/scratchpad/reel2/tts'
SCRIPTS = {
 'ad1': [  # Pain -> Solution -> Transformation
   "Still building business presentations from scratch?",
   "Hours of aligning boxes and rebuilding charts.",
   "Instead, start with sixty finished slides,",
   "forty-two editable charts and five dashboards.",
   "Just drop in your numbers.",
   "Stop starting from scratch. Get Business Presentation Pro.",
 ],
 'ad2': [  # Curiosity gap -> reveal
   "Your next deck could look this polished.",
   "Without starting from a blank slide.",
   "Here's what's inside.",
   "Executive dashboards. Sales funnels. Revenue bridges. Strategy roadmaps.",
   "Sixty slides, all fully editable in PowerPoint.",
   "Business Presentation Pro. Get it today.",
 ],
}
k = Kokoro(os.path.join(TTS, 'kokoro-v1.0.onnx'), os.path.join(TTS, 'voices-v1.0.bin'))
here = os.path.dirname(os.path.abspath(__file__))
for ad, lines in SCRIPTS.items():
    info = []
    for i, s in enumerate(lines):
        a, sr = k.create(s, voice='am_michael', speed=1.08, lang='en-us')
        idx = np.where(np.abs(a) > 0.01)[0]
        a = a[max(idx[0] - int(0.02 * sr), 0): idx[-1] + int(0.10 * sr)]
        sf.write(os.path.join(here, f'{ad}_l{i}.wav'), a, sr)
        info.append(dict(i=i, text=s, dur=round(len(a) / sr, 3)))
    json.dump(info, open(os.path.join(here, f'{ad}.json'), 'w'), indent=1)
    print(ad, [x['dur'] for x in info], 'speech', round(sum(x['dur'] for x in info), 2))
