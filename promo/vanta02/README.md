# Vanta Template 02 — promo reel

`../Vanta_Template_02_Reel_9x16.mp4`: 29.4 s, 1080×1920, 60 fps, H.264 + AAC 48 kHz, -14 LUFS / -1.2 dBTP.

Every visual is a render of the real `Vanta_Business_Presentation_Template_02.pptx` slides. There are no people, photos or stock footage.

| Time | Voiceover (AI male voice) | Visual |
|---|---|---|
| 0.0–3.0 | Stop building presentations from scratch. | Macro pull-back from a dashboard chart to layered slides, on ivory |
| 3.0–6.5 | Meet Vanta: Business Presentation Template Two. | Cobalt circle wipe; the cover rises from depth |
| 6.5–10.2 | Sixty premium slides, designed for real business. | Rotating slide drum with a 0→60 counter |
| 10.2–15.5 | Over forty editable charts. Dashboards, funnels, waterfalls and forecasts. | Push into a combo chart, then a layered montage of dashboard, funnel, waterfall and forecast slides |
| 15.6–20.2 | Sales, finance, strategy and market analysis, ready when you are. | Shingled section stack that recombines into a pile |
| 20.3–24.0 | Every chart, every colour, every word, fully editable. | Gauge close-up; the theme palette pops out; typed "Fully editable." |
| 24.1–29.4 | Save hours on every deck. Get Vanta today. | Curved gallery, then end card: cover, title, "Get the template" |

## Rebuild
1. Render the template's slides to `slides/sNN.png` at 3840 px wide (the LibreOffice PDF at 288 dpi).
2. Voice:
   ```
   pip install kokoro-onnx soundfile
   ```
   Download `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the kokoro-onnx GitHub releases (`model-files-v1.0`) into `tts/`. Then run `cd tts && python3 vo.py` (voice `am_michael`).
3. Audio:
   ```
   pip install pyloudnorm
   python3 audio.py mix.wav
   ```
   This adds synthesised sound design, ducks it under the voice, and applies loudness normalisation with a look-ahead limiter.
4. Video: `python3 reel2.py video.mp4`, then mux with
   ```
   ffmpeg -i video.mp4 -i mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 320k -shortest out.mp4
   ```
