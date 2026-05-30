import React, { useState, useEffect } from 'react'
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
  price_existing: 400000,
  landPrice_mfg: 80000,
  homePrice_mfg: 150000,
  sitePrep_mfg: 30000,
  landPrice_nb: 80000,
  buildCost_nb: 280000,
  landPrice_tr: 80000,
  trailerCost: 20000,
  finalHome_tr: 280000,
  electric: 150,
  water: 80,
  internet: 70,
  maintenance: 250,
  hoa: 0,
}

const TAB_LABELS = { calc: '📊 Calc', listings: '🏘 Listings', inputs: '⚙️ Inputs' }

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

export default function App() {
  const [inputs, setInputs] = useLocalStorage('ni-homebuyer-inputs', DEFAULT_INPUTS)
  const [path, setPath] = useLocalStorage('ni-homebuyer-path', 'existing')
  const [activeTab, setActiveTab] = useLocalStorage('ni-homebuyer-tab', 'calc')
  const isMobile = useIsMobile()

  const setInput = (key, val) => setInputs(prev => ({ ...prev, [key]: val }))

  // On mobile, sidebar is its own tab ("inputs"). On desktop it's always visible on left.
  const showSidebar = !isMobile || activeTab === 'inputs'
  const showMain = !isMobile || activeTab === 'calc'
  const showListings = !isMobile || activeTab === 'listings'

  const mobileTabs = ['calc', 'listings', 'inputs']
  const desktopTabs = ['calc', 'listings']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>

      {/* HEADER */}
      <header style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d1117 100%)',
        borderBottom: '2px solid var(--accent)',
        padding: isMobile ? '8px 12px' : '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: '8px',
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '1.2rem' : '1.8rem',
            letterSpacing: isMobile ? '1px' : '3px',
            color: 'var(--accent)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {isMobile ? 'NI Homebuyer' : 'North Idaho Homebuyer'}
          </div>
          {!isMobile && (
            <div style={{ color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: '2px' }}>
              VA &amp; FHA · Kootenai County · 2026
            </div>
          )}
        </div>

        {/* TAB SWITCHER */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {(isMobile ? mobileTabs : desktopTabs).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: isMobile ? '6px 10px' : '7px 16px',
              background: activeTab === tab ? 'rgba(200,168,75,0.15)' : 'var(--surface)',
              border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '5px',
              color: activeTab === tab ? 'var(--accent)' : 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? '0.72rem' : '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* LIVE PAYMENT BADGE — hidden on mobile to save space */}
        {!isMobile && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: '6px',
            padding: '6px 14px',
            textAlign: 'right',
            flexShrink: 0,
          }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>PITI</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--accent2)', lineHeight: 1 }}>
              <PathPayment inputs={inputs} path={path} />
            </div>
          </div>
        )}

        {/* Mobile PITI inline */}
        {isMobile && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase' }}>PITI</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent2)', lineHeight: 1 }}>
              <PathPayment inputs={inputs} path={path} />
            </div>
          </div>
        )}
      </header>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR — always visible on desktop, shown as "Inputs" tab on mobile */}
        {showSidebar && (
          <div style={{
            width: isMobile ? '100%' : '280px',
            flexShrink: 0,
            overflowY: 'auto',
            display: isMobile && activeTab !== 'inputs' ? 'none' : 'block',
          }}>
            <CalcSidebar inputs={inputs} setInput={setInput} path={path} setPath={p => { setPath(p); if (isMobile) setActiveTab('calc'); }} />
          </div>
        )}

        {/* MAIN CONTENT */}
        {(showMain || showListings) && (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minWidth: 0 }}>
            {(activeTab === 'calc' || (!isMobile && activeTab !== 'listings')) && activeTab !== 'inputs'
              ? <CalcPanel inputs={inputs} path={path} setPath={p => { setPath(p); }} />
              : activeTab === 'listings'
                ? <ListingsPanel path={path} />
                : null
            }
          </div>
        )}
      </div>
    </div>
  )
}

function PathPayment({ inputs, path }) {
  const price = getPurchasePrice(path, inputs)
  const isTrailer = path === 'trailer'
  const calc = isTrailer
    ? calcPayment('va', price, inputs.taxRate, 600, inputs.vaExempt)
    : calcPayment(inputs.loanType, price, inputs.taxRate, inputs.hoiAnnual, inputs.vaExempt)
  return <>${Math.round(calc.total).toLocaleString()}/mo</>
}
