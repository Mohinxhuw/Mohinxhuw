# NutriCook NC-EC360 egg cooker: TikTok ad (English)

`nutricook-nc-ec360-egg-cooker-ad-en.mp4`: 1080×1920 (9:16), 30 fps, 18.5 s, H.264 + AAC 48 kHz, about −14.5 LUFS.

- **Voice-over:** American male, Kokoro `am_michael`.
- **Captions:** English kinetic captions in Poppins.
- **Sound:** subtle synthesised natural sound effects only. There is **no music**.
- **People:** none appear (no faces, hands or body parts).

All product visuals are the supplied photos, via `../nutricook-egg-cooker/layers`. English marketing headlines were cropped out.

## Voice-over script
1. Busy mornings? Make breakfast a little easier.
2. Meet the NutriCook electric egg cooker.
3. Cook up to seven eggs at once.
4. Fill the measuring cup to the line for soft, medium, or hard eggs.
5. Then just press the button.
6. Visit our page to learn more.

## Scenes
| Time | Scene | On-screen text | Sound |
|---|---|---|---|
| 0.0–3.2 | **Hook.** Lid, egg rack and base lock together on screen from frame 1, then a light sweep and push-in on the assembled cooker | Busy mornings? / Make breakfast a little easier. | whoosh, parts settling |
| 3.2–6.2 | **Meet.** Cooker with a steam-covered dome, slow pull-back, soft steam wisps | Meet the NutriCook / NC-EC360 Electric Egg Cooker | gentle simmer, steam |
| 6.2–8.6 | **Capacity.** Loaded with 7 eggs, badge counts 1→7 | Up to 7 eggs at once | soft "tok" per egg |
| 8.6–13.0 | **Measuring cup.** Water rises to each mark as Soft, Medium and Hard are spoken | Fill to the line / for soft, medium, or hard | pouring water, pops |
| 13.0–15.3 | **One button.** Push-in, the button's indicator light ring glows on "press" | Then just press the button. | button click |
| 15.3–18.5 | **CTA.** Hero shot on a clean kitchen counter, pulsing button | Visit our page to learn more. / Learn more → | whoosh, pop |

## Claims, all taken from the supplied images
- 7-egg capacity.
- Measuring cup marked for hard, medium and soft.
- Single button with a light indicator.

The auto shut-off shown in one supplied image was left out, because the brief excluded safety features. No cooking times, modes, ratings, reviews, discounts, guarantees or Amazon branding are used.

## Rebuild
1. Run `python3 vo/vo.py <dir with kokoro-v1.0.onnx + voices-v1.0.bin>`. The model files come from the kokoro-onnx GitHub `model-files-v1.0` release. It needs `pip install kokoro-onnx soundfile`.
2. Run `python3 render.py <dir with Poppins-ExtraBold/Bold/SemiBold.ttf> video.mp4`. This also writes `timeline.json`.
3. Run `python3 audio.py mix.wav`.
4. Run `ffmpeg -i video.mp4 -i mix.wav -af loudnorm=I=-14:TP=-1.5 -c:v copy -c:a aac -b:a 192k -shortest out.mp4`.
