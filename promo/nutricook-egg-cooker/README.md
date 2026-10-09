# NutriCook NC-EC360 egg cooker: TikTok ad (Saudi Arabic)

`nutricook-nc-ec360-egg-cooker-ad.mp4`: 1080×1920 (9:16), 30 fps, 24.4 s, H.264 + AAC 48 kHz, about −15 LUFS.
It has a male Arabic voice-over and subtle synthesised natural sound effects. There is **no music**, and **no people, hands or body parts** appear.
Every product shot comes from the supplied photos in `src/`. The English headlines were cropped out, and the English labels and leader lines were removed and replaced with Arabic ones.

## Voice-over script
| # | Line |
|---|---|
| 1 | جهّزي بيضك، بدون وجع راس! |
| 2 | لا قِدر، ولا وقفة عند النار. |
| 3 | جهاز سلق البيض، من نيوتري كوك. |
| 4 | سبع بيضات مرّة وحدة، تكفي فطور العيلة. |
| 5 | والكوب المدرّج يضبط لك الماء: برشت، نُص، أو مستوي. |
| 6 | ضغطة زر، ويطفّي لحاله. |
| 7 | ادخلي صفحتنا من الرابط، واطلبيه الحين! |

## Scenes
| Time | Scene | On-screen caption | Sound |
|---|---|---|---|
| 0.0–3.0 | **Hook.** Steam-covered dome, slow push-in | جهّزي بيضك / بدون وجع راس! | gentle simmer, steam |
| 3.0–5.9 | **Problem.** Same shot, crossed-out pot badge | لا قِدر… ولا وقفة / عند النار | simmer, strike swipe |
| 5.9–8.8 | **Reveal.** Real lid, rack and base glide together, then dissolve to the assembled cooker | جهاز سلق البيض / NutriCook NC-EC360 | whoosh, parts settling |
| 8.8–12.5 | **7 eggs.** Loaded cooker, badge counts ١→٧ | ٧ بيضات مرّة وحدة / تكفي فطور العيلة | 7 soft egg "toks" |
| 12.5–17.1 | **Measuring cup.** Water rises to each mark, Arabic doneness labels | الكوب المدرّج / يضبط لك كمية الماء + برشت · نُص · مستوي | pouring water, pops |
| 17.1–19.7 | **One button.** Push-in to the button, indicator glows then goes off | ضغطة زر… / ويطفّي لحاله | button click |
| 19.7–24.4 | **CTA.** Hero shot in a clean kitchen setting, pulsing button | اطلبيه الحين / ادخلي صفحتنا من الرابط | whoosh, pop |

## Claims used, and where each comes from (the supplied product images)
- Holds 7 eggs: brief, and image "7 perfect eggs".
- Measuring cup marked for soft, medium and hard: image "Measuring Cup".
- Button with light indicator: exploded-view image.
- Turns off automatically: image "Auto Shut-off".

No cooking times, ratings, reviews, prices, discounts, guarantees or Amazon branding are used.

## Rebuild
1. Run `python3 prep.py`. It builds `layers/` from `src/`.
2. Run `python3 vo/vo.py <dir of vits-piper-ar_JO-kareem-medium>`. Get the model from the sherpa-onnx GitHub `tts-models` release. It needs `pip install sherpa-onnx soundfile`.
3. Run `python3 render.py <dir with Tajawal-ExtraBold/Bold/Medium.ttf> video.mp4`. This also writes `timeline.json`.
4. Run `python3 audio.py mix.wav`. It uses `../business-presentation-pro-ads/sfxlib.py`.
5. Run `ffmpeg -i video.mp4 -i mix.wav -af loudnorm=I=-14:TP=-1.5 -c:v copy -c:a aac -b:a 192k -shortest out.mp4`.
