// Збирач статичного сайту «Меблі Вікторія».
// Запуск: node build.mjs
// Генерує: index.html, /katalog/<категорія>/, /mebli/<модель>/, sitemap.xml, robots.txt
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

/* ─────────────────────────────────────────────
   ДОМЕН САЙТУ — замініть на реальний перед публікацією
   ───────────────────────────────────────────── */
const SITE_URL = 'https://mebli-viktoriya.com.ua';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => { const p = path.join(ROOT, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };

// Дані та шаблони беремо з тих самих файлів, що й браузер
const ctx = { window: {}, console };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(read('js/data.js'), ctx);
vm.runInContext(read('js/site.js'), ctx);
const R = code => vm.runInContext(code, ctx);
const { CATEGORIES, PRODUCTS, SITE } = ctx;
const esc = R('esc'), fmt = R('fmt'), cap = R('cap'), models = R('models'), IMG = R('IMG');
const catUrl = R('catUrl'), productUrl = R('productUrl'), ICON = R('ICON');
const abs = p => SITE_URL + p;
const countIn = slug => PRODUCTS.filter(p => p.cat === slug).length;
const catBy = slug => CATEGORIES.find(c => c.slug === slug);
const nowISO = new Date().toISOString().slice(0, 10);

// Фото моделей копіюємо під зрозумілими назвами: /img/mebli/<модель>-1.jpg
fs.mkdirSync(path.join(ROOT, 'img/mebli'), { recursive: true });
PRODUCTS.forEach(p => {
  p.photos = p.photos.map((ph, i) => {
    const name = `mebli/${p.id}-${i + 1}`;
    fs.copyFileSync(path.join(ROOT, `img/products/${ph}.jpg`), path.join(ROOT, `img/${name}.jpg`));
    return name;
  });
});

/* ───────── SEO-тексти категорій */
const CAT_SEO = {
  evroknyzhky: {
    title: 'Дивани-єврокнижки від виробника',
    text: [
      'Диван-єврокнижка — найпопулярніший вибір для щоденного сну. Сидіння висувається вперед, спинка лягає на його місце, і за кілька секунд з\'являється рівне широке спальне місце без перепадів. Під сидінням ховається ящик для білизни, а в багатьох моделях «Меблі Вікторія» є ще ніші, шухляди чи навіть бар у підлокітниках.',
      'У каталозі фабрики — прямі дивани довжиною від 1920 до 2610 мм зі спальним місцем до 2000 × 1620 мм. Частину моделей виготовляємо з механізмом «пантограф» («тік-так»): він піднімає сидіння, не торкаючись підлоги, тому береже паркет і килим. Основу обираєте самі: пружинний блок для м\'якості або букові ортопедичні ламелі для пружної «ортопедичної» посадки.',
      'Тканину, колір, наповнення та комплектацію підбираємо під ваш інтер\'єр. Щоб дізнатися ціну дивана-єврокнижки від фабрики «Меблі Вікторія», залиште заявку або зателефонуйте — консультація безкоштовна.'
    ]
  },
  kutovi: {
    title: 'Кутові дивани від фабрики «Меблі Вікторія»',
    text: [
      'Кутовий диван — центр вітальні, де збирається вся родина. Моделі «Меблі Вікторія» мають спальне місце до 2100 × 1600 мм, тож щодня замінюють двоспальне ліжко, а вдень залишають простір для гостей.',
      'Ми виготовляємо кутові дивани з механізмами «єврокнижка» та «дельфін». У «дельфіні» додатковий блок викочується з-під сидіння й піднімається на рівень спального місця. Майже в кожній моделі є короб для білизни, а в «Мілтоні», «Магнаті» та «Вероні» — ще й шухляди та ніші в підлокітниках. До «Ньюса» додаємо пуф, до «Фрегата» — приставний столик.',
      'Каркас — дерев\'яний брус і ДСП, основа — пружинний блок або ламелі. Сторону кута, тканину й комплектацію узгоджуємо з вами. Дізнайтеся ціну кутового дивана напряму від виробника — без посередників.'
    ]
  },
  knyzhky: {
    title: 'Дивани-книжки на ортопедичних ламелях',
    text: [
      'Диван-книжка — класика, яка не виходить з моди: спинка опускається до рівня сидіння, і утворюється спальне місце. Механізм простий, тому служить роками і легко розкладається щодня.',
      'Моделі «Еліс», «Ліза» та «Марина» від фабрики «Меблі Вікторія» стоять на букових ортопедичних ламелях з ППУ, мають ящик для білизни, а деякі — дерев\'яні накладки на підлокітниках і декоративні подушки в комплекті. Довжина — від 1950 до 2120 мм, тож книжка підійде і для невеликої кімнати.',
      'Оберіть тканину та колір, а ми виготовимо диван-книжку саме у вашій комплектації.'
    ]
  },
  sofy: {
    title: 'Софи та канапе для невеликих кімнат',
    text: [
      'Софа чи канапе — рішення для кухні, дитячої, дачі або маленької вітальні. Вони займають мінімум місця у складеному вигляді, а на ніч перетворюються на повноцінне спальне місце до 2000 × 1600 мм.',
      'У канапе «Венеція», «Малюк» і «Клітка» механізм «алеко»: сидіння висувається вперед разом зі спинкою. Софа «Соня» розкладається викочуванням і випускається трьох ширин — 1200, 1400 та 1600 мм, з різними боковинами на вибір.',
      'Усі моделі мають місце для зберігання. Тканину, ширину та комплектацію підберемо під ваш простір.'
    ]
  },
  krisla: {
    title: 'Крісла-ліжка та крісла до диванів',
    text: [
      'Крісло-ліжко — повноцінне спальне місце в мінімумі простору. Модель «Вега» випускаємо шириною 0,8, 1,1 та 1,4 м: вдень це компактне крісло або міні-диван, а вночі — ліжко довжиною 1970 мм на букових ламелях.',
      'Механізм висувний: спальна частина викочується вперед, тому розкласти крісло може навіть дитина. Під сидінням — ящик для білизни. Для дитячої кімнати також є крісло-софа «Теді» з ламінованим коробом.',
      'Окремо виготовляємо крісла в комплект до диванів «Мустанг», «Ультра», «Малюк», «Ніка» та «Магнат» — розкладні й нерозкладні.'
    ]
  },
  dytyachi: {
    title: 'Дитячі дивани',
    text: [
      'Дитячі дивани «Дельфін» і «Школяр» від фабрики «Меблі Вікторія» поєднують яскравий дизайн і зручне спальне місце довжиною до 2050 мм. Бортик береже від падіння, а ящик для білизни вміщує постіль або іграшки.',
      '«Дельфін» має пружинний блок і висувний механізм, «Школяр» розкладається як єврокнижка. Колір і тканину підберемо під дитячу кімнату.'
    ]
  },
  lizhka: {
    title: "М'які ліжка з підйомним механізмом",
    text: [
      "М'які ліжка «Меблі Вікторія» мають підйомну основу на газліфтах: вона піднімається без зусиль і відкриває великий ящик для білизни на всю площу ліжка. Ширина спального місця — від 900 до 1600 мм.",
      "Узголів'я — на ваш смак: каретна стяжка в «Джулії», геометричний візерунок у «Геометрії» та «Лолі», вертикальні панелі в «Адель». Для власного матраца є розбірна модель на металевому каркасі ламелевої рами — її зручно транспортувати.",
      'Тканину й колір обираєте з каталогу зразків. Дізнайтеся ціну ліжка напряму від виробника.'
    ]
  },
  kukhonni: {
    title: 'Кухонні куточки під розмір вашої кухні',
    text: [
      'Кухонний куточок економить місце й додає кухні затишку. У моделях «Дорд», «Оскар», «Цезар» і «Елегант» під сидіннями є ніші для зберігання — для консервації, посуду чи текстилю.',
      'Довжину сегментів змінюємо під вашу кухню: у «Цезарі» — кратно 170 мм. Оббивка з легкої в догляді екошкіри або тканини, колір — на вибір, можна поєднати два кольори.',
      'Надішліть розміри кухні — менеджер фабрики «Меблі Вікторія» підбере куточок і порахує вартість.'
    ]
  }
};

/* ───────── Пояснення механізмів для описів моделей */
const MECH = [
  [/пантограф|тік/i, 'Механізм «пантограф» («тік-так») піднімає сидіння й переставляє його вперед, не торкаючись підлоги, тому не дряпає покриття й не мне килим.'],
  [/єврокниж/i, 'Механізм «єврокнижка» — один із найнадійніших: сидіння висувається вперед, спинка лягає на його місце, і виходить рівне широке спальне місце без перепадів.'],
  [/книжка/i, 'Класичний механізм «книжка»: спинка опускається до рівня сидіння й утворює спальне місце. Конструкція проста, тому служить довго.'],
  [/дельфін/i, 'У механізмі «дельфін» додатковий блок викочується з-під сидіння й піднімається на рівень спального місця — диван за секунду стає великим ліжком.'],
  [/алеко/i, 'Механізм «алеко»: сидіння висувається вперед разом зі спинкою, тому модель легко розкладається й займає мало місця у складеному вигляді.'],
  [/газліфт/i, 'Підйомна основа на газліфтах піднімається без зусиль і відкриває великий ящик для білизни на всю площу ліжка.'],
  [/вику|викат|висувн/i, 'Висувний механізм: спальна частина викочується вперед, тому розкласти модель може навіть дитина.']
];
const mechText = m => { const hit = m && MECH.find(([re]) => re.test(m)); return hit ? hit[1] : ''; };
const mechKey = m => {
  if (!m) return [];
  return [...new Set(String(m).split(/ або |,/).map(s => {
    s = s.toLowerCase();
    if (s.includes('пантограф') || s.includes('тік')) return 'Пантограф';
    if (s.includes('єврокниж')) return 'Єврокнижка';
    if (s.includes('книж')) return 'Книжка';
    if (s.includes('дельфін')) return 'Дельфін';
    if (s.includes('алеко')) return 'Алеко';
    if (s.includes('газліфт')) return 'Газліфт';
    if (s.includes('вику') || s.includes('викат') || s.includes('висувн')) return 'Висувний';
    return null;
  }).filter(Boolean))];
};
const lenOf = p => { const n = String(p.d || '').split('×').pop().match(/\d+/); return n ? +n[0] : 0; };
const sleepOf = p => { const m = String(p.s || '').match(/(\d{3,4})\s*[×x]\s*(\d{3,4})/); return m ? +m[1] * +m[2] : 0; };
const fullName = p => `${p.type} «${p.name}»`;

function productDescription(p) {
  const cat = catBy(p.cat);
  const out = [];
  let s = `${fullName(p)} — модель фабрики м'яких меблів «Меблі Вікторія» з категорії «${cat.name.toLowerCase()}».`;
  if (p.d) s += ` Габарити ${fmt(p.d)} мм (висота × глибина × довжина)`;
  if (p.s) s += `${p.d ? ',' : ' Спальне місце'} ${p.d ? 'спальне місце ' : ''}${fmt(p.s)} мм`;
  if (p.d || p.s) s += '.';
  out.push(s);
  const mt = mechText(p.m);
  if (mt) out.push(mt);
  const extra = [];
  if (p.f) extra.push(`Наповнення: ${p.f}.`);
  if (p.n) extra.push(p.n);
  if (extra.length) out.push(extra.join(' '));
  out.push(`Тканину, колір і комплектацію підбираємо під замовника: однотонний велюр, рогожка, екошкіра або поєднання двох тканин. Щоб дізнатися ціну моделі «${p.name}» у вибраній тканині, залиште заявку на сайті або зателефонуйте ${SITE.phone} — консультація безкоштовна.`);
  return out;
}

/* ───────── Спільні частини сторінки */
const ORG = {
  '@type': 'Organization',
  '@id': abs('/#org'),
  name: 'Меблі Вікторія',
  alternateName: ['Фабрика Меблі Вікторія', 'Mebli Viktoriia', 'Mebli Viktoria', 'Мебли Виктория'],
  url: abs('/'),
  logo: abs('/img/logo.png'),
  telephone: SITE.phone.replace(/\s/g, ''),
  email: SITE.email,
  areaServed: { '@type': 'Country', name: 'Україна' },
  contactPoint: { '@type': 'ContactPoint', telephone: SITE.phone.replace(/\s/g, ''), contactType: 'sales', availableLanguage: ['uk'] }
};
const crumbsLd = items => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(url) }))
});
const crumbsHtml = items => `<nav class="crumbs" aria-label="Хлібні крихти">${items.map(([name, url], i) =>
  i < items.length - 1 ? `<a href="${url}">${esc(name)}</a><span>/</span>` : `<span aria-current="page">${esc(name)}</span>`).join('')}</nav>`;

