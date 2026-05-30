import { RATES, VA_FUNDING_FEE, FHA_UPFRONT_MIP, FHA_ANNUAL_MIP } from '../data'

export const fmt = n => '$' + Math.round(n).toLocaleString()
export const fmtK = n => n >= 1000 ? '$' + (n / 1000).toFixed(0) + 'K' : fmt(n)
export const fmtPct = n => (n * 100).toFixed(2) + '%'

export function pmt(rate, n, pv) {
  const r = rate / 12
  return r === 0 ? pv / n : pv * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
}

export function calcPayment(loanType, purchasePrice, taxRate, hoiAnnual, vaExempt) {
  let loanAmt, fundingFee = 0, mipMonthly = 0
  const rate = RATES[loanType]

  if (loanType === 'va') {
    fundingFee = VA_FUNDING_FEE[vaExempt] * purchasePrice
    loanAmt = purchasePrice + fundingFee
  } else {
    const down = purchasePrice * 0.035
    const baseLoan = purchasePrice - down
    const upfrontMIP = baseLoan * FHA_UPFRONT_MIP
    loanAmt = baseLoan + upfrontMIP
    mipMonthly = baseLoan * FHA_ANNUAL_MIP / 12
  }

  const pi = pmt(rate, 360, loanAmt)
  const taxMonthly = (purchasePrice * taxRate / 100) / 12
  const hoiMonthly = hoiAnnual / 12
  const total = pi + taxMonthly + hoiMonthly + mipMonthly

  return { pi, taxMonthly, hoiMonthly, mipMonthly, total, loanAmt, fundingFee, rate }
}

export function getPurchasePrice(path, inputs) {
  if (path === 'existing') return inputs.price_existing
  if (path === 'manufactured') return inputs.landPrice_mfg + inputs.homePrice_mfg + inputs.sitePrep_mfg
  if (path === 'newbuild') return inputs.landPrice_nb + inputs.buildCost_nb
  if (path === 'trailer') return inputs.landPrice_tr
  return 0
}
