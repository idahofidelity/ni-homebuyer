# North Idaho Homebuyer

VA & FHA mortgage calculator + listing launcher for Kootenai County, ID.

## Quick Start

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Deploy to Netlify (free, ~2 min)

```bash
npm run build
# Then drag the dist/ folder to app.netlify.com/drop
```

Or connect this folder to a GitHub repo and Netlify will auto-deploy on every push.

## Features

- **📊 Calculator tab**
  - Live PITI calculator for all 4 buying paths
  - VA vs FHA side-by-side comparison
  - True all-in monthly cost (PITI + utilities + maintenance)
  - Path scorecard with cost/risk/timeline/complexity ratings
  - Step-by-step process guide per path
  - All inputs saved to localStorage — persists between sessions

- **🏘 Listings tab**
  - April 2026 market snapshot for all Kootenai Co. areas
  - Pre-filtered search launchers for Zillow, Redfin, Realtor.com, LandWatch, etc.
  - Synced to the active buying path — switches automatically
  - What-to-look-for checklist per path
  - Area intel notes

## Buying Paths

| Path | VA Eligible | Timeline | Complexity |
|------|------------|----------|------------|
| Existing Home | ✅ Directly | 30–60 days | Low |
| Land + Mfg Home | ✅ With specialist lender | 3–6 months | Medium |
| Land + New Build | ✅ After CO (refi) | 12–24 months | High |
| Trailer Bridge | ✅ Phase 2 only | 18–36 months | High |

## Key Notes

- Rates: VA 5.50%, FHA 6.08% (April 2026)
- 30% VA disability rating = $0 funding fee — set in sidebar
- Kootenai Co. property tax: ~0.65%
- VA loan limit: $806,500 | FHA limit: $572,700
- 71% of Kootenai Co. homes sold below asking in 2025

## Stack

- React 18 + Vite
- Zero external UI dependencies
- localStorage for persistence
- Self-contained, no backend needed
