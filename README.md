# Arvutame

Rakendus peastarvutamise oskuse harjutamiseks. Kasutaja valib tehted (liitmine, lahutamine, korrutamine, jagamine), raskusastme (suurim tulemus tehtes: 100 kuni 100 000) ja harjutuse tüübi (fikseeritud tehete arv või ajastatud harjutus). Vastuseks on alati naturaalarv.

## Tehnoloogia

React + TypeScript + Vite. Disainisüsteem on lisatud lokaalselt (`src/styles/design-system.css`).

## Arendus

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Projekti struktuur

- `src/core/` — tehete genereerimise loogika, platvormist sõltumatu (taaskasutatav ka tulevases mobiiliversioonis)
- `src/hooks/useSession.ts` — harjutuse seansi olekumasin
- `src/components/` — kolm ekraani: seadistus, harjutus, tulemused
