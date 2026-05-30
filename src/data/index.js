// ── Mortgage Rates (April 2026) ──
export const RATES = { va: 0.055, fha: 0.0608 }
export const VA_FUNDING_FEE = { no: 0.0215, seconduse: 0.033, yes: 0 }
export const FHA_UPFRONT_MIP = 0.0175
export const FHA_ANNUAL_MIP = 0.005

// ── Path Meta ──
export const PATH_LABELS = {
  existing: 'Existing Home',
  manufactured: 'Land + Mfg Home',
  newbuild: 'Land + New Build',
  trailer: 'Trailer Bridge',
}

export const PATH_ICONS = {
  existing: '🏠',
  manufactured: '🏭',
  newbuild: '🔨',
  trailer: '🚌',
}

// ── Scorecard ──
export const SCORECARD = {
  existing:     { rank:1, cost:4, risk:2, timeline:5, complexity:5, costLabel:'Highest (market price)', riskLabel:'Low–Med (appraisal/inspection)', timelineLabel:'30–60 days to close', complexityLabel:'Simple — standard VA process', why:'Fastest path. VA works cleanly on existing SFH. Hauser ($426K median), Bayview ($402K), Spirit Lake area give you 3BR within budget. 71% sold below asking — negotiate hard and ask for 4% seller concessions.' },
  manufactured: { rank:2, cost:2, risk:3, timeline:3, complexity:3, costLabel:'Low–Med (land + home bundle)', riskLabel:'Medium (lender pickiness, titling)', timelineLabel:'3–6 months start to move-in', complexityLabel:'Moderate — extra VA/titling steps', why:'Best value per sqft. Double-wide on owned land with permanent foundation is fully VA-eligible. All-in under $260K is realistic. Land appreciates. Lender selection is critical — use a VA mfg home specialist.' },
  newbuild:     { rank:3, cost:3, risk:5, timeline:1, complexity:1, costLabel:'Medium ($150–200/sqft + land)', riskLabel:'High (construction overruns, delays)', timelineLabel:'12–24 months start to move-in', complexityLabel:'Complex — 2-loan phase required', why:'Get exactly what you want but pay in time. VA does not do construction loans — local bank construction loan first, then refi to VA after CO. Builder backlog 6–12 months. Budget 15–20% contingency.' },
  trailer:      { rank:4, cost:1, risk:4, timeline:2, complexity:2, costLabel:'Lowest (phased, cash trailer)', riskLabel:'Med–High (VA land restriction)', timelineLabel:'18–36 months total strategy', complexityLabel:'High — multi-phase, zoning checks first', why:'Lowest monthly burn in Phase 1 while saving for Phase 2. VA cannot loan on bare land — use local bank for land. Live in trailer (cash buy) while planning permanent home. Rural unincorporated Kootenai Co. parcels ideal.' },
}