function page({ url, title, description, image, body, ld = [], active = '' }) {
  const graph = { '@context': 'https://schema.org', '@graph': [ORG, ...ld] };
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${abs(url)}">
  <link rel="alternate" hreflang="uk-UA" href="${abs(url)}">
  <link rel="alternate" hreflang="x-default" href="${abs(url)}">
  <meta name="geo.region" content="UA">
  <meta name="theme-color" content="#f7f4ee">
  <meta property="og:type" content="${url === '/' ? 'website' : 'article'}">
  <meta property="og:site_name" content="Меблі Вікторія">
  <meta property="og:locale" content="uk_UA">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${abs(url)}">
  <meta property="og:image" content="${abs(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/img/logo.png">
  <link rel="apple-touch-icon" href="/img/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
${R(`renderHeader(${JSON.stringify(active)})`)}
${body}
${R('renderFooter()')}
  <script src="/js/data.js" defer></script>
  <script src="/js/site.js" defer></script>
</body>
</html>
`;
}
const form = opts => R(`renderForm(${JSON.stringify(opts)})`);
const reviewsSection = `
    <section class="section" id="reviews">
      <div class="wrap">
        <div class="section-head">
          <h2>Відгуки покупців</h2>
          <p>Що кажуть про моделі нашої фабрики</p>
        </div>
        <div class="greviews">${R('renderReviews()')}</div>
      </div>
    </section>`;
const FAQ = R('FAQ');
const faqSection = `
    <section class="section" id="faq">
      <div class="wrap faq">
        <div class="faq__side">
          <h2>Часті питання про меблі</h2>
          <p>Не знайшли відповіді? Зателефонуйте або залиште заявку, консультація безкоштовна</p>
          <a class="btn btn--ghost" href="#order">Поставити питання</a>
        </div>
        <div class="faq__list">${R('renderFaq()')}</div>
      </div>
    </section>`;
const faqLd = { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

/* ───────── Головна */
function buildHome() {
  const cats = CATEGORIES.map(c => `
      <a class="cat" href="${catUrl(c.slug)}">
        <div class="cat__img"><img src="${IMG(c.cover)}" alt="${esc(c.name)} — Меблі Вікторія" loading="lazy"></div>
        <div class="cat__body"><h3>${esc(c.name)}</h3><span class="cat__count">${countIn(c.slug)} ${ICON.arrow}</span></div>
      </a>`).join('');
  const seo = `
    <section class="section" id="pro-fabryku">
      <div class="wrap seo">
        <h2>Меблі Вікторія — українська фабрика м'яких меблів</h2>
        <div class="seo__cols">
          <div>
            <p><b>Меблі Вікторія</b> — фабрика, яка сама виготовляє м'які меблі для дому: від дерев'яного каркаса до пошиття чохла. У каталозі ${models(PRODUCTS.length)}: <a href="${catUrl('evroknyzhky')}">дивани-єврокнижки</a>, <a href="${catUrl('kutovi')}">кутові дивани</a>, <a href="${catUrl('knyzhky')}">дивани-книжки</a>, <a href="${catUrl('sofy')}">софи та канапе</a>, <a href="${catUrl('krisla')}">крісла-ліжка</a>, <a href="${catUrl('dytyachi')}">дитячі дивани</a>, <a href="${catUrl('lizhka')}">м'які ліжка з підйомним механізмом</a> і <a href="${catUrl('kukhonni')}">кухонні куточки</a>.</p>
            <p>Купуючи меблі напряму у виробника, ви спілкуєтеся з людьми, які знають кожну модель зсередини. Тому ми можемо змінити диван під ваш дім: поставити пружинний блок замість ламелей, додати шухляди чи ніші в підлокітники, підібрати іншу кількість подушок або поєднати дві тканини.</p>
          </div>
          <div>
            <p>Для кожної моделі на сайті є габарити, розмір спального місця, механізм трансформації та наповнення — так простіше зрозуміти, чи стане диван у вашій кімнаті. Найбільше спальне місце в каталозі — 2100 × 1600 мм, найкомпактніше крісло-ліжко — шириною 800 мм.</p>
            <p>Шукаєте «Меблі Вікторія» каталог 2026–2027 з цінами? Оберіть модель і залиште заявку або зателефонуйте <a href="${SITE.phoneHref}">${SITE.phone}</a> — менеджер фабрики проконсультує безкоштовно, порахує вартість у вибраній тканині та назве терміни виготовлення.</p>
          </div>
        </div>
      </div>
    </section>`;
  let body = read('src/home.html')
    .replace('{{HEADER}}', '').replace('{{FOOTER}}', '')
    .replace('{{FORM}}', form({ img: 'marsel' }))
    .replace('{{CATS}}', cats)
    .replace('{{REVIEWS}}', R('renderReviews()'))
    .replace('{{FAQ}}', R('renderFaq()'))
    .replace('{{SEO}}', seo)
    .replace('{{COUNT}}', PRODUCTS.length)
    .replace('{{COUNT_LABEL}}', models(PRODUCTS.length).replace(/^\d+\s/, ''));
  write('index.html', page({
    url: '/',
    title: "Меблі Вікторія — фабрика м'яких меблів в Україні",
    description: `Меблі Вікторія — фабрика м'яких меблів: дивани, кутові дивани, ліжка й кухонні куточки від виробника. ${models(PRODUCTS.length)}, ☎ ${SITE.phone}`,
    image: '/img/hero/spays-kut.webp',
    active: 'home',
    body,
    ld: [{ '@type': 'WebSite', '@id': abs('/#site'), name: 'Меблі Вікторія', url: abs('/'), inLanguage: 'uk-UA', publisher: { '@id': abs('/#org') } }, faqLd]
  }));
}

