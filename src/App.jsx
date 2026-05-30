import React, { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import CalcSidebar from './components/CalcSidebar'
import CalcPanel from './components/CalcPanel'
import ListingsPanel from './components/ListingsPanel'
import { calcPayment, getPurchasePrice } from './utils/calc'

const DEFAULT_INPUTS = {
  loanType: 'va',
  vaExempt: 'yes',
  budget: 2000,
  taxRate: 0.65,
  hoiAnnual: 1400,
  // existing
  price_existing: 400000,
  // manufactured
  landPrice_mfg: 80000,
  homePrice_mfg: 150000,
  sitePrep_mfg: 30000,
  // newbuild
  landPrice_nb: 80000,
  buildCost_nb: 280000,
  // trailer
  landPrice_tr: 80000,
  trailerCost: 20000,
  finalHome_tr: 280000,
  // utilities
  electric: 150,
  water: 80,
  internet: 70,
  maintenance: 250,
  hoa: 0,
}

const TAB_LABELS = { calc: '📊 Calculator', listings: '🏘 Listings & Search' }

export default function App() {
  const [inputs, setInputs] = useLocalStorage('ni-homebuyer-inputs', DEFAULT_INPUTS)
  const [path, setPath] = useLocalStorage('ni-homebuyer-path', 'existing')
  const [activeTab, setActiveTab] = useLocalStorage('ni-homebuyer-tab', 'calc')

  const setInput = (key, val) => setInputs(prev => ({ ...prev, [key]: val }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

      {/* HEADER */}
      <header style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d1117 100%)',
        borderBottom: '2px solid var(--accent)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '3px', color: 'var(--accent)', lineHeight: 1 }}>
            North Idaho Homebuyer
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: '2px' }}>
            VA &amp; FHA · Kootenai County · April 2026
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {Object.entries(TAB_LABELS).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '7px 16px',
              background: activeTab === tab ? 'rgba(200,168,75,0.15)' : 'var(--surface)',
              border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '5px',
              color: activeTab === tab ? 'var(--accent)' : 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.3px',
              transition: 'all 0.15s',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* LIVE PAYMENT BADGE */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--accent)',
          borderRadius: '6px',
          padding: '6px 14px',
          textAlign: 'right',
        }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Current Path PITI</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--accent2)', lineHeight: 1 }}>
            {/* computed inline to avoid prop drilling just for header */}
            <PathPayment inputs={inputs} path={path} />
          </div>
        </div>
      </header>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* SIDEBAR always visible */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <CalcSidebar inputs={inputs} setInput={setInput} path={path} setPath={p => { setPath(p); }} />
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {activeTab === 'calc'
            ? <CalcPanel inputs={inputs} path={path} setPath={setPath} />
            : <ListingsPanel path={path} />
          }
        </div>
      </div>
    </div>
  )
}

// Small inline component to show live PITI in header
function PathPayment({ inputs, path }) {
  const price = getPurchasePrice(path, inputs)
  const isTrailer = path === 'trailer'
  const calc = isTrailer
    ? calcPayment('va', price, inputs.taxRate, 600, inputs.vaExempt)
    : calcPayment(inputs.loanType, price, inputs.taxRate, inputs.hoiAnnual, inputs.vaExempt)
  return <>${Math.round(calc.total).toLocaleString()}/mo</>
}
