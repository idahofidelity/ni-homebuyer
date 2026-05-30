import React from 'react'
import { SectionTitle, Tag, PBar, ScoreBar, AlertBox } from './UI'
import { fmt, fmtK, fmtPct, calcPayment, getPurchasePrice } from '../utils/calc'
import { SCORECARD, STEPS, TAG_COLORS, PATH_LABELS, PATH_ICONS } from '../data'

function ResultCard({ label, value, sub, colorVar, pct, barColor, children }) {
  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid ${colorVar || 'var(--border)'}`,
      borderRadius: '6px', padding: '11px 13px',
    }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: colorVar || 'var(--accent2)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '2px' }}>{sub}</div>}
      {pct !== undefined && <PBar pct={pct} color={barColor} />}
      {children}
    </div>
  )
}

export default function CalcPanel({ inputs, path, setPath }) {
  const loanType = inputs.loanType
  const budget = inputs.budget
  const taxRate = inputs.taxRate
  const hoiAnnual = inputs.hoiAnnual
  const vaExempt = inputs.vaExempt

  const price = getPurchasePrice(path, inputs)
  const isTrailer = path === 'trailer'
  const calc = isTrailer
    ? calcPayment('va', price, taxRate, 600, vaExempt)
    : calcPayment(loanType, price, taxRate, hoiAnnual, vaExempt)

  const overBudget = calc.total > budget
  const slightlyOver = overBudget && calc.total <= budget * 1.1
  const pctOfBudget = (calc.total / budget) * 100
  const pitiColor = overBudget ? (slightlyOver ? 'var(--warn)' : 'var(--red)') : 'var(--green)'

  const utilTotal = inputs.electric + inputs.water + inputs.internet + inputs.hoa
  const trueTotal = calc.total + utilTotal + inputs.maintenance
  const truePct = (trueTotal / budget) * 100
  const trueColor = trueTotal <= budget ? 'var(--green)' : trueTotal <= budget * 1.15 ? 'var(--warn)' : 'var(--red)'

  const verdictType = !overBudget ? 'go' : slightlyOver ? 'warn' : 'stop'
  const verdictText = !overBudget
    ? `✓ FITS BUDGET — ${fmt(calc.total)}/mo vs ${fmt(budget)} ceiling. ${fmt(budget - calc.total)} cushion.`
    : slightlyOver
      ? `⚠ SLIGHTLY OVER — ${fmt(calc.total)}/mo is ${fmt(calc.total - budget)} above ceiling.`
      : `✗ OVER BUDGET — ${fmt(calc.total)}/mo exceeds ceiling by ${fmt(calc.total - budget)}.`

  const vaCalc = calcPayment('va', price, taxRate, hoiAnnual, vaExempt)
  const fhaCalc = calcPayment('fha', price, taxRate, hoiAnnual, vaExempt)

  const steps = STEPS[path]
  const rankOrder = Object.keys(SCORECARD).sort((a, b) => SCORECARD[a].rank - SCORECARD[b].rank)
  const medals = ['🥇', '🥈', '🥉', '4️⃣']

  const allPaths = Object.keys(PATH_LABELS).map(p => {
    const pp = getPurchasePrice(p, inputs)
    const c = p === 'trailer'
      ? calcPayment('va', pp, taxRate, 600, vaExempt)
      : calcPayment(loanType, pp, taxRate, hoiAnnual, vaExempt)
    const ok = c.total <= budget
    const slight = !ok && c.total <= budget * 1.1
    return { p, c, ok, slight }
  })

  return (
    <div style={{ overflowY: 'auto', padding: '14px 18px', flex: 1, minWidth: 0 }}>

      {/* SNAPSHOT ROW */}
      <SectionTitle style={{ marginTop: 0 }}>All Paths — Payment Snapshot</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '4px' }}>
        {allPaths.map(({ p, c, ok, slight }) => (
          <div key={p}
            onClick={() => setPath(p)}
            style={{
              background: p === path ? 'rgba(200,168,75,0.07)' : 'var(--surface)',
              border: `1px solid ${p === path ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '6px', padding: '10px 11px', cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '1px', color: p === path ? 'var(--accent)' : 'var(--muted)' }}>
              {PATH_ICONS[p]} {PATH_LABELS[p]}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1.1, marginTop: '2px' }}>
              {fmt(c.total)}<span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>/mo</span>
            </div>
            <Tag type={ok ? 'green' : slight ? 'warn' : 'red'}>
              {ok ? '✓ In Budget' : slight ? '⚠ Close' : '✗ Over'}
            </Tag>
          </div>
        ))}
      </div>

      {/* SCORECARD */}
      <SectionTitle>Path Scorecard</SectionTitle>
      <div style={{ overflowX: 'auto', marginBottom: '6px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)' }}>
              {['Path','Cost','Risk','Speed','Simplicity','Why'].map(h => (
                <th key={h} style={{ padding: '7px 10px', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankOrder.map((p, i) => {
              const s = SCORECARD[p]
              const isActive = p === path
              return (
                <tr key={p}
                  onClick={() => setPath(p)}
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: isActive ? 'rgba(200,168,75,0.05)' : 'transparent', outline: isActive ? '1px solid var(--accent)' : 'none', outlineOffset: '-1px' }}>
                  <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                    <span>{medals[i]}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '1px', color: isActive ? 'var(--accent)' : 'var(--text)', marginLeft: '4px' }}>{PATH_LABELS[p]}</span>
                    {isActive && <span style={{ fontSize: '0.6rem', background: 'rgba(200,168,75,0.2)', color: 'var(--accent)', padding: '1px 5px', borderRadius: '2px', marginLeft: '4px' }}>NOW</span>}
                  </td>
                  <td style={{ padding: '8px 10px', minWidth: '80px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.costLabel}</div>
                    <ScoreBar val={s.cost} />
                  </td>
                  <td style={{ padding: '8px 10px', minWidth: '80px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.riskLabel}</div>
                    <ScoreBar val={s.risk} />
                  </td>
                  <td style={{ padding: '8px 10px', minWidth: '80px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.timelineLabel}</div>
                    <ScoreBar val={6 - s.timeline} />
                  </td>
                  <td style={{ padding: '8px 10px', minWidth: '90px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.complexityLabel}</div>
                    <ScoreBar val={6 - s.complexity} />
                  </td>
                  <td style={{ padding: '8px 10px', color: 'var(--muted)', fontSize: '0.75rem', maxWidth: '200px', lineHeight: 1.4 }}>{s.why}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* CURRENT PATH TITLE + STEPS */}
      <SectionTitle>{PATH_ICONS[path]} {PATH_LABELS[path]} — Step-by-Step</SectionTitle>
      <div style={{ marginBottom: '16px' }}>
        {steps.map((step, i) => (
          <div key={step.n} style={{ display: 'flex', gap: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '34px', flexShrink: 0 }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: TAG_COLORS[step.tag] || 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '0.85rem',
                color: 'var(--bg)', fontWeight: 'bold', flexShrink: 0,
              }}>{step.n}</div>
              {i < steps.length - 1 && (
                <div style={{ width: '2px', flex: 1, minHeight: '16px', background: 'var(--border)', margin: '2px 0' }} />
              )}
            </div>
            <div style={{ padding: '0 0 14px 10px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>{step.title}</span>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                  padding: '1px 6px', borderRadius: '3px',
                  background: (TAG_COLORS[step.tag] || 'var(--accent)') + '22',
                  color: TAG_COLORS[step.tag] || 'var(--accent)',
                }}>{step.tag}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>⏱ {step.time}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: step.body }} />
            </div>
          </div>
        ))}
      </div>

      {/* VERDICT */}
      <SectionTitle>Payment Analysis</SectionTitle>
      <AlertBox type={verdictType}>{verdictText}</AlertBox>

      {/* RESULT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '14px' }}>
        <ResultCard label="Purchase Price" value={fmtK(price)} sub={isTrailer ? 'Phase 1 land only' : 'All-in cost'} colorVar="var(--accent)" />
        <ResultCard label="Loan Amount" value={fmtK(calc.loanAmt)} sub="After fees/down" colorVar="var(--accent)" />
        <ResultCard label="PITI / mo" value={fmt(calc.total)} sub={`${pctOfBudget.toFixed(0)}% of budget`} colorVar={pitiColor} pct={pctOfBudget} barColor={pitiColor} />
        <ResultCard label="P&I Only" value={fmt(calc.pi)} sub={`Rate: ${fmtPct(calc.rate)}`} />
        <ResultCard label="Tax + HOI" value={fmt(calc.taxMonthly + calc.hoiMonthly)} sub="Escrow est." />
        <ResultCard label="PMI / MIP" value={calc.mipMonthly > 0 ? fmt(calc.mipMonthly) : '$0'} sub={loanType === 'va' ? 'VA — none ever' : 'FHA monthly MIP'} colorVar={calc.mipMonthly > 0 ? 'var(--warn)' : 'var(--green)'} />
      </div>

      {/* BREAKDOWN TABLE */}
      <SectionTitle>Monthly Breakdown</SectionTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginBottom: '14px' }}>
        <thead>
          <tr style={{ background: 'var(--surface2)' }}>
            {['Item', 'Monthly', 'Notes'].map(h => (
              <th key={h} style={{ padding: '7px 10px', textAlign: h === 'Monthly' ? 'right' : 'left', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['Principal & Interest', calc.pi, `${fmtPct(calc.rate)} · 30yr`],
            ['Property Tax', calc.taxMonthly, `${taxRate}% annual`],
            ['Homeowners Insurance', calc.hoiMonthly, `${fmt(hoiAnnual)}/yr est.`],
            ...(calc.mipMonthly > 0 ? [['FHA Monthly MIP', calc.mipMonthly, '0.5% annual']] : []),
            ...(loanType === 'va' && calc.fundingFee > 0 ? [['VA Funding Fee', calc.fundingFee / 360, `${fmt(calc.fundingFee)} rolled in`]] : []),
          ].map(([name, amt, note]) => (
            <tr key={name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '7px 10px' }}>{name}</td>
              <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 600, color: 'var(--accent2)' }}>{fmt(amt)}</td>
              <td style={{ padding: '7px 10px', color: 'var(--muted)', fontSize: '0.75rem' }}>{note}</td>
            </tr>
          ))}
          <tr style={{ background: 'var(--surface2)', fontWeight: 700 }}>
            <td style={{ padding: '7px 10px' }}>PITI Total</td>
            <td style={{ padding: '7px 10px', textAlign: 'right', color: 'var(--green)' }}>{fmt(calc.total)}</td>
            <td />
          </tr>
        </tbody>
      </table>

      {/* TRUE MONTHLY */}
      <SectionTitle>True All-In Monthly Cost</SectionTitle>
      <div style={{ background: 'var(--surface)', border: `2px solid ${trueColor}`, borderRadius: '6px', padding: '14px', marginBottom: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px', marginBottom: '10px', textAlign: 'center' }}>
          {[['P&I', fmt(calc.pi)], ['Tax+HOI', fmt(calc.taxMonthly + calc.hoiMonthly)], ['Utilities', fmt(utilTotal)], ['Maint.', fmt(inputs.maintenance)], ['TOTAL', fmt(trueTotal)]].map(([l, v], i) => (
            <div key={l} style={{ background: 'var(--surface2)', borderRadius: '4px', padding: '7px 4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: i === 4 ? '1.2rem' : '1rem', color: i === 4 ? trueColor : 'var(--text)', lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
        <PBar pct={truePct} color={trueColor} />
        <div style={{ fontSize: '0.78rem', color: trueTotal <= budget ? 'var(--green)' : 'var(--red)', marginTop: '6px', fontWeight: 600 }}>
          {trueTotal <= budget
            ? `✓ ${fmt(budget - trueTotal)}/mo cushion after all costs`
            : `✗ ${fmt(trueTotal - budget)}/mo over budget including all costs`}
        </div>
      </div>

      {/* VA vs FHA */}
      <SectionTitle>VA vs FHA Comparison</SectionTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginBottom: '20px' }}>
        <thead>
          <tr style={{ background: 'var(--surface2)' }}>
            {['Factor', 'VA Loan ★', 'FHA Loan'].map((h, i) => (
              <th key={h} style={{ padding: '7px 10px', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', color: i === 1 ? 'var(--accent)' : 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['Rate (30yr)', <span style={{ color: 'var(--green)' }}>5.50%</span>, '6.08%'],
            ['Down Payment', <span style={{ color: 'var(--green)' }}>$0 (0%)</span>, fmt(price * 0.035) + ' (3.5%)'],
            ['Mortgage Insurance', <span style={{ color: 'var(--green)' }}>$0 / mo (never)</span>, <span style={{ color: 'var(--warn)' }}>{fmt(fhaCalc.mipMonthly)}/mo</span>],
            ['Monthly PITI', <strong style={{ color: vaCalc.total <= budget ? 'var(--green)' : 'var(--red)' }}>{fmt(vaCalc.total)}</strong>, <strong style={{ color: fhaCalc.total <= budget ? 'var(--green)' : 'var(--red)' }}>{fmt(fhaCalc.total)}</strong>],
            ['Monthly Savings', <span style={{ color: 'var(--green)' }}>{fmt(fhaCalc.total - vaCalc.total)}/mo · {fmt((fhaCalc.total - vaCalc.total) * 360)} over life</span>, '—'],
          ].map(([factor, va, fha]) => (
            <tr key={factor} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '7px 10px', color: 'var(--muted)' }}>{factor}</td>
              <td style={{ padding: '7px 10px' }}>{va}</td>
              <td style={{ padding: '7px 10px' }}>{fha}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
