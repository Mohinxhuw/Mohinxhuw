"""Builds guide.html for the Vanta Template 02 user guide (printed to PDF with headless Chromium)."""
import json, os, html, collections

HERE = os.path.dirname(os.path.abspath(__file__))
rows = json.load(open(os.path.join(HERE, '..', 'qa', 'slides.json')))
FONTS = os.path.join(HERE, '..', 'node_modules', '@fontsource', 'gelasio', 'files')
e = html.escape


def name(r):
    k = r['kind'].title().replace('Vs ', 'vs ').replace('Kpi', 'KPI').replace('Swot', 'SWOT').replace('Year-Over-Year', 'Year-over-Year').replace(' By ', ' by ')
    return k


SECTIONS = [
    ('Introduction', 1, 5, 'Open the story: cover, a one-line statement, agenda, the executive summary and the headline numbers.'),
    ('Company context', 6, 10, 'Show what the business is today: snapshot dashboard, growth history, business model, revenue streams and the opportunity.'),
    ('Market & analysis', 11, 18, 'Size the market, segment it, then position the company against competitors with scatter, bubble and benchmark views.'),
    ('Data & performance', 19, 28, 'Report results: executive and KPI dashboards, monthly, quarterly and YoY trends, regions, products, targets and variance.'),
    ('Sales', 29, 36, 'Explain the revenue engine: funnel, pipeline, conversion, channels, forecast, territories, acquisition and retention.'),
    ('Finance', 37, 43, 'Walk through revenue mix, profitability, costs, margins, cash flow, the revenue bridge and the five-year outlook.'),
    ('Strategy', 44, 50, 'Set direction: priorities, SWOT, roadmap, growth levers, opportunity matrix, risks and the action plan.'),
    ('Product & marketing', 51, 56, 'Present the offer: modules, product comparison, pricing, features, the marketing funnel and the campaign dashboard.'),
    ('Results & close', 57, 60, 'Prove it and ask: case study, before/after, key takeaways and the closing call to action.'),
]
PALETTE = [
    ('Ink', '1A1D23', 'Text / Background 1 dark (dk1)', 'Body text, headlines on light slides'),
    ('White', 'FFFFFF', 'Text / Background 1 light (lt1)', 'Cards, chart panels, text on cobalt'),
    ('Deep Cobalt', '13246B', 'Text / Background 2 dark (dk2)', 'Dark slides, dashboards, emphasis panels'),
    ('Ivory', 'F8F5EF', 'Text / Background 2 light (lt2)', 'Default slide background'),
    ('Cobalt', '2340C8', 'Accent 1', 'Primary data series, links, key figures'),
    ('Coral', 'FF6B4A', 'Accent 2', 'Highlight: “your company”, the one point that matters'),
    ('Sky', 'B7C6F5', 'Accent 3', 'Secondary series, comparison periods'),
    ('Mist', 'DCDFE6', 'Accent 4', 'Neutral series, tracks, “before” values'),
    ('Stone', '6B7080', 'Accent 5', 'Captions, axis labels, notes'),
    ('Peach', 'FFD3C4', 'Accent 6', 'Soft highlight fills, warning chips'),
]

chart_use = collections.OrderedDict()
for r in rows:
    for c in r['charts']:
        chart_use.setdefault(c, []).append(r['n'])
n_charts = sum(len(r['charts']) for r in rows)
n_chart_slides = sum(1 for r in rows if r['charts'])