/* ───────── Категорії */
function buildCategory(cat) {
  const items = PRODUCTS.filter(p => p.cat === cat.slug);
  const url = catUrl(cat.slug);
  const seo = CAT_SEO[cat.slug];
  const mechs = {};
  items.forEach(p => mechKey(p.m).forEach(k => mechs[k] = (mechs[k] || 0) + 1));
  const mk = Object.keys(mechs);
  const chips = mk.length > 1
    ? [`<button type="button" class="chip is-active" data-m="">Усі <em>${items.length}</em></button>`, ...mk.map(k => `<button type="button" class="chip" data-m="${k}">${k} <em>${mechs[k]}</em></button>`)].join('')
    : '';
  const best = items.map(p => String(p.s || '').match(/(\d{3,4})\s*[×x]\s*(\d{3,4})/)).filter(Boolean).map(m => [+m[1], +m[2]]).sort((a, b) => b[0] * b[1] - a[0] * a[1])[0];
  const cards = items.map((p, i) => R('productCard')(p,
    ` data-i="${i}" data-mech="${mechKey(p.m).join('|')}" data-name="${esc((p.name + ' ' + p.type).toLowerCase())}" data-len="${lenOf(p)}" data-sleep="${sleepOf(p)}"`)).join('');
  const others = CATEGORIES.filter(c => c.slug !== cat.slug).map(c => `<a class="chip" href="${catUrl(c.slug)}">${esc(c.short)}</a>`).join('');
  const crumbs = [['Головна', '/'], ['Каталог', '/#catalog'], [cat.name, url]];
  const body = `
  <main>
    <section class="c-hero">
      <div class="wrap c-hero__grid">
        <div class="c-hero__text">
          ${crumbsHtml(crumbs)}
          <h1>${esc(cat.name)}</h1>
          <p>${esc(cat.lead)}</p>
          <div class="c-hero__meta">
            <div><b>${items.length}</b><span>моделей у категорії</span></div>
            ${best ? `<div><b>${Math.max(...best)} × ${Math.min(...best)}</b><span>мм, найбільше спальне місце</span></div>` : ''}
          </div>
          <a class="btn btn--primary" href="#models">Дивитися моделі ${ICON.arrow}</a>
        </div>
        <div class="c-hero__img"><img src="${IMG(cat.cover)}" alt="${esc(cat.name)} від фабрики Меблі Вікторія" fetchpriority="high"></div>
      </div>
      <div class="wrap"><nav class="cat-nav" aria-label="Інші категорії">${others}</nav></div>
    </section>

    <section class="section" id="models">
      <div class="wrap">
        <div class="section-head">
          <h2>Моделі: ${esc(cat.name.toLowerCase())}</h2>
          <p>Натисніть на модель, щоб побачити всі розміри, наповнення та фото</p>
        </div>
        <div class="toolbar">
          <div class="chips" id="mechChips">${chips}</div>
          <div class="toolbar__right">
            <label class="search">${ICON.search}<input id="q" type="search" placeholder="Пошук" aria-label="Пошук моделі"></label>
            <select class="sort" id="sort" aria-label="Сортування">
              <option value="">За замовчуванням</option>
              <option value="name">За назвою</option>
              <option value="len-asc">Спочатку компактні</option>
              <option value="len-desc">Спочатку великі</option>
              <option value="sleep">Найбільше спальне місце</option>
            </select>
          </div>
        </div>
        <div class="products" id="products">${cards}</div>
        <div class="empty" id="productsEmpty" hidden>Нічого не знайдено. Спробуйте інший запит або <a class="link" href="#order">залиште заявку</a></div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">${form({ cat: cat.slug, img: 'nyus', title: 'Підберемо модель під вашу кімнату', text: 'Залиште номер. Менеджер уточнить розміри кімнати, допоможе з тканиною й наповненням та назве ціну' })}</div>
    </section>

    <section class="section">
      <div class="wrap seo">
        <h2>${esc(seo.title)}</h2>
        <div class="seo__cols">${seo.text.map(t => `<p>${esc(t)}</p>`).join('')}</div>
      </div>
    </section>
${reviewsSection}
${faqSection}
  </main>`;
  write(`katalog/${cat.slug}/index.html`, page({
    url,
    title: `${cat.name} від виробника | Меблі Вікторія`,
    description: `${cat.name} від фабрики «Меблі Вікторія»: ${models(items.length)} з розмірами й фото. Тканина та наповнення на вибір, ☎ ${SITE.phone}`,
    image: IMG(cat.cover),
    body,
    ld: [
      crumbsLd(crumbs),
      { '@type': 'CollectionPage', name: cat.name, url: abs(url), inLanguage: 'uk-UA', isPartOf: { '@id': abs('/#site') },
        mainEntity: { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(productUrl(p.id)), name: fullName(p) })) } },
      faqLd
    ]
  }));
}

