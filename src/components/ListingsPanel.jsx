import React from 'react'
import { SectionTitle, AlertBox, Tag } from './UI'
import { LISTINGS, MARKET_DATA } from '../data'

function LaunchBtn({ site, desc, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: 'flex', flexDirection: 'column', gap: '2px',
      background: 'var(--surface2)', border: '1px solid var(--border)',
      borderRadius: '5px', padding: '10px 12px', textDecoration: 'none',
      color: 'var(--text)', transition: 'all 0.15s', cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(200,168,75,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface2)' }}
    >
      <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--accent)' }}>{site}</span>
      <span style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{desc}</span>
      <span style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: '1px' }}>→ Open ↗</span>
    </a>
  )
}

function CheckItem({ ok, text }) {
  return (
    <div style={{
      background: 'var(--bg)', borderRadius: '4px', padding: '7px 10px',
      fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'flex-start', gap: '7px', lineHeight: 1.4,
    }}>
      <span style={{ color: ok ? 'var(--green)' : 'var(--red)', flexShrink: 0, fontWeight: 700 }}>{ok ? '✓' : '✗'}</span>
      <span>{text}</span>
    </div>
  )
}

export default function ListingsPanel({ path }) {
  const data = LISTINGS[path] || LISTINGS.existing

  return (
    <div style={{ overflowY: 'auto', padding: '14px 16px', flex: 1, minWidth: 0 }}>

      {/* MARKET SNAPSHOT */}
      <SectionTitle style={{ marginTop: 0 }}>Live Market — April 2026</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '7px', marginBottom: '14px' }}>
        {MARKET_DATA.map(m => (
          <div key={m.area} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '5px', padding: '10px 11px' }}>
            <div style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2px' }}>{m.area}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--accent2)', lineHeight: 1 }}>{m.price}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', margin: '2px 0 5px', lineHeight: 1.4 }}>{m.detail}</div>
            <Tag type={m.tagType}>{m.tag}</Tag>
          </div>
        ))}
      </div>

      {/* PATH ALERT */}
      <AlertBox type={data.alert.type}>{data.alert.text}</AlertBox>

      {/* LAUNCH BUTTONS */}
      <SectionTitle>Search Launchers — {path === 'existing' ? 'Existing Homes' : path === 'manufactured' ? 'Manufactured + Land' : path === 'land' ? 'Land Only' : path === 'newbuild' ? 'New Build' : 'Trailer Bridge'}</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '14px' }}>
        {data.launches.map(l => <LaunchBtn key={l.site} {...l} />)}
      </div>

      {/* CHECKLIST */}
      <SectionTitle>What to Look For</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '14px' }}>
        {data.checklist.map((c, i) => <CheckItem key={i} {...c} />)}
      </div>

      {/* INTEL */}
      <SectionTitle>Area Intel</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
        {data.intel.map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '5px', padding: '10px 12px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text)', marginBottom: '3px' }}>{item.title}</div>
            <div style={{ fontSize: '0.79rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item.body}</div>
          </div>
        ))}
      </div>

    </div>
  )
}