css = f"""
@font-face {{ font-family: 'GuideSerif'; src: url('file://{FONTS}/gelasio-latin-400-normal.woff2'); font-weight: 400; }}
@font-face {{ font-family: 'GuideSerif'; src: url('file://{FONTS}/gelasio-latin-400-italic.woff2'); font-weight: 400; font-style: italic; }}
@font-face {{ font-family: 'GuideSerif'; src: url('file://{FONTS}/gelasio-latin-600-normal.woff2'); font-weight: 600; }}
@page {{ size: 297mm 210mm; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family: Arial, 'Liberation Sans', sans-serif; color: #1A1D23; font-size: 9.6pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.page {{ width: 297mm; height: 210mm; padding: 15mm 18mm 13mm; background: #F8F5EF; position: relative; overflow: hidden; page-break-after: always; }}
.page.white {{ background: #fff; }}
.page.dark {{ background: #13246B; color: #fff; }}
.eyebrow {{ font-size: 7pt; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #2340C8; display: flex; align-items: center; gap: 2.2mm; }}
.eyebrow::before {{ content: ''; width: 2mm; height: 2mm; border-radius: 50%; background: #FF6B4A; }}
.dark .eyebrow {{ color: #B7C6F5; }}
h1 {{ font-family: 'GuideSerif', Georgia, serif; font-weight: 400; font-size: 24pt; line-height: 1.12; margin: 3mm 0 6mm; }}
h2 {{ font-family: 'GuideSerif', Georgia, serif; font-weight: 400; font-size: 13.5pt; margin: 0 0 2mm; }}
h3 {{ font-size: 7pt; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #6B7080; margin: 0 0 1.5mm; }}
p {{ margin: 0 0 2mm; }}
.muted {{ color: #6B7080; }}
.foot {{ position: absolute; left: 18mm; right: 18mm; bottom: 7mm; display: flex; justify-content: space-between; font-size: 6.5pt; color: #6B7080; }}
.foot b {{ letter-spacing: .3em; color: #1A1D23; }}
.dark .foot, .dark .foot b {{ color: #B7C6F5; }}
.grid {{ display: grid; gap: 6mm; }}
.g2 {{ grid-template-columns: 1fr 1fr; }} .g3 {{ grid-template-columns: repeat(3, 1fr); }} .g4 {{ grid-template-columns: repeat(4, 1fr); }}
.card {{ background: #fff; padding: 5mm 5.5mm; }}
.white .card {{ background: #F8F5EF; }}
.num {{ font-family: 'GuideSerif', Georgia, serif; font-style: italic; color: #FF6B4A; font-size: 17pt; line-height: 1; margin-bottom: 2mm; }}
ul {{ padding-left: 4mm; margin: 0 0 2mm; }} li {{ margin: 0 0 1.2mm; }}
li::marker {{ color: #2340C8; }}
table {{ border-collapse: collapse; width: 100%; }}
table.tight td {{ padding: 1.05mm 2mm; font-size: 8.4pt; line-height: 1.3; }} table.tight th {{ padding: 1.2mm 2mm; }}
th {{ text-align: left; font-size: 6.6pt; letter-spacing: .14em; text-transform: uppercase; color: #6B7080; border-bottom: 1px solid #1A1D23; padding: 1.6mm 2mm; }}
td {{ padding: 1.7mm 2mm; border-bottom: 1px solid #E4E0D8; vertical-align: top; }}
.sw {{ width: 9mm; height: 9mm; display: inline-block; border: 1px solid #E4E0D8; vertical-align: middle; }}
kbd {{ font-family: Arial, sans-serif; font-size: 8.2pt; background: #EEF1FC; color: #13246B; padding: .2mm 1.4mm; border-radius: 1mm; white-space: nowrap; }}
.thumbs {{ display: grid; grid-template-columns: repeat(6, 1fr); gap: 4mm 4mm; }}
.thumb img {{ width: 100%; display: block; border: 1px solid #E4E0D8; }}
.thumb .cap {{ font-size: 6.6pt; margin-top: 1.1mm; line-height: 1.3; }}
.thumb .cap b {{ color: #2340C8; margin-right: 1mm; }}
.thumb .ct {{ color: #6B7080; font-size: 6pt; }}
.stat {{ font-size: 25pt; font-weight: 700; line-height: 1; }}
.chip {{ display: inline-block; font-size: 6.6pt; font-weight: 700; padding: .6mm 2.2mm; border-radius: 3mm; background: #2340C8; color: #fff; }}
.chip.coral {{ background: #FF6B4A; }} .chip.light {{ background: #fff; color: #13246B; border: 1px solid #DCDFE6; }}
"""


def foot(n):
    return f'<div class="foot"><span><b>VANTA</b>&nbsp;&nbsp;&nbsp;Business Presentation Template 02 — Guide</span><span>{n}</span></div>'


pages = []

