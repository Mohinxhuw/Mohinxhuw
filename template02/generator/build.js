const pptxgen = require('pptxgenjs');
const { execSync } = require('child_process');
const path = require('path');
const lib = require('./lib');

const ICONS = 'ChartBar ChartLineUp ChartPieSlice ChartDonut Target RocketLaunch UsersThree Globe Lightning ShieldCheck Gear Stack Cube Plugs Cloud Database CurrencyDollar Handshake Megaphone MagnifyingGlass Flag Compass Lightbulb TrendUp TrendDown Clock CheckCircle Check X ArrowRight ArrowUpRight Buildings Storefront ShoppingCart CreditCard Wallet Briefcase Headset DeviceMobile Code LockKey Sparkle Funnel MapPin CalendarBlank Warning Leaf Gauge ArrowsClockwise Path Eye Crown Cpu TreeStructure Coins Receipt Percent Package Truck Scales SealCheck SquaresFour Bank ChartLine Repeat Minus Plus Strategy Medal Hourglass UserCircle ListChecks Kanban PresentationChart Graph Cursor Atom EnvelopeSimple Phone'.split(' ');
const SECTIONS = (process.env.ONLY ? process.env.ONLY.split(',') : ['a_intro', 'b_context', 'c_market', 'd_perf', 'e_sales', 'f_finance', 'g_strategy', 'h_product', 'i_close']);

(async () => {
  await lib.prerenderIcons(ICONS);
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Vanta Studio';
  pres.company = 'Vanta Studio';
  pres.title = 'Vanta — Business Presentation Template 02';
  pres.theme = { headFontFace: 'Georgia', bodyFontFace: 'Arial' };
  lib.defineMasters(pres);
  const ctx = {};
  for (const s of SECTIONS) require('./sections/' + s)(pres, lib, ctx);
  const n = (pres.slides || pres._slides).length;
  console.log('slides:', n);
  await pres.writeFile({ fileName: path.join(__dirname, 'raw.pptx') });
  const out = process.env.OUT || path.join(__dirname, 'out', 'Vanta_Business_Presentation_Template_02.pptx');
  execSync(`mkdir -p "${path.dirname(out)}"`);
  execSync(`python3 post.py raw.pptx "${out}" icons`, { cwd: __dirname, stdio: 'inherit' });
  console.log('wrote', out);
})();
