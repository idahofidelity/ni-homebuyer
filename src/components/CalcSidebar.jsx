import React from 'react'
import { SectionTitle, RangeRow, Label } from './UI'
import { fmt, fmtK } from '../utils/calc'
import { PATH_LABELS, PATH_ICONS } from '../data'

const styles = {
  sidebar: {
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    overflowY: 'scroll',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    height: '100%',
  },
  pathTabs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5px',
    marginBottom: '12px',
  },
  pathTab: (active) => ({
    padding: '7px 8px',
    background: active ? 'rgba(200,168,75,0.12)' : 'var(--surface2)',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '0.74rem',
    fontWeight: 700,
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
    color: active ? 'var(--accent)' : 'var(--muted)',
    transition: 'all 0.15s',
  }),
}

export default function CalcSidebar({ inputs, setInput, path, setPath }) {
  const s = (id) => (
    <select
      value={inputs[id]}
      onChange={e => setInput(id, e.target.value)}
      style={{ marginBottom: '2px' }}
    >
      {id === 'loanType' && <>
        <option value="va">VA Loan (0% down, no PMI) ← Best</option>
        <option value="fha">FHA Loan (3.5% down, MIP)</option>
      </>}
      {id === 'vaExempt' && <>
        <option value="no">No (first use: 2.15%)</option>
        <option value="seconduse">No (subsequent: 3.3%)</option>
        <option value="yes">Yes — Disability Rated ($0) ← Your Goal</option>
      </>}
    </select>
  )

  return (
    <aside style={styles.sidebar}>
      <SectionTitle style={{ marginTop: 0 }}>Your Situation</SectionTitle>

      <Label>Loan Type</Label>
      {s('loanType')}

      <Label>VA Funding Fee</Label>
      {s('vaExempt')}

      <Label>Monthly Budget Ceiling (PITI)</Label>
      <RangeRow
        min={1500} max={2500} step={50}
        value={inputs.budget}
        onChange={v => setInput('budget', v)}
        display={fmt(inputs.budget)}
      />

      <Label>Property Tax Rate (%)</Label>
      <RangeRow
        min={0.4} max={1.2} step={0.05}
        value={inputs.taxRate}
        onChange={v => setInput('taxRate', v)}
        display={`${inputs.taxRate.toFixed(2)}%`}
      />

      <Label>Homeowners Insurance (annual)</Label>
      <RangeRow
        min={800} max={3000} step={50}
        value={inputs.hoiAnnual}
        onChange={v => setInput('hoiAnnual', v)}
        display={fmt(inputs.hoiAnnual)}
      />

      <SectionTitle>Buying Path</SectionTitle>
      <div style={styles.pathTabs}>
        {Object.entries(PATH_LABELS).map(([p, label]) => (
          <div key={p} style={styles.pathTab(p === path)} onClick={() => setPath(p)}>
            {PATH_ICONS[p]} {label}
          </div>
        ))}
      </div>

      {/* PATH-SPECIFIC INPUTS */}
      {path === 'existing' && <>
        <Label>Purchase Price</Label>
        <RangeRow min={200000} max={700000} step={5000}
          value={inputs.price_existing}
          onChange={v => setInput('price_existing', v)}
          display={fmtK(inputs.price_existing)} />
      </>}

      {path === 'manufactured' && <>
        <Label>Land Price</Label>
        <RangeRow min={30000} max={200000} step={5000}
          value={inputs.landPrice_mfg}
          onChange={v => setInput('landPrice_mfg', v)}
          display={fmtK(inputs.landPrice_mfg)} />
        <Label>Manufactured Home Price</Label>
        <RangeRow min={80000} max={250000} step={5000}
          value={inputs.homePrice_mfg}
          onChange={v => setInput('homePrice_mfg', v)}
          display={fmtK(inputs.homePrice_mfg)} />
        <Label>Site Prep / Foundation / Install</Label>
        <RangeRow min={15000} max={60000} step={1000}
          value={inputs.sitePrep_mfg}
          onChange={v => setInput('sitePrep_mfg', v)}
          display={fmt(inputs.sitePrep_mfg)} />
      </>}

      {path === 'newbuild' && <>
        <Label>Land Price</Label>
        <RangeRow min={30000} max={200000} step={5000}
          value={inputs.landPrice_nb}
          onChange={v => setInput('landPrice_nb', v)}
          display={fmtK(inputs.landPrice_nb)} />
        <Label>Build Cost (est. $150–200/sqft)</Label>
        <RangeRow min={150000} max={500000} step={10000}
          value={inputs.buildCost_nb}
          onChange={v => setInput('buildCost_nb', v)}
          display={fmtK(inputs.buildCost_nb)} />
      </>}

      {path === 'trailer' && <>
        <Label>Land Price</Label>
        <RangeRow min={30000} max={200000} step={5000}
          value={inputs.landPrice_tr}
          onChange={v => setInput('landPrice_tr', v)}
          display={fmtK(inputs.landPrice_tr)} />
        <Label>Trailer / RV (cash)</Label>
        <RangeRow min={5000} max={60000} step={1000}
          value={inputs.trailerCost}
          onChange={v => setInput('trailerCost', v)}
          display={fmt(inputs.trailerCost)} />
        <Label>Final Home Budget (Phase 2)</Label>
        <RangeRow min={150000} max={450000} step={10000}
          value={inputs.finalHome_tr}
          onChange={v => setInput('finalHome_tr', v)}
          display={fmtK(inputs.finalHome_tr)} />
      </>}

      <SectionTitle>True Cost Inputs</SectionTitle>

      <Label>Electric / Gas (mo)</Label>
      <RangeRow min={50} max={400} step={10}
        value={inputs.electric}
        onChange={v => setInput('electric', v)}
        display={fmt(inputs.electric)} />

      <Label>Water / Sewer / Trash (mo)</Label>
      <RangeRow min={30} max={200} step={5}
        value={inputs.water}
        onChange={v => setInput('water', v)}
        display={fmt(inputs.water)} />

      <Label>Internet (mo)</Label>
      <RangeRow min={40} max={150} step={5}
        value={inputs.internet}
        onChange={v => setInput('internet', v)}
        display={fmt(inputs.internet)} />

      <Label>Maintenance Reserve (mo)</Label>
      <RangeRow min={100} max={600} step={25}
        value={inputs.maintenance}
        onChange={v => setInput('maintenance', v)}
        display={fmt(inputs.maintenance)} />

      <Label>HOA (mo)</Label>
      <RangeRow min={0} max={400} step={10}
        value={inputs.hoa}
        onChange={v => setInput('hoa', v)}
        display={fmt(inputs.hoa)} />
    </aside>
  )
}