# 1 cover
pages.append(f"""<div class="page dark" style="padding:0">
<div style="position:absolute;left:18mm;top:16mm;font-size:8pt;font-weight:700;letter-spacing:.4em">VANTA</div>
<div style="position:absolute;left:18mm;top:62mm;width:118mm">
<div class="eyebrow">User guide</div>
<div style="font-family:'GuideSerif',Georgia,serif;font-size:38pt;line-height:1.05;margin:5mm 0 6mm">Business<br>Presentation<br><i style="color:#FF6B4A">Template 02</i></div>
<p style="color:#B7C6F5;font-size:10.5pt;max-width:105mm">How to edit the deck, the fonts and colour system, how every chart is built, and which slide to use when.</p></div>
<img src="cover.jpg" style="position:absolute;right:18mm;top:40mm;width:128mm;border:1px solid #2A3C86">
<div style="position:absolute;left:18mm;bottom:16mm;display:flex;gap:12mm;color:#B7C6F5;font-size:8pt">
<span><b style="color:#fff;font-size:15pt;display:block">60</b>slides, 16:9</span>
<span><b style="color:#fff;font-size:15pt;display:block">{n_charts}</b>native, editable charts</span>
<span><b style="color:#fff;font-size:15pt;display:block">5</b>slide masters</span>
<span><b style="color:#fff;font-size:15pt;display:block">0</b>photographs</span></div>
</div>""")

# 2 quick start
pages.append(f"""<div class="page white"><div class="eyebrow">Quick start</div><h1>Make it yours in six steps</h1>
<div class="grid g3">
<div class="card"><div class="num">01</div><h2>Keep the slides you need</h2><p class="muted">Open <b>View › Slide Sorter</b>, delete what you don’t need and drag the rest into your story order. Every slide stands alone.</p></div>
<div class="card"><div class="num">02</div><h2>Set your brand colours</h2><p class="muted"><b>Design › Variants › Colors › Customize Colors</b>. Change Accent 1 (Cobalt) and Accent 2 (Coral) first — shapes and text that use theme colours follow automatically.</p></div>
<div class="card"><div class="num">03</div><h2>Replace the text</h2><p class="muted">All copy is realistic sample content for a fictional company, “Halden Group”. Click any text and type. Headlines are written as conclusions — keep that habit.</p></div>
<div class="card"><div class="num">04</div><h2>Paste in your data</h2><p class="muted">Right-click a chart › <b>Edit Data</b>. The chart redraws from the embedded worksheet. See page 5 for the special builds (gauges, funnel, waterfall).</p></div>
<div class="card"><div class="num">05</div><h2>Swap the icons</h2><p class="muted">Icons are vector graphics. Recolour with <b>Graphics Format › Graphics Fill</b>, or replace via <b>Insert › Icons</b> at the same size.</p></div>
<div class="card"><div class="num">06</div><h2>Check and present</h2><p class="muted">Speaker notes on every slide explain what the slide is for and how it is built. Run <b>Review › Check Accessibility</b> before you share.</p></div>
</div>
<div class="grid g4" style="margin-top:8mm">
<div><h3>Format</h3><p>16:9 widescreen, 13.333 × 7.5 in</p></div>
<div><h3>Fonts</h3><p>Georgia (headings), Arial (body)</p></div>
<div><h3>Charts</h3><p>{n_charts} native charts on {n_chart_slides} slides, all with embedded data</p></div>
<div><h3>Works in</h3><p>PowerPoint for Windows, Mac, web, iOS and Android</p></div>
</div>{foot(2)}</div>""")

