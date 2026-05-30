import React from 'react'

export function SectionTitle({ children, style }) {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: '1rem',
      letterSpacing: '2px',
      color: 'var(--accent)',
      textTransform: 'uppercase',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '5px',
      marginBottom: '12px',
      marginTop: '18px',
      ...style,
    }}>
      {children}
    </div>
  )
}

export function RangeRow({ id, min, max, step, value, onChange, display }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ flex: 1 }}
      />
      <div style={{
        minWidth: '64px',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'right',
        fontSize: '0.85rem',
        color: 'var(--accent2)',
        fontWeight: 600,
        flexShrink: 0,
      }}>
        {display}
      </div>
    </div>
  )
}

export function Label({ children }) {
  return (
    <div style={{
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      marginBottom: '3px',
      marginTop: '10px',
    }}>
      {children}
    </div>
  )
}

export function Tag({ children, type = 'gold' }) {
  const colors = {
    green: { bg: 'rgba(82,183,136,0.15)', color: 'var(--green)' },
    warn:  { bg: 'rgba(224,158,82,0.15)',  color: 'var(--warn)' },
    red:   { bg: 'rgba(224,82,82,0.15)',   color: 'var(--red)' },
    gold:  { bg: 'rgba(200,168,75,0.15)',  color: 'var(--accent)' },
  }
  const c = colors[type] || colors.gold
  return (
    <span style={{
      display: 'inline-block',
      background: c.bg, color: c.color,
      fontSize: '0.67rem', fontWeight: 700,
      letterSpacing: '1px', textTransform: 'uppercase',
      padding: '2px 7px', borderRadius: '3px',
    }}>
      {children}
    </span>
  )
}

export function PBar({ pct, color }) {
  return (
    <div style={{ background: 'var(--surface2)', borderRadius: '4px', height: '6px', overflow: 'hidden', marginTop: '4px' }}>
      <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: color, borderRadius: '4px', transition: 'width 0.35s ease' }} />
    </div>
  )
}

export function ScoreBar({ val, max = 5 }) {
  const colors = ['', 'var(--green)', 'var(--green)', 'var(--warn)', 'var(--red)', 'var(--red)']
  return (
    <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{
          height: '5px', flex: 1, borderRadius: '2px',
          background: i < val ? colors[val] : 'var(--surface2)',
          transition: 'background 0.2s',
        }} />
      ))}
    </div>
  )
}

export function AlertBox({ type, children }) {
  const styles = {
    warn: { bg: 'rgba(224,158,82,0.08)', border: 'var(--warn)', color: 'var(--warn)' },
    info: { bg: 'var(--surface2)', border: 'var(--accent)', color: 'var(--muted)' },
    go:   { bg: 'rgba(82,183,136,0.08)', border: 'var(--green)', color: 'var(--green)' },
    stop: { bg: 'rgba(224,82,82,0.08)', border: 'var(--red)', color: 'var(--red)' },
  }
  const s = styles[type] || styles.info
  return (
    <div style={{
      background: s.bg, borderLeft: `3px solid ${s.border}`,
      borderRadius: '0 5px 5px 0', padding: '10px 13px',
      marginBottom: '12px', fontSize: '0.83rem', color: s.color, lineHeight: 1.6,
    }}>
      {children}
    </div>
  )
}
