# Technical feasibility, architecture and build/run costs: Arabic-first AI presentation generator (as of Oct 2026)

Research date: 2026-10-17. Currency: SAR is pegged at 3.75 per USD (all SAR figures = USD x 3.75).
Method note: in this session, direct fetches of vendor pricing pages (docs.anthropic.com, openai.com, ai.google.dev, ideas.gamma.app) failed with DNS errors, so most prices below come from **dated third-party aggregators** found via search. Confirm against official pages before committing a budget. Anything marked **(estimate)** is my own calculation or assumption, not a sourced figure.

## What is the realistic cost per generated deck (LLM + images + compute) at different quality levels, in USD and SAR?

### Takeaway
A 10–15 slide Arabic deck costs about **$0.03–0.05 (0.1–0.2 SAR)** at an economy tier (Gemini Flash or GPT-5 mini text, stock photos). It costs about **$0.20–0.30 (0.75–1.1 SAR)** at a standard tier (Claude Sonnet-class text plus a few cheap AI images) and **$0.60–1.70 (2.3–6.4 SAR)** at a premium tier (Opus-class text plus 8 high-quality AI images). Images, not text, drive cost at the higher tiers.

### Cited Findings
**LLM prices (per million tokens, input/output)**
- Claude (BenchLM, July 2026): Opus 4.8 $5/$25; Sonnet 5 $3/$15 (intro price $2/$10 through Aug 31, 2026); Haiku 4.5 $1/$5; "Claude Fable 5" (Mythos class) $10/$50. Earlier 2026 sources list Opus 4.6 $5/$25, Sonnet 4.6 $3/$15 and Haiku 4.5 $1/$5. — [BenchLM Anthropic pricing hub](https://benchlm.ai/anthropic/api-pricing); [MorphLLM, Mar 2026](https://www.morphllm.com/anthropic-claude-api-pricing); [Finout 2026](https://finout.io/blog/claude-pricing-in-2026-for-individuals-organizations-and-developers)
- The Claude Batch API gives a flat 50% discount, and prompt caching cuts repeated input cost by up to about 90%. — [MetaCTO](https://metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration); [cut-the-saas](https://cut-the-saas.com/the-cut/claude-api-pricing)
- OpenAI (aggregators, May–Jul 2026): GPT-5 about $1.25/$10 (cached input $0.125); GPT-5 mini $0.25/$2; GPT-5.5 $5/$30. Sources conflict, and none is OpenAI's own page. — [modelcompare.dev, 2026-05-12](https://modelcompare.dev/pricing/openai-api-pricing); [gptprompts.ai](https://gptprompts.ai/openai-api-pricing); [costbench](https://www.costbench.com/software/llm-api-providers/openai-api/)
- Gemini (aggregators, 2026): 2.5 Flash $0.30/$2.50 (flat rate); 2.5 Pro $1.25/$10 up to 200K context ($2.50/$15 above that); 3.1 Pro input $2.00 up to 200K. — [MorphLLM Gemini pricing](https://www.morphllm.com/gemini-api-pricing); [deploybase](https://deploybase.ai/articles/gemini-api-pricing-2026); [BenchLM Gemini](https://benchlm.ai/blog/posts/gemini-api-pricing)

**Arabic quality of the LLM options**
- ALLaM 7B (SDAIA) is reported as the strongest open Arabic model, scoring 72–74% on AraLingBench vs 40–62% for Qwen2.5 7B. Its weights are Apache 2.0 and it runs on Ollama. ALLaM 34B is proprietary with no public weights. — [PromptQuorum (secondary)](https://www.promptquorum.com/local-llms/best-saudi-arabic-local-llms-allam-2026)
- Jais (Core42/G42, 13B/70B) is described as still competitive on dialect tasks. Qwen is the strongest general multilingual open family but trails Arabic-specialised models on cultural and dialect tasks. A large Qwen variant is cited at a 0.786 mean on HELM Arabic. — [PromptQuorum Arabic local LLMs](https://www.promptquorum.com/local-llms/best-arabic-local-llms-2026)

**Image prices (per image)**
- gpt-image-1 (1024x1024): $0.011 low, $0.042 medium, $0.167 high. gpt-image-1.5: about $0.009, $0.034, $0.133. gpt-image-1 retires on **Oct 23, 2026**, so do not build on it. gpt-image-1-mini starts at about $0.005. — [apicostcalc](https://apicostcalc.com/blog/image-generation-cost-flux-vs-dalle-vs-gpt-image.html); [invideo, Aug 2026](https://invideo.io/blog/ai-image-model-pricing/); [pricepertoken](https://pricepertoken.com/gpt-image-pricing)
- FLUX.1 [schnell] on fal and Replicate: about $0.003 per image. FLUX 2 klein/Schnell: about $0.014–0.015. FLUX 2 Dev: about $0.025. — [apicostcalc](https://apicostcalc.com/blog/image-generation-cost-flux-vs-dalle-vs-gpt-image.html); [laozhang comparison](https://blog.laozhang.ai/en/posts/ai-image-generation-api-comparison-2026)
- Google: Imagen 4 Fast about $0.02 per image (single source, unverified). Gemini 2.5 Flash Image ("Nano Banana") $0.039 per 1024x1024 image (1,290 output tokens). Batch gives 50% off. — [laozhang cheapest Gemini image](https://blog.laozhang.ai/en/posts/cheapest-gemini-image-generation-api); [pricepertoken Gemini image](https://pricepertoken.com/pricing-page/model/google-gemini-2.5-flash-image-preview)
- Stock photos: Unsplash and Pexels images are free for commercial use. The Unsplash API requires hotlinking the returned `photo.urls` and attributing the photographer and Unsplash with links. Pexels forbids use in trademarks or logos and reportedly asks API users to link back. — [Unsplash API guidelines](https://help.unsplash.com/api-guidelines/unsplash-api-guidelines); [laozhang free image API](https://blog.laozhang.ai/en/posts/free-image-api); [licenseorg](https://licenseorg.com/blog/unsplash-license-attribution-required)

### Inferences
**Token model per deck (estimate).** One outline call plus one structured-JSON slide-content call for 12 slides, with a share of regenerations:

| Item | Assumed tokens |
|---|---|
| Input (system prompt, schema, brief, outline) | ~10,000 |
| Output (outline, then about 500–700 Arabic tokens per slide incl. speaker notes) | ~10,000 |

Arabic text uses roughly 1.3–2x more tokens than equivalent English on most tokenizers. That ratio is an estimate and was not verified in this session.

**Text cost per deck at 10k input + 10k output (estimate):**

| Model | USD per deck | SAR per deck |
|---|---|---|
| GPT-5 mini | ~$0.023 | 0.08 |
| Gemini 2.5 Flash | ~$0.028 | 0.10 |
| Claude Haiku 4.5 | ~$0.06 | 0.23 |
| GPT-5 | ~$0.11 | 0.42 |
| Claude Sonnet 5 / 4.6 ($3/$15) | ~$0.18 | 0.68 |
| Claude Opus 4.8 | ~$0.30 | 1.13 |

Caching the system prompt and schema cuts input cost further. Batch pricing does not suit interactive generation.

**Blended per-deck cost by tier (estimate):**

| Tier | Text model | Images | Compute/export | USD per deck | SAR per deck |
|---|---|---|---|---|---|
| Economy | Gemini Flash / GPT-5 mini | stock only ($0) | ~$0.005 | **~$0.03–0.04** | **~0.11–0.15** |
| Standard | Sonnet-class | 4 FLUX/Imagen Fast at ~$0.003–0.02 (≈$0.01–0.08) + stock | ~$0.01 | **~$0.20–0.27** | **~0.75–1.0** |
| Premium | Opus-class | 8 Nano Banana / gpt-image-1.5 medium at ~$0.034–0.039 (≈$0.30) | ~$0.01 | **~$0.60–0.65** | **~2.3–2.4** |
| Ultra | Opus-class | 8 gpt-image high at ~$0.133–0.167 (≈$1.1–1.3) | ~$0.01 | **~$1.45–1.65** | **~5.4–6.2** |

- Compute and export cost (headless Chromium for PDF, a Node/Python worker for PPTX) is an estimate of fractions of a cent per deck on serverless or a small VM. No source was found.
- **Recommended mix (inference):** draft with a cheap model (Gemini Flash or Haiku). Write the final Arabic copy with a Sonnet-class model, which keeps text cost under about $0.20. Default to stock photos, with AI images as a paid add-on. This keeps the median cost per deck under about $0.10–0.25.
- Open models (ALLaM 7B, Qwen, Jais) only pay off at very high volume or under strict residency requirements. A self-hosted GPU (about $1–2.5/hour for an L4/A10-class card, an estimate not sourced here) costs more than API calls at fewer than about 100k decks per month. A 7B model is also likely to give weaker long-form Arabic slide copy than frontier APIs (inference: no head-to-head benchmark was found).

### Gaps
- Official, dated prices could not be fetched from anthropic.com, openai.com or ai.google.dev (DNS failure in this session). All LLM and image prices are from aggregators and should be re-checked.
- No primary benchmark directly comparing Claude, GPT and Gemini on Arabic generation quality was found. The ALLaM/Jais/Qwen figures come from a single secondary blog.
- No measured Arabic-vs-English token inflation ratio for current tokenizers was found.
- No official Pexels API terms were retrieved, and the Imagen 4 standard (non-Fast) per-image price was not found.

## Which PPTX generation libraries produce correct RTL Arabic (rtl attribute, alignment, bullets, numbers), and known pitfalls?

### Takeaway
Correct RTL in PPTX comes down to a handful of OOXML attributes: `rtl="1"` plus `algn="r"` on each paragraph's `a:pPr`, `rtlCol="1"` on `a:bodyPr`, `lang="ar-SA"` on runs, and an Arabic-capable font set for the complex script (`a:cs`). Any library works if you control those attributes. PptxGenJS (what this repo uses) has an `rtlMode` option, and python-pptx needs lxml-level XML edits. Gamma's own PPTX export has public bug reports about broken RTL, which makes correct RTL a real differentiator.

### Cited Findings
- **PowerPoint behaviour:** PowerPoint right-aligns RTL paragraphs when they carry `algn="r"` together with `rtl="1"`. Tools that drop or mishandle these attributes produce wrong output. — [Okapi issue #927](https://gitlab.com/okapiframework/okapi/-/issues/927)
- **Gamma's RTL export bug:** Gamma's export sets `rtlCol="0"` on text bodies where it should be `rtlCol="1"`, and tags every run `lang="en-US"` even for Hebrew text. Fixing those attributes by hand made the deck render correctly. Fonts without the right glyphs also break rendering when PowerPoint substitutes a fallback. A separate Persian RTL export bug report exists too. — [Gamma ideas: Hebrew RTL export bug](https://ideas.gamma.app/ideas/p/pptx-export-bug-hebrew-rtl-text-renders-incorrectly); [Gamma ideas: Persian RTL export](https://ideas.gamma.app/ideas/p/issue-with-rtl-text-direction-in-powerpoint-export-persian-1) (summarised from search results; direct fetch failed)
- **Bullets and mixed text:** in bullet mode the paragraph RTL setting decides which side the bullet sits on. Text direction can still follow the first strong character, which garbles mixed Arabic/English bullets. — [Apache OpenOffice issue 105347](https://bz-he-de.apache.org/ooo/show_bug.cgi?id=105347)
- **LibreOffice:** it historically dropped the paragraph `rtl` attribute on PPTX export (fixed under tdf#90673). This matters if LibreOffice is used for PPTX-to-PDF conversion or thumbnails. — [LibreOffice bug 90673](https://www.libreoffice.org/bugzilla/show_bug.cgi?id=90673)
- **Aspose.Slides:** forum threads report a right-to-left paragraph setting that had no effect in the saved PPTX, filed as a library issue. RTL support exists but has had bugs. — [Aspose forum: RTL for ParagraphEx](https://forum.aspose.com/t/right-to-left-feature-for-paragraphex/79047); [Aspose forum: RTL text](https://forum.aspose.com/t/is-rtl-text-operation-available-with-aspose-slides/201637)
- **Aspose.Slides pricing (reseller list):** Developer Small Business $1,371 (one developer, one location; **SaaS and public websites are not allowed**). Developer OEM $4,113 (required for SaaS). Site Small Business $6,855. — [ComponentSource Aspose.Slides family prices](https://www.componentsource.com/product/aspose-slides-product-family/prices)
- **PptxGenJS:** third-party skills that generate Hebrew/Arabic PPTX with PptxGenJS set `rtlMode: true` on text options (and on the presentation) with right alignment. Not confirmed against the PptxGenJS type definitions. — [Hebrew document generator skill](https://skillselion.com/skills/skills-il/localization/hebrew-document-generator); [html-to-pptx skill](https://skillselion.com/skills/aviz85/claude-skills-library/html-to-pptx)
- **Repo evidence (this project):** `/home/user/Mohinxhuw/generator/` builds decks from code with `pptxgenjs ^4.0.1` (package.json). `post.py` then post-processes the OOXML: it swaps theme colour schemes, re-points hex colours to theme slots, and attaches SVG originals to icons. So the founder's pipeline already does library generation plus raw-XML patching, which is the same technique RTL and animation fixes need. A grep of the current repo found no `rtl`, `p:timing` or animation code, so the Arabic RTL and animation work the brief mentions is not in this checkout (it may live elsewhere). — local files `/home/user/Mohinxhuw/generator/package.json`, `/home/user/Mohinxhuw/generator/post.py`
- **python-pptx:** search found no first-party RTL API. The usual approach is setting `rtl="1"` and `algn="r"` on `a:pPr` through lxml (search-result inference). — [Okapi #1329](https://gitlab.com/okapiframework/okapi/-/issues/1329)

### Inferences
**RTL checklist for whichever library is used (inference from the findings above):**
1. Set `a:pPr rtl="1" algn="r"` on every paragraph, including table cells and chart labels.
2. Set `a:bodyPr rtlCol="1"` on text bodies.
3. Set `a:rPr lang="ar-SA"` and give runs an `a:cs typeface="..."` with an Arabic font. Theme `<a:cs>` / `<a:font script="Arab">` entries should also name an Arabic font.
4. Pick bullet characters that look right in RTL, and use Arabic numbering autonumber schemes (`arabicPeriod` / `hindiNumParenR` etc.) if Eastern Arabic digits are wanted.
5. Mirror layouts: image and text column order, chevrons and arrow icons, progress bars, and chart axes. Charts need `c:txPr` RTL settings plus possibly reversed category order.
6. Wrap Latin words, numbers and percentages in mixed bullets as separate runs. Test that "%" and currency signs land on the correct side.
7. Embed or specify fonts the viewer will actually have. PowerPoint does not reliably embed OFL web fonts from generated files, so either embed them (complex) or fall back to system Arabic fonts (Arial, Segoe UI, Sakkal Majalla) in exported PPTX.

**Library choice (inference):**
- **PptxGenJS (MIT, free):** best fit for a JS/Next.js stack and already in use. Use `rtlMode` plus a `post.py`-style XML patch pass for anything it misses (rtlCol, lang, cs fonts, animations).
- **python-pptx (MIT, free):** fine for a Python worker. All RTL handling is via lxml.
- **Aspose.Slides:** the most complete (PPTX to PDF/PNG rendering included), but SaaS use needs the about $4.1k OEM licence, and it has its own RTL bug history. Worth it mainly for high-fidelity PDF and thumbnail rendering without LibreOffice.
- **Google Slides API:** free with quotas and gives "Open in Google Slides". RTL is per-paragraph `direction: RIGHT_TO_LEFT` (from prior knowledge, not verified in this session). It adds OAuth scopes and Drive storage per user.
- **PDF export:** render the web (HTML/CSS) version with headless Chromium (Puppeteer/Playwright). Browser HarfBuzz shaping handles Arabic joining and bidi correctly. Avoid PPTX-to-PDF via LibreOffice for Arabic unless tested.
- **Web editor:** HTML/CSS with `dir="rtl"`, CSS logical properties (`margin-inline-start`) and `unicode-bidi: isolate` for mixed runs gives correct shaping for free. A contenteditable framework such as TipTap/ProseMirror or Lexical needs RTL testing for caret movement and lists (inference, not sourced).

### Gaps
- PptxGenJS's `rtlMode` and `lang` options were not confirmed against its source or type definitions. GitHub issue history on PptxGenJS RTL was not retrieved.
- Google Slides API RTL behaviour and quotas were not verified in this session.
- The official Aspose price page was not retrieved (reseller prices only).
- No source covered PowerPoint's handling of embedded OFL Arabic fonts in generated PPTX.

## Arabic fonts for commercial embedding

### Takeaway
Tajawal, Cairo, Almarai and IBM Plex Sans Arabic are all under the SIL Open Font License 1.1. They are free for commercial use, web embedding and PDF/PPTX embedding. The only restrictions are not selling the font on its own and keeping the licence text with any redistribution.

### Cited Findings
- Cairo is licensed under SIL OFL 1.1 (official repo). — [Cairo GitHub](https://github.com/Gue3bara/Cairo)
- Tajawal (Boutros Fonts) is OFL 1.1 and usable commercially. — [Google Fonts Tajawal](https://fonts.google.com/specimen/Tajawal/about); [online-fonts Tajawal](https://online-fonts.com/fonts/tajawal)
- Almarai is open source (Adobe Fonts) and listed as OFL 1.1. — [Adobe Fonts Almarai](https://fonts.adobe.com/fonts/almarai); [online-fonts Almarai](https://online-fonts.com/fonts/almarai)
- IBM Plex Sans Arabic is listed as OFL 1.1. — [online-fonts IBM Plex Sans Arabic](https://online-fonts.com/fonts/ibm-plex-sans-arabic)
- OFL terms: include the licence and copyright notice when redistributing. Modified versions must stay under OFL. Selling the font standalone is prohibited. — summarised in [search results incl. Google Fonts pages](https://fonts.google.com/specimen/Tajawal/about)

### Inferences
- Self-host the WOFF2 files with OFL.txt for the web app and embed subsets in PDFs. Reserved Font Names may block renaming a modified subset, so check each OFL.txt. Other likely OFL Google Fonts options include Noto Sans/Naskh Arabic, Readex Pro, Rubik and Changa (from prior knowledge, not verified here).

### Gaps
- The Reserved Font Name clauses of each family were not checked.

## What would an MVP cost to build via (a) no-code/AI-assisted solo build, (b) freelance developers in Saudi/Egypt/Jordan (rates on Upwork/Mostaql), (c) a local agency? Timeline estimates.

### Takeaway
An AI-assisted solo build by the founder costs mainly time (about 2–4 months) plus about $100–500/month in tools and APIs. Freelancers cost roughly $15k–60k depending on country. Agencies likely cost $40k–150k+. Hard Mostaql and agency data was thin, so most ranges are estimates.

### Cited Findings
- **Middle East freelance rates (2026 index):** all-skills median $65/hour; UAE $70/hour; Saudi Arabia $60/hour. Software developers: $85/hour global median, $25–250 range. The index itself says its figures are estimates. — [Jobbers.io Global Freelance Hourly Rate Index 2026](https://www.jobbers.io/the-global-freelance-hourly-rate-index-2026-real-rates-by-skill-country-and-experience-level/)
- **Arc.dev 2026 regional averages:** Africa $25–60/hour; South Asia $22–55/hour. Egypt and Jordan are not broken out. — [Arc.dev freelance developer cost 2026](https://arc.dev/employer-blog/freelance-developers-cost/)
- **Upwork fees:** Upwork adds a 5–10% client marketplace fee (competitor source). — [goLance](https://golance.com/hiring/best-freelance-php-developers-hourly-rate)
- **Mostaql:** sample projects (simple sites with a dashboard) budget $50–100 over 5–10 days. No SaaS-scale averages were found. — [Mostaql web developers](https://mostaql.com/freelancers/skill/web-development); [Mostaql project 253166](https://mostaql.com/project/253166)
- **Custom backend work:** freelancers or agencies typically charge $3,000–30,000 (generic). — [Hostinger web app cost 2026](https://www.hostinger.com/ae/tutorials/?p=583)

### Inferences
**MVP scope assumed:** auth, prompt to outline to deck generation, an RTL web editor with about 10 themes, PPTX and PDF export, a stock plus AI image picker, payments and quotas, and an admin panel. This is about **600–1,000 developer-hours (estimate)**.

**(a) Solo, AI-assisted (founder plus Claude Code/Cursor).** The founder already has a code-driven PPTX pipeline (`generator/`), which removes the riskiest piece. Building on a Next.js + Supabase starter:
- Cash: about $1k–3k (estimate) for AI coding tools, API testing and a design template.
- Timeline: about 8–14 weeks (estimate) to a usable MVP.
- Pure no-code tools such as Bubble or FlutterFlow fit poorly, because PPTX generation needs a code worker.

**(b) Freelancers** (two developers, e.g. full-stack plus a PPTX/RTL specialist; all figures estimates):

| Country | Assumed rate | Total at 600–1,000 hours | Notes |
|---|---|---|---|
| Egypt/Jordan | $15–35/hour (assumed from Arc's Africa band and the Middle East index; not country-specific) | ~$9k–35k | Could not verify these rates on Mostaql or Upwork |
| Saudi Arabia | ~$60/hour (Jobbers index) | ~$36k–60k | |

Timeline is about 3–5 months, and a 15–25% buffer should be added for QA and RTL fixes.

**(c) Saudi/GCC local agency:** about $40k–150k+ (≈150k–560k SAR), 4–6 months. This range is inferred from the Saudi hourly rate times agency overhead (1.5–2.5x). No direct agency quote was found.

### Gaps
- No reliable Mostaql or Upwork rate statistics exist for Egypt, Jordan or Saudi full-stack developers.
- No Saudi agency price lists were found.

## Monthly running costs at 1k, 10k, 50k active users

### Takeaway
At about 4 decks per active user per month (assumption), the AI bill dominates. It runs about **$150–1,000/month at 1k users**, **$1.5k–10k at 10k users** and **$7k–50k at 50k users**, depending on tier mix. Hosting (Vercel plus Supabase) is a small fraction until 50k users. In-Kingdom hosting is now possible on Google Cloud Dammam, with Azure Saudi due in Q4 2026.

### Cited Findings
- **Vercel Pro:** $20 per seat per month including $20 usage credit. 1 TB data transfer and 10M edge requests are included. Overages are metered, so set spend limits. — [MakerKit Vercel cost 2026](https://makerkit.dev/blog/saas/vercel-cost); [Schematic](https://schematichq.com/blog/vercel-pricing)
- **Supabase Pro:** $25/month per org, including a $10 compute credit (one Micro instance). Small instance $15/month, Medium $60/month. Pro does not scale to zero. — [MakerKit Supabase pricing](https://makerkit.dev/blog/saas/supabase-pricing); [Toolradar Supabase 2026](https://toolradar.com/blog/supabase-pricing-2026)
- **Google Cloud** operates a **Dammam** region. Vendors (Fivetran, Jun 2026; SentinelOne) host there for in-country data. — [Fivetran](https://www.fivetran.com/blog/fivetran-now-available-on-google-cloud-in-saudi-arabia); [SC World](https://www.scworld.com/brief/sentinelone-deploys-on-google-cloud-in-saudi-arabia)
- **AWS** has a $5.3B Saudi region planned for 2026 (launch not confirmed in sources). **Azure Saudi Arabia East** is due for production in Q4 2026 with three availability zones. — [MomentumX Saudi cloud guide 2026](https://momentumx.cloud/saudi-cloud-providers-2026/); [Tasrie IT Azure Saudi](https://tasrieit.com/blog/azure-saudi-arabia-region-q4-2026-launch-guide)
- **PDPL:** enforced since 14 Sep 2024. Personal data of Saudi residents should generally be stored and processed in the Kingdom unless cross-border transfer conditions (Art. 29 exceptions) are met. SAMA and NCA rules are stricter for regulated sectors. — [upgrowth Saudi SaaS compliance checklist](https://upgrowth.in/saudi-saas-compliance-checklist/); [MomentumX](https://momentumx.cloud/saudi-cloud-providers-2026/)

### Inferences
**Assumptions (estimates):**
- 4 decks per user per month: 1k users = 4k decks, 10k users = 40k decks, 50k users = 200k decks.
- "Blended" means 70% economy tier and 30% standard tier, about $0.09 per deck.

**Monthly cost by scale (estimates):**

| Monthly item | 1k users | 10k users | 50k users |
|---|---|---|---|
| AI, blended (~$0.09/deck) | ~$360 | ~$3,600 | ~$18,000 |
| AI, all standard tier (~$0.25/deck) | ~$1,000 | ~$10,000 | ~$50,000 |
| Hosting: Vercel Pro + Supabase Pro + compute/storage/egress | ~$60–150 | ~$300–800 (Supabase Medium/Large, image CDN, R2/S3 storage) | ~$1,500–4,000 (Vercel Enterprise or self-run on GCP Dammam) |
| Export workers (headless Chromium/PPTX) | ~$20–50 | ~$100–300 | ~$500–1,500 |
| Email, monitoring, error tracking, auth extras | ~$30–100 | ~$150–400 | ~$500–1,500 |
| **Total (blended)** | **~$470–700 (≈1.8–2.6k SAR)** | **~$4.2k–5.1k (≈16–19k SAR)** | **~$20.5k–25k (≈77–94k SAR)** |

Payment-processor fees (Moyasar, Tap, HyperPay, Stripe for non-KSA entities) sit on top as a percentage of revenue. Mada/Apple Pay support matters in KSA. Rates were not sourced here.

**Architecture recommendation (inference):**
- Next.js web app (RTL-first editor, slides stored as a JSON schema and rendered as HTML).
- Supabase (Postgres, Auth with email/Google/Apple, Storage).
- Queue plus worker (Node PptxGenJS + Python XML post-processor, Playwright for PDF).
- LLM gateway with provider fallback (Claude/Gemini/OpenAI) plus prompt caching.
- Unsplash/Pexels hotlinked plus FLUX/Imagen for AI images.

**Residency:**
- For B2C, Vercel plus Supabase in the nearest region (e.g. Frankfurt or Mumbai; Supabase has no KSA region as far as I know, unverified) is the fastest route.
- For government, enterprise or regulated customers, host the database and storage on GCP Dammam (or Azure KSA from Q4 2026). Route LLM calls through providers or regions that meet the transfer conditions. Vertex AI in Dammam or a self-hosted ALLaM are candidates (availability of specific models in me-central2 was not verified).
- Get Saudi legal review on PDPL transfer rules.

### Gaps
- No official Vercel or Supabase pricing pages were fetched (aggregator data only). Supabase and Vercel Saudi or Middle East region availability was not confirmed.
- AWS Saudi region launch status was not confirmed. Vertex AI and Gemini/Claude availability in the GCP Dammam region was not verified.
- Saudi payment gateway fee schedules (Moyasar, Tap, HyperPay), Mada support and Stripe KSA status were not researched in this session.
- Usage assumptions (decks per user, tier mix) are not benchmarked. No public data on Gamma or Tome usage per user was found.
