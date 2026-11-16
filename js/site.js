/* ─────────────────────────────────────────────
   КОНТАКТИ — замініть на реальні дані фабрики
   ───────────────────────────────────────────── */
var SITE = window.SITE = {
  name: 'Меблі Вікторія',
  phone: '+380 50 400 64 42',
  phoneHref: 'tel:+380504006442',
  email: 'info@mebli-viktoriya.example',
  city: 'Україна',                 // ← місто / район фабрики
  hours: 'Пн–Пт 9:00–18:00, Сб 10:00–15:00',
  instagram: '#',
  facebook: '#',
  telegram: '#',
  viber: '#',
  googleReviews: '#'                // ← посилання на ваш профіль у Google Maps
};

const IMG = id => String(id).includes('/') ? `/img/${id}.jpg` : `/img/products/${id}.jpg`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const ICON = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 15l12-12 6 6-12 12z"/><path d="M7 11l2 2M10 8l2 2M13 5l2 2"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5.5h-3c-2.2 0-4 1.8-4 4V12H7.5v3.5H10V22h3.5v-6.5H16l.8-3.5h-3.3V9.8c0-.5.3-.8.5-.8z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.6L2.9 10.8c-1.2.5-1.2 1.3-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5zM8.6 13.6l9.3-5.9c.5-.3.9-.1.5.2l-7.9 7.2-.3 3.3z"/></svg>'
};

const models = n => { const a = n % 10, b = n % 100; return `${n} ${a === 1 && b !== 11 ? 'модель' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 'моделі' : 'моделей'}`; };
const countIn = slug => PRODUCTS.filter(p => p.cat === slug).length;
const catBySlug = slug => CATEGORIES.find(c => c.slug === slug);
const catUrl = slug => `/katalog/${slug}/`;
const productUrl = id => `/mebli/${id}/`;

/* ───────── Header */
function renderHeader(active) {
  const menu = CATEGORIES.map(c => `
    <a href="${catUrl(c.slug)}"><img src="${IMG(c.cover)}" alt="" loading="lazy"><div><b>${c.name}</b><span>${models(countIn(c.slug))}</span></div></a>`).join('');
  const home = active === 'home' ? '' : '/';
  return `
  <header class="header" id="header"><div class="wrap">
    <a href="/" class="brand" aria-label="Меблі Вікторія — на головну">
      <img src="/img/logo.png" alt="Логотип Меблі Вікторія" width="44" height="44">
      <span class="brand__name">Меблі Вікторія<small>фабрика м'яких меблів</small></span>
    </a>
    <nav class="nav" aria-label="Головне меню">
      <div class="nav__drop" id="navDrop">
        <button type="button" aria-expanded="false" aria-haspopup="true">Каталог ${ICON.chev}</button>
        <div class="nav__menu">${menu}</div>
      </div>
      <a href="${home}#about">Про нас</a>
      <a href="${home}#how">Як ми працюємо</a>
      <a href="${home}#reviews">Відгуки</a>
      <a href="${home}#faq">Питання</a>
      <a href="#contacts">Контакти</a>
    </nav>
    <div class="header__cta">
      <a class="header__phone" href="${SITE.phoneHref}">${SITE.phone}</a>
      <a class="btn btn--primary btn--sm" href="#order">Отримати консультацію</a>
      <button class="burger" type="button" aria-label="Меню" id="burger"><span></span></button>
    </div>
  </div></header>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/">Головна</a>
    <div class="sub">${CATEGORIES.map(c => `<a href="${catUrl(c.slug)}">${c.name}</a>`).join('')}</div>
    <a href="${home}#about">Про нас</a>
    <a href="${home}#how">Як ми працюємо</a>
    <a href="${home}#reviews">Відгуки</a>
    <a href="${home}#faq">Питання</a>
    <a href="${SITE.phoneHref}">${SITE.phone}</a>
    <a class="btn btn--primary" href="#order">Отримати консультацію</a>
  </div>`;
}