/* ───────── Сторінки моделей */
function buildProduct(p) {
  const cat = catBy(p.cat);
  const url = productUrl(p.id);
  const rows = [
    p.d && ['Висота × глибина × довжина', `${fmt(p.d)} мм`, 1],
    p.s && ['Спальне місце', `${fmt(p.s)} мм`, 1],
    p.m && ['Механізм трансформації', cap(p.m)],
    ...(p.x || []).map(([k, v]) => [k, v, 1]),
    p.f && ['Наповнення', cap(p.f)]
  ].filter(Boolean);
  const desc = productDescription(p);
  const siblings = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id);
  const idx = PRODUCTS.filter(x => x.cat === p.cat).findIndex(x => x.id === p.id);
  const related = [...siblings.slice(idx), ...siblings.slice(0, idx)].slice(0, 6);
  const crumbs = [['Головна', '/'], [cat.name, catUrl(cat.slug)], [p.name, url]];
  const alt = `${fullName(p)} — Меблі Вікторія`;
  const body = `
  <main>
    <section class="p-hero">
      <div class="wrap">
        ${crumbsHtml(crumbs)}
        <div class="pd pd--page">
          <div class="pd__gallery">
            <div class="pd__main"><img src="${IMG(p.photos[0])}" alt="${esc(alt)}" fetchpriority="high"></div>
            ${p.photos.length > 1 ? `<div class="pd__thumbs">${p.photos.map((ph, i) => `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-src="${IMG(ph)}" aria-label="Фото ${i + 1}"><img src="${IMG(ph)}" alt="${esc(alt)}, фото ${i + 1}" loading="lazy"></button>`).join('')}</div>` : ''}
          </div>
          <div class="pd__info">
            <div class="pd__type">${esc(p.type)}${p.tag ? ` · ${esc(p.tag)}` : ''}</div>
            <h1>${esc(fullName(p))}</h1>
            ${p.n ? `<div class="pd__note">${esc(p.n)}</div>` : ''}
            <table class="spec-table"><tbody>${rows.map(([k, v, m]) => `<tr><th>${esc(k)}</th><td${m ? ' class="mono"' : ''}>${esc(v)}</td></tr>`).join('')}</tbody></table>
            <div class="pd__actions">
              <a class="btn btn--primary" href="#order">Дізнатися ціну ${ICON.arrow}</a>
              <a class="btn btn--ghost" href="${SITE.phoneHref}">${SITE.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap seo seo--narrow">
        <h2>Про модель «${esc(p.name)}»</h2>
        ${desc.map(t => `<p>${esc(t)}</p>`).join('\n        ')}
      </div>
    </section>

    <section class="section">
      <div class="wrap">${form({ cat: p.cat, img: 'nyus', title: `Дізнайтеся ціну моделі «${p.name}»`, text: 'Залиште номер. Менеджер порахує вартість у вибраній тканині, підкаже з наповненням і назве терміни виготовлення', msg: `Цікавить модель «${p.name}» (${p.type.toLowerCase()})` })}</div>
    </section>

    ${related.length ? `<section class="section">
      <div class="wrap">
        <div class="section-head">
          <h2>Інші моделі: ${esc(cat.name.toLowerCase())}</h2>
          <p><a class="link" href="${catUrl(cat.slug)}">Усі ${models(countIn(cat.slug))} категорії</a></p>
        </div>
        <div class="products">${related.map(x => R('productCard')(x)).join('')}</div>
      </div>
    </section>` : ''}
  </main>`;
  const props = rows.map(([k, v]) => ({ '@type': 'PropertyValue', name: k, value: v }));
  write(`mebli/${p.id}/index.html`, page({
    url,
    title: `${fullName(p)}: розміри й фото | Меблі Вікторія`,
    description: `${fullName(p)} від фабрики «Меблі Вікторія»${p.d ? `: ${fmt(p.d)} мм` : ''}${p.s ? `, спальне місце ${fmt(p.s)} мм` : ''}${p.m ? `, механізм ${p.m}` : ''}. Тканина й наповнення на вибір. ☎ ${SITE.phone}`,
    image: IMG(p.photos[0]),
    body,
    ld: [
      crumbsLd(crumbs),
      { '@type': 'Product', name: fullName(p), url: abs(url), image: p.photos.map(ph => abs(IMG(ph))), description: desc.slice(0, 3).join(' '),
        category: cat.name, brand: { '@type': 'Brand', name: 'Меблі Вікторія' }, manufacturer: { '@id': abs('/#org') }, additionalProperty: props }
    ]
  }));
}

