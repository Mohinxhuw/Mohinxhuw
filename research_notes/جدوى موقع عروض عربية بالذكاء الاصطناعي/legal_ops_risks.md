# Legal, Regulatory, Operational and Risk Aspects: Launching an AI Arabic Presentation-Generator SaaS from Saudi Arabia (solo founder, as of Oct 2026)

> NOT LEGAL ADVICE. Most sources found are secondary (law-firm briefings, consultancies, blogs). Official portals (business.sa, freelance.sa, zatca.gov.sa, sdaia.gov.sa, saip.gov.sa, gateway pricing pages) mostly did not come up in search or could not be fetched, so every fee and threshold below should be checked against the official source before acting. Items marked [UNVERIFIED] or [LAWYER] need checking or a lawyer.
> Research budget: about 18 tool calls. Two key pages (the Baker McKenzie PDPL transfer briefing and the raghdan.sa payment-gateway guide) returned DNS errors and could not be read in full.

## Q1. What is the cheapest compliant structure for a solo founder to start charging Saudi users, and what does it cost?

### Takeaway
The cheapest entry point is the Freelance Work Document (وثيقة العمل الحر, freelance.sa), which secondary sources describe as free to issue and renew. Its weakness is that payment gateways and the E-Commerce Law's disclosure rules work best with a Commercial Registration (CR). A sole-establishment CR (مؤسسة فردية) under the new CR law costs roughly SAR 200–500 in registration fees plus an annual confirmation fee; sources disagree on the amounts. An LLC is unnecessary at launch. Practical path: start on the freelance document if a gateway will accept it, and move to a sole-establishment CR once gateway onboarding or revenue requires it.

