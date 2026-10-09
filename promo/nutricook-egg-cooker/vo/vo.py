"""Male Arabic voice-over (local Piper voice ar_JO-kareem via sherpa-onnx). Lines are fully
diacritised so the phonemiser reads them with Saudi-style vowels."""
import os, sys, json, numpy as np, soundfile as sf, sherpa_onnx
M = sys.argv[1]  # folder holding the extracted vits-piper-ar_JO-kareem-medium model
LINES = [
 "جَهِّزِي بَيْضِكْ، بِدُونْ وَجَعْ رَاسْ!",
 "لَا قِدْرْ، وَلَا وَقْفَةْ عِنْدَ النَّارْ.",
 "جِهَازْ سَلْقِ الْبَيْضْ، مِنْ نْيُوتْرِي كُوكْ.",
 "سَبِعْ بَيْضَاتْ مَرَّةْ وِحْدَةْ، تِكْفِي فُطُورْ الْعَيْلَةْ.",
 "وَالْكُوبْ الْمُدَرَّجْ يِضْبُطْ لِكْ الْمَاءْ: بِرِشْتْ، نُصْ، أَوْ مِسْتِوِي.",
 "ضَغْطَةْ زِرّ، وَيْطَفِّي لِحَالَهْ.",
 "اُدْخُلِي صَفْحَتْنَا مِنَ الرَّابِطْ، وَاطْلُبِيهْ الْحِينْ!",
]
cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
    vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=f'{M}/ar_JO-kareem-medium.onnx',
        tokens=f'{M}/tokens.txt', data_dir=f'{M}/espeak-ng-data', length_scale=float(os.environ.get('LS', 0.95))),
    num_threads=4))
tts = sherpa_onnx.OfflineTts(cfg)
here = os.path.dirname(os.path.abspath(__file__)); info = []
for i, s in enumerate(LINES):
    a = tts.generate(s, sid=0, speed=1.0); sr = a.sample_rate; a = np.array(a.samples, dtype=np.float32)
    idx = np.where(np.abs(a) > 0.01)[0]; a = a[max(idx[0] - int(.02*sr), 0): idx[-1] + int(.08*sr)]
    sf.write(f'{here}/l{i}.wav', a, sr); info.append(dict(i=i, text=s, dur=round(len(a)/sr, 3)))
json.dump(info, open(f'{here}/lines.json', 'w'), ensure_ascii=False, indent=1)
print(sr, [x['dur'] for x in info], round(sum(x['dur'] for x in info), 2))