# 3 editing
pages.append(f"""<div class="page"><div class="eyebrow">How to edit</div><h1>Everything is a native, editable PowerPoint object</h1>
<div class="grid g3">
<div><h2>Slide masters &amp; layouts</h2><p class="muted">Open <b>View › Slide Master</b>. Five layouts set the background, footer and slide number:</p>
<table><tr><th>Layout</th><th>Use for</th></tr>
<tr><td><b>Vanta — Ivory</b></td><td>Default content slides</td></tr>
<tr><td><b>Vanta — White</b></td><td>Data-dense slides, tables</td></tr>
<tr><td><b>Vanta — Cobalt</b></td><td>Dashboards, key moments</td></tr>
<tr><td><b>Vanta — Blank Ivory</b></td><td>Statements, full-bleed layouts</td></tr>
<tr><td><b>Vanta — Blank Cobalt</b></td><td>Cover and closing</td></tr></table>
<p class="muted" style="margin-top:2mm">Change the footer text once in the master and it updates on every slide. To add a slide in a layout: <b>Home › New Slide</b> and pick it.</p></div>
<div><h2>Text, shapes &amp; tables</h2><ul>
<li>Standard headlines sit in the title placeholder, so they appear in the outline and accessibility tools. Statement, cover and editorial slides use free text boxes.</li>
<li>Cards, chips, rules and the orbit artwork are plain shapes — resize, recolour or delete them freely.</li>
<li>Tables are native PowerPoint tables. Add rows with <b>Layout › Insert Below</b>; table styles are kept minimal so your data reads first.</li>
<li>Data bars inside tables (slide 16, 50) are rectangles: width = value ÷ column max × bar length.</li>
<li>Group related items with <kbd>Ctrl/⌘ + G</kbd> before moving them.</li></ul></div>
<div><h2>Good habits</h2><ul>
<li>Use the <b>Selection Pane</b> (<b>Home › Arrange › Selection Pane</b>) to find objects; icons are named <i>Icon &lt;name&gt;</i>.</li>
<li>Keep the 0.7 in outer margin and the 12-column grid (0.24 in gutters) when you add content.</li>
<li>One highlight colour per slide: coral marks the single thing the audience should look at.</li>
<li>Replace sample numbers everywhere they appear — headline, chart, callouts and notes.</li>
<li>Paste with <b>Use Destination Theme</b> to keep colours and fonts consistent.</li></ul>
<div class="card" style="margin-top:3mm"><h3>No photography by design</h3><p class="muted" style="margin:0">The template uses typography, data, icons and geometric artwork only. There are no images of people to replace or license.</p></div></div>
</div>{foot(3)}</div>""")

# 4 fonts and palette
sw = ''.join(f'<tr><td><span class="sw" style="background:#{h}"></span></td><td><b>{n}</b></td><td>#{h}</td><td>{slot}</td><td class="muted">{use}</td></tr>' for n, h, slot, use in PALETTE)
pages.append(f"""<div class="page white"><div class="eyebrow">Fonts &amp; colour</div><h1>Two fonts, ten theme colours</h1>
<div class="grid" style="grid-template-columns: 1fr 1.9fr; gap: 10mm">
<div><h3>Heading font — theme “Headings”</h3><div style="font-family:'GuideSerif',Georgia,serif;font-size:30pt;line-height:1.1">Georgia</div>
<p class="muted">Headlines, statements, large numerals (italic). Use regular weight; italic coral for numerals.</p>
<h3 style="margin-top:5mm">Body font — theme “Body”</h3><div style="font-size:28pt;font-weight:700;line-height:1.1">Arial</div>
<p class="muted">Body copy, labels, KPIs, chart text, tables. Bold for figures; spaced capitals (tracking 1.2–1.8 pt) for eyebrows.</p>
<h3 style="margin-top:5mm">Why these fonts</h3><p class="muted">Both ship with Windows, macOS, iOS and Android Office, so the deck looks identical everywhere with nothing to install. To rebrand, change them once in <b>Design › Variants › Fonts › Customize Fonts</b>.</p>
<h3 style="margin-top:5mm">Type scale</h3><table><tr><td>Statements</td><td>44–54 pt</td></tr><tr><td>Slide headlines</td><td>27 pt</td></tr><tr><td>Big KPIs</td><td>22–44 pt bold</td></tr><tr><td>Body</td><td>10.5–12 pt</td></tr><tr><td>Labels / eyebrows</td><td>8–9 pt</td></tr></table></div>
<div><h3>Theme colour slots (Design › Variants › Colors)</h3><table><tr><th></th><th>Name</th><th>Hex</th><th>Theme slot</th><th>Role</th></tr>{sw}</table>
<p class="muted" style="margin-top:3mm">Shapes and text are mapped to these theme slots, so a new colour set restyles most of the deck in one step. Chart series and icons use the same values as fixed colours; after a colour change, use <b>Chart Design › Change Colors</b> or recolour a series with <b>Format Data Series › Fill</b>.</p></div>
</div>{foot(4)}</div>""")