### Cited Findings
**Freelance document (وثيقة العمل الحر)**
- Free to issue and renew ("no fees for issuing or renewing the document") — [wdeftksa guide](https://wdeftksa.com/sa/guides/freelance); renewal also free per [Qoyod](https://www.qoyod.com/en/what-is-a-freelance-work-document-sa/). [UNVERIFIED against freelance.sa]
- Issued instantly at freelance.sa after logging in via Absher, choosing a profession and entering an IBAN; downloadable as a PDF. Validity is given as 1 year in one source, and Qoyod is internally inconsistent (says 1 year and 2 years) — [wdeftksa](https://wdeftksa.com/sa/guides/freelance); [Qoyod](https://www.qoyod.com/en/what-is-a-freelance-work-document-sa/)
- Eligible activities include programming/development and digital marketing, among 30+ activities — [wdeftksa](https://wdeftksa.com/sa/guides/freelance). [UNVERIFIED] whether "operating a SaaS platform that sells subscriptions" is an eligible freelance activity or counts as commercial activity requiring a CR. [LAWYER]
- Described as a free document from the Ministry of Human Resources (MHRSD) for individuals working without a CR — [sabbar](https://sabbar.com/blog/freelance-work-document-terms)

**Sole establishment CR (مؤسسة فردية)**
- New Commercial Registration Law and Trade Name Law took effect 3 April 2025. They create a single national CR covering branches, CRs no longer expire, and an annual confirmation of data replaces renewal — [Al Tamimi](https://tamimi.com/news/new-commercial-registration-and-trade-name-laws-take-effect-in-2025); [Al Madani Law](https://almadanilaw.com/unified-commercial-register-in-saudi-arabia/). (One Arabic blog dates the law to April 2026, which conflicts with Al Tamimi; Al Tamimi is the more reliable source.)
- Fees conflict across sources:
  - Qoyod, citing the Ministry of Commerce fee schedule: new sole-establishment registration SAR 500, annual data confirmation SAR 500, CR extract SAR 100, amendment SAR 100 — [Qoyod (AR)](https://www.qoyod.com/blog/business-management/%d9%81%d8%aa%d8%ad-%d8%b3%d8%ac%d9%84-%d8%aa%d8%ac%d8%a7%d8%b1%d9%8a-%d9%81%d8%b1%d8%af%d9%8a/)
  - Etqan law firm: main sole-establishment CR SAR 200/year, branch SAR 100/year — [Etqan (AR)](https://etqanlawfirm-sa.com/%d8%b1%d8%b3%d9%88%d9%85-%d8%aa%d8%ac%d8%af%d9%8a%d8%af-%d8%a7%d9%84%d8%b3%d8%ac%d9%84-%d8%a7%d9%84%d8%aa%d8%ac%d8%a7%d8%b1%d9%8a-%d9%84%d9%85%d8%a4%d8%b3%d8%b3%d8%a9-%d9%81%d8%b1%d8%af%d9%8a%d8%a9/)
  - Noblecore: about SAR 200 for the CR plus a Chamber of Commerce subscription from about SAR 1,000 depending on tier; elsewhere it gives SAR 1,200–2,000 total and a chamber fee of SAR 2,000–3,000 — [Noblecore (AR)](https://noblecoreksa.com/ar/%D8%AA%D8%AC%D8%AF%D9%8A%D8%AF-%D8%A7%D9%84%D8%B3%D8%AC%D9%84-%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A/)
- The process runs online through the Saudi Business Center (business.sa) with Nafath login, and fees are paid via SADAD — [Noblecore](https://noblecoreksa.com/ar/%D8%AA%D8%AC%D8%AF%D9%8A%D8%AF-%D8%A7%D9%84%D8%B3%D8%AC%D9%84-%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A/)
- [UNVERIFIED] whether Chamber of Commerce membership is still mandatory for a sole establishment. Check business.sa.

**LLC**: no LLC cost data was gathered (gap). An LLC isolates liability but costs more (articles of association, capital, accounting).

**E-Commerce Law obligations (apply to both structures)**
- The law covers "service providers" selling online in KSA, including a "practitioner" (ممارس) who is not CR-registered but trades electronically, and foreign sellers targeting KSA consumers — [Al Madani Law](https://almadanilaw.com/the-e-commerce-law-in-saudi-arabia); [Clyde & Co PDF](https://www.clydeco.com/clyde/media/fileslibrary/J470323_KSA_E-commerce_Law_Interactive_-_Update_0919_FV2.pdf)
- Store must disclose: identity/name and address (or registration with an e-store authentication body such as Maroof), contact details, privacy policy, VAT number where applicable, and prices including VAT — [Global Compliance News](https://www.globalcompliancenews.com/2020/03/16/saudi-arabia-regulates-e-commerce/); [Origami (2026 blog)](https://origami.sa/en/blog/saudi-ecommerce-law-2026-maroof-compliance/). Origami calls Maroof registration mandatory. The Ministry's own notice only urges consumers to prefer stores with a CR or Maroof registration — [MC](https://mc.gov.sa/en/mediacenter/News/Pages/13-08-20-01.aspx). The sources conflict. [LAWYER]
- 7-day return right, with exceptions that include downloaded software/digital content and custom-made products. A SaaS should state its refund policy explicitly — [Al Madani](https://almadanilaw.com/the-e-commerce-law-in-saudi-arabia)
- Customer data may be kept only for fulfilling the agreement and may not be used for marketing without prior consent — [Al Madani](https://almadanilaw.com/the-e-commerce-law-in-saudi-arabia). Penalties run from a warning to a fine of up to SAR 1M, plus suspension or closure — [Clyde & Co](https://cdn.clydeco.com/clyde/clyde/media/locations/middle%20east/reports/clydeco-ksa-e-commerce-law-interactive-update-0919.pdf); [Gulf News](https://gulfnews.com/amp/business/retail/saudi-arabia-tightens-up-ecommerce-law-with-stiff-penalties-1.73327592)

**VAT and ZATCA e-invoicing**
- VAT registration is mandatory above SAR 375,000 in annual taxable supplies and voluntary from SAR 187,500 — [Kintsugi 2026 guide](https://trykintsugi.com/sales-tax-guides/middle-east/saudi-arabia)
- E-invoicing Wave 25: taxpayers whose VAT-subject revenues exceeded SAR 187,500 in any of 2022–2025 must integrate with Fatoora by 1 Feb 2027, half the previous SAR 375k threshold — [Grant Thornton](https://www.grantthornton.sa/insights/articles-and-publications/ZATCA_announces_wave_25_of_e-Invoicing_in_saudi_arabia/); [VATupdate](https://www.vatupdate.com/2026/07/27/zatca-announces-wave-25-of-e-invoicing-threshold-halved-to-sar-187500-integration-deadline-1-february-2027/). ZATCA notifies targeted taxpayers at least 6 months ahead, and further waves are expected — [Analytix](https://analytix.sa/zatca-compliance-saudi-arabia/)
- Phase 1 e-invoicing (generating electronic invoices) applies to VAT-registered persons. [UNVERIFIED in this round; widely known but not re-sourced]

### Inferences
- At launch, a SaaS below SAR 187.5k revenue has no VAT or e-invoicing obligation. Once revenue approaches about SAR 375k, VAT registration plus Phase 1 and 2 e-invoicing apply. Picking a billing tool that supports ZATCA-compliant invoices (QR code, Phase 2 integration) avoids a migration later.
- The cheapest compliant path is: freelance document (SAR 0) + Maroof listing (free per common knowledge [UNVERIFIED]) + compliant website disclosures. If the gateway demands a CR, a sole-establishment CR at about SAR 200–500 a year plus a possible chamber fee is the next step. Budget roughly SAR 0–3,000 for year 1 depending on the route.

### Gaps
- No official fee schedule from business.sa or mc.gov.sa was retrieved, so CR fees remain conflicting.
- Whether the freelance document legally covers selling a SaaS subscription product (vs. personal services) is unresolved. [LAWYER]
- LLC setup costs were not researched.

## Q2. Does the PDPL restrict sending user content to foreign LLM APIs, and what must be done?

### Takeaway
Yes. Sending personal data in prompts or uploads to US LLM providers is a cross-border transfer under PDPL Article 29 and SDAIA's revised Transfer Regulation (1 Sep 2024). Without an adequacy decision for the US, the controller must use an appropriate safeguard (SDAIA's Standard Contractual Clauses, Binding Common Rules, or certification) or a listed exemption. In addition, transfers must not harm national security or vital interests and must be limited to the minimum data needed. A risk assessment is needed when relying on safeguards. Consent alone is not the main transfer basis. The founder should minimise personal data sent to the LLM, publish a PDPL-compliant privacy policy that names foreign processors, execute or attach the SDAIA SCCs (controller-to-processor) with the LLM vendor, and keep a transfer risk assessment. [LAWYER]

### Cited Findings
- SDAIA issued a revised Regulation on Personal Data Transfer Outside the Kingdom on 1 Sep 2024, plus four sets of Standard Contractual Clauses (C2P, C2C, P2C, P2P). Safeguards were cut from four to three, and binding codes of conduct were dropped — [Mayer Brown, Oct 2024](https://www.mayerbrown.com/en/insights/publications/2024/10/updates-to-saudi-arabias-personal-data-protection-regulations-sccs-guidelines-and-more); [Baker McKenzie (search snippet; page not fetchable)](https://insightplus.bakermckenzie.com/bm/data-technology/saudi-arabia-updates-data-transfer-regulations-and-introduces-the-first-set-of-standard-contractual-clauses)
- Altering the SCCs invalidates them, and the rest of the contract cannot conflict with them — [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2024/10/updates-to-saudi-arabias-personal-data-protection-regulations-sccs-guidelines-and-more) (as summarised in search)
- A risk assessment is required when relying on an appropriate safeguard, or for continuous/widespread transfers of sensitive data — Baker McKenzie / Mayer Brown (search summary, links above)
- Permitted grounds include performing an obligation under an agreement to which the data subject is a party and services to data subjects. All transfers must not prejudice KSA national security or vital interests and must be limited to the minimum personal data needed — [Securiti](https://securiti.ai/regulation-on-personal-data-transfer-outside-the-kingdom); [Tsaaro](https://tsaaro.com/newsletter/navigating-saudi-arabia%E2%80%99s-cross-border-data-transfer-regulations). One source notes the "performance of a contract with the data subject" exemption came from the draft regulation, so the final text needs checking.
- PDPL (Royal Decree M/19, amended by M/148 of 1444H) has been fully enforceable since 14 Sep 2024. Businesses may need to register with SDAIA (National Data Governance Platform), and a DPO is mandatory for some controllers, e.g. those processing sensitive data at scale — [DLA Piper](https://www.dlapiper.com/en/insights/publications/2024/02/saudi-arabias-new-personal-data-protection-law-in-force)
- E-Commerce Law adds that personal data may only be retained for fulfilling the agreement and needs prior consent for marketing; breaches are reportable to the MoC (within 3 days per one source) — [Al Madani](https://almadanilaw.com/the-e-commerce-law-in-saudi-arabia)

### Inferences (practical checklist)
1. **Data minimisation:** strip names, emails and IDs from prompts before calling the LLM API. Warn users not to upload sensitive data (health, financial, national ID).
2. **Privacy policy (Arabic + English)**: state the purpose, legal basis, categories of data, retention, rights (access, correction, deletion), the identity of foreign processors (e.g., OpenAI, Anthropic, Google) and their countries, and a contact point.
3. **Contracts**: use the LLM vendor's DPA with zero-retention / no-training settings where available, and append SDAIA's C2P SCCs unmodified. Most US vendors will not sign Saudi SCCs for small customers, which is a practical gap. [LAWYER]
4. **Transfer risk assessment**: keep a short written record.
5. **Breach response**: SDAIA's 72-hour notification for PDPL [UNVERIFIED in this round] plus the MoC under the E-Commerce Law.
6. **Records of processing** and possible SDAIA platform registration. [UNVERIFIED whether a micro-controller must register]
7. **Mitigation option**: an in-Kingdom or GCC-hosted model or region (e.g., HUMAIN/ALLaM or cloud regions in KSA) reduces transfer exposure. [UNVERIFIED availability and pricing]

### Gaps
- SDAIA primary texts (sdaia.gov.sa) were not retrieved, and the Baker McKenzie briefing failed to load.
- Whether slide content (business text, often without personal data) counts as "personal data" depends on the content. Most presentation text will not be personal data, which lowers the risk.
- The exact 72-hour breach rule and registration thresholds were not re-verified.

## Q2b. SDAIA AI ethics and generative AI guidelines

### Takeaway
SDAIA's AI Ethics Principles (Sept 2023) and its Generative AI Guidelines for the Public (Jan 2024) are guidance, not binding law. They expect transparency, bias testing, accountability, and disclosure of AI use. No developer registration requirement was found.

### Cited Findings
- AI Ethics Principles were released Sept 2023, followed by two GenAI guidelines in Jan 2024 (government and public). The public version applies to developers and users of GenAI in KSA — [DataGuidance](https://www.dataguidance.com/news/saudi-arabia-sdaia-publishes-guidelines-generative-ai); [Securiti](https://securiti.ai/saudi-arabia-generative-ai-guide/)
- Seven principles: fairness; privacy & security; humanity; social & environmental benefits; reliability & safety; transparency & explainability; accountability & responsibility — [Securiti](https://securiti.ai/saudi-arabia-generative-ai-guide/)
- Developers are expected to test for embedded bias and understand training data provenance — [Al Tamimi](https://www.tamimi.com/news/ai-in-healthcare-kingdom-of-saudi-arabia/); see also [HSF Kramer AI tracker](https://www.hsfkramer.com/fr/insights/reports/ai-tracker/saudi-arabia)

### Inferences
- Label AI-generated content, add a "review before use" disclaimer, offer an output-reporting mechanism, and include an AI-use section in the ToS.

### Gaps
- No registration or licensing requirement for GenAI apps was found. A binding AI law draft, if any, was not checked.

## Q3. Which payment gateway is best for a solo founder (requirements, fees)?

### Takeaway
Stripe is not available to Saudi-registered businesses, so the choice is among local SAMA-licensed gateways. Moyasar and Tap are the most developer- and SME-friendly; both support mada, Visa/MC and Apple Pay. Their rates are quote-based. Published secondary figures are about 1% for mada (Tap, capped at SAR 200) and about 2.5%+ for cards. No source confirmed that any gateway onboards an individual on the freelance document alone. Most require a CR, which pushes the solo founder toward a sole-establishment CR. Recommendation: apply to Moyasar first (Arabic dashboard, SaaS-friendly API, recurring payments), with Tap as the alternative, and confirm the documents with sales.

### Cited Findings
- Moyasar does not publish pricing ("provided by our sales team"). A third-party comparison lists "from 2.5%" per transaction. It supports mada, Visa, MC, Amex, STC Pay, Apple Pay and Samsung Pay; approval takes 2–5 business days after documents; mada refunds take 24h–3 business days and card refunds 7–14 days — [Moyasar FAQ](https://www.moyasar.com/en/resources/faqs); [paymentproviders.io](https://paymentproviders.io/compare/moyasar-vs-alipay?focus=fees). [Settlement 7–14 days UNVERIFIED]
- Tap: mada 1% capped at SAR 200, card rates quote-based (secondary review). Trustpilot complaints describe settlement holds and slow support. Tap has been SAMA-licensed and operating in KSA since 2018 — [learnwithhasan Tap review](https://learnwithhasan.com/payment-gateways/tap-payments/); [Sharikat Mubasher](https://www.sharikatmubasher.com/media-hub/news/21507114/tap-payments-expands-to-9-countries-eyes-global-partnerships?lang=en)
- Moyasar and Tap are described as developer-oriented with fast activation for startups and SMEs — [raghdan.sa guide (search snippet; page not fetchable)](https://raghdan.sa/ar/news/payment-gateways-in-saudi-arabia-guide-2025-requirements-fees-registration-steps-and-comprehensive-comparison/)
- PayTabs holds Saudi Payments gateway certification — [PayTabs corporate profile](https://paytabs.com/wp-content/uploads/2017/05/PayTabs-Corporate-Profile_15June2025AR.pdf). Fees not found.
- Stripe is not listed as supported for Saudi-registered businesses, and its only Middle East launch is the UAE. Saudi founders use a foreign entity (US/UAE) as a workaround — [Shopify community](https://community.shopify.com/t/payment-gateway/399632); [Stripe UAE launch](https://stripe.com/nl/newsroom/news/stripe-launches-uae); [Zenind](https://www.zenind.com/help/post/how-saudi-founders-can-use-stripe-for-global-sales). One comparison site claims direct Stripe availability, which conflicts with the other sources and is likely wrong — [learnwithhasan KSA](https://learnwithhasan.com/payment-gateways/country/saudi-arabia/)
- Zid Pay requires a CR for establishments and other documents (civil ID) for individuals, which shows that some Saudi platforms do onboard individuals — [Zid help](https://intercom.help/zid/ar/articles/7864244-متطلبات-تفعيل-زد-باي)
- Freelancers asking for gateways that work without a CR or freelance document is a common forum request — [Khamsat](https://khamsat.com/community/requests/792455-%D8%A8%D9%88%D8%A7%D8%A8%D8%A9-%D8%AF%D9%81%D8%B9-%D9%84%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A)

### Inferences
- If paid features are sold through iOS/Android apps, Apple and Google in-app purchase rules (15–30% commission) apply to digital subscriptions. [UNVERIFIED in this round; standard platform policy] A web-first launch avoids this.
- Merchant-of-record services (e.g., Paddle, Lemon Squeezy) could let the founder sell globally without a local gateway, but they handle mada poorly. [UNVERIFIED]

### Gaps
- No official fee tables for HyperPay, PayTabs, Moyasar or Tap.
- No confirmation of which gateway accepts the freelance document. Ask each gateway's sales team directly.

## Q4. IP issues (fonts, stock images, AI output, trademark via SAIP)

### Cited Findings
- SAIP trademark fees conflict. One law firm gives SAR 1,000 for the application plus SAR 1,000 per extra class — [Etqan](https://etqanlawfirm-sa.com/en/trademark-registration-process/). A filing guide gives about SAR 1,500 per class — [TMarkMetric (June 2026)](https://tmarkmetric.com/guides/saudi-arabia-trademark). Chambers 2025 lists SAR 500 publication plus SAR 5,000 registration/certificate — [Chambers](https://gpg-pdf.chambers.com/doing-business-in-2025/730). Others give publication of about SAR 575, and 15% VAT is added to fees — [Motaded](https://motaded.com.sa/platforms/saip). Estimated total for one class: about SAR 2,500–7,000. [Check SAIP fee schedule]
- No sources were gathered on font licensing, stock image licensing, or Saudi copyright ownership of AI-generated output. [Gap; LAWYER]

### Inferences
- Use only fonts with web/app embedding and redistribution rights. SIL OFL Arabic fonts (e.g., Noto, IBM Plex Sans Arabic, Cairo, Tajawal) are generally safe [UNVERIFIED per font]. Commercial Arabic foundry fonts often prohibit embedding in exported PPTX files.
- Stock images: use APIs whose licenses allow end-user redistribution in generated files (Unsplash/Pexels API terms) [UNVERIFIED].
- ToS should: assign or license output to the user without warranting copyrightability; disclaim accuracy of AI output; cap liability (e.g., fees paid in the last 12 months); ban illegal or infringing prompts; add a Saudi governing-law clause; reference the LLM provider's usage policies. [LAWYER]

## Q5. Which support programs and grants fit an AI SaaS founder?

### Takeaway
The strongest fits are the Monsha'at AI Incubator (with NTDP; support valued at over SAR 150k per startup; first cohort of 33 graduated June 2026), the Misk Accelerator (zero equity, 3 months, post-MVP) and Misk Launchpad (pre-accelerator). Badir, Kafalah and HUMAIN startup programs were not verified in this round.

### Cited Findings
- Monsha'at AI Incubator Program with NTDP: 33 startups graduated on 23 June 2026; 6 months; mentorship, incubation, training; support valued at over SAR 150,000 per startup — [Monsha'at](https://monshaat.gov.sa/en/node/485041); [Sharikat Mubasher](https://sharikatmubasher.com/news/article/21557846/monshaat-graduates-33-startups-from-its-ai-incubator-program?lang=en)
- Monsha'at signed an MoU with Groq (Biban 2025) for AI/HPC capability building, which may mean compute access for startups [inference] — [Monsha'at](https://monshaat.gov.sa/en/node/423503)
- Misk Accelerator: 3 months, zero equity, post-MVP; Cohort 12 deadline was 27 Sep 2025 — [Misk Hub](https://hub.misk.org.sa/programs/entrepreneurship/misk-accelerator/). Misk Launchpad is a 10-week pre-accelerator for validating ideas and building MVPs, deadline 31 Jul 2026 [UNVERIFIED on Misk site] — [fundsforngos](https://www2.fundsforngos.org/?p=475333)
- Monsha'at University Accelerators (for students and recent graduates; project service grants) — [MENA Startup Digest](https://menastartupdigest.com/saudi-arabias-monshaat-launches-university-accelerators-program/)

### Gaps
- Badir (technology incubators), Kafalah (loan guarantees, which need a CR and suit later stages), HUMAIN/SDAIA startup credits, and Monsha'at fee-refund ("استرداد") programs were not verified.

## Q6. Key risks with evidence

### Cited Findings
- **Incumbents adding Arabic:** Gamma supports RTL (Arabic, Farsi, Hebrew, Urdu) in the editor and generator, still labelled beta — [Gamma Help](https://help.gamma.app/en/articles/10446600-about-right-to-left-languages-in-gamma). Users previously reported Arabic number-alignment bugs — [Gamma ideas](https://ideas.gamma.app/ideas/p/suggestions-for-arabic-language-support-and-file-export-options-dear-gamma-team). Microsoft 365 Copilot added Arabic in April 2024 — [Neowin](https://www.neowin.net/news/copilot-for-microsoft-365-adds-16-additional-languages-with-more-to-be-added-in-the-future/); [Microsoft support](https://support.microsoft.com/topic/94518d61-644b-4118-9492-617eea4801d8). Users report gaps in Arabic intent handling and localisation as of Dec 2025 — [MS Tech Community](https://techcommunity.microsoft.com/discussions/microsoft-copilot/%F0%9F%93%8C-enhancing-arabic-language-support-and-multilingual-intent-accuracy-in-microso/4481964). Canva's AI assistant lists Arabic among 16 added languages (undated, secondary) — [Geekflare](https://geekflare.com/recommends/canva/). Google Slides/Gemini Arabic status was not researched.
- **Single-LLM-provider dependency, AI cost volatility, piracy/account sharing, low willingness to pay, seasonality:** no direct evidence was gathered in this round. See Gaps.

### Inferences
- The incumbents' Arabic support is real but partial (beta RTL, colloquial gaps). The window for a differentiated product rests on Arabic typography quality, Saudi templates (government/academic formats, Hijri dates), and local payment (mada). This window may narrow within 12–24 months.
- Mitigate provider dependency by using an abstraction layer across two or more LLM providers, plus caching and per-plan usage caps.
- Seasonality likely follows the academic calendar (students/teachers) and the Ramadan slowdown [inference, unsourced].

### Gaps
- No sourced data on LLM API price trends, Saudi SaaS willingness to pay, account-sharing rates, or Google's Arabic roadmap. Other researchers or follow-up work should cover these.
