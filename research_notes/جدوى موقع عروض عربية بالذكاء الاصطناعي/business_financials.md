# Business-Model Benchmarks for an Arabic-First AI Presentation Generator (Saudi/GCC, as of Oct 2026)

Conversion rule used throughout: 1 USD = 3.75 SAR (pegged). All SAR figures are converted by this note's author unless the source quotes SAR directly. Prices exclude 15% Saudi VAT unless stated. Research note: several vendor pricing pages (gamma.app, beautiful.ai, presentations.ai, chartmogul.com, costbench.com) failed to load from the research environment (DNS errors), so competitor prices below come from search snippets of third-party trackers and competitor blogs. They conflict in places; flagged inline. Verify against the live pricing pages before finalising the model.

## Q1. What price points (monthly/annual, in SAR) are realistic for students vs. professionals vs. teams in Saudi?

### Takeaway
Global AI-presentation tools cluster at roughly USD 8–25/month for an individual paid tier (about 30–94 SAR), with annual billing roughly 20–70% cheaper per month, and team seats at about USD 40/user/month (about 150 SAR). Saudi consumer subscription anchors run from about 20 SAR/month (streaming) to about 100 SAR/month (ChatGPT Plus). That suggests about 19–29 SAR/month for students, 39–59 SAR/month for professionals, and 59–99 SAR/user/month for teams. These bands are an inference, not a measured Saudi benchmark. A strong competitive threat is free access to Adobe Express Premium for Saudi residents.