/* ───────── Footer */
function renderFooter() {
  return `
  <footer class="footer" id="contacts"><div class="wrap">
    <div class="footer__grid">
      <div>
        <a href="/" class="brand"><img src="/img/logo.png" alt="" width="44" height="44"><span class="brand__name">Меблі Вікторія<small>фабрика м'яких меблів</small></span></a>
        <p class="footer__about">Дивани, ліжка й кухонні куточки з власного виробництва. Тканину, наповнення й комплектацію підбираємо під ваш дім.</p>
        <div class="socials">
          <a href="${SITE.instagram}" aria-label="Instagram">${ICON.ig}</a>
          <a href="${SITE.facebook}" aria-label="Facebook">${ICON.fb}</a>
          <a href="${SITE.telegram}" aria-label="Telegram">${ICON.tg}</a>
        </div>
      </div>
      <div>
        <h4>Каталог</h4>
        <ul>${CATEGORIES.slice(0, 4).map(c => `<li><a href="${catUrl(c.slug)}">${c.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>&nbsp;</h4>
        <ul>${CATEGORIES.slice(4).map(c => `<li><a href="${catUrl(c.slug)}">${c.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Контакти</h4>
        <ul>
          <li><a class="footer__phone" href="${SITE.phoneHref}">${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>${SITE.city}</li>
          <li>${SITE.hours}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 Меблі Вікторія</span>
      <span>Фото з каталогу фабрики 2026–2027</span>
    </div>
  </div></footer>`;
}

/* ───────── Lead form */
function renderForm(opts = {}) {
  const options = CATEGORIES.map(c => `<option value="${esc(c.name)}"${opts.cat === c.slug ? ' selected' : ''}>${c.name}</option>`).join('');
  return `
  <div class="lead" id="order">
    <div class="lead__text">
      <h2>${opts.title || 'Підберемо модель під вашу кімнату'}</h2>
      <p>${opts.text || 'Залиште номер. Менеджер уточнить розміри кімнати, допоможе з механізмом і тканиною та назве ціну обраної моделі.'}</p>
      <img class="lead__img" src="/img/hero/${opts.img || 'marsel'}.webp" alt="" loading="lazy">
    </div>
    <form class="form" id="leadForm" novalidate>
      <h3>Заявка на консультацію</h3>
      <p class="sub">Передзвонимо протягом робочого дня</p>
      <div class="row-2">
        <div class="field"><label for="f-name">Ім'я</label><input id="f-name" name="name" autocomplete="name" placeholder="Ім'я" required></div>
        <div class="field"><label for="f-phone">Телефон</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+380" required></div>
      </div>
      <div class="field"><label for="f-cat">Що шукаєте</label><select id="f-cat" name="category"><option value="">Оберіть категорію</option>${options}</select></div>
      <div class="field"><label for="f-msg">Модель або побажання</label><textarea id="f-msg" name="message" placeholder="Кутовий диван до 2500 мм, сіра тканина">${esc(opts.msg || '')}</textarea></div>
      <button class="btn btn--primary btn--block" type="submit">Отримати консультацію ${ICON.arrow}</button>
      <small>Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних</small>
      <div class="form__ok" role="status">
        <div class="ok-ic">${ICON.check}</div>
        <h3>Заявку прийнято</h3>
        <p class="muted">Менеджер передзвонить протягом робочого дня</p>
      </div>
    </form>
  </div>`;
}

function bindForm() {
  if (typeof document === 'undefined') return;
  const form = $('#leadForm');
  if (!form) return;
  const phone = $('#f-phone', form);
  phone.addEventListener('input', () => { phone.value = phone.value.replace(/[^\d+()\-\s]/g, ''); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const name = $('#f-name', form);
    [[name, name.value.trim().length > 1], [phone, phone.value.replace(/\D/g, '').length >= 10]].forEach(([el, valid]) => {
      el.closest('.field').classList.toggle('is-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) return;
    const data = Object.fromEntries(new FormData(form));
    /* Підключіть відправку тут: Telegram-бот, Formspree, CRM тощо.
       fetch('https://formspree.io/f/XXXX', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); */
    console.info('Заявка:', data);
    form.classList.add('is-sent');
  });
}

/* ───────── Reviews (приклади — замініть реальними відгуками клієнтів) */
const REVIEWS = [
  { n: 'Олена Коваль', d: '2 тижні тому', m: 'Кутовий диван «Мілтон»', t: 'Найбільше сподобались шухляди й висувний столик у підлокітнику — тепер там пульти й книжки. Розкладається легко, спальне місце рівне, без перепадів.' },
  { n: 'Андрій Мельник', d: 'місяць тому', m: 'Диван «Алегро»', t: 'Брали через високі ніжки: робот-пилосос спокійно проїжджає під диваном. Тканину обрали по зразках, менеджер підказав зносостійку.' },
  { n: 'Ірина Бондар', d: 'місяць тому', m: 'Ліжко «Геометрія»', t: 'Ящик під матрацом величезний, газліфти піднімають основу без зусиль. Узголів\'я виглядає дорожче, ніж коштує.' },
  { n: 'Сергій Ткаченко', d: '2 місяці тому', m: 'Кухонний куточок «Цезар»', t: 'Нам підігнали довжину сегментів під нашу кухню — стало ідеально в нішу. Під сидіннями зберігаємо консервацію.' },
  { n: 'Марія Шевчук', d: '3 місяці тому', m: 'Крісло-ліжко «Вега 1,1»', t: 'Купили в дитячу. Вдень займає мінімум місця, на ніч розкладається за секунду. Ламелі з бука — спати зручно.' },
  { n: 'Віктор Савчук', d: '4 місяці тому', m: 'Диван «Спайс»', t: 'Спальне місце 2000×1600 — як повноцінне ліжко. Пружинний блок тримає форму, сидіти теж комфортно.' }
];
const G_LOGO = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
const AVATAR_BG = ['#7b5ea7', '#2f7d6d', '#c0603a', '#3a6fb0', '#a0475f', '#5d7a2e'];
const starRow = n => `<span class="gstars" aria-label="${n} з 5">${ICON.star.repeat(n)}</span>`;
function renderReviews() {
  const avg = (REVIEWS.length ? 5 : 0).toFixed(1).replace('.', ',');
  const head = `
    <div class="gsum">
      <div class="gsum__brand">${G_LOGO}<div><b>Відгуки в Google</b><span>Меблі Вікторія</span></div></div>
      <div class="gsum__score"><b>${avg}</b>${starRow(5)}<span>${REVIEWS.length} відгуків</span></div>
      <a class="btn btn--ghost btn--sm" href="${SITE.googleReviews}" target="_blank" rel="noopener">Залишити відгук</a>
    </div>`;
  const cards = REVIEWS.map((r, i) => `
    <article class="grev">
      <header class="grev__head">
        <div class="grev__ava" style="background:${AVATAR_BG[i % AVATAR_BG.length]}">${r.n[0]}</div>
        <div class="grev__who"><b>${r.n}</b><span>${r.d}</span></div>
        <span class="grev__g">${G_LOGO}</span>
      </header>
      ${starRow(5)}
      <p>${r.t}</p>
      <span class="grev__model">${r.m}</span>
    </article>`).join('');
  return head + `<div class="greviews__grid">${cards}</div>`;
}

/* ───────── FAQ */
const FAQ = [
  ['Чи можна змінити тканину або колір дивана?', 'Так. Кожну модель виготовляємо в тканині, яку ви оберете: велюр, рогожка, шеніл, екошкіра та інші. Можна поєднати дві тканини — наприклад, корпус однотонний, а подушки з малюнком.'],
  ['Що краще: пружинний блок чи ортопедичні ламелі?', 'Пружинний блок дає м\'якше сидіння й рівномірно розподіляє навантаження. Букові ламелі з ППУ — пружніше, «ортопедичне» відчуття. Більшість моделей у каталозі можна виготовити в обох варіантах.'],
  ['Який механізм трансформації обрати?', '«Єврокнижка» — найпопулярніша: просто висуньте сидіння й опустіть спинку. «Пантограф» (тік-так) піднімає сидіння без тертя об підлогу — береже покриття. «Дельфін» — у кутових диванах, «алеко» та викочування — у канапе й кріслах-ліжках, газліфт — у ліжках.'],
  ['Чи можна виготовити диван під мої розміри?', 'Для кухонних куточків довжину сегментів змінюємо під вашу кухню. Для диванів і ліжок можливі зміни комплектації: ніші чи шухляди в підлокітниках, кількість подушок, накладки з МДФ. Деталі — у менеджера.'],
  ['Чи є ящик для білизни?', 'Так, у більшості моделей: ламінована скринька або короб для білизни під сидінням, у багатьох — ще й ніші та шухляди в підлокітниках. У ліжок — великий ящик під підйомною основою.'],
  ['Як дізнатися ціну і терміни?', 'Ціна залежить від моделі, тканини та наповнення. Залиште заявку або зателефонуйте — менеджер порахує вартість і назве терміни виготовлення та доставки.']
];
function renderFaq() {
  return FAQ.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<i></i></summary><div class="answer">${a}</div></details>`).join('');
}

/* ───────── Product card + dialog */
const fmt = v => String(v || '').replace(/\s*×\s*/g, ' × ').replace(/\s*\/\s*/g, ' / ');
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : '';

function productCard(p, attrs = '') {
  return `
  <a class="product" href="${productUrl(p.id)}"${attrs}>
    <div class="product__img">
      ${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}
      ${p.photos.length > 1 ? `<span class="product__photos">1/${p.photos.length}</span>` : ''}
      <img src="${IMG(p.photos[0])}" alt="${esc(p.type)} ${esc(p.name)} — Меблі Вікторія" loading="lazy">
    </div>
    <div class="product__body">
      <div><div class="product__type">${esc(p.type)}</div><h3 class="product__name">${esc(p.name)}</h3></div>
      <div class="dims">
        ${p.d ? `<div><span>В × Г × Д</span>${esc(fmt(p.d))}</div>` : ''}
        ${p.s ? `<div><span>Спальне</span>${esc(fmt(p.s))}</div>` : ''}
      </div>
      <div class="product__foot"><span>${p.m ? esc(cap(p.m)) : 'Детальніше'}</span>${ICON.arrow}</div>
    </div>
  </a>`;
}

/* ───────── Сторінка моделі: галерея */
function bindGallery() {
  const main = $('.pd__main img');
  if (!main) return;
  $$('.pd__thumbs button').forEach(b => b.addEventListener('click', () => {
    main.src = b.dataset.src;
    $$('.pd__thumbs button').forEach(x => x.classList.toggle('is-active', x === b));
  }));
}

/* ───────── Сторінка категорії: фільтр, пошук, сортування */
function bindCatalog() {
  const grid = $('#products');
  if (!grid) return;
  const cards = $$('.product', grid);
  const empty = $('#productsEmpty');
  let mech = '', q = '', sort = '';
  const draw = () => {
    let shown = 0;
    cards.forEach(c => {
      const ok = (!mech || c.dataset.mech.split('|').includes(mech)) && (!q || c.dataset.name.includes(q));
      c.hidden = !ok; if (ok) shown++;
    });
    const by = {
      name: (a, b) => a.dataset.name.localeCompare(b.dataset.name, 'uk'),
      'len-asc': (a, b) => a.dataset.len - b.dataset.len,
      'len-desc': (a, b) => b.dataset.len - a.dataset.len,
      sleep: (a, b) => b.dataset.sleep - a.dataset.sleep
    }[sort] || ((a, b) => a.dataset.i - b.dataset.i);
    [...cards].sort(by).forEach(c => grid.appendChild(c));
    if (empty) empty.hidden = shown > 0;
  };
  const chips = $('#mechChips');
  chips && chips.addEventListener('click', e => {
    const b = e.target.closest('[data-m]'); if (!b) return;
    mech = b.dataset.m;
    $$('.chip', chips).forEach(c => c.classList.toggle('is-active', c === b));
    draw();
  });
  const qi = $('#q'); qi && qi.addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); draw(); });
  const si = $('#sort'); si && si.addEventListener('change', e => { sort = e.target.value; draw(); });
}

/* ───────── Common behaviour */
function bindCommon() {
  const header = $('#header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const drop = $('#navDrop');
  if (drop) {
    const btn = $('button', drop);
    let t;
    const set = v => { drop.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', v); };
    btn.addEventListener('click', () => set(!drop.classList.contains('is-open')));
    drop.addEventListener('mouseenter', () => { clearTimeout(t); set(true); });
    drop.addEventListener('mouseleave', () => { t = setTimeout(() => set(false), 150); });
    document.addEventListener('click', e => { if (!drop.contains(e.target)) set(false); });
  }
  const burger = $('#burger');
  burger && burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.body.classList.remove('menu-open'); });

  bindForm();
  bindGallery();
  bindCatalog();
  heroSteps();
  stepper('#flowSteps', '.flow__step', '.flow__layer', 4500);
}

if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('DOMContentLoaded', bindCommon);

/* ───────── Покроковий перемикач (етапи роботи) */
function stepper(sel, stepSel, layerSel, dur) {
  const root = $(sel);
  if (!root) return;
  const steps = $$(stepSel, root), layers = $$(layerSel, root);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0;
  root.style.setProperty('--dur', `${dur}ms`);
  const go = n => {
    cur = (n + steps.length) % steps.length;
    steps.forEach((s, k) => { s.classList.toggle('is-on', k === cur); s.classList.toggle('is-done', k < cur); s.setAttribute('aria-selected', k === cur); });
    layers.forEach((l, k) => l.classList.toggle('is-on', k === cur));
  };
  steps.forEach((s, k) => s.addEventListener('click', () => go(k)));
  if (reduced) { root.classList.add('is-static'); return; }
  root.addEventListener('animationend', e => { if (e.animationName === 'flow-fill' && e.target.classList.contains('is-on')) go(cur + 1); });
  new IntersectionObserver(([en]) => root.classList.toggle('is-paused', !en.isIntersecting), { threshold: .3 }).observe(root);
  go(+new URLSearchParams(location.search).get('flow') || 0);
}

/* ───────── Перший екран: креслення у три кроки */
function heroSteps() {
  const root = $('#heroSteps');
  if (!root) return;
  const steps = $$('.hs__step', root);
  const layers = $$('.hs__layer', root);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0;

  const tween = el => {
    const to = +el.dataset.to;
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 900;
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const go = n => {
    cur = (n + steps.length) % steps.length;
    steps.forEach((s, k) => {
      const on = k === cur;
      s.classList.toggle('is-on', on);
      s.classList.toggle('is-done', k < cur);
      s.setAttribute('aria-selected', on);
    });
    layers.forEach((l, k) => l.classList.toggle('is-on', k === cur));
    $$('[data-to]', layers[cur]).forEach(tween);
  };

  steps.forEach((s, k) => s.addEventListener('click', () => go(k)));
  if (reduced) { root.classList.add('is-static'); return; }

  // Автоперемикання: крок триває, поки заповнюється смужка прогресу
  root.addEventListener('animationend', e => {
    if (e.animationName === 'hs-fill' && e.target.classList.contains('is-on')) go(cur + 1);
  });
  // Пауза, коли перший екран не видно
  new IntersectionObserver(([en]) => root.classList.toggle('is-paused', !en.isIntersecting), { threshold: .2 }).observe(root);
  go(0);
}
