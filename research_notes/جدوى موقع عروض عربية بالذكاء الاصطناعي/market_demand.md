# Market Size and Demand: Arabic-First AI Presentation Generator (Saudi, then GCC, then MENA), as of Oct 2026

Note: the Gamma ARR/user figures and Gamma's Arabic RTL problems are already covered in `research_notes/فرص السوق السعودي حسب القطاعات/digital_content.md`. This file verifies them and adds the rest. Search was done in English and Arabic. Search tooling could not open Google Trends, Similarweb country splits or YouTube counts (see Gaps).

## 1. Population of each segment (Saudi, then GCC, then MENA)

### Takeaway
In Saudi Arabia alone the core addressable population is about 10 million people: ~6.7M school students (most of them too young to be users), ~1.57M higher-education students, ~513K teachers, ~1.15-1.4M civil servants, ~2.46M Saudis plus ~9.8M non-Saudis on private-sector payroll, and ~1.3M SMEs. Internet penetration is 99%. Across the Arab States about 70% of people use the internet.

### Cited Findings
**Saudi: education**
- General education, 2024/25 school year: ~6.72M students, ~513K teachers (~291K women, ~222K men), ~36,800 schools, ~106K school administrative staff (Ministry of Education data, reported Oct 2024) — [Argaam](https://www.argaam.com/en/article/articledetail/id/1762550)
- Higher education: ~1.57M students enrolled, with an 83.88% tertiary enrollment rate in 2024 (UNESCO data, reported by Okaz) — [Okaz](https://www.okaz.com.sa/local/saudi-arabia/2242243). An Erasmus+ country profile gives 1,571,728 higher-education students but no year — [Erasmus+ Saudi profile (2024)](https://erasmus-networks.ec.europa.eu/system/files/2024-07/Saudi%20Arabia%20Country%20Profile.pdf)
- I found no GASTAT national total for higher education in 2024/25. GASTAT's GCC indicators report covers GCC citizens only — [GASTAT](https://stats.gov.sa/en/w/news/128)

**Saudi: government and private employees**
- Civil-service employees: 1,148,136 in Q1 2026, down from 1,191,830 in Q1 2025 (−43,694, which Al-Watan links to privatization). Another Al-Watan reading puts the total government workforce at ~1.40M in Q2 2025. A 2025 figure of ~1.18M (96.7% Saudi) shows education staff as the largest group at 460.9K. The numbers differ by scope — [Al-Watan](https://www.alwatan.com.sa/article/1182512); HRSD live data portal — [HRSD](https://www.hrsd.gov.sa/knowledge-centre/data-and-statistics/open-data/real-time-data/workforce-government-sector)
- Private sector, Q2 2025, GOSI register: 2,461,907 Saudis and 9,794,634 non-Saudis, 12,256,541 in total (GASTAT tables mirrored by GLMM) — [Gulf Migration/GASTAT](https://gulfmigration.grc.net/?p=11158). Many non-Saudis are in manual or blue-collar jobs, so office workers are a much smaller share (see Inferences).
- Labour market, Q2 2025: Saudi participation rate 49.2%, Saudi unemployment 6.8% — [GASTAT](https://stats.gov.sa/en/w/news/93)

**Saudi: SMEs**
- ~1.7M commercial registrations in Q2 2025, with 80K+ new ones that quarter. Registrations are not the same as firms. — [Arabian Business](https://www.arabianbusiness.com/culture-society/saudi-startups-raise-862m-as-80000-new-smes-launched-in-q2-2025); [Zawya](https://www.zawya.com/en/economy/gcc/monshaat-report-saudi-commercial-registrations-hit-17mln-hxxoyd1b)
- About 1.3M actual enterprises (Monsha'at observatory, cited in the Qoyod SME Report 2026). Arab News reported the same 1.3M at end-2023. — [Qoyod SME report 2026 (PDF)](https://www.qoyod.com/wp-content/uploads/2026/06/qoyod-sme-report-2026-en.pdf); [Arab News](https://arab.news/gfjy8)
- 38% of registrations are owned by youth and 47% by women — [Zawya](https://www.zawya.com/en/economy/gcc/monshaat-report-saudi-commercial-registrations-hit-17mln-hxxoyd1b)

**Saudi: internet**
- 34.4M internet users at end-2025, 99.0% penetration. 38.6M social-media identities (Oct 2025). Start-2025 figure was 33.9M. — [DataReportal Digital 2026 Saudi](https://datareportal.com/reports/digital-2026-saudi-arabia); [Digital 2025](https://datareportal.com/reports/digital-2025-saudi-arabia)

**GCC**
- UAE: 218,000+ higher-education students in 2025-26 (MoHESR). New intake in 2024-25 was 57,035 (+13%). — [Gulf Business 2026](https://gulfbusiness.com/en/2026/education-industry/218000-students-and-counting-whats-driving-the-uaes-university-boom/); [WAM](https://www.wam.ae/en/article/bmoi7mn-uae-higher-education-institutions-witness-past)
- I did not find comparable figures for Kuwait, Qatar, Bahrain or Oman (see Gaps).

**MENA / Arabic speakers**
- ITU's 2025 Arab States report: about 70% of people in the region use the internet, and 95% are covered by mobile broadband — [ITU via commbox](https://commbox.org/document/state-of-digital-development-and-trends-in-the-arab-states-region-challenges-and-opportunities)
- "400M+ Arabic speakers" is the target audience HUMAIN cites at launch. It is a marketing figure, not a census. — [Middle East AI News](https://www.middleeastainews.com/p/humain-chat-live-allam-34b-llm)
- The only "Arabic-speaking internet users" figures I found are old: 136M (around the mid-2010s) and 60M (ICANN 2010). Treat them as historical only. — [Gulf News](https://gulfnews.com/technology/arabic-still-face-challenges-in-online-access-1.1510177); [ICANN 2010](https://new.icann.org/en/news/presentations/egypt-opening-statement-24may10-en.pdf)

### Inferences
- **Saudi core users: ~4-5M people.** This is university students (1.57M) + teachers (0.51M) + civil servants (~1.15M) + the office-type share of Saudi private-sector workers (~1-1.5M of 2.46M, my assumption) + trainers and consultants. Older high-school students add roughly 1.5M more: about 3 of the 12 grades in a 6.7M student base, my estimate.
- **MENA internet users: roughly 320-340M.** This is my own calculation: 70% (ITU) × an Arab States population of about 470-480M. The population figure comes from my background knowledge and was not verified in this session.
- **GCC:** Saudi Arabia is probably about 60% of GCC citizens and students. The UAE adds ~218K university students. GCC-wide, a reasonable estimate is about 2.2-2.5M university students (my estimate, unverified for Kuwait, Qatar, Oman and Bahrain).

### Gaps
- No official 2025/26 Ministry of Education or GASTAT total for higher education or general education. The latest confirmed figures are 2024/25.
- No official count of trainers or consultants, such as TVTC-licensed trainers or licensed training centres.
- No current ITU or DataReportal total for Arabic-speaking internet users.
- No university-student counts for Kuwait, Qatar, Bahrain or Oman.
- No GASTAT breakdown of private-sector workers by occupation, so the share of office workers is an assumption.

## 2. What people pay today for presentation design in Arabic

### Takeaway
There are three price tiers. On Arabic freelance marketplaces, gigs start at $5 for 3-5 slides on Khamsat and run $25-50 for a 10-20 slide deck on Mostaql. Arab sellers on Fiverr charge about $10-150, with completed jobs up to $200-400. Agencies charge $1,500-10,000 per deck; one Gulf provider's package is SAR 2,860. Templates sell for $5-25. This gives a clear price anchor: a $5-10 per month subscription costs about the same as one small Khamsat gig.

### Cited Findings
- Khamsat: presentation gigs start at about $5 for 3-5 slides, with paid add-ons for extra slides, PPTX/PDF delivery and Arabic/English support — [Khamsat gig 1](https://khamsat.com/designing/presentation/2532545-تصميم-عروض-تقديمية-powerpoint-presentation); [Khamsat gig 2](https://khamsat.com/designing/presentation/4323988-%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%B9%D8%B1%D9%88%D8%B6-%D8%A8%D9%88%D8%B1%D8%A8%D9%88%D9%8A%D9%86%D8%AA-%D8%A8%D8%B4%D9%83%D9%84-%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A)
- Khamsat already lists gigs offering "smart presentations made with AI", so freelancers are reselling AI output — [Khamsat AI gig](https://khamsat.com/designing/presentation/2835202-%D8%B9%D8%B1%D9%88%D8%B6-%D8%AA%D9%82%D8%AF%D9%8A%D9%85%D9%8A%D8%A9-%D8%B0%D9%83%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A)
- Mostaql: example project, a real-estate/contracting investor deck of 10-20 slides with a $25-50 budget and 3-day delivery. Larger projects (financial report plus branded PPT) attract many bids. The site has dedicated hiring pages for presentation and PowerPoint skills. — [Mostaql project](https://mostaql.com/project/1269069-%D8%A8%D8%B1%D8%B2%D9%8A%D9%86%D8%AA%D9%8A%D8%B4%D9%86-3d); [Mostaql presentations skill](https://mostaql.com/freelancers/skill/presentations); [Mostaql PowerPoint skill](https://mostaql.com/freelancers/skill/powerpoint)
- Fiverr Arabic gigs from Arab sellers: one Egyptian seller's packages are $50 / $100 / $150, with $10/hr also listed. Algerian and Moroccan sellers' reviews show jobs "up to $50" and $100-200. Another Egyptian seller charges $25/hr with completed jobs of $100-200 and $200-400. Category listings for "English/Arabic/Urdu" PPT start at $10-40. Review prices show what buyers paid in the past, not current list prices. — [Fiverr ali_sudanic](https://www.fiverr.com/ali_sudanic); [Fiverr aboud7dz](https://www.fiverr.com/aboud7dz); [Fiverr hassan_mor](https://www.fiverr.com/hassan_mor); [Fiverr category](https://block.fiverr.com/gigs/ppt-slides?page=13)
- Templates: an Arabic "Business" PPT template sells for $10 on Gumroad. Khamsat template bundles sell at $5 (1,200 slides, 14 templates), $10 (10 templates, 1,100 slides), $15, and $25 for everything. — [Gumroad](https://shabayek.gumroad.com/l/Arab_Biz_Powerpoint_Template); [Khamsat bundle](https://khamsat.com/designing/presentation/1242948-%D8%A5%D8%AD%D8%B5%D9%84-%D8%B9%D9%84%D9%89-500-%D8%B4%D8%B1%D9%8A%D8%AD%D8%A9-%D9%85%D9%86-%D8%B9%D8%B1%D9%88%D8%B6-%D8%A7%D9%84%D8%A8%D9%88%D8%B1%D8%A8%D9%88%D9%8A%D9%86%D8%AA-%D8%A8%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A7%D9%84%D8%AC%D8%B1%D8%A7%D9%81%D9%8A%D9%83%D8%B3)
- Agencies serving the Gulf: Labeeb (Dubai, serves Saudi clients) sells a "Professional" deck package for SAR 2,860 / AED 2,800 one-time, with larger decks quoted from a Premium tier — [Labeeb](https://labeeb.ae/?p=345)
- Global agency benchmarks, from vendor blogs: agency decks cost $1,500-5,000+, experienced freelancers $500-1,500 — [SlideModel](https://slidemodel.com/presentation-design-pricing/). Pitch-deck specialists charge a flat $2,000-6,000 or $3,000-10,000 — [Qubit Capital](https://qubit.capital/blog/pitch-deck-cost-pricing-budget-tips). Per-slide prices run from $10 (freelancer) to $50-100 (complex) — [SlideGenius](https://www.slidegenius.com/cm-faq-question/what-is-the-average-cost-of-designing-a-pitch-deck-per-page)

### Inferences (willingness to pay by segment)
- **Students:** the reference price is $5-15 per deck on Khamsat. A student who pays for 3-4 decks a semester spends $20-60, so a semester pass of about SAR 30-60 or SAR 15-25 per month is credible. Expect high churn outside semesters.
- **Teachers:** they make many lesson decks, but spend little of their own money. Expect a low personal price (SAR 15-30 per month) and a larger school or ministry licensing opportunity, which needs procurement validation.
- **Government and semi-government employees:** today they pay agencies thousands of SAR per deck. Value depends on official identity templates, PPTX export and data residency. Team seats of SAR 50-100 per user per month are plausible, but this is a hypothesis.
- **SMEs and startups (pitch decks):** they currently pay $25-50 on Mostaql for low-end decks and $2-10K at agencies. A $15-30 per month plan, or about $50-100 per deck, fits between the two.
- **Trainers and consultants:** they produce many decks and buy template bundles ($5-25). They are a good fit for a pro tier at about $10-20 per month.
- All price points above are my inferences. They are not from surveys.

### Gaps
- No systematic scrape of median Khamsat/Mostaql presentation prices or order counts, because the search tool shows only individual gigs.
- No published price lists from Saudi agencies in SAR, apart from Labeeb (UAE).
- No data on Salla/Zid template-store sales. Search found no Salla template stores.

## 3. Global AI presentation software market

### Takeaway
Gamma's figures are confirmed by its CEO: ~$100M ARR, profitable, ~70M users and 600K+ paying subscribers, at the Nov 2025 Series B ($68M, a16z, $2.1B valuation). Vendor market estimates for "AI presentation" tools range from ~$0.75B to ~$2.4B (2024-2026), with CAGRs of 11-26%. These are low-reliability vendor estimates.

### Cited Findings
- Gamma: $68M Series B led by a16z (Nov 2025), $2.1B valuation, with Accel and Uncork participating and a $20M secondary. CEO Grant Lee's figures: ~$100M ARR, profitable, ~50-52 staff, 70M users, 600K+ paying subscribers, 400M+ assets created. Reports of total funding raised vary between ~$80M and ~$91M. — [Unite.ai](https://www.unite.ai/gamma-secures-68-million-series-b-at-2-1-billion-valuation); [MIT Sloan ME](https://www.mitsloanme.com/article/gamma-raises-68-million-to-scale-ai-powered-visual-storytelling-platform/); [Implicator](https://www.implicator.ai/gammas-2-1-billion-bet-52-people-real-profit-and-the-fight-for-your-minutes/)
- Sacra estimate: ~$102M ARR, up from $30.5M at end-2024, giving a ~21x multiple — [Sacra](https://sacra.com/c/gamma/)
- Gamma traffic: 30.8M visits in Oct 2025 (Semrush). Top countries were the US, India, Brazil, Russia and Colombia; Saudi Arabia was not in the top 5. — [Semrush](https://www.semrush.com/website/gamma.app/overview/)
- Vendor sizing, low reliability:
  - The Business Research Company: "AI presentation generation" market $1.94B (2025), $2.43B (2026), 25.6% CAGR, $4.79B by 2029 — [ResearchAndMarkets](https://www.researchandmarkets.com/reports/6226537/ai-presentation-generation-market-report)
  - QYResearch: "AI presentation makers" $748M (2024) rising to $1.525B (2031), 11.3% CAGR — [press summary](https://foriio.com/works/2230945)
  - Online presentation software overall: $6.9B (2024) to $10.8B (2030), 7.7% CAGR (GIA) — [GII](https://m.giikorea.co.kr/report/go1795974-online-presentation-software.html)

### Inferences
- If MENA's share of global AI-presentation spend matched its share of global GDP (~3-4%), the regional pool would be about $60-90M per year. This is a rough top-down estimate, not data.
- Gamma's 600K payers out of 70M users is a conversion rate of about 0.9%. Applied to a hypothetical 1M Arabic free users, that means about 9K payers, or about $1M ARR at ~$10 per month. A product focused on Arabic could plausibly convert better because it solves a real pain point, but that is a hypothesis.

### Gaps
- No vendor or Statista sizing specific to MENA or Saudi for AI presentation tools.
- No Gamma figures by country, either revenue or users, for Saudi or MENA.

## 4. AI adoption in Saudi Arabia and the GCC

### Takeaway
Adoption is high and rising fast. CST (Saudi Internet Report 2025): 45.2% of internet users used AI tools in 2025, up from 21.5% in 2024. Deloitte (May 2026): 66% of Saudis aged 18-50 actively use AI, 45% for work. PwC: 69% of Saudi employees use AI at work. Most use relies on free tools.

### Cited Findings
- CST Saudi Internet Report 2025: AI-tool use among internet users rose to 45.2% (from 21.5%). Women 52.8%, men 39.4%, ages 20-29 at 55.7%. Information search is the top use (80.8%). ChatGPT is the most-downloaded AI app. — [Middle East AI News](https://www.middleeastainews.com/p/45-of-saudi-internet-users-now-use); [Asharq Al-Awsat](https://english.aawsat.com/node/5305043)
- Deloitte Digital Consumer Trends 2026, KSA (press release 21 May 2026), nationally representative sample of 1,000 people aged 18-50:
  - 66% actively use AI tools (49% the year before); 45% use AI for work
  - Top uses: information search 51%, idea generation 44%, translation 42%
  - Use is "largely informal, relying heavily on free tools with limited organizational support"
  - Sources: [Deloitte](https://www.deloitte.com/middle-east/en/about/press-room/ai-becomes-default-for-saudi-consumers-as-deloittes-2026-digital-consumer-trends-report-reveals-decisive-shift-in-how-the-kingdom-lives.html); [Consultancy-me](https://www.consultancy-me.com/news/13475/generative-ai-is-gradually-becoming-the-default-for-saudis-in-the-workplace)
- PwC Hopes and Fears 2025: 32% of Middle East workers use GenAI daily (28% globally). The Saudi edition reports that 69% of employees use AI at work, against a 54% global benchmark (Saudi n>400). — [PwC press release](https://www.pwc.com/m1/en/media-centre/2025/hopes-and-fears-2025.html); [PwC KSA PDF](https://www.pwc.com/m1/en/issues/pdf/hopes-and-fears-ksa-2025.pdf); [Middle East AI News](https://www.middleeastainews.com/p/middle-east-workers-lead-ai-adoption)
- Students: a nationwide survey of 1,044 Saudi healthcare students (2024 data) found 69.25% use ChatGPT, mainly for summaries and assignments — [MDPI](https://www.mdpi.com/2813-141x/5/1/6). A King Saud University study (Jan-Apr 2024) found only 22% academic use but 91% awareness — [Scientific Reports via DOAJ](https://doaj.org/article/8fdae5da7cc2454dab12f8e51a23440d). A national public survey (fieldwork Jul-Sep 2025, n=1,069) is also available — [arXiv 2601.18234](https://arxiv.org/html/2601.18234v1)
- HUMAIN Chat, built on ALLaM 34B: launched 26 Aug 2025 on web, iOS and Android, Saudi first and then regional. Trained on 500B+ Arabic tokens, with Arabic dialect voice input and Arabic/English switching. No user numbers have been published. — [Sharikat Mubasher](https://sharikatmubasher.com/media-hub/news/21503216/humain-launches-ai-chat-app-powered-by-allam-34b-in-saudi-arabia?lang=en); [Middle East AI News](https://www.middleeastainews.com/p/humain-chat-live-allam-34b-llm)

### Inferences
- Of Saudi Arabia's ~34.4M internet users, about 15.5M (45.2%) already use AI tools. Saudis already use AI to "generate ideas" and "translate" (Deloitte), and presentations are a natural next use.
- "Relying on free tools" (Deloitte) is a warning about willingness to pay: B2C conversion will be low, while B2B and education licences may pay better.
- HUMAIN/ALLaM could be either a partner (a local LLM option for government customers who need data residency) or a future competitor.

### Gaps
- No Saudi figure for ChatGPT's share of AI use. Only "most downloaded" is published.
- No surveys of AI use specifically by Saudi government employees or teachers.
- No adoption surveys for the other GCC countries, apart from PwC's regional figure.

## 5. Demand signals (search, YouTube, complaints)

### Takeaway
There are qualitative signals: Arabic landing pages from global competitors, Khamsat gigs reselling AI-made decks, and public RTL complaints about Gamma, OpenAI and Gemini. I could not get quantitative search-volume data such as Google Trends.

### Cited Findings
- Global competitors already target Arabic search terms with Arabic landing pages for AI presentations: PPT.AI (whose listed languages do not include Arabic), Prezi AI in Arabic, AhaSlides' PowerPoint add-in and Presentations.ai's Arabic pricing page — [ppt.ai/ar](https://ppt.ai/ar/ai-presentation); [Prezi AR](https://www.prezi.com/ar/); [AhaSlides AR](https://ahaslides.com/ar/features/ai-presentation-maker/ai-powerpoint/); [Presentations.ai AR](https://www.presentations.ai/ar/pricing)
- RTL complaints outside Gamma: Google AI forum ("small Arabic font, no RTL") — [Google AI forum](https://discuss.ai.google.dev/t/issues-with-arabic-language-support-small-font-size-and-lack-of-right-to-left-rtl-text-direction/89158); OpenAI forum ("systematic RTL layout issue in Arabic document generation") — [OpenAI community](https://community.openai.com/t/systematic-rtl-layout-issue-in-arabic-image-document-generation/1379790). Gamma-specific issues are covered in digital_content.md.

### Inferences
- Large competitors buying Arabic SEO pages suggests there is meaningful Arabic search volume for terms like "عرض تقديمي بالذكاء الاصطناعي".

### Gaps
- Google Trends, Keyword Planner and YouTube view counts for "عرض تقديمي بالذكاء الاصطناعي" and "تصميم عرض بوربوينت" were not reachable with the available tools. A manual check is needed before launch.
- No social-media listening data (X/TikTok complaint volumes).

## 6. Seasonality

### Takeaway
Saudi general education returns to two semesters from 1447/1448 AH (2025/26), after three years of a three-semester system. This creates two main academic demand peaks, plus business peaks around quarter ends and Ramadan.

### Cited Findings
- The Cabinet approved a return to two semesters for general education from 1447/1448 AH after a three-year trial of three semesters. The ministry says the general timeframe is fixed for the next four years. — [Okaz](https://www.okaz.com.sa/news/local/2207620); [Sayidaty](https://www.sayidaty.net/node/1778686)
- An earlier three-semester calendar for 1447 (start 24 Aug 2025, terms 3 Nov 2025 and 1 Feb 2026) was published before that decision and conflicts with it. Confirm on moe.gov.sa. — [Al-Dostor](https://www.dostor.org/5182002)

### Inferences
- **Academic peaks** (my inference): weeks 3-12 of each semester, which is assignments and projects (roughly Sep-Dec and Jan/Feb-May), and the end of the academic year with graduation projects (Apr-Jun). Lows: summer (Jul-Aug) and Ramadan and Eid holidays.
- **Business peaks:** quarter ends and budget season (Q4: Oct-Dec), and the pre-Ramadan push. Ramadan has shorter working hours, so expect lower B2B activity.
- These seasonality points are hypotheses and need traffic data or Trends to confirm.

### Gaps
- No data on presentation search seasonality in Saudi Arabia, from Google Trends or Khamsat order timing.
- University calendars are set separately from the school calendar and were not checked.