// ── Step-by-Step ──
export const STEPS = {
  existing: [
    { n:1, title:'Wait for VA Disability Rating', time:'ASAP', tag:'Critical', body:'30%+ = $0 funding fee. On $400K that saves ~$8,600 rolled into loan. If you close before the rating and it comes through retroactively, file for a VA funding fee refund.' },
    { n:2, title:'Get VA Pre-Approval + COE', time:'1–2 weeks', tag:'Finance', body:'Contact a VA-approved lender (Navy Federal, Veterans United, or local Idaho broker). Provide DD-214, income docs, bank statements. Get COE via eBenefits — takes minutes if service records are in system.' },
    { n:3, title:'Target Areas & Price Ceiling', time:'1–2 weeks', tag:'Research', body:'Focus on: Hauser/Hauser Lake ($426K median), Bayview ($402K), Spirit Lake ($403K), Rathdrum east ($494K listed but negotiable). Avoid CdA proper — median $545K blows budget.' },
    { n:4, title:'Hire a VA-Experienced Buyer\'s Agent', time:'Same week', tag:'Team', body:'Find an agent who has closed VA loans before. Ask: "How many VA loans have you closed in the last 12 months?" They know VA MPR quirks and won\'t waste time on non-eligible properties.' },
    { n:5, title:'Tour & Submit Offer', time:'2–8 weeks', tag:'Buying', body:'71% of Kootenai Co. homes sold below asking in 2025. Offer 3–5% under list. VA allows seller to pay up to 4% in concessions — always ask. Include VA financing clause and inspection contingency.' },
    { n:6, title:'VA Appraisal + Inspection', time:'1–2 weeks', tag:'Due Diligence', body:'VA orders its own appraisal (~$600–800). Checks value AND condition (MPRs). If well/septic, get Kootenai County health district aquifer compliance letter ($200–500). Private inspection ($350–500) recommended separately.' },
    { n:7, title:'Underwriting → Clear to Close', time:'2–3 weeks', tag:'Finance', body:'Don\'t open new credit, change jobs, or make large deposits. Respond to lender requests within 24 hours. Final walkthrough 1–2 days before closing.' },
    { n:8, title:'Close & Get Keys', time:'1 day', tag:'Closing', body:'VA closing costs ~$3,000–6,000. With seller concessions your out-of-pocket may be near $0. Cashier\'s check or wire for any remainder.' },
  ],
  manufactured: [
    { n:1, title:'Wait for VA Disability Rating', time:'ASAP', tag:'Critical', body:'$0 funding fee at 30%+. On a $260K package saves ~$5,590. File for refund if rating comes after closing.' },
    { n:2, title:'Find a VA Manufactured Home Lender', time:'1–2 weeks', tag:'Finance', body:'Most big-box lenders won\'t touch mfg homes. Use: Land Home Financial Services, Cascade Loans, or a VA-specialist broker. Interview them specifically about double-wide VA loans before proceeding.' },
    { n:3, title:'Get Pre-Approval + COE', time:'1–2 weeks', tag:'Finance', body:'Confirm lender is comfortable with land+home package structure. Get COE via eBenefits.' },
    { n:4, title:'Find Land (Owned Fee-Simple)', time:'2–6 weeks', tag:'Land', body:'Target unincorporated Kootenai Co. in Athol, Spirit Lake, Rathdrum, or Hauser areas. Budget $60–100K for 0.5–2 acres with utilities. Verify: utility access, perc test passed, no HOA banning mfg homes, road access.' },
    { n:5, title:'Select a HUD-Compliant Double-Wide', time:'2–4 weeks', tag:'Home', body:'Visit Clayton Homes CdA or regional dealers. Requirements: built post-June 15 1976 (HUD tag present), double-wide (700+ sqft), never moved more than once. Budget $120–180K new or recent.' },
    { n:6, title:'Foundation + Site Prep', time:'2–4 weeks', tag:'Construction', body:'Licensed Idaho contractor: clear/grade site, install permanent HUD-compliant foundation, run utilities. Budget $25–45K. Get engineer\'s foundation cert letter — lender requires it.' },
    { n:7, title:'Convert Title to Real Property', time:'1–2 weeks', tag:'Legal', body:'Idaho process: cancel mfg title, file affixation affidavit with Kootenai County, record conversion. Title company handles. Must be done before VA loan can close.' },
    { n:8, title:'VA Appraisal + Underwriting', time:'2–3 weeks', tag:'Finance', body:'VA appraiser checks HUD tags, foundation adequacy, utilities functional. Have HUD data plate, foundation cert, affixation docs ready. Septic compliance letter required if on individual system.' },
    { n:9, title:'Close + Move In', time:'1 day', tag:'Closing', body:'$0 funding fee (30% rating), $0 down. Closing costs ~$3,000–5,000 (seller can cover up to 4%). You now own land + home as real property.' },
  ],
  newbuild: [
    { n:1, title:'Wait for VA Disability Rating', time:'ASAP', tag:'Critical', body:'$0 funding fee applies on Phase 2 permanent VA loan. Does not affect Phase 1 construction loan.' },
    { n:2, title:'Find & Buy Land', time:'2–8 weeks', tag:'Land', body:'Buy with local bank land loan (VA doesn\'t finance bare land). Expect 20–30% down, 7–9% rate. Budget $60–120K for usable parcel in unincorporated Kootenai Co. Get perc test, verify zoning, confirm utility access.' },
    { n:3, title:'Select Builder & Nail Down Contract', time:'4–12 weeks', tag:'Builder', body:'North Idaho builder backlog 6–12 months. Interview 3+ builders. Get fixed-price bids. Verify licensed with Idaho Contractors Board. Budget $150–200/sqft + 15–20% contingency. Do NOT buy land without committed builder.' },
    { n:4, title:'Get Construction Loan', time:'2–4 weeks', tag:'Finance', body:'Local bank or credit union (Numerica, Idaho Central). Requires 10–20% down (land equity counts), solid credit, detailed plans. Rate ~7–8%. Funds in draws as milestones hit.' },
    { n:5, title:'Build (Permits → Framing → Finish)', time:'6–18 months', tag:'Construction', body:'Permit pulled by builder. Interest-only payments on construction loan during build (~$300–700/mo). Visit site weekly. Typical timeline: foundation 2–4 wks, framing 4–6 wks, rough-ins 4–6 wks, drywall 3–4 wks, finish 6–10 wks.' },
    { n:6, title:'Certificate of Occupancy', time:'1–2 weeks', tag:'Gov', body:'County inspector issues CO after final inspection. You cannot refi into VA until CO issued. This is your Phase 2 trigger.' },
    { n:7, title:'VA Pre-Approval for Permanent Loan', time:'1–2 weeks', tag:'Finance', body:'Apply for permanent VA loan. New construction appraisal typically smoother — no deferred maintenance. Appraiser wants CO and builder warranty.' },
    { n:8, title:'Refi Construction → VA Loan', time:'2–3 weeks', tag:'Closing', body:'Close VA loan, pay off construction loan. 30yr fixed VA at current rate. $0 funding fee with 30%+ disability rating.' },
  ],
  trailer: [
    { n:1, title:'Verify Zoning Allows Temporary Dwelling', time:'1–2 days', tag:'Critical', body:'Call Kootenai County Planning (208-446-1070) FIRST. Ask: "Does this parcel allow a temporary dwelling while a permanent home is being built?" Unincorporated county land usually yes with permit. Post Falls/CdA/Hayden city limits = almost always NO.' },
    { n:2, title:'Find the Right Parcel', time:'2–6 weeks', tag:'Land', body:'0.5–2 acres, unincorporated Kootenai Co., $50–90K range. Must have road access, utility hookup available, confirmed zoning. Athol, Hauser, Rathdrum, Spirit Lake areas best. Use Kootenai County Assessor GIS to research before visiting.' },
    { n:3, title:'Buy Land via Local Bank Loan', time:'2–4 weeks', tag:'Finance', body:'VA will NOT loan on bare land. Use Numerica CU, Idaho Central CU, or farm credit. Expect 20–30% down, 7–8% rate. On $80K parcel: $16–24K down. Monthly land payment ~$350–550/mo.' },
    { n:4, title:'Buy a Used Trailer or RV (Cash)', time:'1–3 weeks', tag:'Shelter', body:'Budget $15–35K cash. Requirements: weatherproof, functional heat/water/sewer hookup points, enough space. Facebook Marketplace, Craigslist, RV dealers in Spokane/CdA. Avoid anything needing major repairs.' },
    { n:5, title:'Set Up Trailer on Land', time:'1–2 weeks', tag:'Setup', body:'Pull temporary dwelling permit from Kootenai County (~$50–200). Connect power, water, sewer. Budget $2,000–8,000 for utility hookups depending on parcel.' },
    { n:6, title:'Plan & Save for Permanent Home', time:'6–18 months', tag:'Strategy', body:'Monthly costs much lower than renting. Use savings to: pay down debt, save for Phase 2 closing costs, save for site prep. Discipline required — this is temporary discomfort for long-term gain.' },
    { n:7, title:'Place Permanent Home', time:'3–12 months', tag:'Phase 2', body:'Execute Land+Mfg or Land+Build path. Once permanent home on permanent foundation with CO and real property title, you\'re ready to refi.' },
    { n:8, title:'VA Refi into Permanent Loan', time:'2–3 weeks', tag:'Phase 2', body:'Refi land loan (and any construction/mfg loan) into single VA mortgage. $0 funding fee at 30%+ rating. One clean 30yr VA loan on land+home.' },
  ],
}

