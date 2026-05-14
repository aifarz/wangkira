// Accounts list — 2 variations
//  A: grouped cards (Apple Wallet / Finance vibe)
//  B: dense list with sub-balances

function AccountsA() {
  const group = (title, total, items) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 10, padding: '0 4px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: wf.ink, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ flex: 1 }} />
        <Amount value={total} size={13} color={total.startsWith('−') ? wf.red : wf.ink} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {items.map((it, i) => (
          <Card key={i} padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <IconStub size={32} tone={it.tone} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{it.name}</div>
                <div style={{ fontSize: 10.5, color: wf.ink3 }}>{it.sub}</div>
              </div>
            </div>
            <Amount value={it.amt} size={20} color={it.amt.startsWith('−') ? wf.red : wf.ink} />
            {it.bar != null && (
              <div style={{ marginTop: 10 }}>
                <ProgressBar pct={it.bar} color={it.bar > 70 ? wf.red : wf.amber} h={4} />
                <div style={{ fontSize: 10, color: wf.ink3, marginTop: 4 }}>{it.bar}% of {it.limit}</div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Page subtitle="9 active" title="Accounts"
      action={<div style={{
        padding: '7px 14px', background: wf.blue, borderRadius: 8,
        fontSize: 12, fontWeight: 600, color: '#fff',
      }}>+ Add account</div>}
    >
      {group('Cash & Debit', '10,780.30', [
        { name: 'CIMB Current',    sub: '••4821 · Salary in', tone: 'blue',   amt: '8,420.30' },
        { name: 'Maybank Savings', sub: '••1730 · Daily spend', tone: 'amber', amt: '2,180.00' },
        { name: 'Cash Wallet',     sub: 'Drawer', tone: 'gray', amt: '180.00' },
      ])}
      {group('Savings & Investments', '6,420.00', [
        { name: 'myASNB',     sub: 'Shariah · Wedding fund', tone: 'green', amt: '4,820.00' },
        { name: 'KAF Digital',sub: 'Shariah · Parking',      tone: 'green', amt: '1,600.00' },
        { name: 'EPF',        sub: 'Employee + employer',    tone: 'gray',  amt: '43,580.00' },
      ])}
      {group('Credit Cards', '−6,390.00', [
        { name: 'Maybank Visa Plat.', sub: '••2204 · stmt 25th · APR 18%', tone: 'red',   amt: '−4,210.00', bar: 53, limit: '8,000' },
        { name: 'CIMB Platinum',      sub: '••8810 · stmt 5th · APR 17%',  tone: 'red',   amt: '−2,180.00', bar: 24, limit: '9,000' },
      ])}
      {group('BNPL & Loans', '−32,030.00', [
        { name: 'SPayLater',     sub: 'Shopee',   tone: 'amber', amt: '−320.00', bar: 16, limit: '2,000' },
        { name: 'Atome',         sub: 'Inactive', tone: 'gray',  amt: '0.00' },
        { name: 'BSN Personal',  sub: 'APR 8.5% · 47 mo left',  tone: 'red', amt: '−31,710.00' },
      ])}
    </Page>
  );
}

function AccountsB() {
  const row = (it, last) => (
    <div key={it.name} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '12px 16px',
      borderBottom: last ? 'none' : `0.5px solid ${wf.lineSoft}`,
    }}>
      <IconStub size={26} tone={it.tone} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: wf.ink }}>{it.name}</div>
        <div style={{ fontSize: 10.5, color: wf.ink3 }}>{it.sub}</div>
      </div>
      {it.bar != null && (
        <div style={{ width: 90 }}>
          <ProgressBar pct={it.bar} color={it.bar > 70 ? wf.red : wf.amber} h={3} />
          <div style={{ fontSize: 9.5, color: wf.ink3, marginTop: 3, textAlign: 'right' }}>{it.bar}%</div>
        </div>
      )}
      <div style={{ width: 110, textAlign: 'right' }}>
        <Amount value={it.amt} size={14} color={it.amt.startsWith('−') ? wf.red : wf.ink} />
        {it.delta && <div style={{ fontSize: 10, color: it.delta.startsWith('+') ? wf.green : wf.red, fontWeight: 600, marginTop: 2 }}>{it.delta}</div>}
      </div>
    </div>
  );

  const section = (title, total, items) => (
    <Card padding={0} style={{ marginBottom: 12, overflow: 'hidden' }}>
      <div style={{
        display: 'flex', padding: '12px 16px', background: wf.grayFill2,
        borderBottom: `0.5px solid ${wf.line}`,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: wf.ink, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{title}</span>
        <span style={{ flex: 1 }} />
        <Amount value={total} size={12} color={total.startsWith('−') ? wf.red : wf.ink} />
      </div>
      {items.map((it, i) => row(it, i === items.length - 1))}
    </Card>
  );

  return (
    <Page subtitle="13 May 2026" title="Accounts"
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ padding: '7px 12px', background: wf.card, borderRadius: 8, fontSize: 12, fontWeight: 600, color: wf.ink, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.08)' }}>⤓ Statement</div>
          <div style={{ padding: '7px 14px', background: wf.blue, borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#fff' }}>+ Add account</div>
        </div>
      }
    >
      {/* Top totals strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 18 }}>
        {[
          ['Assets',  '54,780', wf.ink],
          ['Liquid',  '10,780', wf.ink],
          ['Debt',   '−38,420', wf.red],
          ['Net',     '24,180', wf.green],
        ].map(([l, v, c]) => (
          <div key={l} style={{ padding: '6px 4px' }}>
            <div style={{ fontSize: 10.5, color: wf.ink2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</div>
            <Amount value={v} size={20} color={c} />
          </div>
        ))}
      </div>

      {section('Cash & Debit · 10,780.30', '10,780.30', [
        { name: 'CIMB Current', sub: '••4821 · debit · MYR', tone: 'blue',  amt: '8,420.30', delta: '+340 this wk' },
        { name: 'Maybank Savings', sub: '••1730 · debit · MYR', tone: 'amber', amt: '2,180.00', delta: '−180 this wk' },
        { name: 'Cash Wallet', sub: 'wallet · last counted 4 May', tone: 'gray', amt: '180.00' },
      ])}
      {section('Savings & Investments', '50,000.00', [
        { name: 'myASNB',      sub: 'shariah · ASB · annual div Feb', tone: 'green', amt: '4,820.00', delta: '+200/mo' },
        { name: 'KAF Digital', sub: 'shariah · 3.6% p.a.',             tone: 'green', amt: '1,600.00' },
        { name: 'EPF · Employee',  sub: 'restricted · 11% gross',     tone: 'gray',  amt: '18,420.00' },
        { name: 'EPF · Employer',  sub: 'retirement · locked',         tone: 'gray',  amt: '25,160.00' },
      ])}
      {section('Credit Cards', '−6,390.00', [
        { name: 'Maybank Visa Platinum', sub: '••2204 · stmt 25 · due 15 · APR 18%', tone: 'red', amt: '−4,210.00', bar: 53 },
        { name: 'CIMB Platinum',         sub: '••8810 · stmt 5 · due 25 · APR 17%',  tone: 'red', amt: '−2,180.00', bar: 24 },
      ])}
      {section('BNPL & Loans', '−32,030.00', [
        { name: 'SPayLater',    sub: 'shopee · 0% if on time', tone: 'amber', amt: '−320.00', bar: 16 },
        { name: 'Atome',        sub: 'inactive',                tone: 'gray',  amt: '0.00' },
        { name: 'GrabPayLater', sub: 'inactive',                tone: 'gray',  amt: '0.00' },
        { name: 'BSN Personal Loan', sub: 'APR 8.5% · 47/60 paid · RM 740/mo', tone: 'red', amt: '−31,710.00' },
      ])}
    </Page>
  );
}

Object.assign(window, { AccountsA, AccountsB });
