# Business Presentation Pro: TikTok / Reels ads

Two ads for Business Presentation Pro (Vanta Template 02). Each is 1080×1920 (9:16), 60 fps, H.264 High with AAC 48 kHz stereo, mastered to -14 LUFS / -1.2 dBTP.

All visuals are renders of the real `template02/Vanta_Business_Presentation_Template_02.pptx` slides. There are no people, photos or stock media.

| File | Concept | Hook framework | Length |
|---|---|---|---|
| `business-presentation-pro-ad-01.mp4` | **Blank → Built**: light ivory, kinetic sans-serif type | Pain → Solution → Transformation | 19.0 s |
| `business-presentation-pro-ad-02.mp4` | **The Reveal**: dark cinematic spotlight, serif type, floor reflections | Curiosity gap | 18.3 s |

## Ad 1 voiceover
1. "Still building business presentations from scratch?"
2. "Hours of aligning boxes and rebuilding charts."
3. "Instead, start with sixty finished slides, forty-two editable charts and five dashboards."
4. "Just drop in your numbers."
5. "Stop starting from scratch. Get Business Presentation Pro."

## Ad 2 voiceover
1. "Your next deck could look this polished. Without starting from a blank slide."
2. "Here's what's inside."
3. "Executive dashboards. Sales funnels. Revenue bridges. Strategy roadmaps."
4. "Sixty slides, all fully editable in PowerPoint."
5. "Business Presentation Pro. Get it today."

## How it's made
- **Voice:** Kokoro (local neural TTS), voice `am_michael`.
- **Sound:** voiceover plus subtle synthesised UI sound effects only (soft clicks, taps, whooshes, reveal sheens), synced to the animation. There is **no music**.
- **Mixing:** a sidechain keeps the effects at least about 10 dB under the voice while he's speaking; between phrases they play at full level.

## Rebuild
1. Run `vo/vo.py`. It needs the Kokoro model files; see `../vanta02/README.md`.
2. Run `python3 audio_ads.py ad1 mix_ad1.wav`.
3. Run `python3 ads.py ad1 render video_ad1.mp4`. This needs the slide renders in `../vanta02/slides/`.
4. Mux the audio with ffmpeg. Repeat steps 2–4 for `ad2`.
