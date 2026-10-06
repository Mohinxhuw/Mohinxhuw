"""Voiceover for the three Business Presentation Pro retargeting ads (Kokoro local TTS, male voice am_michael).
Claims are verified against template02/Vanta_Business_Presentation_Template_02.pptx:
60 slides; 42 native charts with embedded data (Edit Data); dashboards named in the file: performance (19), KPI (20), campaign (56);
sections Agenda ... Results & next steps; speaker notes on all 60 slides; theme fonts Georgia + Arial; 10 theme colour slots."""
import os, json, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
TTS = '/tmp/claude-0/-home-user-Mohinxhuw/45a03c0b-a23e-50d1-aed2-533d1a807013/scratchpad/reel2/tts'
SCRIPTS = {
 'r1': [  # value / why buy
   "You've already looked at it.", "So here's exactly what you get.",
   "Sixty finished slides, from agenda to next steps.",
   "Forty-two native charts. Edit the data, and the chart follows.",
   "Performance, KPI and campaign dashboards.",
   "Sales, finance, strategy and market analysis, already structured.",
   "Speaker notes on every slide.",
   "From a blank slide, you'd build all of that yourself.",
   "Get Business Presentation Pro. Link in bio.",
 ],
 'r2': [  # professional result
   "Picture this on the screen in your next meeting.",
   "It opens with a clear agenda.",
   "Your results land on a real dashboard.",
   "Your numbers are explained, not just shown.",
   "Your strategy reads like a plan.",
   "And it closes with the decision you need.",
   "That's Business Presentation Pro. Link in bio.",
 ],
 'r3': [  # overcome hesitation
   "Not sure a template will fit your business?",
   "Let's check.",
   "Your numbers? All forty-two charts are native. Right-click, Edit Data.",
   "Your brand? Set the theme colours once, and the design follows.",
   "Your fonts? Georgia and Arial, standard on Windows and Mac.",
   "Your content? Sixty slides, from agenda to next steps.",
   "No more blank slides. Get Business Presentation Pro. Link in bio.",
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