// ── Tag Colors ──
export const TAG_COLORS = {
  Critical: '#e05252', Finance: '#c8a84b', Research: '#52b788', Team: '#52b788',
  Buying: '#52b788', 'Due Diligence': '#e09e52', Closing: '#52b788', Land: '#c8a84b',
  Home: '#c8a84b', Construction: '#e09e52', Legal: '#e09e52', Builder: '#e09e52',
  Gov: '#8b949e', Shelter: '#52b788', Setup: '#e09e52', Strategy: '#c8a84b',
  'Phase 2': '#52b788',
}

// ── Market Snapshot Data ──
export const MARKET_DATA = [
  { area: 'Post Falls', price: '$489K', detail: 'SFH median · 34 avg DOM', tag: 'Tight budget', tagType: 'warn' },
  { area: 'Rathdrum', price: '$494K', detail: 'Avg sold · $192/sqft · 245 listings', tag: 'Negotiate hard', tagType: 'warn' },
  { area: 'Hauser', price: '$426K', detail: 'Best value in Kootenai Co. · 15 min to Post Falls', tag: 'Sweet spot ★', tagType: 'green' },
  { area: 'Bayview / Spirit Lake', price: '$402–403K', detail: 'Scenic, quieter · 30 min to CdA', tag: 'Sweet spot', tagType: 'green' },
  { area: 'Blanchard / Oldtown', price: '$462–464K', detail: 'Bonner Co. border · more land/dollar', tag: 'Worth watching', tagType: 'green' },
  { area: 'Coeur d\'Alene', price: '$545K', detail: 'Full county median · 6.9% down YoY', tag: 'Too expensive', tagType: 'red' },
  { area: 'Kootenai Co. Land', price: '$47K/ac', detail: 'Median/acre · 532 parcels active', tag: 'Land search', tagType: 'gold' },
  { area: 'Buyer\'s Market', price: '71%', detail: 'Sold below asking 2025 · Inventory +20%', tag: 'Negotiate hard', tagType: 'green' },
]

