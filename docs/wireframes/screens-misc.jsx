// Subscriptions, IOUs, Payslip — single-variation each

// ============================================================
// SUBSCRIPTIONS
// ============================================================
function Subscriptions() {
  const subs = [
    { name: 'Spotify Family',     vendor: 'Spotify', amt: 14.90, freq: 'Monthly', nextDays: 3,  cat: 'Streaming',  tone: 'green' },
    { name: 'iCloud+ 200 GB',     vendor: 'Apple',   amt: 3.90,  freq: 'Monthly', nextDays: 8,  cat: 'Cloud',      tone: 'gray'  },
    { name: 'ChatGPT Plus',       vendor: 'OpenAI',  amt: 92.00, freq: 'Monthly', nextDays: 11, cat: 'Productivity', tone: 'gray' },
    { name: 'FFXIV — 30 days',    vendor: 'Square Enix', amt: 60.00, freq: 'Monthly', nextDays: 14, cat: 'Gaming', tone: 'purple' },
    { name: 'Adobe Photography',  vendor: 'Adobe',   amt: 49.00, freq: 'Monthly', nextDays: 19, cat: 'Productivity', tone: 'red' },
    { name: 'Netflix Standard',   vendor: 'Netflix', amt: 45.00, freq: 'Monthly', nextDays: 22, cat: 'Streaming',  tone: 'red' },
    { name: 'Domain · wangkira.my', vendor: 'Namecheap', amt: 62.00, freq: 'Annual',  nextDays: 142, cat: 'Cloud',  tone: 'gray' },
    { name: 'Eve Online — Omega', vendor: 'CCP',     amt: 81.00, freq: 'Quarterly', nextDays: 47, cat: 'Gaming', tone: 'purple' },
  ];
  const monthly = 264.80, annual = monthly * 12 + 62;

  return (
    <Page subtitle={`${subs.length} active`} title="Subscriptions"
      tabs={[{ label: 'Active', active: true }, { label: 'Paused' }, { label: 'Cancelled' }]}
      action={<div style={{ padding: '7px 14px', background: wf.blue, borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#fff' }}>+ Add subscription</div>}
    >
      {/* Hero — totals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
        {[
          ['Monthly total', `${monthly.toFixed(2)}`,   wf.ink],
          ['Annualised',    `${annual.toFixed(2)}`,    wf.ink],
          ['Due this week', '18.80',                   wf.amber],
          ['Auto-post',     '0 of 8',                  wf.green],
        ].map(([l, v, c]) => (
          <Card key={l} padding={16}>
            <Label>{l}</Label>
            <div style={{ marginTop: 4 }}><Amount value={v} size={20} color={c} prefix={l === 'Auto-post' ? '' : 'RM'} /></div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12 }}>
        {/* List */}
        <Card padding={0}>
          <div style={{
            display: 'flex', padding: '10px 18px', borderBottom: `0.5px solid ${wf.line}`,
            fontSize: 10.5, color: wf.ink2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            <span style={{ flex: 1 }}>Service</span>
            <span style={{ width: 90 }}>Frequency</span>
            <span style={{ width: 110 }}>Next due</span>
            <span style={{ width: 100, textAlign: 'right' }}>Amount</span>
          </div>
          {subs.map((s, i) => (
            <div key={s.name} style={{
              display: 'flex', alignItems: 'center', padding: '12px 18px',
              borderBottom: i === subs.length - 1 ? 'none' : `0.5px solid ${wf.lineSoft}`,
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                <IconStub size={28} tone={s.tone} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{s.name}</div>
                  <div style={{ fontSize: 10.5, color: wf.ink3 }}>{s.vendor} · {s.cat}</div>
                </div>
              </div>
              <span style={{ width: 90, fontSize: 11.5, color: wf.ink2 }}>{s.freq}</span>
              <span style={{ width: 110 }}>
                {s.nextDays <= 3
                  ? <Pill tone="amber" size="sm">in {s.nextDays} days</Pill>
                  : <span style={{ fontSize: 11.5, color: wf.ink2 }}>in {s.nextDays} days</span>}
              </span>
              <span style={{ width: 100, textAlign: 'right' }}>
                <Amount value={s.amt.toFixed(2)} size={13} />
              </span>
            </div>
          ))}
        </Card>

        {/* Right — by category + upcoming */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card title="By category" padding={18}>
            {[
              ['Streaming',     59.90, wf.green],
              ['Gaming',        141.00, wf.purple || '#af52de'],
              ['Productivity',  141.00, wf.red],
              ['Cloud',         3.90,  wf.ink2],
            ].map(([l, v, c]) => (
              <div key={l} style={{ padding: '7px 0', borderBottom: `0.5px solid ${wf.lineSoft}` }}>
                <div style={{ display: 'flex', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
                  <span style={{ color: wf.ink }}>{l}</span>
                  <span style={{ flex: 1 }} />
                  <Amount value={v.toFixed(2)} size={12} />
                </div>
                <ProgressBar pct={(v / 264.80) * 100} color={c} h={3} />
              </div>
            ))}
          </Card>
          <Card title="Renewing soon" padding={18}>
            {subs.slice(0, 4).map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                <IconStub size={22} tone={s.tone} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: wf.ink, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 10.5, color: wf.ink3 }}>in {s.nextDays} days · {s.freq.toLowerCase()}</div>
                </div>
                <Amount value={s.amt.toFixed(2)} size={11.5} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Page>
  );
}

// ============================================================
// IOUs
// ============================================================
function IOUs() {
  const lent = [
    { who: 'Aiman',   amt: 200, days: 47, reason: 'Concert ticket · split' },
    { who: 'Hafiz',   amt: 85,  days: 12, reason: 'Grab to airport' },
    { who: 'Sis',     amt: 300, days: 8,  reason: 'Mum birthday gift split' },
  ];
  const owe = [
    { who: 'Dad',     amt: 1200, days: 22, reason: 'Borrowed for road tax + insurance' },
    { who: 'Imran',   amt: 60,   days: 4,  reason: 'Lunch · he paid' },
  ];
  const totalLent = lent.reduce((s, x) => s + x.amt, 0);
  const totalOwe = owe.reduce((s, x) => s + x.amt, 0);

  function IOUColumn({ title, total, items, tone }) {
    return (
      <Card padding={0}>
        <div style={{ padding: '16px 18px 12px', borderBottom: `0.5px solid ${wf.line}` }}>
          <Label>{title}</Label>
          <div style={{ marginTop: 4 }}><Amount value={total.toLocaleString() + '.00'} size={26} color={tone === 'green' ? wf.green : wf.red} /></div>
          <div style={{ fontSize: 11, color: wf.ink2, marginTop: 2 }}>{items.length} open · oldest {Math.max(...items.map(i => i.days))} days</div>
        </div>
        {items.map((it, i) => (
          <div key={it.who + i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
            borderBottom: i === items.length - 1 ? 'none' : `0.5px solid ${wf.lineSoft}`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: wf.grayFill, color: wf.ink2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 600,
            }}>{it.who.slice(0, 2).toUpperCase()}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: wf.ink }}>{it.who}</div>
              <div style={{ fontSize: 11, color: wf.ink3 }}>{it.reason}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Amount value={it.amt.toLocaleString() + '.00'} size={14} color={tone === 'green' ? wf.green : wf.red} />
              <div style={{ fontSize: 10, color: wf.ink3, marginTop: 2 }}>{it.days} days open</div>
            </div>
            <Pill tone="blue" size="sm">Settle</Pill>
          </div>
        ))}
        <div style={{ padding: 14, textAlign: 'center', background: wf.grayFill2 }}>
          <span style={{ fontSize: 12, color: wf.blue, fontWeight: 500 }}>＋ Add {tone === 'green' ? 'amount owed to me' : 'amount I owe'}</span>
        </div>
      </Card>
    );
  }

  return (
    <Page subtitle={`Net: ${totalLent - totalOwe < 0 ? '−' : '+'} RM ${Math.abs(totalLent - totalOwe).toLocaleString()}.00`} title="IOUs">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <IOUColumn title="They owe me" total={totalLent} items={lent} tone="green" />
        <IOUColumn title="I owe"        total={totalOwe}  items={owe}  tone="red" />
      </div>

      <Card title="History · last 6 months" action="Export" padding={18} style={{ marginTop: 14 }}>
        {[
          ['Aiman',  'Settled in full', '2 Apr', '+150.00', wf.green],
          ['Liana',  'Wrote off',       '14 Mar', '−40.00', wf.ink3],
          ['Hafiz',  'Settled in full', '1 Mar',  '+25.00', wf.green],
          ['Dad',    'Partial 400',     '15 Feb', '−400.00', wf.red],
        ].map(([w, act, d, a, c], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: `0.5px solid ${wf.lineSoft}`, fontSize: 12 }}>
            <span style={{ width: 100, color: wf.ink, fontWeight: 500 }}>{w}</span>
            <span style={{ flex: 1, color: wf.ink2 }}>{act}</span>
            <span style={{ width: 80, color: wf.ink3 }}>{d}</span>
            <span style={{ width: 100, textAlign: 'right' }}>
              <Amount value={a.replace('+', '').replace('−', '')} size={12} color={c} prefix={a[0] === '+' ? '+ RM' : a[0] === '−' ? '− RM' : 'RM'} />
            </span>
          </div>
        ))}
      </Card>
    </Page>
  );
}

// ============================================================
// SALARY / PAYSLIP
// ============================================================
function Payslip() {
  const deductions = [
    ['EPF — Employee 11%',  792.00, 'retirement'],
    ['EPF — Employer 13%',  936.00, 'employer (tracked)'],
    ['SOCSO — Employee',    24.75,  'statutory'],
    ['SOCSO — Employer',    86.65,  'employer (tracked)'],
    ['EIS — Employee',      9.90,   'statutory'],
    ['EIS — Employer',      9.90,   'employer (tracked)'],
    ['PCB (MTD)',           285.00, 'income tax'],
    ['Zakat (deducted)',    180.00, 'reduces PCB'],
    ['Parking — KAF',       60.00,  'loan to employer'],
    ['Medical premium',     45.00,  'health'],
  ];

  return (
    <Page subtitle="May 2026 · draft" title="Payslip · 25 May"
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill size="sm">Edit</Pill>
          <div style={{ padding: '7px 14px', background: wf.green, borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#fff' }}>Confirm & post</div>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <div>
          {/* Hero */}
          <Card padding={22} style={{ marginBottom: 14 }}>
            <Label>Net pay to CIMB ••4821</Label>
            <Amount value="6,177.45" size={44} />
            <div style={{ display: 'flex', gap: 24, marginTop: 18 }}>
              {[
                ['Gross',      '7,200.00', wf.ink],
                ['Allowances', '+180.00',  wf.green],
                ['Deductions', '−1,202.55',wf.red],
              ].map(([l, v, c]) => (
                <div key={l}>
                  <Label>{l}</Label>
                  <Amount value={v.replace('+','').replace('−','')} size={16} color={c} prefix={v[0] === '+' ? '+ RM' : v[0] === '−' ? '− RM' : 'RM'} />
                </div>
              ))}
            </div>
            {/* Match bar */}
            <div style={{
              marginTop: 18, padding: 12, background: 'rgba(48,209,88,0.08)',
              borderRadius: 10, border: '0.5px solid rgba(48,209,88,0.25)',
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 12,
            }}>
              <span style={{ color: wf.green, fontWeight: 700 }}>✓</span>
              <span style={{ color: wf.ink }}>Matches CIMB credit on 24 May 23:58 — <strong>RM 6,177.45</strong></span>
            </div>
          </Card>

          {/* Deductions table */}
          <Card title="Deductions breakdown" padding={0}>
            <div style={{
              display: 'flex', padding: '10px 18px', background: wf.grayFill2,
              borderBottom: `0.5px solid ${wf.line}`,
              fontSize: 10.5, color: wf.ink2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              <span style={{ flex: 1 }}>Item</span>
              <span style={{ width: 110 }}>Category</span>
              <span style={{ width: 100, textAlign: 'right' }}>Amount</span>
            </div>
            {deductions.map((d, i) => (
              <div key={d[0]} style={{
                display: 'flex', alignItems: 'center', padding: '10px 18px',
                borderBottom: i === deductions.length - 1 ? 'none' : `0.5px solid ${wf.lineSoft}`,
                opacity: d[2].includes('employer') ? 0.55 : 1,
              }}>
                <span style={{ flex: 1, fontSize: 12.5, color: wf.ink, fontWeight: 500 }}>{d[0]}</span>
                <span style={{ width: 110, fontSize: 10.5, color: wf.ink3 }}>{d[2]}</span>
                <span style={{ width: 100, textAlign: 'right' }}>
                  <Amount value={d[1].toFixed(2)} size={12} color={d[2].includes('employer') ? wf.ink2 : wf.ink} />
                </span>
              </div>
            ))}
            <div style={{
              display: 'flex', padding: '12px 18px', background: wf.grayFill2,
              fontSize: 12, fontWeight: 700, color: wf.ink,
            }}>
              <span style={{ flex: 1 }}>Total (excl. employer)</span>
              <Amount value="1,202.55" size={13} />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card title="YTD · Jan–May 2026" padding={18}>
            {[
              ['Gross',           '36,000.00', wf.ink],
              ['Net',             '30,887.25', wf.ink],
              ['EPF (employee)',  '3,960.00',  wf.ink],
              ['EPF (employer)',  '4,680.00',  wf.ink2],
              ['SOCSO',           '123.75',    wf.ink],
              ['EIS',             '49.50',     wf.ink],
              ['PCB paid',        '1,425.00',  wf.ink],
              ['Zakat paid',      '900.00',    wf.green],
            ].map(([l, v, c]) => (
              <div key={l} style={{ display: 'flex', padding: '6px 0', borderBottom: `0.5px solid ${wf.lineSoft}`, fontSize: 12 }}>
                <span style={{ color: wf.ink2, flex: 1 }}>{l}</span>
                <Amount value={v} size={12} color={c} />
              </div>
            ))}
          </Card>

          <Card title="Posting plan" padding={18}>
            <div style={{ fontSize: 11.5, color: wf.ink2, lineHeight: 1.55 }}>
              On <strong style={{ color: wf.ink }}>confirm</strong>, 11 transactions will be created:
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              <div style={{ display: 'flex', gap: 6 }}><IconStub size={14} tone="green" r={3} /><span style={{ color: wf.ink }}>+ Income · 7,200 to gross</span></div>
              <div style={{ display: 'flex', gap: 6 }}><IconStub size={14} tone="green" r={3} /><span style={{ color: wf.ink }}>+ Allowance · 180 handphone</span></div>
              <div style={{ display: 'flex', gap: 6 }}><IconStub size={14} tone="red" r={3} /><span style={{ color: wf.ink }}>− 8 deductions to statutory pots</span></div>
              <div style={{ display: 'flex', gap: 6 }}><IconStub size={14} tone="blue" r={3} /><span style={{ color: wf.ink }}>= Transfer 6,177.45 → CIMB Current</span></div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { Subscriptions, IOUs, Payslip });
