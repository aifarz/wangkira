// Shared wireframe primitives — Apple-flavored low-fi.
// Gray placeholder blocks, SF Pro feel, soft chrome.

const WF_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif';

// Color tokens
const wf = {
  bg: '#ffffff',
  page: '#f5f5f7',
  card: '#ffffff',
  line: 'rgba(0,0,0,0.08)',
  lineSoft: 'rgba(0,0,0,0.05)',
  ink: '#1d1d1f',
  ink2: '#6e6e73',
  ink3: '#a1a1a6',
  blue: '#007aff',
  green: '#30d158',
  red: '#ff453a',
  amber: '#ff9f0a',
  grayFill: '#e8e8ed',
  grayFill2: '#f2f2f4',
  font: WF_FONT,
};

// A gray block — wireframe placeholder for content of any size.
function Bar({ w = '100%', h = 8, r = 4, c = wf.grayFill, style = {} }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: c, ...style }} />;
}

// A bigger block — for cards/images
function Block({ w = '100%', h = 100, r = 12, c = wf.grayFill2, children, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, background: c,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: wf.ink3, fontSize: 11, fontWeight: 500,
      ...style,
    }}>{children}</div>
  );
}

// Stack of horizontal bars — fake text paragraph
function TextLines({ lines = 3, gap = 6, widths = null }) {
  const arr = Array.from({ length: lines });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {arr.map((_, i) => {
        const w = widths ? widths[i % widths.length] : (i === lines - 1 ? '60%' : '100%');
        return <Bar key={i} w={w} h={7} />;
      })}
    </div>
  );
}

// Section card with optional header
function Card({ title, action, children, padding = 20, style = {} }) {
  return (
    <div style={{
      background: wf.card, borderRadius: 16, padding,
      boxShadow: '0 0 0 0.5px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.02)',
      ...style,
    }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: wf.ink, letterSpacing: '-0.01em' }}>{title}</div>
          <div style={{ flex: 1 }} />
          {action && <div style={{ fontSize: 12, color: wf.blue, fontWeight: 500 }}>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// Pill / chip
function Pill({ children, tone = 'neutral', size = 'md' }) {
  const tones = {
    neutral: { bg: wf.grayFill, fg: wf.ink },
    blue:    { bg: 'rgba(0,122,255,0.12)', fg: wf.blue },
    green:   { bg: 'rgba(48,209,88,0.14)', fg: '#1f8a4a' },
    red:     { bg: 'rgba(255,69,58,0.12)', fg: '#c8302a' },
    amber:   { bg: 'rgba(255,159,10,0.16)', fg: '#a76600' },
  };
  const t = tones[tone] || tones.neutral;
  const s = size === 'sm' ? { fs: 10, pad: '2px 7px', r: 6 } : { fs: 11, pad: '3px 9px', r: 8 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: t.bg, color: t.fg, padding: s.pad, borderRadius: s.r,
      fontSize: s.fs, fontWeight: 600, letterSpacing: '-0.005em',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// Currency display — Apple-style tabular
function Amount({ value, size = 14, weight = 600, color = wf.ink, prefix = 'RM' }) {
  return (
    <span style={{
      fontSize: size, fontWeight: weight, color,
      fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.015em',
    }}>{prefix} {value}</span>
  );
}

// Small inline label
function Label({ children, color = wf.ink2 }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, color,
      letterSpacing: '0.01em', textTransform: 'uppercase',
    }}>{children}</span>
  );
}

// Icon placeholder — soft rounded square
function IconStub({ size = 28, tone = 'gray', r = 7 }) {
  const colors = {
    gray: wf.grayFill, blue: 'rgba(0,122,255,0.14)',
    green: 'rgba(48,209,88,0.18)', red: 'rgba(255,69,58,0.14)',
    amber: 'rgba(255,159,10,0.18)', purple: 'rgba(175,82,222,0.16)',
  };
  return <div style={{
    width: size, height: size, borderRadius: r,
    background: colors[tone] || colors.gray, flexShrink: 0,
  }} />;
}

// Tiny SF-style sidebar item
function SideRow({ label, selected = false, dot = 'gray' }) {
  const dots = { gray: '#a1a1a6', blue: wf.blue, red: wf.red, green: wf.green, amber: wf.amber, purple: '#af52de' };
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '5px 10px', margin: '0 8px', borderRadius: 7,
      background: selected ? 'rgba(0,0,0,0.07)' : 'transparent',
      fontSize: 12, fontWeight: selected ? 600 : 500, color: wf.ink,
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: 4,
        background: dots[dot] || dots.gray, opacity: selected ? 1 : 0.55, flexShrink: 0,
      }} />
      <span>{label}</span>
    </div>
  );
}

// Page wrapper inside MacWindow content area
function Page({ title, subtitle, tabs, action, children, bg = wf.page }) {
  return (
    <div style={{
      background: bg, minHeight: '100%',
      padding: '24px 32px 40px', fontFamily: WF_FONT,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 22 }}>
        <div>
          {subtitle && <div style={{
            fontSize: 11, color: wf.ink2, fontWeight: 600,
            letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4,
          }}>{subtitle}</div>}
          <div style={{ fontSize: 26, fontWeight: 700, color: wf.ink, letterSpacing: '-0.02em' }}>{title}</div>
        </div>
        <div style={{ flex: 1 }} />
        {action}
      </div>
      {tabs && (
        <div style={{
          display: 'flex', gap: 4, marginBottom: 20,
          background: wf.grayFill2, padding: 3, borderRadius: 9,
          width: 'fit-content', fontSize: 12, fontWeight: 600,
        }}>
          {tabs.map((t, i) => (
            <div key={i} style={{
              padding: '5px 12px', borderRadius: 7,
              background: t.active ? wf.card : 'transparent',
              color: t.active ? wf.ink : wf.ink2,
              boxShadow: t.active ? '0 0 0 0.5px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)' : 'none',
            }}>{t.label}</div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

// Standard sidebar for WangKira
function WangkiraSidebar({ active = 'Dashboard' }) {
  const items = [
    { label: 'Dashboard', dot: 'blue' },
    { label: 'Accounts', dot: 'gray' },
    { label: 'Transactions', dot: 'gray' },
    { label: 'Budget', dot: 'amber' },
    { label: 'Installments', dot: 'red' },
    { label: 'Subscriptions', dot: 'purple' },
    { label: 'IOUs', dot: 'gray' },
    { label: 'Salary', dot: 'green' },
    { label: 'Reports', dot: 'gray' },
  ];
  return (
    <>
      <MacSidebarHeader title="WangKira" />
      {items.map(i => (
        <SideRow key={i.label} label={i.label} dot={i.dot} selected={active === i.label} />
      ))}
      <div style={{ height: 14 }} />
      <MacSidebarHeader title="Goals" />
      <SideRow label="Wedding 2028" dot="green" />
      <SideRow label="Emergency fund" dot="blue" />
      <SideRow label="Post-wedding home" dot="gray" />
      <div style={{ height: 14 }} />
      <MacSidebarHeader title="Settings" />
      <SideRow label="Categories" />
      <SideRow label="Tax profile" />
      <SideRow label="Backups" />
    </>
  );
}

Object.assign(window, {
  wf, Bar, Block, TextLines, Card, Pill, Amount, Label,
  IconStub, SideRow, Page, WangkiraSidebar, WF_FONT,
});