# 5 charts
cat = ''.join(f'<tr><td><b>{e(c)}</b></td><td>{len(v)}</td><td class="muted">{", ".join(str(k) + (f" (×{m})" if m > 1 else "") for k, m in collections.Counter(v).items())}</td></tr>' for c, v in chart_use.items())
pages.append(f"""<div class="page"><div class="eyebrow">Charts</div><h1>{n_charts} native charts — edit the data, the chart follows</h1>
<div class="grid" style="grid-template-columns: 1fr 1.25fr; gap: 9mm">
<div><h2>Editing any chart</h2><ul>
<li>Right-click › <b>Edit Data</b> (on mobile: tap the chart › <b>Edit Data</b>). Type or paste values; rows and columns map to categories and series.</li>
<li><b>Chart Design › Select Data</b> to add or remove series.</li>
<li>Double-click an axis to change minimum, maximum and units; several charts use fixed bounds so similar slides compare cleanly.</li>
<li>Labels, legends and gridlines: <b>Chart Elements</b> (+) on Windows/Mac.</li>
<li>Where a slide uses its own legend or text labels next to a chart, update them after you change the data — the notes say when.</li></ul>
<h3 style="margin-top:3mm">Chart catalogue</h3><table class="tight"><tr><th>Type</th><th>#</th><th>Slides</th></tr>{cat}</table></div>
<div><h2>Special builds</h2><table class="tight">
<tr><td style="width:30%"><b>Gauges</b><br><span class="muted">slide 20</span></td><td>Doughnut with three values: [achieved, remaining, 100]. The third slice is white and forms the hidden lower half. Change only the first two (they must add up to 100).</td></tr>
<tr><td><b>Sales funnel</b><br><span class="muted">slide 29</span></td><td>Stacked bar: an invisible “offset” series centres the visible bars. Offset = (largest value − value) ÷ 2. Stage names are text boxes.</td></tr>
<tr><td><b>Waterfall</b><br><span class="muted">slide 42</span></td><td>Stacked column with an invisible Base series plus Total, Increase and Decrease series. Base = running total before the step (for decreases: after the step).</td></tr>
<tr><td><b>Highlight series</b><br><span class="muted">slides 15, 17, 48</span></td><td>Scatter and bubble charts use a separate series for the highlighted points (coral). Move a row’s value into the other series column to change what is highlighted; leave the unused cell blank.</td></tr>
<tr><td><b>Plan / target lines</b><br><span class="muted">slides 19, 27, 33</span></td><td>Combo charts: dashed lines for plan, short markers (line width 0) for targets. Change style in <b>Format Data Series › Line</b>.</td></tr>
<tr><td><b>Secondary axis</b><br><span class="muted">slides 23, 35, 41</span></td><td>The line series is on the right axis. Set its bounds independently in <b>Format Axis</b>.</td></tr>
<tr><td><b>Matrices</b><br><span class="muted">slides 17, 48</span></td><td>Quadrant fills are rectangles behind a transparent chart; bubble size shows value. Keep axes at 0–100 so quadrants line up.</td></tr></table></div>
</div>{foot(5)}</div>""")