// ── Listing Launches ──
export const LISTINGS = {
  existing: {
    alert: { type: 'warn', text: 'VA budget sweet spot: $350–430K. Stick to Hauser, Spirit Lake, Rathdrum east, Bayview. Avoid CdA proper.' },
    launches: [
      { site: 'Zillow', desc: 'Kootenai Co. · 3BR+ · $250K–440K · Low/No HOA', url: 'https://www.zillow.com/homes/for_sale/Kootenai-County-ID_rb/?searchQueryState=%7B%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A250000%2C%22max%22%3A440000%7D%2C%22beds%22%3A%7B%22min%22%3A3%7D%7D%7D' },
      { site: 'Redfin', desc: 'Kootenai Co. · 3BR+ · $250K–440K · SFH only', url: 'https://www.redfin.com/county/695/ID/Kootenai-County/filter/min-price=250000,max-price=440000,min-beds=3,property-type=house' },
      { site: 'Realtor.com', desc: 'Kootenai Co. · SFH · 3BR+ · Under $440K', url: 'https://www.realtor.com/realestateandhomes-search/Kootenai-County_ID/type-single-family-home/price-na-440000/beds-3' },
      { site: 'Zillow — Hauser', desc: 'Hauser, ID · 3BR+ · Under $450K · Median $426K', url: 'https://www.zillow.com/homes/for_sale/Hauser-ID_rb/' },
      { site: 'Zillow — Spirit Lake', desc: 'Spirit Lake, ID · 3BR+ · Under $450K', url: 'https://www.zillow.com/spirit-lake-id/homes/' },
      { site: 'Redfin — Rathdrum', desc: 'Rathdrum · 3BR+ · $250K–430K · SFH (negotiate off $494K avg)', url: 'https://www.redfin.com/city/16992/ID/Rathdrum/filter/min-price=250000,max-price=430000,min-beds=3,property-type=house' },
    ],
    checklist: [
      { ok: true, text: 'Built 1990+ preferred — reduces VA MPR risk' },
      { ok: true, text: 'No deferred maintenance (roof, HVAC, foundation)' },
      { ok: true, text: 'Well/septic? Budget for aquifer compliance letter' },
      { ok: true, text: '3BR/2BA minimum for resale + livability' },
      { ok: true, text: 'Days on market 30+ = more negotiating room' },
      { ok: true, text: 'Ask for 4% seller concessions on every offer' },
      { ok: false, text: 'Avoid: HOA over $100/mo, flood zone, shared well' },
      { ok: false, text: 'Avoid: near The Amelia / Apartments 26 construction zones' },
    ],
    intel: [
      { title: '83835 (Hauser)', body: 'Median $426K, rural feel, 15 min to Post Falls. Best value in Kootenai Co. right now.' },
      { title: '83869 (Spirit Lake)', body: 'Median $403K, small town, 30 min to CdA. Growing slowly.' },
      { title: '83858 (Rathdrum)', body: 'Median $494K listed, avg sold $494K — but 71% below asking means real deals at $410–440K if patient.' },
      { title: '83814 (Bayview area)', body: '$402K median, scenic, farther out. Worth a look if commute works.' },
      { title: '83864 (Blanchard/Oldtown)', body: '$462K, Bonner County border, more land per dollar.' },
    ],
  },
  manufactured: {
    alert: { type: 'warn', text: 'Only 16 mfg homes with owned land on Kootenai Co. MLS. Most are leased land — VA cannot finance. Strategy: buy land ($50–90K) and home ($120–180K) separately.' },
    launches: [
      { site: 'Zillow — Mfg Homes', desc: 'Kootenai Co. · 34 listings · Filter for owned land manually', url: 'https://www.zillow.com/kootenai-county-id/mobile/' },
      { site: 'Trulia — Mfg Homes', desc: 'Kootenai Co. · 85 mobile/mfg listings · Broadest selection', url: 'https://www.trulia.com/for_sale/16055_c/MOBILE%7CMANUFACTURED_type/' },
      { site: 'Idaho Real Homes (Local MLS)', desc: 'Kootenai Co. mfg specialist — leased + owned land, all sizes', url: 'https://homes.idahorealhomes.com/i/manufactured-homes-in-kootenai-county' },
      { site: 'LandSearch — Mfg + Land', desc: '16 mfg homes WITH land in Kootenai Co. · Best for VA-eligible combos', url: 'https://www.landsearch.com/mobile-home/kootenai-county-id' },
      { site: 'Zillow — Land Under $100K', desc: 'Kootenai Co. lots under $100K · Buy land separately, place home on it', url: 'https://www.zillow.com/kootenai-county-id/land/' },
      { site: 'Clayton Homes CdA', desc: 'New double-wide dealer · HUD-compliant, VA-eligible', url: 'https://www.claytonhomes.com/find-a-home/idaho/coeur-d-alene/' },
    ],
    checklist: [
      { ok: true, text: '"Manufactured > 2 acres" or "owned lot" filter on MLS' },
      { ok: true, text: 'HUD tag present — must be post-June 15, 1976' },
      { ok: true, text: 'Double-wide (700+ sqft) — single-wide VA very hard to finance' },
      { ok: true, text: 'Permanent foundation — not on blocks or skirting only' },
      { ok: true, text: 'Land and home titled together as real property' },
      { ok: true, text: 'Never moved more than once from original placement' },
      { ok: false, text: 'Avoid: "leased land" — VA cannot finance these' },
      { ok: false, text: 'Avoid: pre-1976 mobile homes — not VA eligible' },
    ],
    intel: [
      { title: 'Real strategy: buy land separately', body: 'Find a $50–90K parcel in Athol, Hauser, Spirit Lake, or Rathdrum. Visit Clayton Homes CdA. Lock price before buying land.' },
      { title: 'All-in target', body: '$200–280K total — well within VA budget for $1,700–2,000/mo PITI at 30% rating (no funding fee).' },
      { title: 'Site prep budget', body: '$25–45K for foundation, delivery, utility connections, skirting. Do not underestimate this.' },
      { title: 'Lender', body: 'Land Home Financial, Cascade Loans, or ask a local VA mortgage broker specifically about manufactured home programs.' },
    ],
  },
  land: {
    alert: { type: 'info', text: 'Target: 0.5–2 acres, unincorporated Kootenai Co., utilities available, $50–90K, no HOA, zoning allows mfg home or new construction.' },
    launches: [
      { site: 'Zillow — Land $30K–100K', desc: 'Kootenai Co. lots and acreage · 385 total listings', url: 'https://www.zillow.com/kootenai-county-id/land/' },
      { site: 'Redfin — Land', desc: 'Kootenai Co. land · Updated every 15 min · 366 listings', url: 'https://www.redfin.com/county/695/ID/Kootenai-County/land' },
      { site: 'LandWatch', desc: '578 Kootenai Co. listings · Best rural parcel database', url: 'https://www.landwatch.com/idaho-land-for-sale/kootenai-county' },
      { site: 'LandSearch', desc: '532 parcels · $47K median/acre · Good filter tools', url: 'https://www.landsearch.com/properties/kootenai-county-id' },
      { site: 'Land & Farm $50–100K', desc: 'Pre-filtered $50–100K parcels · 32 listings currently', url: 'https://www.landandfarm.com/search/idaho/kootenai-county-land-for-sale/price-50000-99999/' },
      { site: 'Homes.com — Land', desc: '415 lots · Good photos · Athol/Spirit Lake parcels visible', url: 'https://www.homes.com/kootenai-county-id/land-for-sale/' },
    ],
    checklist: [
      { ok: true, text: 'Power at road or meter already installed' },
      { ok: true, text: 'Community water OR good wells in area' },
      { ok: true, text: 'Septic pre-approved or perc test passed' },
      { ok: true, text: 'Paved or county-maintained road access' },
      { ok: true, text: 'No CCRs banning manufactured homes' },
      { ok: true, text: 'Unincorporated county — fewer zoning restrictions' },
      { ok: false, text: 'Avoid: flood zone, wetlands setback, easement issues' },
      { ok: false, text: 'Avoid: "internet available" without ISP verification' },
    ],
    intel: [
      { title: 'Athol / Farragut area', body: '4–5 acre treed lots with utilities stubbed. Some with septic pre-approved. $60–100K range. 30 min to CdA.' },
      { title: 'Hauser / Hauser Lake', body: 'Smaller lots, closer to Post Falls. $50–80K. Good for mfg homes.' },
      { title: 'Spirit Lake east of Hwy 41', body: 'Rural parcels, less expensive than lakefront. $55–85K for 1–3 acres.' },
      { title: 'Rathdrum Prairie (unincorporated)', body: 'Flat, buildable, utilities nearby. $60–90K. Best for new construction.' },
      { title: 'Bonner Co. border (Blanchard/Oldtown)', body: '$40–70K parcels exist. 35 min to Post Falls. Outside Kootenai Co. but worth it at that price.' },
    ],
  },
  newbuild: {
    alert: { type: 'warn', text: 'VA doesn\'t finance bare land or construction. Path: local bank land loan → construction loan → VA permanent refi after CO. Budget 12–24 months.' },
    launches: [
      { site: 'Zillow — Buildable Land', desc: 'Kootenai Co. lots · Stick-build candidates', url: 'https://www.zillow.com/kootenai-county-id/land/' },
      { site: 'Zillow — New Construction', desc: 'Kootenai Co. new builds · Spec homes + communities', url: 'https://www.zillow.com/kootenai-county-id/new-construction/' },
      { site: 'LandWatch — Build Sites', desc: '578 parcels · Filter for buildable/utilities/road access', url: 'https://www.landwatch.com/idaho-land-for-sale/kootenai-county' },
      { site: 'Idaho Contractors Board', desc: 'Verify builder license before signing anything · Free lookup', url: 'https://www.idahocontractors.org/' },
      { site: 'Numerica CU — Construction Loan', desc: 'Local North Idaho lender · Construction-to-permanent loans', url: 'https://www.numerica.us/personal/mortgages/construction-loans' },
      { site: 'Realtor.com — New Construction', desc: 'Filter for "New Construction" in Kootenai Co.', url: 'https://www.realtor.com/realestateandhomes-search/Kootenai-County_ID/type-single-family-home' },
    ],
    checklist: [
      { ok: true, text: 'Perc test passed / septic design approved' },
      { ok: true, text: 'Well feasibility confirmed via neighbors\' depth records' },
      { ok: true, text: 'Power at road · Gas or propane feasible' },
      { ok: true, text: 'Flat or gently sloped — saves $10–30K on foundation' },
      { ok: true, text: 'County-maintained road access preferred' },
      { ok: true, text: 'Fixed-price builder contract — not cost-plus' },
      { ok: false, text: 'Never buy land without a committed builder first' },
      { ok: false, text: 'Budget 15–20% contingency on every build cost estimate' },
    ],
    intel: [
      { title: 'Modular shortcut', body: 'Factory-built modular is treated as conventional by VA — no HUD plate, no titling issue. 15–20% cheaper, 4–6 month timeline vs 12–18 months stick-built.' },
      { title: 'Builder backlog', body: 'North Idaho has 6–12 month wait with quality builders. Nail down a contract before purchasing land.' },
      { title: 'Construction loan terms', body: 'Expect 10–20% down (land equity counts), 7–8% rate, interest-only during build (~$300–700/mo).' },
    ],
  },
  trailer: {
    alert: { type: 'warn', text: 'VA cannot loan on bare land. Phase 1 = local bank land loan. Verify zoning BEFORE any purchase. Call Kootenai County Planning: (208) 446-1070.' },
    launches: [
      { site: 'LandWatch — Raw Land', desc: '295 undeveloped Kootenai Co. parcels · Filter under $90K', url: 'https://www.landwatch.com/idaho-land-for-sale/kootenai-county/undeveloped-land' },
      { site: 'Land & Farm $50–100K', desc: 'Pre-filtered affordable parcels · 32 listings currently', url: 'https://www.landandfarm.com/search/idaho/kootenai-county-land-for-sale/price-50000-99999/' },
      { site: 'Craigslist — RVs/Trailers', desc: 'Spokane/CdA area · $15–35K livable trailers · Cash purchase', url: 'https://spokane.craigslist.org/search/rva' },
      { site: 'FB Marketplace — Trailers/RVs', desc: 'North Idaho/Spokane · $5K–35K · 5th wheels, travel trailers', url: 'https://www.facebook.com/marketplace/category/rvs-campers/' },
      { site: 'Kootenai County Planning', desc: 'Zoning lookup + temp dwelling permits · (208) 446-1070', url: 'https://kcgov.us/289/Planning' },
      { site: 'Numerica CU — Land Loans', desc: 'Local lender for Phase 1 land purchase · Not VA — conventional', url: 'https://www.numerica.us/personal/loans/land-loans' },
    ],
    checklist: [
      { ok: true, text: 'Zoning confirmed for temporary dwelling FIRST' },
      { ok: true, text: 'Power hookup available at road' },
      { ok: true, text: 'Water: well feasible OR haul water option' },
      { ok: true, text: 'Septic or holding tank acceptable to county' },
      { ok: true, text: 'Unincorporated county — city limits almost always say no' },
      { ok: true, text: 'No CCRs/HOA (they almost always ban trailers)' },
      { ok: false, text: 'Budget $2–8K for utility hookups (power pole, tank, etc.)' },
      { ok: false, text: 'Trailer: buy something livable, not a project' },
    ],
    intel: [
      { title: 'Phase 1 monthly reality', body: '$80K parcel @ 8%, 20% down ($16K cash) = ~$530/mo land payment + ~$150 utilities = ~$680/mo total. Massive savings vs renting.' },
      { title: 'Trailer budget', body: '$15–35K cash for a 2005–2015 vintage 5th wheel or park model. No major repairs — you\'re living in it.' },
      { title: 'Phase 2 trigger', body: 'VA rating processed (30%+ ) + permanent home placed on permanent foundation = refi everything into one clean VA loan.' },
    ],
  },
}
