# Business Presentation Pro: "PowerPoint process" reel

**Output:** `output/business-presentation-pro-powerpoint-process.mp4`

**Format:** 1080×1920 (9:16), 23.0 s, 60 fps, H.264 High with AAC 48 kHz stereo; -14 LUFS, -1 dBTP peak.

## What it shows
One real slide from `template02/Vanta_Business_Presentation_Template_02.pptx` (slide 19, "Performance dashboard — fiscal 2026") is built up step by step inside an editor-style window. The window sits on a perspective-grid background. Then the finished slide lifts out and real slides 20, 23, 30, 42, 46 and 56 fan in behind it.

### Honesty notes
- **This is not a screen recording of PowerPoint.** It is a visual simulation, and the editor's status bar says so on screen: *"Simulated edit — build recreated from this slide's own elements"*.
- **Every slide state comes from the slide's own 31 shapes.** `make_states.py` uses python-pptx to make one-slide copies of slide 19. It removes shapes and truncates the title text to create the intermediate states, then LibreOffice renders each copy. Nothing on the slide is painted or invented. The final state matches the original render (mean pixel difference 0.34).
- **The highlight step uses the file's own colours.** It swaps the first KPI between the theme's `bg1` and its real `accent2` colour. The palette shown uses the file's 10 theme colours.
- **The editor UI is drawn generically.** That covers the tabs, ribbon, thumbnails, cursor, smart guides and context menu. There are no vendor logos.
- **Nothing comes from the Business Sales Template.**
- **Product claims are only verified facts:**
  - 60 slides
  - 42 native charts with embedded data
  - PowerPoint format

## Script (male AI voice, Kokoro `am_michael`)
| Start (s) | Line |
|---|---|
| 0.05 | Here's what goes into one polished business slide. |
| 3.0 | A clear title. |
| 5.3 | Key numbers, lined up and highlighted. |
| 8.1 | Clean panels. |
| 9.6 | And native charts you can edit with your own data. |
| 13.0 | Business Presentation Pro gives you sixty slides like this, already built. |
| 17.8 | Get Business Presentation Pro. Link in bio. |

## Hooks
- **Visual (0–1.65 s):** the finished slide appears, then rewinds to a blank canvas.
- **Written:** "WHAT GOES INTO ONE POLISHED SLIDE?"
- **Verbal:** the first line of the script.

## Build timeline
| Time (s) | Step |
|---|---|
| 3.05–4.3 | The title is typed. |
| 4.75–6.05 | The header and KPIs are placed. |
| 7.45 | The KPI is highlighted from the theme palette. |
| 9.1–10.0 | The panels are dragged in. |
| 10.0–10.85 | The line and bar charts appear. |
| 11.4 | Right-click → "Edit Data…" |
| 12.85 | Reveal and slide fan. |
| 17.6 | End card: "60 SLIDES · 42 NATIVE CHARTS · POWERPOINT" with a "LINK IN BIO" pill. |

The captions are bold, sit in the lower-middle safe zone (y ≈ 1395 of 1920), and follow the voiceover phrase by phrase.

## Audio
- **No music.** The soundtrack is the voiceover plus synthesised UI effects only:
  - clicks and keyboard taps
  - drag noise
  - a rewind sweep
  - soft whooshes and impacts
- **Mixing:** a sidechain keeps the effects at least 10 dB under the voice while it speaks.

## Verification (final file)
- **Playback:** the full decode has no errors.
- **Loudness:** -14.0 LUFS, -1.0 dBFS peak.
- **No music:** the sustained-tone ratio is 0.20 for the full mix vs 0.17 for the voice only, so there is no tonal bed. Voice over effects is 21.6 dB (median), and at least 13 dB 95% of the time.
- **Caption sync:** caption onsets are at most 0.09 s from speech boundaries (mean 0.013 s).
- **Motion:** the only frame-difference spike, at 11.4 s, is the intended context-menu pop.

## Files
- `make_states.py`: builds the 14 one-slide pptx states (s00 blank → s13 full) and renders them to PNG.
- `vo/vo.py`, `vo/lines.json`: voiceover lines and synthesis.
- `pp.py`: compositor. Run `python3 pp.py video video.mp4`.
- `pp_audio.py`, `sfxlib.py`: effects synthesis, sidechain and loudness master. These write `mix.wav`.

The scripts expect the working layout used to produce them (the Template 02 renders in `reel2/slides/` beside this folder, plus the Kokoro model files). Mux the result with `ffmpeg -i video.mp4 -i mix.wav -c:v copy -c:a aac -b:a 320k -movflags +faststart -shortest`.
