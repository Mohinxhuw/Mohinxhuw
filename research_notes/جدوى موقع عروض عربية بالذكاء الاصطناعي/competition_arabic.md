# Competitive landscape: AI presentation generators and how they handle Arabic (as of Oct 2026)

Method note: 21 search/fetch calls. Primary pages for Gamma's help center and feedback board (help.gamma.app, ideas.gamma.app), noxi.ai, sharayeh.com and dev.to could not be fetched. WebFetch failed on DNS and curl was refused with a proxy 403. Claims from those pages therefore come from **search-engine snippets** and are marked [snippet]. Pricing comes mostly from third-party aggregators, which conflict with each other, so it is marked [3rd-party]. I ran no hands-on product tests. Every "what breaks" claim below comes from user reports or vendor docs, not my own testing.

## Q1. Which tools officially support Arabic RTL, since when, and what breaks (export, alignment, fonts, mixed Arabic-English, charts)?

### Takeaway
Only Gamma documents RTL publicly, and it labels it **beta**. Microsoft Copilot and Google Gemini support Arabic *prompts and responses*, but their own docs show RTL layout gaps: Copilot translation does not mirror layout, and Gemini's "Improve content" feature has no Arabic. Most other tools (Decktopus, SlidesAI, Presentations.ai, Prezi, Canva) offer an Arabic-language UI or marketing page without documenting RTL layout quality. Failures cluster in the **PPTX/Google Slides export layer**:
- missing `rtl`/`lang` XML attributes, so text reverts to LTR
- fonts without Arabic glyphs, so PowerPoint substitutes a fallback and letters break
- mixed Arabic-English and numbers garbled by naive bidi handling
- layouts not mirrored (timelines, arrows, numbering stay LTR)

### Cited Findings

