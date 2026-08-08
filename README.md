# Spectrum Total Solutions

Corporate website for **Spectrum Total Solutions Limited / 天域策略顧問有限公司**.

Design source: Figma Make export (`figma-export/`), integrated into this Vite + React + Tailwind site.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Notes

- Router: `src/app/App.tsx`
- Home: `src/pages/HomePage.tsx`
- Styles: `src/styles/`
- Contact helpers: `src/lib/contact.ts` (`hello@spectrumtotalsolutions.com`)

## Showcase (Idea Illustrations)

Routes:

- `/showcase` — idea library with category filters  
- `/showcase/:slug` — detail, conceptual art, Book Demo / Enquiry  

Content: `src/content/showcases/`.  
Catalog / add pipeline: sibling repo `demo-showcase` (`npm run showcase:add -- --brand Name`).

### Booking

- Default: mailto `hello@spectrumtotalsolutions.com`  
- Optional calendar: set `VITE_CAL_URL` (see `.env.example`) to a Cal.com (or compatible) booking link.

Public copy is Idea Illustration Only — not off-the-shelf SKUs. Tailor-made delivery after enquiry/demo.