### Cited Findings
**Competitor pricing (USD → SAR)**
- **Gamma.** Prices conflict across trackers.
  - Presentations.AI's blog (a competitor, so treat with caution) lists Plus $12/mo, Pro $25/mo and Ultra $100/mo, with annual billing lowering the monthly rate. — [Presentations.AI blog](https://www.presentations.ai/blog/gamma-pricing)
  - Tekpon lists Plus $10, Pro $24 and Ultra $86 monthly. — [Tekpon](https://tekpon.com/software/gamma/pricing/)
  - CostBench lists Plus $10, Pro $20 and Ultra $100. — [CostBench](https://costbench.com/software/ai-presentations/gamma)
  - In SAR that is about 37.5–45 (Plus), 75–94 (Pro) and 322–375 (Ultra) per month.
- **Gamma credits.** Free users get 400 one-time credits. Paid plans refresh monthly, from 1,000 credits (Plus) to 20,000 (Ultra). — [CostBench free plan](https://costbench.com/software/ai-presentations/gamma/free-plan/); [eesel.ai](https://www.eesel.ai/en/blog/gamma-pricing)
- **Gamma plan changes.** One tracker reports an Aug 2026 pricing-page change: the Team tab was renamed Business and per-prompt card caps were removed on Pro and Ultra. This is unconfirmed by Gamma. — [Flexprice pricing index](https://flexprice.io/pricing-index/gamma)
- **Beautiful.ai.** Pro is about $12/mo billed annually (45 SAR) or $45 month-to-month (169 SAR), for a single user. Team is about $40/user/mo (150 SAR). There is no free plan, only a 14-day trial that needs a credit card and auto-renews to annual. — [Fast.io review 2026](https://fast.io/resources/beautiful-ai-review-2026/); [CostBench compare](https://costbench.com/compare/beautiful-ai-vs-slidesai/)
- **SlidesAI.** Free Basic tier. Pro is $10/user/mo (37.5 SAR) and Premium $20/user/mo (75 SAR); annual billing works out to about $8 (30 SAR) and $17 (64 SAR). The figures are inconsistent within the same source. — [CostBench compare](https://costbench.com/compare/beautiful-ai-vs-slidesai/)
- **Presentations.AI.** Free Starter tier. Pro is US$240/yr (about $20/mo, which is 900 SAR/yr or 75 SAR/mo). It localises prices by purchasing power across 130+ countries; its Saudi price is shown in USD. — [Presentations.AI pricing.md](https://www.presentations.ai/.well-known/pricing.md) (search snippet; the page itself did not load)
- **Canva Pro.** $18/mo or $180/yr for one person (67.5 SAR/mo, or 675 SAR/yr ≈ 56 SAR/mo), per a check of Canva's pricing page in Sept 2026. Canva prices some regions in local currency (Egypt in EGP). No Saudi SAR figure was found. — [Piktochart, Canva pricing 2026](https://piktochart.com/blog/canva-pricing-2026-costs-raised/); [Canva AR-EG pricing](https://www.canva.com/ar_eg/pricing/)

**Saudi consumer subscription anchors**
- **ChatGPT Plus in KSA.** About 99–100 SAR/month in 2026, depending on taxes and app-store versus web billing. This comes from a reseller, so it is unverified. — [GlobalGPT guide](https://www.glbgpt.com/hub/de/chatgpt-plus-subscription-price-in-saudi-arabia-2026-guide/)
- **Shahid VIP.** About SAR 19.99/month; the Sports tier is about SAR 39/month. The source is an unofficial aggregator and is unclear on monthly versus annual billing. — [Subger](https://subger.com/fi/my/service/shahid-vip)
- **Adobe / HUMAIN deal.** Saudi residents can get 12 months of free Adobe Firefly Standard plus Adobe Express Premium features through the National Access Programme. That directly lowers willingness to pay for design and presentation AI. — [Zawya](https://www.zawya.com/en/business/ai-shaping-digital-future/adobe-to-offer-free-access-to-ai-tools-in-saudi-arabia-in-4bln-deal-472637); [Adobe SA](https://www.adobe.com/sa_en/products/firefly/partner-models/humain.html)
- **Local Arabic competitor.** Tawkeed (a Saudi platform) lists "Tawkeed Slides", which generates Arabic presentations from documents and briefs. No pricing was found. — [Tawkeed README](https://tawkeed-sa-readme.static.hf.space/README.md)

### Inferences
- **Students.** Proposed anchor is about 19–29 SAR/month or 149–199 SAR/year: near Shahid VIP and below Gamma Plus and SlidesAI Pro (30–45 SAR). Students are price-sensitive and have free alternatives (Canva Education, the Adobe Express free year). A semester pass of about 79–99 SAR fits academic cycles. *(Estimate)*
- **Professionals.** Proposed anchor is about 39–59 SAR/month or 349–499 SAR/year: in line with Gamma Plus/Pro, Beautiful.ai annual and Canva Pro annual, and well below ChatGPT Plus (about 100 SAR). Arabic RTL quality is the justification for parity with global tools. *(Estimate)*
- **Teams/SMEs.** Proposed anchor is about 59–99 SAR/user/month, with a 3–5 seat minimum, against Beautiful.ai Team at about 150 SAR. Add brand kits, Arabic templates for government-style decks, and ZATCA-compliant invoicing. *(Estimate)*
- **Price display.** Show SAR prices VAT-inclusive, since consumer law in KSA generally expects that. Offer a large annual discount (30–40%) in line with market practice: Beautiful.ai's monthly price is about 3.75 times its effective annual rate.

### Gaps
- No official SAR prices were found for Gamma, Canva or Beautiful.ai in KSA, and no confirmation of whether these vendors apply purchasing-power discounts for KSA. Saudi is high-income, so a discount is unlikely.
- No Saudi willingness-to-pay survey for productivity SaaS was found. A Van Westendorp survey with target users is recommended.
- No official Anghami or Shahid student prices were found.

## Q2. What conversion, churn and CAC numbers should be assumed?

### Takeaway
Base-case assumptions are 2–4% freemium-to-paid (with an 8–10% upside if a trial or hard paywall is used), monthly churn of 6–10% for consumer and student plans and 3–5% for professional and SMB plans, and paid-social CPMs in KSA of roughly 6–15 SAR. Benchmarks show AI apps convert better but churn about 30% faster than non-AI apps. KSA-specific CAC data is essentially unpublished, so CAC must be modelled bottom-up from CPM, CTR and conversion.

### Cited Findings
**Conversion**
- **Freemium self-serve.** Typically 3–5% conversion, with exceptional products at 6–8%. Classic freemium sees 13.3% visitor-to-freemium but only 2.6% freemium-to-paid. This is secondary data citing FirstPageSage with unclear methodology. — [CrazyEgg](https://www.crazyegg.com/blog/free-to-paid-conversion-rate/)
- **B2B free trials.** ChartMogul / Kyle Poyar / ProductLed (200 B2B products) found a median free-to-paid trial conversion of 8%. 20% of trial products convert below 2.5%, and there is a 10x gap between the top and bottom 20%. — [ChartMogul Conversion Report](https://chartmogul.com/reports/saas-conversion-report/) (via search snippet)
- **RevenueCat State of Subscription Apps 2026** (115k+ mostly mobile B2C apps, 2025 data):
  - AI apps convert trials to paid at a median of 8.5%, versus 5.6% for non-AI apps. — [PPC Land](https://ppc.land/ai-apps-earn-41-more-per-user-but-churn-30-faster-revenuecat-finds/); [TechCrunch](https://techcrunch.com/2026/03/10/ai-powered-apps-struggle-with-long-term-retention-new-report-shows)
  - By day 35, hard paywalls convert 10.7% versus 2.1% for freemium, with nearly identical year-one retention. — [SaaStr summary](https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth)
  - Trials of 17–32 days convert at a 42.5% median (trial-start to paid), versus 25.5% for trials under 4 days. — same source

**Churn and retention**
- **AI apps versus non-AI (RevenueCat 2026).** AI apps churn annual subscriptions about 30% faster at the median, while earning about 41% more revenue per payer. — [PPC Land](https://ppc.land/ai-apps-earn-41-more-per-user-but-churn-30-faster-revenuecat-finds/)
- **Annual and monthly-plan retention.** Annual retention is 21.1% for AI apps versus 30.7% for non-AI. For monthly plans, retention (at 12 months) is 6.1% for AI apps versus 9.5% for non-AI. — [TechCrunch](https://techcrunch.com/2026/03/10/ai-powered-apps-struggle-with-long-term-retention-new-report-shows); [Computing UK](https://www.computing.co.uk/news/2026/ai-powered-apps-struggle-retain-subscribers)
- **Monthly churn.** Reported at 3.5% for B2B platforms versus 4.04% for B2C. The original source is unclear, so treat this as weak. — [Arcade](https://blog.arcade.dev/user-retention-in-ai-platforms-metrics)
- **a16z framework.** Measure AI retention from Month 3, not Month 0, because early churn is dominated by "AI tourists". M12 retention shows how committed customers persist. — [a16z AI retention benchmarks](https://a16z.com/ai-retention-benchmarks/)

**Ad costs and channels in KSA**
- **Snapchat/TikTok CPM.** A Saudi marketing guide gives about 6–15 SAR CPM, with a second range of 5–12 SAR, without clearly labelling which platform each applies to. Treat as unverified. — [aismartprompts](https://aismartprompts.com/articles/snapchat-tiktok-marketing-saudi-business-guide)
- **Snapchat, global (Jun 2026).** Median CPM about $5.84 (22 SAR) for awareness and $11.20 (42 SAR) for traffic, with a median CPC about $0.84 (3.15 SAR); conversion-objective CPMs reach up to $27.10. — [Hack'celeration](https://hackceleration.com/labs/snapchat-pricing)
- **TikTok, global.** One benchmark puts CPM at $6.50–10 (median $8, which is 30 SAR) and CPC at $0.50–1.50 (average $0.80, which is 3 SAR). — [ttcalculator](https://ttcalculator.net/data/earnings/tiktok-advertising-rates-benchmarks/)
- **TikTok, 2025 global average CPM.** $13.26, up 16% from $11.43 in 2024 (Triple Whale-sourced). — [Triple Whale](https://www.triplewhale.com/blog/tiktok-cpm.md)
- **Snapchat reach in KSA.** Over 90% of 13–34-year-olds, with addressable monthly reach above 25M (a Snap-linked dentsu study, so partly promotional). Older Snap figures were 19.5M–21.15M. — [Campaign ME](https://campaignme.com/does-snap-hold-attention-boost-recall-lift-brand-choice-in-saudi-arabia/); [CairoScene](https://cairoscene.com/Buzz/Snapchat-Reports-Saudi-Arabia-as-One-of-Its-Fastest-Growing-Markets)
- **Google Ads.** No KSA-specific CPC was found.
  - The only data point is old: WordStream (2015) put Saudi average CPC about 60% below the US. — [WordStream](https://www.wordstream.com/blog/ws/2015/07/06/average-cost-per-click)
  - Global H1 2026 median search CPC is $1.61 (about 6 SAR) across 148 accounts. — [Synter Media](https://syntermedia.ai/benchmarks/2026-h1/google-ads/cpc)
  - A typical global range is $2–4. — [WebFX](https://www.webfx.com/blog/ppc/google-ads-benchmarks/)

### Inferences
**Base-case assumptions for the model** *(all estimates)*
- **Freemium-to-paid conversion** of registered users: conservative 2%, base 3–4%, optimistic 6%. Exam and graduation-project season will cause spikes.
- **Monthly churn:**
  - Student monthly plans: 10–15% (strong seasonality; expect summer drop-off).
  - Professional plans: 5–7%.
  - Team plans: 2–4%.
  - Annual plans: model as roughly 70–80% non-renewal at year end for AI consumer users, per RevenueCat's annual retention of 21%.
- **Paid acquisition:**
  - Funnel: KSA CPM about 10–20 SAR → CTR about 1% → CPC about 1–2 SAR → signup rate about 15–25% → cost per signup about 5–13 SAR.
  - At 3% conversion, blended paid CAC per paying customer is about 170–430 SAR.
  - Payback at a 39 SAR ARPU and about 60% gross margin is roughly 7–18 months.
  - So organic and viral channels must dominate: watermark/share-links, TikTok/Snap creators, university ambassadors, and SEO for Arabic queries such as "عرض بوربوينت" and "بوربوينت جاهز".
- **Channel fit:** Snapchat and TikTok suit students and Gen Z. X and LinkedIn suit professionals and government-sector employees. Google Search captures intent such as "تصميم عرض تقديمي".

### Gaps
- No primary KSA CPM/CPC data from Snap, TikTok or Google was found; advertiser-account estimates or agency quotes are needed.
- No published CAC benchmarks for Saudi SaaS were found.
- No KSA-specific conversion or churn data was found; RevenueCat data is mobile/app-store B2C and may differ for web SaaS.
- The ChartMogul primary report could not be fetched to verify freemium (versus trial) figures.

## Q3. What are typical gross margins for AI-generation SaaS given model costs?

### Takeaway
AI-native products run gross margins of about 45–60%, compared with 75–90% for classic SaaS. Hyper-growth "thin wrapper" apps sit near 25% or even negative. Inference averages about 23% of revenue at scaling-stage AI B2B companies. An AI presentation generator should plan on 50–65% gross margin, which requires credit caps, model routing and caching.

### Cited Findings
- **ICONIQ State of AI 2026 (survey of 300+ execs).**
  - Average AI-product gross margin was 45% in 2025, projected at 53% in 2026 and 59% in 2027. Other write-ups cite 52% for 2026, up from 41% in 2024. The discrepancy is unresolved, and the figures are self-reported. — [SaaStr ICONIQ summary](https://saastr.com/the-builders-economy-10-metrics-from-iconiqs-newest-2026-state-of-ai-report); [SoftwareSeni](https://www.softwareseni.com/why-ai-gross-margins-are-so-much-lower-than-saas-and-what-that-means-for-your-business/)
  - Inference averages about 23% of revenue at scaling-stage AI B2B companies, and 84% of those companies saw gross margins erode by 6 points or more from AI infrastructure costs. — [SaaStr](https://www.saastr.com/have-ai-gross-margins-really-turned-the-corner-the-real-math-behind-openais-70-compute-margin-and-why-b2b-startups-are-still-running-on-a-treadmill)
- **Bessemer State of AI 2025.** "Supernovas" average about 25% gross margin (often negative), while "Shooting Stars" average about 60%. Bessemer warns that apps close to foundation-model functionality risk "thin wrapper" labels and low switching costs. — [SaaStr](https://www.saastr.com/have-ai-gross-margins-really-turned-the-corner-the-real-math-behind-openais-70-compute-margin-and-why-b2b-startups-are-still-running-on-a-treadmill); [Next Big Teng](https://nextbigteng.substack.com/p/much-ado-about-margins-ai-gross-margin-debate)
- **Bessemer (Feb 2026, as reported).** Typical AI gross margins of 50–60%, versus 80–90% for traditional SaaS. — [Rework](https://resources.rework.com/libraries/ai-startup-growth/ai-vs-saas-gross-margins)
- **Accounting treatment.** LLM API costs belong in COGS. One anecdote: a reported 91% margin fell to 58% once inference was reclassified. — [Beancount](https://beancount.io/blog/2026/07/13/llm-api-cost-cogs-ai-wrapper-gross-margin-guide)
- **Credit models in the category.** Gamma uses monthly credit allowances (1,000 to 20,000 by tier, 400 one-time free credits). This is the category norm for capping inference cost. — [eesel.ai](https://www.eesel.ai/en/blog/gamma-pricing)

### Inferences
- **Model base case** *(estimate)*: COGS of 25–40% of revenue, made up of LLM text, image generation, hosting and payment fees. Payment fees run about 2–3% via mada/Apple Pay, or 15–30% if billed through app stores.
- **Margin target:** 55–65% gross margin. Image generation per slide is the main cost risk.
- **Cost controls:**
  - Cap free usage (for example, 3–5 decks a month or a fixed number of credits).
  - Route outline drafting to cheap models.
  - Use template-based rendering rather than generating every visual.
  - Sell credit top-ups (for example, 19 SAR for an extra pack) to monetise heavy users.
- **Data residency:** If sovereign hosting is required (PDPL, or government customers), local hosting on Saudi cloud or HUMAIN infrastructure may raise COGS versus US APIs. This is unquantified.

### Gaps
- No published per-deck inference cost for Gamma or peers was found. Unit cost should be measured with a prototype in tokens per deck, priced at current model rates.
- No primary ICONIQ or Bessemer PDF was fetched; the figures come from secondary summaries.

## Q4. Examples of Arab/Saudi AI SaaS startups, and B2B/education licensing models (including Etimad)

### Takeaway
Saudi AI startups that disclose funding are mostly enterprise and government-focused (Newera.ai, Deep.SA, Lucidya, Velents), and none disclose pricing or subscriber traction. A Saudi Arabic slide generator (Tawkeed Slides) already exists. Government and education buyers procure through Etimad, but no SaaS-licence-specific guidance was found.

### Cited Findings
- **Newera.ai** (Saudi, enterprise generative AI, founded 2023). Raised a $2.1M pre-seed led by Embark in Dec 2025; its strategy centres on data localisation in KSA. — [Wamda](https://www.wamda.com/en/2025/12/newera-ai-raises-2-1-million-pre-seed-scale-generative-ai-saudi-arabia)
- **Deep.SA.** Vision Ventures joined its pre-seed in Feb 2026, extending SAR 4.5M previously raised. It builds locally hosted AI for government and enterprise ("alPlatformai"). — [Wamda](https://www.wamda.com/index.php/2026/02/saudi-ai-startup-deepsa-brings-vision-ventures-pre-seed-round)
- **Velents** (Egyptian-Saudi). Closed a $1.5M round in Oct 2025, launched the Arabic AI employee "Agent.sa", and planned a $3M round in early 2026. — [Enterprise AM](https://enterpriseam.com/ksa/2025/10/29/egyptian-saudi-ai-startup-velents-secures-usd-1-5-mn-in-funding/)
- **Lucidya** (Saudi Arabic-NLP CX software). Raised a $30M Series B, described as the largest by an AI company in the kingdom; the date was not given in the source snippet. — [Communications Today](https://www.communicationstoday.co.in/?p=362351)
- **Tawkeed Slides.** A Saudi platform's Arabic presentation generation from documents and briefs; no pricing found. — [Tawkeed](https://tawkeed-sa-readme.static.hf.space/README.md)
- **Etimad and the Ministry of Education.**
  - The Ministry conducts its competitions and purchases through Etimad, under the Government Tenders and Procurement Law. — [MoE](https://moe.gov.sa/en/knowledgecenter/projectsinitiatives/Pages/competitionsandpurchases.aspx); [HRSD](https://www.hrsd.gov.sa/am/node/69886)
  - Etimad handles bid examination, e-awarding and RFP purchases. — [Saudipedia](https://saudipedia.com/en/etimad-platform)
  - GASTAT's planned tenders include a database subscription, which shows that subscriptions are procurable through Etimad. — [GASTAT](https://stats.gov.sa/en/node/142696)
- **Competing free offers to institutions and residents.** The Adobe/HUMAIN National Access Programme gives 12 months of free Adobe Express Premium and Firefly Standard. — [Zawya](https://www.zawya.com/en/business/ai-shaping-digital-future/adobe-to-offer-free-access-to-ai-tools-in-saudi-arabia-in-4bln-deal-472637)

### Inferences
- **Licensing models to model** *(estimates)*:
  - University site licence priced per student per year. Indicatively 20–50 SAR/student/year at scale, or a flat fee of 50k–300k SAR per university.
  - Per-teacher school licence of about 100–200 SAR/teacher/year.
  - Government-entity enterprise contracts through Etimad, requiring commercial registration (CR), a Saudization/local-content position, and possibly data hosted in KSA.
- **Sales cycle:** B2G and B2E deals have long cycles of 6–12 months or more. Treat them as Year 2+ revenue in the break-even model, not launch revenue.
- **Positioning:** Local competitors focus on enterprise; Tawkeed Slides is the closest analog. Differentiation should be Arabic typographic and RTL quality, Saudi government deck styles, and local payment methods (mada, STC Pay, Tabby).

### Gaps
- No pricing or traction (users, MRR) was found for any Saudi or Arab AI SaaS startup.
- No MAGNiTT 2026 SaaS benchmark data was retrievable.
- No public Etimad tender for presentation or productivity SaaS was found, and no Ministry of Education or university licence prices.
- No data on Canva Education or Google Workspace for Education adoption in Saudi universities. These are free competitors in the education channel.
