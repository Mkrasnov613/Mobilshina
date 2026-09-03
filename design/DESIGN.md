# Mobilshina — Material Design system (from Claude Design canvas)

Source: `Mobilshina Desktop - Material.dc.html` (artboards 3a–3j: 5 desktop @1440 / 1200 content, 5 mobile @412).
Design language: **Google Material** (MUI). Roboto + Material Symbols Outlined, 8px grid, 4px radius,
Material elevation 1/2/4/8.

## Tokens

| Token | Value |
|---|---|
| `primary.main` | `#141BB8` |
| `primary.dark` | `#0F14A0` |
| `primary.contrastText` | `#ffffff` |
| success | `#2E7D32` on `#E8F5E9` |
| info tint (indigo) | `#141BB8` on `#E8EAF6` |
| rating star | `#F9A825` |
| text primary | `rgba(0,0,0,0.87)` |
| text secondary | `rgba(0,0,0,0.6)` |
| text disabled / hint | `rgba(0,0,0,0.54)` |
| divider | `#E0E0E0` (also `#EEE` inside cards) |
| input outline | `rgba(0,0,0,0.23)` → focus `2px #141BB8` |
| page grey | `#F5F5F7` |
| surface | `#ffffff` |
| footer | `#14141C` |
| icon chip bg | `rgba(20,27,184,0.08)` |
| on-blue chip bg | `rgba(255,255,255,0.16)` |
| radius | `4px` (page shell card `8px`) |
| content width | `1200px`, centered |
| section padding-y | 48–64px |

### Elevation (box-shadow)
- 1: `0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)`
- 2: `0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)`
- 4: `0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)`
- 8: `0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)`

### Type (Roboto)
| Role | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|
| hero h1 | 60 | 34 | 300 | ls -0.00833em |
| page h1 (breadcrumb hero) | 48 | 28 | 400 | |
| section h2 | 34 | 20 | 400 | ls 0.00735em |
| card / dialog h3 | 20 | 16–20 | 500 | ls 0.0075em |
| small title | 16 | 15 | 500 | ls 0.00938em |
| body | 14–18 | 14–15 | 400 | line-height 1.43–1.7 |
| overline | 12 | 12 | 400 | ls 0.08333em, UPPERCASE, color primary |
| button | 14–15 | — | 500 | ls 0.02857em, UPPERCASE |
Icons: **Material Symbols Outlined** (use `@mui/icons-material` equivalents).

## Chrome

### Desktop
- **Top bar** 36px `#0F14A0`, text `rgba(255,255,255,0.78)`, 1200 width: left `schedule` "Цілодобово, 7 днів на тиждень" · `location_on` "Одеса та передмістя"; right `mail` mobilshina2010@gmail.com
- **AppBar** 64px `#141BB8`, elevation 4. Logo 150px (white via `filter:brightness(0) invert(1)`), nav items fill height, active = white + 2px white underline, inactive `rgba(255,255,255,0.72)` (hover → white + `rgba(255,255,255,0.08)` bg). Right: phone button — white bg, `#141BB8` text, `call` icon, `+38 (095) 878 07 26`.
- **Nav order:** Головна · Послуги · Ціни · Контакти · Про компанію
- **Footer** `#14141C`, 56px pad: 4 cols `2fr 1fr 1fr 1.4fr` — (logo + "Мобільний шиномонтаж в Одесі та передмісті з 2010 року. Виїзд цілодобово.") · Сторінки · Зона виїзду (Одеса / Котовського / Совіньйон / Передмістя) · Контакти (phone 22px, email, `schedule` "Цілодобово, 7/7"). Bottom rule: "© 2026 Мобілшина · ФОП «Краснов Сергій Ігорович»" / "Одеса, Україна". Sub-pages use a compact 1-row footer.

### Mobile
- **AppBar** 56px `#141BB8`: logo 124px + `call` + `menu` (home) / `arrow_back` + page title + `call` (sub-pages)
- **Bottom navigation** 64px `#fff`, top border `#E0E0E0`, sticky: Головна(`home`) · Послуги(`build`) · [FAB] · Ціни(`payments`) · Контакти(`place`). Center **FAB** `call`, `#141BB8`, 56px, translateY(-28px), FAB shadow.
- Sub-page hero content sits directly on the blue AppBar block (no separate hero band).

## Pages