**Gamma** (the market leader)
- Traction (company-reported, Nov 2025): $68M Series B at a $2.1B valuation (led by a16z), about $100M ARR and profitable, 70M users, 600K+ paying subscribers, about 50 employees. I found no 2026 update. — [Pulse 2.0](https://pulse2.com/gamma-68-million-at-2-1-billion-valuation-raised-as-it-surpasses-100-million-in-arr/amp/); [MIT Sloan ME](https://www.mitsloanme.com/article/gamma-raises-68-million-to-scale-ai-powered-visual-storytelling-platform/); [Benzatine](https://benzatine.com/news-room/gamma-surges-to-21-billion-valuation-with-impressive-funding-round)
- Pricing [3rd-party, conflicting]:

  | Tier | Price (USD/month) | Notes |
  |---|---|---|
  | Free | $0 | 400 one-time credits, Gamma branding |
  | Plus | $8–12 | |
  | Pro | $15–25 | |
  | Ultra | $100 | 20K credits |
  | Team | $20/seat | |
  | Business | $40/seat | |

  — [presentations.ai blog](https://www.presentations.ai/blog/gamma-pricing); [gptprompts.ai](https://gptprompts.ai/ai-pricing/gamma-ai-pricing); [CostBench](https://costbench.com/software/ai-presentations/gamma)
- RTL is supported for Arabic, Farsi, Hebrew and Urdu: text auto-aligns right, the feature is "currently in beta", and "mixing RTL and LTR text may require manual adjustments" [snippet] — [Gamma Help: Does Gamma support RTL?](https://help.gamma.app/en/articles/11016519-does-gamma-support-right-to-left-languages); [About RTL in Gamma](https://help.gamma.app/en/articles/10446600-about-right-to-left-languages-in-gamma)
- The Gamma API lists Arabic (`ar`) as a supported output language — [Gamma developers: output languages](https://developers.gamma.app/reference/output-language-accepted-values)
- PPTX export bug report (Hebrew): exported RTL text renders broken or reversed. The user traced it to three causes in the exported XML: every run tagged `lang="en-US"`, fonts without Hebrew glyphs (so PowerPoint fell back and broke rendering), and `rtlCol="0"` on the text body. Fixing these by hand fixed the deck [snippet; status unknown] — [Gamma ideas: PPTX export bug Hebrew RTL](https://ideas.gamma.app/ideas/p/pptx-export-bug-hebrew-rtl-text-renders-incorrectly)
- Persian PPTX export: text direction reverts to LTR even though the web view is correct. Gamma replied that a fix shipped (per the earlier note); a later comment says Arabic cards still needed slide-by-slide correction [snippet] — [Gamma ideas: RTL in PPTX export (Persian)](https://ideas.gamma.app/ideas/p/issue-with-rtl-text-direction-in-powerpoint-export-persian-1)
- Arabic-specific feedback threads:
  - "Great Application, but Arabic support requires enhancements" (content not retrievable) — [Gamma ideas](https://ideas.gamma.app/ideas/p/great-application-but-arabic-support-requires-enhancements)
  - "numbering system and ideas are LTR for Arabic generation" (from the earlier note) — [Gamma ideas](https://ideas.gamma.app/ideas/p/suggestions-for-arabic-language-support-and-file-export-options-dear-gamma-team)
- **This confirms and extends the digital_content.md note.** RTL is still described as beta. The export problem is not only a direction flip: it also includes wrong `lang` tags, glyph fallback and `rtlCol`. The Persian fix may not fully cover Arabic.
- General Gamma export weakness, separate from Arabic:
  - Google Slides ignores fonts embedded in Gamma exports and substitutes others [snippet] — [Gamma Help: export](https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma)
  - Complex layouts are exported as screenshots, which keeps the look but loses editability (competitor blogs, treat with caution) — [SlideGMM](https://www.slidegmm.ai/en/blog/gamma-export-powerpoint-quality-guide); [2slides](https://2slides.com/blog/why-ai-slide-tools-break-powerpoint-export)
  - A competitor's analysis says PPTX export quality is the top complaint in 38% of Reddit threads about Gamma (vendor-biased) — [SlideGMM Reddit analysis](https://www.slidegmm.ai/en/blog/reddit-ai-presentation-tools-analysis-2026)

**Microsoft Copilot in PowerPoint**
- Arabic is listed as a supported language for Microsoft 365 Copilot prompts and responses (work/school and personal accounts). A 2024 Q&A thread saying Arabic was unsupported is outdated — [MS Support: supported languages](https://support.microsoft.com/en-us/office/supported-languages-for-microsoft-365-copilot-94518d61-644b-4118-9492-617eea4801d8); [MS Q&A 2024](https://learn.microsoft.com/en-us/answers/questions/5323749/when-arabic-language-will-be-supported-in-copilot); [Tech Community: new languages](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/new-languages-supported-in-microsoft-365-copilot/4428528)
- Microsoft's own doc on "Translate your presentation with Copilot":
  - The translated copy does **not mirror slide layout** when translating between RTL and LTR.
  - It does not adjust layout or font size so the new text fits.
  - It requires a qualifying M365 subscription plus a Copilot license.
  - Very large decks are not supported.

  — [MS Support: Translate presentation with Copilot](https://support.microsoft.com/topic/translate-your-presentation-with-copilot-2c622fca-daaf-457c-bc74-f3496cf44a85)
- A user YouTube demo shows Copilot creating a PowerPoint deck in Arabic. This is not official — [YouTube](https://www.youtube.com/watch?v=WHso_jpxdgI)
- I found no official statement that prompt-to-deck generation with Copilot produces mirrored RTL layouts.

**Google Slides with Gemini**
- The Gemini side panel in Slides added Arabic among many languages in March 2025. Image generation of people was not supported in the added languages at that time. Arabic is also listed for image generation/editing — [Workspace Updates, 18 Mar 2025](https://workspaceupdates.googleblog.com/2025/03/gemini-in-slides-side-panel-available-in-many-new-languages.html); [Google: supported languages](https://support.google.com/docs/answer/14925782?hl=en)
- The "Improve your content" feature is limited to EN, FR, DE, IT, JA, KO, PT and ES, so it has **no Arabic** — [Google: supported languages](https://support.google.com/docs/answer/14925782?hl=en)
- Developer-forum complaint: Gemini's Arabic output has a small font size and no RTL text direction — [Google AI dev forum](https://discuss.ai.google.dev/t/issues-with-arabic-language-support-small-font-size-and-lack-of-right-to-left-rtl-text-direction/89158)

**Canva** (Magic Design / Docs-to-Deck)
- Traction (company-reported, Feb 2026): $4B ARR at end of 2025, 265M+ MAU, 31M paid subscribers — [Techleap](https://finder.techleap.nl/news/note/canva-hits-4b-in-revenue-as-ai-chatbot-integrations-fuel-growth)
- Canva has Arabic-localized Magic Design and presentation pages (ar_EG) — [Canva AR Magic Design](https://www.canva.com/ar_eg/magic-design/); [Canva AR presentations](https://www.canva.com/ar_eg/presentations/)
- I found no official Canva doc on RTL behaviour in AI-generated decks. A Dubai training page claims "full Arabic RTL text rendering" (unverified, promotional) — [sawankr](https://sawankr.com/courses/canva/canva-for-business-dubai-design-without-a-designer)
- General: PowerPoint export is Pro-only and layouts often shift when the file is opened in PowerPoint (3rd-party guide) — [presentations.ai AR blog on Canva AI](https://www.presentations.ai/ar/blog/how-to-create-a-presentation-with-canva-ai-step-by-step)
- **Gap:** I found no Canva-specific Arabic complaint threads (consistent with the earlier note).

**Beautiful.ai, Pitch, Plus AI, Decktopus, Presentations.AI, SlidesAI, Prezi, SlidesGo, Napkin**

| Tool | Pricing (USD/month) [3rd-party] | What I found on Arabic |
|---|---|---|
| Beautiful.ai | Pro about $12 annual / $45 monthly; Team $40/user annual ($50 monthly); 14-day card-required trial; free tier disputed | Arabic RTL support is "not documented on its site" (3rd-party observation) — [Decktopus blog](https://www.decktopus.com/blog/beautiful-ai-alternatives); pricing — [CostBench](https://costbench.com/software/ai-presentations/beautiful-ai/); [chatslide review](https://www.chatslide.ai/articles/beautiful-ai-review) |
| Decktopus | about $14.99 Pro AI, $34.99 Business AI | Lists Arabic among 7 generation languages; RTL layout not documented — [Decktopus](https://www.decktopus.com/); [Decktopus AR](https://www.decktopus.com/ar); pricing — [CostBench](https://costbench.com/compare/decktopus-vs-slidesai/) |
| SlidesAI | about $10 Pro, $20 Premium | Arabic marketing page; RTL quality undocumented — [SlidesAI AR](https://www.slidesai.io/ar); pricing — [CostBench](https://costbench.com/compare/decktopus-vs-slidesai/) |
| Plus AI | Basic $10–15, Pro $20–30, Team $40 (sources conflict) | Nothing found on Arabic/RTL — [Deckary review](https://deckary.com/blog/plus-ai-review); [CostBench](https://costbench.com/compare/decktopus-vs-plus-ai/) |
| Presentations.AI | not found | Arabic UI/marketing page; RTL undocumented — [presentations.ai/ar](https://www.presentations.ai/ar) |
| Prezi | not checked | Arabic site; no clear Arabic AI-generation info — [Prezi AR](https://prezi.com/ar/) |
| Pitch, SlidesGo AI, Napkin | not checked | **No information found** |

**Agentic/LLM tools: Genspark, Kimi, Manus, ChatGPT, Claude**
- Genspark AI Slides exports PDF, PPTX and Google Slides. It advertises 19 languages, and the snippet listing did **not** include Arabic. Genspark has also open-sourced "genoffice" (docx/xlsx/pptx agent tooling) — [Genspark help: AI Slides](https://www.genspark.ai/helpcenter/ai-slides); [Genspark AI presentation maker](https://www.genspark.ai/tools/ai-presentation-maker); [GitHub genoffice](https://github.com/genspark-ai/genoffice)
- Kimi and Manus: I found no Arabic/RTL evidence. Manus can use an uploaded PPTX template and export editable PPTX — [SlideSpeak](https://slidespeak.co/blog/5-alternatives-to-manus-slides)
- ChatGPT/Claude PPTX generation runs through code (python-pptx, PptxGenJS). Known pitfalls:
  - python-pptx does not expose the RTL direction flags, so they must be written into the XML directly — [arabic-office-skills](https://github.com/asadeisa/arabic-office-skills)
  - Pre-shaping text with arabic-reshaper or python-bidi breaks PowerPoint output, because the text gets shaped twice (same source)
  - PptxGenJS inserts line breaks before each English segment in mixed RTL/LTR text — [PptxGenJS #1349](https://github.com/gitbrent/PptxGenJS/issues/1349)
  - Okapi reports RTL properties lost in PPTX and brackets reversed in Arabic — [Okapi #927](https://gitlab.com/okapiframework/okapi/-/issues/927); [Okapi #1127](https://gitlab.com/okapiframework/okapi/-/issues/1127)
  - OpenAI forum reports a "systematic RTL layout issue" in Arabic document generation — [OpenAI forum](https://community.openai.com/t/systematic-rtl-layout-issue-in-arabic-image-document-generation/1379790)

**Tome**
- The presentation product was sunset on **30 Apr 2025** after reaching about 20M users. The company pivoted to Lightfield, an AI CRM (about $81M raised in total, 28 staff in late 2025). Reports that AngelList acquired the brand are disputed — [Forbes Chile](https://forbes.cl/tecnologia/2026-07-22/startup-de-ia-pasa-de-demostraciones-llamativas-a-tecnologia-que-genera-ingresos); [Deckary](https://deckary.com/blog/tome-review); [chatslide](https://www.chatslide.ai/articles/tome-ai-shut-down-what-happened)

### Inferences
- The technical failure modes are well understood and documented across tools:
  1. `a:pPr rtl="1"` and `lang="ar-SA"` are missing on runs
  2. `rtlCol` is wrong
  3. Fonts lack Arabic glyphs, so the fallback font breaks shaping
  4. Mixed-script bidi and numbers break
  5. Layouts are not mirrored (timelines, arrows, numbering, chart axes, icon-left/text-right)
  6. Google Slides strips embedded fonts
- Getting these right end-to-end, *and verifying the output by rendering it*, is the core quality gap.
- Gamma being "beta" after more than a year suggests RTL is low priority for it relative to its revenue base. Arabic speakers are a small share of its 70M users (inference, not measured).
- Microsoft and Google host *native* RTL editors (PowerPoint and Slides support RTL paragraphs natively; general product knowledge, not cited above). Their gap is AI layout *generation*: mirrored designs, Arabic typography, Gulf-style visual language. Text direction itself is not their problem.

### Gaps
- No hands-on test results. A side-by-side test (same Arabic prompt into Gamma, Canva, Copilot, Gemini, Decktopus, Noxi and Sharayeh, export to PPTX and Google Slides, check shaping, diacritics, digits, mirroring and charts) is the single most valuable next step.
- The status of Gamma's Arabic PPTX fix, and the dates RTL beta started and its exact launch, could not be verified (pages blocked). The help article ID suggests 2025 (inference).
- No evidence found on Arabic for Pitch, SlidesGo AI, Napkin, Kimi or Plus AI.
- No official evidence on Canva AI deck RTL mirroring, or on chart behaviour in Arabic (axis direction, Arabic-Indic vs Western digits) for any tool.
- No App Store, G2 or Trustpilot Arabic-specific review mining was done (budget).

## Q2. Are there Arabic-first AI presentation startups already? Funding, traction, quality?

### Takeaway
Yes, at least two Arabic-first or RTL-focused tools exist: **Sharayeh (شرايح)** and **NOXI (noxi.ai)**. Both are small and their claims are unverified. I found **no funded Saudi, UAE, Egyptian or Jordanian AI-presentation startup** in Wamda, MAGNiTT or Arab News coverage. Arabic AI funding goes to transcription and LLMs (Intella, HUMAIN), not to decks. A long tail of Arabic-language SEO clone pages (ppt.ai/ar, gamma.com.ai/ar, zoviz, WPS) competes for Arabic search traffic.

### Cited Findings
- **Sharayeh (sharayeh.com)**:
  - Arabic/bilingual AI deck generator that claims RTL support and native editable PPTX export from text, PDF, Word, images and HTML
  - "100+ tools", including a dedicated "Fix Arabic RTL in PowerPoint" tool that swaps in Arabic fonts such as Cairo and Noto Sans Arabic and explicitly lists fixing ChatGPT-generated decks
  - Prepaid credits, for example $10 for 3,000 credits; free tier without watermark
  - Claims 15,000+ users and a 4.9/5 rating (self-reported, unverified); listed on Capterra
  - Ownership and country not found

  — [Sharayeh AR](https://sharayeh.com/ar); [AI presentation maker](https://sharayeh.com/ar/tools/ai-presentation-maker); [RTL fix tool](https://sharayeh.com/en/tools/ppt-rtl-fix); [buy credits](https://sharayeh.com/ar/buy-credits); [Capterra](https://www.capterra.com/p/10046368/Sharayeh/)
- **NOXI (noxi.ai)**:
  - Claims "design-level RTL": timelines, arrows and tables mirrored right to left
  - Export with live text and embedded fonts including Arabic, no watermark
  - Free: 1,000 credits/month, about 25 credits per deck
  - Publishes an Arabic-market "best AI presentation tools 2026" guide and heavy SEO comparison content (Sept–Oct 2026)
  - All vendor-sourced; founders, country and funding not found

  — [noxi.ai](https://noxi.ai/); [NOXI AR guide](https://noxi.ai/ar/blog/best-ai-presentation-tools-arabic-2026); [NOXI Gamma alternatives](https://noxi.ai/blog/gamma-alternatives)
- A DEV Community post titled "Building an AI presentation generator that actually handles Arabic (RTL) right" (author handle "njf"; product not confirmed, page blocked). Its snippets say right-align is not the same as RTL paragraph direction, and naive string reversal breaks numbers and acronyms — [DEV](https://dev.to/njf/building-an-ai-presentation-generator-that-actually-handles-arabic-rtl-right-4op7)
- Open-source Arabic Office skills for agents (PDF, Word, PPTX with PNG preview verification) are publicly available. This lowers the barrier for anyone, including incumbents and clones — [GitHub asadeisa/arabic-office-skills](https://github.com/asadeisa/arabic-office-skills)
- Adjacent regional Arabic AI players (no slide product):
  - Intella (Saudi): $12.5M Series A led by Prosus, Arabic transcription for 25+ dialects — [MENAbytes](https://www.menabytes.com/intella-series-a/)
  - HUMAIN: launched the HUMAIN M3 Arabic open-weights LLM at LEAP 2026 — [Majalla](https://en.majalla.com/node/332960/science-technology/leap-2026-saudi-arabia%E2%80%99s-ai-blueprint-comes-focus)
  - Mohtwa AI (Jordan): Arabic social content, 1–10 staff — [Crunchbase](https://www.crunchbase.com/organization/%D9%85%D8%AD%D8%AA%D9%88%D9%89-ai)
- Only about 1.5% of MENA VC went to AI startups in 2024 — [Arab News startup wrap](https://www.arabnews.com/startups/startup-wrap-mena-startups-draw-capital-as-ai-bets-continue-to-accelerate-2641205)
- Arabic SEO clone/landing pages competing for "عروض تقديمية بالذكاء الاصطناعي" — [ppt.ai/ar](https://ppt.ai/ar); [gamma.com.ai/ar (not official Gamma)](https://gamma.com.ai/ar); [Zoviz](https://zoviz.com/ai-presentations); [WPS AR](https://www.wps.com/feature/ar-EG/ai-ppt-maker/)

### Inferences
- The "Arabic-first AI deck" niche is already occupied at the SEO and long-tail level, but not by a funded or brand-leading player. Being first is not a moat; being demonstrably best plus locally distributed could be.
- Sharayeh's "RTL fix" tool shows there is demand for repairing the output of Gamma, ChatGPT and Copilot. A "fixer/converter" wedge (upload any PPTX and get correct Arabic RTL) is validated, but it is already being contested.

### Gaps
- Founders, location, funding and real traction for Sharayeh and NOXI are unknown. Their pages were blocked, and Wamda and MAGNiTT searches returned nothing relevant.
- I found no Arabic YouTube reviews comparing tools on Arabic output quality (not reached).

## Q3. Precise quality gaps an Arabic-first product could exploit, realistic moats, and how fast incumbents could close them

### Takeaway
The exploitable gaps are in **finish quality and locality**, not basic Arabic support:
- export-perfect RTL PPTX and Google Slides
- truly mirrored layouts
- Arabic typography (proper fonts, kashida/justification, diacritics)
- digit and bidi control
- Arabic-correct charts
- MSA/Gulf content tone
- Saudi government/corporate visual conventions (Vision 2030 style, Hijri dates, ministry templates)
- local payments and data residency

The technical gaps are closable by incumbents within months if they prioritize them; Gamma has had RTL in beta for a long time. Durable moats must come from distribution, local templates and data, enterprise/government compliance, and workflow integration, not from RTL correctness alone.

### Cited Findings
- Specific breakpoints documented in incumbents (from Q1):
  - LTR revert and wrong `lang`/`rtlCol` on PPTX export — [Gamma ideas](https://ideas.gamma.app/ideas/p/pptx-export-bug-hebrew-rtl-text-renders-incorrectly)
  - Mixed RTL/LTR needing manual fixes — [Gamma Help](https://help.gamma.app/en/articles/11016519-does-gamma-support-right-to-left-languages)
  - LTR numbering in Arabic generation — [Gamma ideas](https://ideas.gamma.app/ideas/p/suggestions-for-arabic-language-support-and-file-export-options-dear-gamma-team)
  - No layout mirroring in Copilot translation — [MS Support](https://support.microsoft.com/topic/translate-your-presentation-with-copilot-2c622fca-daaf-457c-bc74-f3496cf44a85)
  - No Arabic "Improve content" in Gemini Slides — [Google](https://support.google.com/docs/answer/14925782?hl=en)
  - Google Slides dropping embedded fonts — [Gamma Help export](https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma)
  - Brackets reversed and RTL props lost in PPTX pipelines — [Okapi #1127](https://gitlab.com/okapiframework/okapi/-/issues/1127)
- Scale asymmetry:
  - Canva: $4B ARR, 265M MAU — [Techleap](https://finder.techleap.nl/news/note/canva-hits-4b-in-revenue-as-ai-chatbot-integrations-fuel-growth)
  - Gamma: about $100M ARR with about 50 staff — [Pulse 2.0](https://pulse2.com/gamma-68-million-at-2-1-billion-valuation-raised-as-it-surpasses-100-million-in-arr/amp/)
  - Notion shipped full Arabic localization in Jan 2026, showing global players do invest in Arabic once the market justifies it — [Khaleej Times](https://www.khaleejtimes.com/business/tech/notion-rolls-out-arabic-language-support-as-ai-adoption-accelerates-across-the-uae?amp=1)
- Tooling for correct Arabic PPTX is now open source, which shortens catch-up time for everyone — [arabic-office-skills](https://github.com/asadeisa/arabic-office-skills); [genoffice](https://github.com/genspark-ai/genoffice)
- Price anchors [3rd-party]: Gamma Plus $8–12; SlidesAI $10; Beautiful.ai Pro about $12 annual; Decktopus $14.99; Sharayeh $10 credit packs; NOXI free. Arabic-first pricing has to sit at or below about $10/month equivalent, or be free-plus-credits. Sources: rows above.

### Inferences

**Gap checklist** (each item is a testable spec for a "quality bar" landing page):
1. PPTX opens in PowerPoint (Win/Mac) with every paragraph `rtl="1"`, Arabic `lang`, and right-side bullets and numbering
2. Google Slides import keeps direction and uses a Google-Fonts Arabic family (Cairo, Tajawal, IBM Plex Sans Arabic, Noto Naskh) so the font substitution is harmless
3. Mirrored master layouts: image left/text right, timelines right-to-left, process arrows reversed, logo placement
4. Bidi-safe mixed text: English brand names, %, currency (ر.س / SAR), dates and phone numbers
5. A digit choice option: Western 0-9 vs Arabic-Indic ٠-٩
6. Charts with reversed category axis, RTL legends and Arabic labels
7. Optional diacritics (tashkeel) that render without clipping, plus line-height tuned for Arabic
8. Content tone: MSA formal vs Saudi business register; Hijri and Gregorian dates
9. Local template library: government/Vision 2030, education (Saudi MoE), Ramadan and national day themes
10. Rendering-based QA: every slide rasterized and auto-checked before export

**How quickly incumbents could close them** (my estimate, not from a source):

| Gap type | Items | Estimated time to close |
|---|---|---|
| Export attributes and fonts | 1–2 | Weeks; it is an engineering fix, and the Persian fix was already shipped |
| Mirrored layouts and charts | 3, 6 | 1–2 quarters per incumbent, since design templates must be redone |
| Tone, templates and local conventions | 8–9 | Slower; needs local content teams. Incumbents rarely build for one market below $10M ARR potential |

**Realistic moats vs Microsoft, Google and Canva:**
- (a) **Distribution**: Saudi/Gulf schools, universities and government entities; Arabic SEO; Arabic YouTube and TikTok creators
- (b) **Local template and content corpus**: government formats, Saudi data sources, cited Arabic research
- (c) **Compliance**: Saudi PDPL and data residency for government/enterprise; SAR pricing with Mada, STC Pay and Apple Pay
- (d) **Workflow wedges**: "fix my Arabic PPTX", bilingual AR/EN decks side by side, Word/PDF-to-Arabic-deck
- (e) **Brand trust** as "the Arabic one"

None of these is strong individually. Microsoft and Google own the editors that enterprises already pay for, so a standalone generator is most defensible where buyers are *outside* M365 Copilot licensing (students, SMEs, freelancers) or where it acts as a **PowerPoint/Slides add-in** rather than a replacement.

Risk: Gamma could move RTL from beta to general availability (GA) and fix export, which would erase the main headline differentiator quickly. Sharayeh and NOXI already market the same RTL claims, so differentiation must be *proven* with public side-by-side tests.

### Gaps
- No Saudi-specific usage data for Gamma, Canva or Copilot (for example, share of Arabic-language decks).
- No data on Microsoft's or Google's roadmaps for RTL layout mirroring in AI generation.
- No verified willingness-to-pay data for Arabic users (another researcher's scope, presumably).
