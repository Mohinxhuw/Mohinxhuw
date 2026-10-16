# Market Gaps in Arabic/Saudi Digital Products & Content (as of Oct 2026)

Scope: templates (PowerPoint/Canva/Notion), stock photo/video, fonts, Arabic AI tools (presentations, transcription, dubbing/TTS), e-invitations, AI headshots, creator tools. Audience: a solo Saudi designer who already sells PowerPoint templates on Gumroad and has limited capital.
Note: about 20 search/fetch calls. Several primary pages (wamda.com, thestartupscene.me, ideas.gamma.app) failed to resolve when fetched, so some claims below come from search-result snippets and are marked as such.

## Q1. How well do the major global tools handle Arabic (RTL, fonts, Gulf dialect speech)?

### Takeaway
Global tools now mostly "support" Arabic on paper: Gamma has RTL in beta, Notion has had full Arabic localization since Jan 2026, and ElevenLabs lists Saudi-accent voices. The real failures show up at the edges: exports (PPTX/PDF), number and list direction, letters coming apart in templates, and dialect accuracy (TTS falls back to MSA, ASR gets worse on unseen dialects). So the gap is in finish and localization quality, not in whether Arabic exists at all.

### Cited Findings
**Gamma (AI presentations)**
- Gamma's help center says it now supports RTL languages (Arabic, Farsi, Hebrew, Urdu) in the editor and the AI generator, **still in beta** — [Gamma Help: RTL languages](https://help.gamma.app/en/articles/11016519-does-gamma-support-right-to-left-languages); [About RTL in Gamma](https://help.gamma.app/en/articles/10446600-about-right-to-left-languages-in-gamma)
- On Gamma's feedback board a user reported that exporting to PowerPoint (.pptx) reverts text direction to LTR (Persian report). Gamma replied that a fix had shipped. Another report in the same thread says exported Arabic cards needed RTL correction slide by slide. I could not confirm whether the Arabic case is fixed (page could not be fetched; based on search snippet) — [Gamma ideas: RTL in PPTX export](https://ideas.gamma.app/ideas/p/issue-with-rtl-text-direction-in-powerpoint-export-persian-1)
- A separate feedback post says "the numbering system and ideas are LTR for Arabic generation". Status unknown — [Gamma ideas: Arabic support suggestions](https://ideas.gamma.app/ideas/p/suggestions-for-arabic-language-support-and-file-export-options-dear-gamma-team); RTL request marked complete — [Gamma ideas: RTL support](https://ideas.gamma.app/ideas/p/rtl-support-for-hebrew-and-arabic)
- Other AI deck tools (WPS AI PPT, Zoviz, SlidesAI, Prezi AI, Canva Magic Design, Presentations.ai) have Arabic-language marketing pages. None of the pages I found document RTL or Arabic-font quality — [WPS AR](https://www.wps.com/feature/ar-EG/ai-ppt-maker/); [Zoviz AR](https://zoviz.com/ar/ai-presentations); [SlidesAI AR](https://www.slidesai.io/ar/ai-presentation-maker); [Canva AR AI presentations](https://www.canva.com/ar_eg/create/ai-presentations/)

**Notion**
- Notion launched Arabic language support on **26 Jan 2026**. The coverage calls it full localization of the app (desktop and mobile) and website, and Notion's "first major product investment in the Middle East" — [Khaleej Times](https://www.khaleejtimes.com/business/tech/notion-rolls-out-arabic-language-support-as-ai-adoption-accelerates-across-the-uae?amp=1); [tbreak](https://tbreak.com/notion-launches-full-arabic-support/); [Middle East AI News](https://www.middleeastainews.com/p/notion-launches-arabic-language-support)
- A changelog aggregator says Arabic and Hebrew were Notion's first RTL languages, with "text flow, alignment and tables" working. It is undated, and I found no official Notion release note confirming the RTL details (**partially verified**) — [CreateWith](https://www.createwith.com/tool/notion/updates/notion-adds-arabic-and-hebrew-support). An older Super.so post said Notion had no RTL (outdated) — [Super blog](https://super.so/blog/notion-rtl)

**Adobe Express / Adobe video templates (Canva-adjacent evidence)**
- Adobe Express community: Arabic text becomes unreadable on PDF export, and a LinkedIn carousel broke. A moderator acknowledged "limited Arabic support". Dynamic text layouts fail with Arabic because RTL support is incomplete — [Adobe Community: Arabic not supported on PDF export](https://community.adobe.com/t5/adobe-express-bugs/arabic-is-not-supported-when-export-as-pdf/idi-p/14639205); [Dynamic layouts broken](https://community.adobe.com/t5/adobe-express-bugs/text-layouts-dynamic-broken/m-p/14855638)
- Premiere/After Effects: Arabic letters break when typed into motion-graphics templates built for English — [Adobe Community](https://community.adobe.com/t5/premiere-pro-discussions/arabic-typing-not-supported-in-motion-graphics-templates/m-p/9801591/highlight/true)
- OpenAI community: a "systematic RTL layout issue in Arabic image/document generation", and Arabic PDF generation problems — [OpenAI forum](https://community.openai.com/t/systematic-rtl-layout-issue-in-arabic-image-document-generation/1379790); [OpenAI forum 2](https://community.openai.com/t/arabic-language-support-issues-in-chatgpt-and-pdf-generation/1127085)
- Google AI dev forum: Arabic output with small font size and no RTL text direction — [Google AI forum](https://discuss.ai.google.dev/t/issues-with-arabic-language-support-small-font-size-and-lack-of-right-to-left-rtl-text-direction/89158)
- **Canva specifically:** I found no Canva-specific complaint threads in this round (gap).

**Speech recognition (Gulf/Saudi dialect)**
- INTERSPEECH 2023 study: zero-shot Whisper "deteriorates significantly" on unseen dialects (Algeria, Jordan, Palestine, UAE, Yemen) — [arXiv 2306.02902](https://arxiv.org/abs/2306.02902v1)
- A community fine-tuned Whisper-large-v3 reports WER 0.169 on Saudi/Gulf, among the best of its 14 dialects, with Maghrebi hardest (self-reported, **unverified**) — [HF: whisper-large-v3-arabic-dialectal-v2](https://huggingface.co/oddadmix/whisper-large-v3-arabic-dialectal-v2)
- PolySpeech-100 benchmark: on Arabic dialects, cascade systems beat end-to-end models (Whisper-v3+Qwen2.5 at 62.13% vs 52.11% for the best E2E). Gemini-3-flash scored 98.0% on Najdi, and GPT-Audio-mini dropped to 33.75% on Moroccan — [arXiv 2606.01016](https://arxiv.org/pdf/2606.01016)
- Bulbul dataset paper: Saudi sub-dialect differences are often phonetic/phonological rather than lexical, which makes ASR harder — [arXiv 2608.21950](https://arxiv.org/pdf/2608.21950)
- Community Saudi-dialect LoRA adapter for Whisper exists (no benchmark) — [HF ksa-whisper-model](https://huggingface.co/Bruno7/ksa-whisper-model/blob/main/README.md)
- Speak AI (vendor) claims that most MSA-trained ASR fails on real Saudi conversational speech (vendor marketing, **unverified**) — [Speak AI Saudi Arabic transcription](https://speakai.co/ar/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D9%86%D8%B3%D8%AE-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9-%D8%A7%D9%84%D8%B9/)

**TTS / dubbing (ElevenLabs)**
- A third-party catalog lists 15 ElevenLabs Arabic voices with a Saudi accent (no quality ratings) — [Famulor](https://www.famulor.io/voices/elevenlabs/languages/ar/accents/saudi)
- Vapi user: an agent on ElevenLabs multilingual with Saudi transcription "still speaks modern Arabic instead of Saudi". Support suggested tuning settings and said no specific Saudi voice ID was documented — [Vapi support](https://support.vapi.ai/t/27085893/arabic-dialects)
- Retell AI user: a custom voice trained on a Lebanese speaker came out speaking Saudi Arabic after deployment, so dialect control is unreliable — [Retell community](https://community.retellai.com/t/arabic-language-voice-agent-the-client-base-is-mainly-in-the-levant-region-so-i-need-support-for-lebanese-accent/1452)

**Fonts**
- Arabic fonts number "a few hundred" against thousands of Latin fonts. Google has published hundreds of Latin web fonts but only a handful of Arabic ones. Families often have only Regular and Bold (sources are mostly older, around 2015) — [Parsons MFADT thesis](https://mfadt.parsons.edu/2015/projects/tarkeeb/); [Leiden paper](https://scholarlypublications.universiteitleiden.nl/access/item%3A2937094/download); [Print mag](https://www.printmag.com/daily-heller/an-arabic-typography-community/)
- Causes cited: piracy, limited patronage, small market demand. Boutros Advertisers Naskh is called the most-used and among the most-pirated Arabic typefaces — [Gulf News](https://gulfnews.com/lifestyle/arabic-calligraphy-will-never-fade-1.2061659); [Mada Masr](https://www.madamasr.com/en/?p=224487)

### Inferences
- The defensible angle is "Arabic that works out of the box": decks that export to PPTX correctly, Arabic numerals and list order fixed, fonts that join properly, and templates that don't break when edited. Global AI tools generate the content. A local product can win on the final 20% of quality.
- For speech, Gulf/Najdi accuracy is improving fast in frontier models (Gemini 98% Najdi in one benchmark), so a solo founder should not build an ASR engine. A thin workflow layer (Saudi-dialect subtitles, Arabic SRT styling, burned-in captions with proper Arabic fonts) on top of APIs is more realistic.
- Fonts are a real scarcity, but piracy and the specialist skill needed make it a weak first business for a template seller. Better uses: bundle licensed or free OFL Arabic fonts into templates, or partner with a foundry.

### Gaps
- No Canva-specific forum evidence on Arabic RTL failures was found. Canva is known to support Arabic text, but quality issues are unverified.
- No independent benchmark of ElevenLabs/HeyGen Saudi-dialect dubbing quality.
- No official Notion changelog confirming RTL block behaviour.
- Status of 29LT, Arabic font marketplace sizes, and Arabic font pricing not researched.

## Q2. Is there a Saudi/Gulf stock library, an Arabic Canva/PowerPoint template marketplace, and Arabic e-invitation platforms with RSVP? (Players and competition strength)

### Takeaway
- **Stock photo/video:** competition is weak-to-moderate. There is one funded Saudi startup (The Stock, 2021) with unclear current traction, a government tourism library, and Getty's curated Saudi set.
- **Arabic RTL template marketplaces:** competition is weak. Global sites hold "Arabic-themed" decks (lanterns, geometry) rather than editable RTL Arabic business decks, and the Arabic supply is scattered across Khamsat, Gumroad and Getly at $1–$10.
- **E-invitations with RSVP:** competition is moderate and rising. Several Saudi apps (Motanasb and others) plus Khamsat/Mostaql freelancers offer WhatsApp + QR + RSVP, but no dominant Paperless Post-style brand was found.

### Cited Findings
**Stock photo/video**
- **The Stock** is a Saudi visual-content marketplace founded in 2021 by photographer Abdullah Al Musharraf. It sells photos, video, graphics and logos from Saudi photographers to counter the cultural mismatch of global stock. It raised about $667K pre-seed led by VEST. **Current status/traction not found** (based on search snippets; page fetch failed) — [Wamda](https://www.wamda.com/en/2021/08/stock-raises-667000-pre-seed-funding); [The Startup Scene](https://thestartupscene.me/INVESTMENTS/Saudi-Image-Platform-The-Stock-Snaps-Up-667K-in-Pre-Seed-Funding)
- The Saudi Commission for Tourism & Antiquities launched a government multimedia library of tourism and cultural photo/film — [eTurboNews](https://eturbonews.com/?p=56045)
- Getty Images has a curated Saudi collection, "MarhabaKSA" (lifestyle, travel, business), and claims 88% of Saudi consumers value high-quality images (vendor data) — [Getty VisualGPS Saudi spotlight](https://www.gettyimages.com/visualgps/creative-trends/culture/collection-spotlight-saudi-arabia)
- Demand signals: a Riyadh visualization firm says generic "Middle East" CGI fails because Saudi buyers spot inauthenticity — [The Digital Bunch](https://www.thedigitalbunch.com/blog/architectural-visualization-saudi-arabia-what-international-developers-must-know). A Campaign ME op-ed says Saudis respond better to Arabic-first, local content — [Campaign ME](https://campaignme.com/act-like-a-saudi-think-like-a-local-brand-by-brendan-walsh/)
- Competition strength: **moderate at the high end** (Getty/global libraries now curate Saudi content) and **weak for an affordable, subscription-style local library** (The Stock's traction unknown).

**PowerPoint / Canva templates**
- Global "Arabic" templates are mostly Arabic-*themed* designs: Envato Elements ("Arabic" PPTX, subscription from $16.50/mo), Slidesgo ("Arabic Culture", "Arabic for beginners"), SlideEgg (lanterns/geometric), PoweredTemplate ("Arabic Frame", free), and Premast's Islamic "Barokah" deck — [Envato](https://elements.envato.com/arabic-YLE6ZEX); [Slidesgo](https://slidesgo.com/theme/arabic-culture); [SlideEgg](https://www.slideegg.com/arabic-ppt-template-free); [PoweredTemplate](https://poweredtemplate.com/arabic-frame-powerpoint-template-51980/); [Premast](https://premast.com/templates/item/barokah-islamic-powerpoint-template)
- Genuine Arabic-content decks exist only as one-off sellers, e.g. a Gumroad "Modern Arabic Business Growth Plan" (10 slides, $1.99) — [Gumroad klass501](https://klass501.gumroad.com/l/oigye)
- Arabic Canva templates are sold mainly as Khamsat freelance gigs (10 Instagram templates from about $5, 9 Eid greeting templates for $10), Gumroad freebies, and Getly (Arabic café menu Canva template at $3) — [Khamsat](https://khamsat.com/designing/social-posts-banners/3971958-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%82%D9%88%D8%A7%D9%84%D8%A8-%D9%85%D9%86%D8%B4%D9%88%D8%B1%D8%A7%D8%AA-%D8%B3%D9%88%D8%B4%D9%8A%D8%A7%D9%84-%D9%85%D9%8A%D8%AF%D9%8A%D8%A7-%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%D9%87-%D8%A8%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D9%83%D8%A7%D9%86%D9%81%D8%A7); [Khamsat Eid](https://khamsat.com/designing/feasts-designs/3955186-%D9%82%D9%88%D8%A7%D9%84%D8%A8-%D9%85%D8%B9%D8%A7%D9%8A%D8%AF%D8%A7%D8%AA-%D8%AC%D8%A7%D9%87%D8%B2%D8%A9-%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D9%88%D8%B9%D8%B5%D8%B1%D9%8A%D8%A9-%D8%AA%D8%B9%D9%85%D9%84-%D8%B9%D8%A8%D8%B1-%D9%83%D8%A7%D9%86%D9%81%D8%A7); [Getly](https://www.getly.store/product/canva-08pc); [Gumroad free Arabic Canva](https://hassandesigner97.gumroad.com/l/ntrgq)
- I found no dedicated Arabic-first template marketplace (a "Creative Market for Arabic") in this search. Competition: **weak**.

**E-invitations with RSVP**
- **Motanasb (متناسب)**, by Mutasaed IT Est., is a Saudi app for "how Saudi families work": invites via SMS/WhatsApp, live RSVP tracking, QR check-in, templates for weddings and Eid majlis. It is free to download and paid per sending package — [AppsHunter listing](https://appshunter.io/ios/app/id6761024760.md); [mwm.ai](https://mwm.ai/apps/motanasb/6761024760)
- Other apps: "قوالب المصمم" (video/photo invitation templates for KSA/Gulf, shared via WhatsApp/Snap), "دعوة مناسبات" (WhatsApp/SMS/email, live RSVP, guest dashboard), "دعوة الكترونية", and a "دعوات" platform with QR entry cards and reminders. Developer origin is unverified for several — [App Store قوالب المصمم](https://apps.apple.com/SA/app/id1565815602); [mwm.ai دعوة مناسبات](https://mwm.ai/apps/app/6755870279); [mwm.ai دعوة الكترونية](https://mwm.ai/apps/app/6779332144); [mwm.ai دعوات](https://mwm.ai/apps/app/6502119851)
- The freelance market fills the gap. Khamsat gigs sell interactive invitations with RSVP through Google Forms/Sheets, and Mostaql clients post projects asking for WhatsApp invitation systems with unique one-time QR codes, hall scanning and reconciliation reports. These are demand signals for an off-the-shelf product — [Khamsat RSVP gig](https://khamsat.com/designing/wedding-invitation/4227848-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AF%D8%B9%D9%88%D8%A9-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9-%D9%85%D8%B9-%D8%AA%D8%A3%D9%83%D9%8A%D8%AF-%D8%A7%D9%84%D8%AD%D8%B6%D9%88%D8%B1-rsvp); [Mostaql project 1256989](https://mostaql.com/project/1256989); [Mostaql 1168177](https://mostaql.com/project/1168177)
- Adjacent funded players: Mila Celebrations (Saudi event-planning app) raised SAR 850K pre-seed in 2024 — [Wamda](https://www.wamda.com/2024/09/mila-celebrations-raises-227000-pre-seed); The Hub App (Swiss RSVP tool with Saudi angel backing, 2020) — [Wamda](https://www.wamda.com/en/2020/08/hub-app-raises-pre-seed-investment)
- Competition: **moderate** (several apps, no evident category leader).

**AI headshots**
- I found no reports of AI headshot generators failing on hijab, shemagh or thobe. Hijab try-on apps (TryHijab) and prompt examples exist. Dreamwave says many tools aren't tested on religious head coverings (full section not retrieved) — [Dreamwave](https://www.dreamwave.ai/blog/do-ai-headshots-work-for-dark-skin-tones); [TryHijab](https://www.theaireport.ai/tooldatabase/tryhijab); [Headshot AI app (Arabic listing)](https://apps.apple.com/us/app/headshot-ai-%ED%94%84%EB%A1%9C-%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%D8%B5%D9%88%D8%B1%D8%A9/id6736820165?l=ar). Competition is unclear. Global apps already localize their store pages into Arabic.

**Transcription**
- Search did not surface specific Saudi transcription startups; the names Munsit and Tafreegh were not confirmed. Global tools (Speak AI, Whisper-based apps, Gemini) market Saudi Arabic — [Speak AI](https://speakai.co/ar/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D9%86%D8%B3%D8%AE-%D8%A7%D9%84%D9%84%D8%BA%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9-%D8%A7%D9%84%D8%B9/)

### Inferences — Competition-strength summary
| Category | Strength | Basis |
|---|---|---|
| Arabic Procreate brushes | Strong/saturated | prior research (given) |
| Hijri planners | Moderate | prior research (given) |
| Editable RTL Arabic PowerPoint/Keynote/Google Slides decks | **Weak** | only Arabic-*themed* global decks and $2 one-offs |
| Arabic Canva templates (social, menus, Eid, Ramadan) | Weak–moderate | fragmented Khamsat/Getly/Gumroad, low prices |
| Arabic Notion templates | Weak | Notion Arabic launched Jan 2026, so the market is new |
| Saudi stock photo/video (affordable, subscription) | Weak–moderate | The Stock (traction unknown), Getty curated set |
| Arabic AI presentation generator (RTL-perfect, Saudi gov/corporate style) | Weak | Gamma RTL in beta with export issues, no local leader found |
| Saudi e-invitations + WhatsApp RSVP + QR | Moderate | several apps plus many freelancers, no leader |
| Saudi-dialect transcription/subtitling | Moderate (global APIs improving) | frontier models strong on Najdi |
| Saudi-dialect TTS/dubbing | Moderate | ElevenLabs Saudi voices, but dialect drift reported |
| Arabic fonts | Moderate (specialist foundries), heavy piracy | older sources |
| AI headshots for Saudi attire | Unknown | no evidence found |

### Gaps
- Current traction of The Stock (contributors, revenue, still operating?) could not be verified because fetches failed.
- Install counts and ratings for Motanasb and the other invitation apps were not retrieved.
- Not checked: Salla/Zid-store template sellers, Arabic Envato authors' sales counts, Etsy "Arabic wedding invitation" listing counts.

## Q3. 3–4 concrete gaps (proven Western model with weak Arabic/Saudi competition), and which a solo designer can start with limited capital

### Takeaway
Ranked by fit for a solo Saudi designer already selling PowerPoint on Gumroad: (1) an Arabic-first RTL template brand/marketplace (PowerPoint + Canva + Notion), (2) a Saudi e-invitation design-plus-RSVP service that starts as templates and grows into a micro-SaaS, (3) a niche Saudi lifestyle stock photo/video library, (4) "24Slides-for-Arabic", meaning an AI-assisted Arabic deck-fixing/design service. AI dubbing and ASR engines are capital- and technology-heavy and dominated by global APIs, so they are poor first bets.

### Cited Findings (Western model evidence)
- **Gamma:** about $100M ARR, 70M users, 600K paying subscribers, profitable since 2023, $68M Series B at $2.1B valuation (CEO statements; Sacra estimate $102M ARR, Oct 2025) — [Sacra Gamma](https://sacra.com/c/gamma/); [MIT Sloan ME](https://www.mitsloanme.com/article/gamma-raises-68-million-to-scale-ai-powered-visual-storytelling-platform/); [Entrepreneur Loop](https://entrepreneurloop.com/gamma-ai-funding-series-b-2-billion-valuation/)
- **Otter.ai:** about $100M ARR (Mar 2025, Sacra estimate), 25M+ users — [Sacra Otter](https://sacra.com/c/otter/)
- **ElevenLabs:** more than $330M ARR at end of 2025 (CEO via Bloomberg); Sacra estimates about $500M ARR by Apr 2026; $500M Series D at $11B valuation — [Yahoo/Bloomberg](https://finance.yahoo.com/news/elevenlabs-ceo-says-voice-ai-161522538.html); [Sacra ElevenLabs](https://sacra.com/c/elevenlabs/)
- **Envato:** creators passed US$1B cumulative earnings (Nov 2020) across 81,000 creators. Elements pays 50% of net subscription revenue to creators by usage. More than 60 authors had over $1M in sales each (earlier report) — [Startup Daily](https://www.startupdaily.net/?p=85835); [SmartCompany](https://www.smartcompany.com.au/startupsmart/advice/startupsmart-growth/melbourne-startup-envato-reaches-a-major-milestone-how-it-got-there-and-what-comes-next/)
- Paperless Post, Creative Market, Unsplash, Shutterstock and 24Slides metrics were **not found in this round** (see Gaps).

### Gap profiles

**Gap 1 — Arabic-first RTL template brand/marketplace (PowerPoint, Google Slides, Canva, Notion)**
- Western model: Envato Elements / Creative Market / Slidesgo (Envato's creators have earned more than $1B — [Startup Daily](https://www.startupdaily.net/?p=85835)).
- Local problem: global "Arabic" templates are mostly decorative themes, not editable RTL decks. Tools break Arabic on export (Gamma PPTX, Adobe Express PDF) — see Q1 sources.
- Demand evidence: Notion's Arabic launch in Jan 2026 creates a new template market ([Khaleej Times](https://www.khaleejtimes.com/business/tech/notion-rolls-out-arabic-language-support-as-ai-adoption-accelerates-across-the-uae?amp=1)). Arabic Canva templates already sell as Khamsat gigs ([Khamsat](https://khamsat.com/designing/social-posts-banners/3971958-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%82%D9%88%D8%A7%D9%84%D8%A8-%D9%85%D9%86%D8%B4%D9%88%D8%B1%D8%A7%D8%AA-%D8%B3%D9%88%D8%B4%D9%8A%D8%A7%D9%84-%D9%85%D9%8A%D8%AF%D9%8A%D8%A7-%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%D9%87-%D8%A8%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85-%D9%83%D8%A7%D9%86%D9%81%D8%A7)).
- Competitors: Envato, Slidesgo, SlideEgg, Premast (themed only), scattered Gumroad/Getly/Khamsat sellers. **No Arabic-first marketplace found.** Strength: weak.
- Revenue model: per-template sales ($5–$49), bundles, an annual "all-access" subscription, later a multi-seller marketplace with commission. Niche examples: Saudi government/Vision 2030-style corporate decks, Ramadan/National Day social kits, Arabic Notion student and business systems, café menus.
- Difficulty/capital: **low**. Gumroad/Salla/Zid plus own designs, near-zero capital. Moving to a marketplace needs moderate capital and seller recruitment.
- Notes: font licensing matters. Use OFL Arabic fonts (Google Fonts) or licensed ones. Canva template resale must follow Canva's licence terms.

**Gap 2 — Saudi e-invitations + WhatsApp RSVP + QR check-in (Paperless Post / Evite / Greenvelope style)**
- Western model: Paperless Post, Evite (**metrics not found this round**).
- Local problem: Saudi weddings and gatherings are distributed over WhatsApp, with segregated guest lists, large guest counts and QR entry at halls. Families currently stitch together freelance designs and Google Forms.
- Demand evidence: Mostaql projects requesting WhatsApp + one-time QR + hall scanning + reports ([Mostaql](https://mostaql.com/project/1256989)); Khamsat RSVP invitation gigs ([Khamsat](https://khamsat.com/designing/wedding-invitation/4227848-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%AF%D8%B9%D9%88%D8%A9-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9-%D9%85%D8%B9-%D8%AA%D8%A3%D9%83%D9%8A%D8%AF-%D8%A7%D9%84%D8%AD%D8%B6%D9%88%D8%B1-rsvp)); several new apps launching ([Motanasb](https://appshunter.io/ios/app/id6761024760.md)).
- Competitors: Motanasb, دعوة مناسبات, قوالب المصمم, "دعوات" platform, Mila Celebrations (adjacent). Strength: **moderate**, fragmented, no leader identified.
- Revenue model: per-event packages priced by guest count (the model Motanasb uses), premium animated video invitations, add-ons (QR gate scanning, reminders, thank-you cards).
- Difficulty/capital: **low to start, moderate to scale**. A solo designer can begin by selling premium Saudi-style video/animated invitation templates and "design + RSVP" done-for-you services using no-code tools (Google Forms/Sheets or Tally plus a WhatsApp link). A full SaaS needs WhatsApp Business API costs (per-message fees) and development.
- Notes: differentiate on design quality (the designer's edge) rather than tech. Privacy for women's guest lists is a feature.

**Gap 3 — Authentic Saudi/Gulf stock photo and video library (Unsplash+/Shutterstock/Getty niche model)**
- Western model: Shutterstock/Getty/Unsplash (**metrics not retrieved**). Getty itself is now curating Saudi content ([Getty MarhabaKSA](https://www.gettyimages.com/visualgps/creative-trends/culture/collection-spotlight-saudi-arabia)).
- Local problem: global stock shows generic "Middle East" scenes, and Saudi audiences detect inauthenticity ([Digital Bunch](https://www.thedigitalbunch.com/blog/architectural-visualization-saudi-arabia-what-international-developers-must-know)).
- Demand evidence: Getty claims 88% of Saudi consumers value quality imagery (vendor claim). Brands are told to go Arabic-first ([Campaign ME](https://campaignme.com/act-like-a-saudi-think-like-a-local-brand-by-brendan-walsh/)).
- Competitors: The Stock (Saudi, $667K pre-seed in 2021, current traction unverified — [Wamda](https://www.wamda.com/en/2021/08/stock-raises-667000-pre-seed-funding)), the government tourism library (free, tourism-only — [eTurboNews](https://eturbonews.com/?p=56045)), Getty. Strength: weak-to-moderate.
- Revenue model: niche packs (Saudi office/workplace, Saudi women professionals, Ramadan, National Day, food and coffee, AlUla/Riyadh b-roll), plus contributing to Adobe Stock/Getty in parallel for passive income. A subscription library later.
- Difficulty/capital: **moderate**. Camera/drone gear, model releases (cultural sensitivity around photographing women and families) and shoot logistics. AI-generated "Saudi" imagery is a cheaper but riskier substitute, since authenticity is the whole value.
- Notes: the safest solo route is selling niche packs and contributing to global agencies. A full library platform is a capital play.

**Gap 4 — Arabic deck design/fix service plus an AI-assisted "Arabic Gamma" (24Slides / Gamma model)**
- Western model: Gamma ($100M ARR, 70M users — [Sacra](https://sacra.com/c/gamma/)); 24Slides-style design services (metrics not found).
- Local problem: Gamma RTL is still beta, with PPTX export RTL and numbering issues ([Gamma Help](https://help.gamma.app/en/articles/11016519-does-gamma-support-right-to-left-languages); [Gamma ideas](https://ideas.gamma.app/ideas/p/issue-with-rtl-text-direction-in-powerpoint-export-persian-1)). Saudi corporate and government decks need polished Arabic-English bilingual layouts.
- Demand evidence: indirect (complaint threads above; Arabic-language marketing by every AI deck tool shows they see the market). No direct Saudi demand data found.
- Competitors: Gamma, Canva, WPS, Presentations.ai, freelancers on Khamsat. **No Saudi-built Arabic-first AI deck tool found.** Strength: weak locally, strong globally.
- Revenue model: start with a service (per-slide pricing for converting or fixing AI-generated or English decks into proper Arabic RTL), then a productized subscription or a Gumroad "RTL-fix" PowerPoint add-in/template system.
- Difficulty/capital: the service is **low**. Building an AI SaaS is **moderate to high** (LLM API costs, development, competing with Gamma's free tier).

### Inferences
- Best fit for this entrepreneur: **Gap 1 first** (an extension of the existing Gumroad business into Arabic RTL PowerPoint + Canva + Notion, with Saudi occasions as a content calendar), with **Gap 2 as a high-ticket service line** (wedding and event invitations), and Gap 4 as an upsell service. Gap 3 suits someone with photo/video skills or a partner photographer.
- Avoid as solo/low-capital: ASR/TTS engines, a font foundry (specialist skill plus piracy), and generic AI headshots (global apps already localized, no evidence of a gap).
- Many "absent competitors" findings rest on limited searches. Treat "none found" as "none found in about 20 queries", not proof of absence.

### Gaps
- Paperless Post, Evite, Creative Market, Unsplash, Shutterstock and 24Slides revenue/user figures were not retrieved. They need a follow-up search before they go in the report.
- No quantitative Saudi demand data (search volumes, Saudi wedding counts, Gumroad Arabic sales) was gathered.
- Pricing and adoption of Motanasb and the other invitation apps are unknown.
- Canva Arabic-specific quality evidence is missing.