### Home (3a / 3f)
1. **Hero** `#141BB8`, grid `1fr 424px`. Left: 2 chips (`bolt` "Виїзд 20–40 хв", `verified` "Працюємо з 2010"), h1 300 "Мобільний шиномонтаж там, де ви зупинились", lead paragraph, 4 stat cells w/ top rule: **15+** років на дорогах Одеси · **24/7** без вихідних і свят · **20–40** хвилин до вас по місту · **4.9** середня оцінка клієнтів. Right: **CallbackCard** (white, elev 8): h2 "Викликати майстра" + "Передзвонимо протягом 2 хвилин і назвемо точну вартість." + inputs Ваше ім'я / Телефон* / Де ви зараз (placeholder "вул. Канатна 22 / траса М-05, 12 км") + contained submit "Викликати майстра" + `lock` (green) note "Ваш номер потрібен лише для дзвінка диспетчера."
2. **Services preview** `#F5F5F7`: overline "Послуги" + h2 "Що робимо на виїзді" + text-btn "Усі послуги →". 4-col grid, 8 cards (icon circle 48 + h3 16 + p): `tire_repair` Заміна та ремонт коліс · `balance` Балансування · `build_circle` Ремонт дисків до 22" · `battery_charging_full` Запуск двигуна · `local_gas_station` Підвіз палива · `swap_horiz` Сезонне «перевзуття» · `shopping_cart` Продаж шин · `local_shipping` Автопарки.
3. **How it works + Calculator** `#fff`, grid `1fr 480px`. Left: overline "Як це працює" + h2 "Чотири кроки від дзвінка до дороги" + numbered vertical stepper (40px blue circles + connector): 1 Дзвоните диспетчеру / 2 Називаємо ціну і час / 3 Майстер приїжджає / 4 Ви їдете далі. Right: **CalculatorCard** (1px `#E0E0E0` border, no shadow) — see Calculator.
4. **Reviews** `#F5F5F7`: overline "Відгуки" + h2 "Що кажуть водії" + right "4.9 ★★★★★ на основі відгуків Google". 3-col cards: stars + quote + rule + avatar initial (blue circle) + name + "Google · <tag>". Placeholder note: real Google reviews to be supplied.
5. **CTA band** `#141BB8`: h2 "Колесо не чекає — і ми теж" + "Диспетчер на лінії просто зараз. Один дзвінок — і майстер виїжджає." + buttons "Подзвонити" (white) / "Написати" (outlined, viber link).

### Services (3b / 3g)
- Breadcrumb hero `#141BB8`: "Головна › Послуги", h1 "Усе робимо на місці", lead.
- **Sticky filter chips** `#fff`: Усі (active) · Колеса · Диски · Допомога в дорозі · Автопарки.
- 3-col card grid on `#F5F5F7`, 9 cards: icon circle 44 + optional green badge "Найчастіше" + h3 20 + p + footer rule with text-btns "Замовити" / "Ціна". Cards: Легковий шиномонтаж (badge) · Монтаж / демонтаж шини · Ремонт порізів і проколів · Балансування коліс · Ремонт дисків до 22" · Ремонт камер і заміна вентилів · Запуск двигуна · Підвіз палива · Продаж шин.
- CTA band "Не знайшли потрібну послугу?" + "Подзвонити".

