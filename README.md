# Мобілшина — mobilshina.com

Marketing site for a mobile tire-service in Odesa. Next.js (App Router) + MUI + TypeScript.

## Stack

- **Next.js 16** App Router, server-rendered pages (SEO + per-page metadata)
- **MUI 7** (`@mui/material`) with a custom theme in `src/theme.ts`
- **API route handlers** replace the old standalone Express server:
  - `GET /api/prices` — proxies Contentful (prices page also calls the lib directly)
  - `POST /api/send-email` — validates + rate-limits + sends the contact-form email

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000
```

### Environment variables

| Var | Purpose |
| --- | --- |
| `CONTENTFUL_SPACE_ID` | Contentful space for the prices page |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful CDN delivery token |
| `EMAIL_USER` | Gmail address that sends the contact email |
| `EMAIL_PASS` | Gmail **app password** |
| `EMAIL_TO` | Inbox that receives contact-form submissions |

Values carry over from the old `api-server` deployment. Add the same set to the
Vercel project (Settings → Environment Variables).

## Deployment

Deploy to Vercel — framework is auto-detected, no `vercel.json` needed. Once the
Next.js `/api/*` routes are verified in a preview, the separate Render service
(`mobilshina-6fsb.onrender.com`) can be retired.

Old `/html/*.html` URLs 308-redirect to the new clean paths (`next.config.ts`).

## Design

Google Material theme from a Claude Design canvas — full spec in
[`design/DESIGN.md`](design/DESIGN.md). Brand blue `#141BB8`, Roboto, MUI elevation.

## Structure

```
design/DESIGN.md        design system + per-page spec
src/
  theme.ts              MUI Material theme (BRAND tokens)
  lib/                  contentful, mailer, rateLimit, gtag, nav, services
  components/           TopBar, Header, MobileBottomNav, Footer, Section, PageHero,
                        CtaBand, CallbackCard, ContactForm, ServicesGrid, PhoneButton,
                        PhoneLink, AppLink, IconBadge, ServiceIcon, GoogleTag, ThemeRegistry
  app/
    layout.tsx          shell: Roboto, theme, gtag, chrome
    page.tsx            Home (hero + callback form, services, steps, reviews, CTA)
    service/ prices/ clients/ company/   pages
    api/prices/ api/send-email/ api/callback/   route handlers
    sitemap.ts robots.ts
```

## Still to do

- **Price calculator** (`/api/calculator` + Home card) — needs a `calculatorRate` content
  type in Contentful.
- Real Google reviews, interactive map on Contacts.
- Fill `.env.local` / Vercel env before deploy (prices show a fallback until then).