/* ───────── Старі посилання category.html?c=… → нові сторінки */
function buildRedirect() {
  write('category.html', `<!DOCTYPE html>
<html lang="uk"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Каталог — Меблі Вікторія</title>
<script>var c=new URLSearchParams(location.search).get('c')||'evroknyzhky';location.replace('/katalog/'+c+'/');</script>
</head><body><a href="/">Меблі Вікторія</a></body></html>
`);
}

/* ───────── sitemap.xml і robots.txt */
function buildSitemap() {
  const urls = [['/', '1.0'], ...CATEGORIES.map(c => [catUrl(c.slug), '0.8']), ...PRODUCTS.map(p => [productUrl(p.id), '0.6'])];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr]) => `  <url><loc>${abs(u)}</loc><lastmod>${nowISO}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`);
  write('robots.txt', `User-agent: *
Allow: /
Disallow: /src/
Disallow: /category.html

Sitemap: ${abs('/sitemap.xml')}
`);
}

function buildLlms() {
  write('llms.txt', `# Меблі Вікторія

> Меблі Вікторія — українська фабрика м'яких меблів. Власне виробництво диванів, кутових диванів, ліжок, крісел-ліжок і кухонних куточків. Тканина, наповнення й комплектація під замовника. Телефон: ${SITE.phone}.

## Каталог
${CATEGORIES.map(c => `- [${c.name}](${abs(catUrl(c.slug))}): ${c.lead}`).join('\n')}

## Моделі
${PRODUCTS.map(p => `- [${fullName(p)}](${abs(productUrl(p.id))})${p.d ? `: ${fmt(p.d)} мм` : ''}${p.s ? `, спальне місце ${fmt(p.s)} мм` : ''}`).join('\n')}
`);
}

buildHome();
buildLlms();
CATEGORIES.forEach(buildCategory);
PRODUCTS.forEach(buildProduct);
buildRedirect();
buildSitemap();
console.log(`Готово: головна, ${CATEGORIES.length} категорій, ${PRODUCTS.length} сторінок моделей, sitemap.xml, robots.txt`);