### Prices (3c / 3h)
- Breadcrumb hero + chip `update` "Оновлено {lastUpdateDate}".
- grid `1fr 360px`.
- Left: **4 Material Accordions** (`Accordion`, first `defaultExpanded`), summary = icon + title + "{n} позицій" + expand icon; details = rows `label ⟷ price(500)` separated by `1px #EEE`. Groups: `call` «Мінімальна вартість виклику» · `swap_horiz` «Перевзуття» автомобіля · `local_shipping` Виїзд у випадку «Перевзуття» · `handyman` Додаткові послуги. **Rows + prices come from `/api/prices` (Contentful), keyed by `priceId`** — same mapping as today.
- Right **sticky sidebar**: help card (`support_agent` + "Порахувати вашу ситуацію" + "Скажіть район, тип авто і що сталося — назвемо точну суму одразу." + phone button + outlined "Калькулятор" → /#calculator) ; info card `#E8EAF6` (`info`) "Нічний виїзд (22:00–07:00) та адреси за межами міста тарифікуються окремо. Без сюрпризів на місці." ; payments card `#E8F5E9` (`payments`) "Оплата на місці: готівка або картка. Для автопарків — безготівковий розрахунок і документи."

### Contacts (3d / 3i)
- Breadcrumb hero, h1 "Зв'яжіться з нами", lead about corporate terms.
- 3-col contact cards: **phone** (blue `#141BB8`, `call`, "Телефон · 24/7", number 22) · **email** (white, `mail`) · **schedule** (white, "Графік", "Цілодобово, 7 днів на тиждень").
- grid `1fr 1fr`: left **map placeholder card** — image bg (`location-mobilshina.png` tinted) + caption "Тут буде інтерактивна мапа зони виїзду" + h3 "Зона виїзду" + zone chips (Одеса центр / Котовського / Таїрова / Совіньйон / Фонтанка / Передмістя) + note. right **cooperation form** — 2-col grid Ім'я та прізвище / Компанія / E-mail* / Телефон, then Повідомлення textarea, submit "Відправити" + "Поля з * обов'язкові". Posts to `/api/send-email`.
- Dark band `#14141C`: `local_shipping` "Автопарк від 3 авто" + "Спеціальні умови, виїзд за графіком, окремий контакт для менеджера, безготівковий розрахунок." + white btn "Обговорити умови".

### About (3e / 3j)
- Breadcrumb hero, h1 "Сімейна справа з 2010 року", lead ("Двоє братів, один мікроавтобус із обладнанням і принцип «приїхати туди, де людині потрібна допомога».").
- **Stats strip** `#0F14A0`, 4 cols w/ dividers: 2010 рік заснування · 2 брати засновники · 24/7 режим роботи · 21 день велозбір коштів.
- `#fff` 2-col: left overline "Наш досвід" + h2 "Не просто «поміняти колесо»" + 3 paragraphs (port from old company.html «Досвід», keep bold spans). right overline "Історія" + **timeline** (dot + connector): 2010 · Початок / Роки зростання / Сьогодні.
- **Sponsor section**: bg `sponsor.png` + overlay `rgba(10,10,26,0.84)`. 2-col: left overline "Ми підтримуємо рух" + h2 "Партнер велоівентів регіону" + 2 paragraphs (Tour de France Україна bold). right glass card `rgba(255,255,255,0.08)` + `volunteer_activism` + "21 день у дорозі" + Херсонська-область text.
- `#F5F5F7`: h2 "Чому нам довіряють" + 3-col cards: `schedule` Цілодобово · `price_check` Ціна до виїзду · `engineering` Власне обладнання.
- CTA band "Потрібна допомога з колесами?" + phone.

## Calculator  (Home §3 right card + Prices sidebar link; endpoint `/api/calculator`)

Inputs:
- **Тип авто** — chips: Легковий · Позашляховик · Мікроавтобус (single select, default Легковий)
- **Послуга** — select: Заміна одного колеса · Ремонт проколу · Ремонт порізу · Перевзуття комплекту (4 колеса) · Запуск двигуна
- **Куди їхати** — select: Одеса, центр · Котовського / Таїрова · Совіньйон / Фонтанка · За містом
- **Приблизна відстань, км** — number input, shown only when zone = «За містом» (design note: "miles/km can be added if user typed approx km")
- **Нічний виїзд (22:00–07:00)** — checkbox

Model (design placeholder values — **real values come from Contentful `calculatorRate` entries**):
```
base   = service.base            // per service
factor = carType.factor          // Легковий 1.0 / Позашляховик 1.25 / Мікроавтобус 1.4
zoneFee = zone.fee               // fixed per zone
distanceFee = zone==="outCity" ? ratePerKm * km : 0
night  = night ? nightSurcharge : 0
total  = round50( base * factor + zoneFee + distanceFee + night )
display = "від " + total.toLocaleString("uk-UA") + " ₴"
```
Result box `#F5F5F7`: "Орієнтовна вартість" + big `primary` number. CTA below: "Підтвердити по телефону" (fires gtag conversion). Disclaimer: "Розрахунок орієнтовний. Точну суму диспетчер називає до виїзду."

**Contentful:** new content type `calculatorRate` (fields: `kind` = service|carType|zone|surcharge, `key`, `label`, `amount` (number), `factor` (number, for carType)). `/api/calculator` returns the grouped rate table; the component does the arithmetic client-side. Confirm field names against the actual space before wiring.

## Notes / open items
- Ukrainian copy in the .dc.html is placeholder-grade (and arrived mojibaked) — existing-page text is ported from the old site; new sections use the strings above, to be reviewed by the owner.
- Reviews section needs real Google review content.
- Contact form gains optional Company + Phone fields (design) — `/api/send-email` + zod schema to be extended.
- Map is a static placeholder for now.