# 6 components
pages.append(f"""<div class="page white"><div class="eyebrow">Component overview</div><h1>The building blocks behind every slide</h1>
<div class="grid g4" style="gap:5mm">
<div class="card"><h3>Eyebrow</h3><div class="eyebrow" style="margin:2mm 0 2mm">Market &amp; analysis</div><p class="muted">Coral dot + spaced capitals. Names the section above each headline.</p></div>
<div class="card"><h3>Headline + lead</h3><div style="font-family:'GuideSerif',Georgia,serif;font-size:13pt;line-height:1.15;margin:2mm 0">Growth re-accelerated in 2026</div><p class="muted">Georgia headline that states the conclusion; optional grey lead on the right gives the source or unit.</p></div>
<div class="card"><h3>KPI block</h3><div class="stat" style="margin:2mm 0 1mm">$84.2M</div><p class="muted"><span style="color:#2340C8;font-weight:700">▲ 31%</span> YoY — label, figure and change. Used in rails, dashboards and panels.</p></div>
<div class="card"><h3>Chips</h3><p style="margin:2mm 0 3mm"><span class="chip">+7.9%</span> <span class="chip coral">−10.6%</span> <span class="chip light">Goal</span></p><p class="muted">Rounded status labels for change, status and goals.</p></div>
<div class="card"><h3>Numerals</h3><div class="num" style="font-size:24pt;margin:2mm 0">01</div><p class="muted">Italic Georgia in coral for steps, priorities and lists.</p></div>
<div class="card"><h3>Panels &amp; cards</h3><div style="background:#13246B;height:12mm;margin:2mm 0 2mm;display:flex;align-items:center;padding-left:3mm;color:#FF6B4A;font-weight:700;font-size:13pt">55%</div><p class="muted">Square-cornered white, ivory, peach or deep-cobalt fills. No borders, no shadows.</p></div>
<div class="card"><h3>Icon dots</h3><div style="width:10mm;height:10mm;border-radius:50%;background:#2340C8;margin:2mm 0"></div><p class="muted">Phosphor Light vector icons, alone or on a coloured circle.</p></div>
<div class="card"><h3>Orbit artwork</h3><div style="width:14mm;height:14mm;border-radius:50%;border:1px solid #2340C8;position:relative;margin:1mm 0"><span style="position:absolute;width:3mm;height:3mm;border-radius:50%;background:#FF6B4A;right:-1mm;top:2mm"></span></div><p class="muted">Concentric rings with satellite dots on cover and closing. Plain shapes.</p></div>
<div class="card"><h3>Legends</h3><p style="margin:2mm 0;font-size:7.5pt"><span class="sw" style="width:2.5mm;height:2.5mm;background:#2340C8"></span> Revenue &nbsp; <span style="display:inline-block;width:5mm;border-top:2px solid #FF6B4A;vertical-align:middle"></span> Growth</p><p class="muted">Custom legends above charts, so they align with the grid.</p></div>
<div class="card"><h3>Tables</h3><p class="muted" style="margin-top:2mm">Native tables with a single ink header rule, hairline row dividers and optional in-cell data bars or heat fills.</p></div>
<div class="card"><h3>Grids &amp; heatmaps</h3><p style="margin:2mm 0"><span class="sw" style="width:5mm;height:5mm;background:#EEF1FC"></span><span class="sw" style="width:5mm;height:5mm;background:#B7C6F5"></span><span class="sw" style="width:5mm;height:5mm;background:#FFD3C4"></span><span class="sw" style="width:5mm;height:5mm;background:#FF6B4A"></span></p><p class="muted">Five-step scales for scores and risk.</p></div>
<div class="card"><h3>Layout grid</h3><p class="muted" style="margin-top:2mm">12 columns, 0.7 in outer margins, 0.24 in gutters. Content starts at 1.95 in below the headline; footer at 7.0 in.</p></div>
</div>{foot(6)}</div>""")

# 7 recommended usage
sec = ''.join(f'<tr><td><b>{e(n)}</b></td><td>{a}–{b}</td><td class="muted">{e(d)}</td><td class="muted">{e(", ".join(name(r) for r in rows[a-1:b]))}</td></tr>' for n, a, b, d in SECTIONS)
pages.append(f"""<div class="page"><div class="eyebrow">Recommended slide usage</div><h1 style="margin-bottom:4mm">Nine chapters you can use whole or mix</h1>
<table class="tight"><tr><th style="width:15%">Chapter</th><th style="width:7%">Slides</th><th style="width:34%">Use it to</th><th>Slides included</th></tr>{sec}</table>
<div class="grid g3" style="margin-top:5mm">
<div><h3>Board or investor update (16 slides)</h3><p class="muted">1, 4, 5, 19, 20, 23, 33, 38, 41, 42, 43, 44, 46, 49, 59, 60</p></div>
<div><h3>Sales review (12 slides)</h3><p class="muted">1, 3, 19, 21, 27, 29, 30, 31, 33, 34, 36, 60</p></div>
<div><h3>Strategy offsite (14 slides)</h3><p class="muted">1, 2, 3, 10, 11, 15, 17, 44, 45, 46, 47, 48, 50, 59</p></div>
</div>{foot(7)}</div>""")

# 8-10 slide index
for pi in range(3):
    chunk = rows[pi * 24:(pi + 1) * 24]
    cards = ''.join(f'<div class="thumb"><img src="t{r["n"]:02d}.jpg"><div class="cap"><b>{r["n"]:02d}</b>{e(name(r))}<br><span class="ct">{e(" · ".join(r["charts"])) if r["charts"] else "Layout / shapes"}</span></div></div>' for r in chunk)
    pages.append(f"""<div class="page white" style="padding-top:12mm"><div class="eyebrow">Slide index {pi + 1}/3</div><h1 style="font-size:17pt;margin:2mm 0 4mm">Slides {chunk[0]["n"]}–{chunk[-1]["n"]}</h1>
<div class="thumbs">{cards}</div>{foot(8 + pi)}</div>""")

open(os.path.join(HERE, 'guide.html'), 'w').write(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Vanta — Template 02 Guide</title><style>{css}</style></head><body>{"".join(pages)}</body></html>')
print('pages', len(pages))
