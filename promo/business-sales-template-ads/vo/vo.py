"""Voiceover for the two Business Sales Template ads (Kokoro local TTS, male voice am_michael).
Every product claim is quoted from the template itself (Vertex_Premium_Business_Sales_Template_FIXED.pptx):
cover slide: "85+ layouts", "35+ native charts", "100% editable"; guide slide 2: "Everything is native PowerPoint";
guide slide 2/10: Design > Variants > Colors re-colours every shape and chart; slide count 99; covers = slides 11-15."""
import os, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
TTS = '/tmp/claude-0/-home-user-Mohinxhuw/45a03c0b-a23e-50d1-aed2-533d1a807013/scratchpad/reel2/tts'
SCRIPTS = {
 'ad3': [  # Problem -> Solution -> Transformation
   "Your numbers are strong.",
   "So why do your slides feel forgettable?",
   "Building sales decks from scratch takes hours.",
   "The Business Sales Template gives you eighty-five plus ready layouts,",
   "and thirty-five plus native charts and dashboards.",
   "Everything is native PowerPoint, and one hundred percent editable.",
   "Change the colours once. Every slide follows.",
   "Make your numbers look as strong as they are. Link in bio.",
 ],
 'ad4': [  # Curiosity / professional result / value
   "Ninety-nine slides. One visual system.",
   "Here's what's inside.",
   "Five cover styles.",
   "Sales funnels and pipeline views.",
   "Executive dashboards.",
   "Profit bridges and forecasts.",
   "Strategy roadmaps.",
   "Every chart is native, so you just edit the data.",
   "The Business Sales Template. Explore it, link in bio.",
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
