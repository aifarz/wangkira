// Dashboard variations — three takes on the home screen.

// ============================================================
// Shared dashboard atoms
// ============================================================
function Sparkline({ down = true, w = 200, h = 40, color }) {
  const c = color || (down ? wf.green : wf.red);
  const pts = down
    ? '0,8 18,12 36,10 54,16 72,15 90,20 108,22 126,26 144,28 162,32 180,34 200,38'
    : '0,32 18,28 36,30 54,24 72,26 90,20 108,18 126,14 144,16 162,10 180,8 200,4';
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={`${pts} 200,${h} 0,${h}`} fill={c} fillOpacity="0.08"/>
    </svg>
  );
}

function ProgressBar({ pct = 60, color = wf.blue, h = 6 }) {
  return (
    <div style={{ width: '100%', height: h, background: wf.grayFill2, borderRadius: h / 2, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: h / 2 }} />
    </div>
  );
}

function UpcomingRow({ icon, title, sub, amt, tone = 'neutral' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0', borderBottom: `0.5px solid ${wf.lineSoft}`,
    }}>
      <IconStub size={32} tone={icon} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{title}</div>
        <div style={{ fontSize: 11, color: wf.ink2, marginTop: 2 }}>{sub}</div>
      </div>
      {amt && <Amount value={amt} size={13} color={tone === 'red' ? wf.red : wf.ink} />}
    </div>
  );
}

// ============================================================
// VARIATION A — Debt-forward
// Big clearance hero with mini-chart. Aggressive but calm.
// ============================================================
function DashboardA() {
  return (
    <Page
      subtitle="Hello, Farzani"
      title="Dashboard"
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            padding: '7px 14px', background: wf.card, borderRadius: 8,
            fontSize: 12, fontWeight: 600, color: wf.ink,
            boxShadow: '0 0 0 0.5px rgba(0,0,0,0.08)',
          }}>This month ▾</div>
          <div style={{
            padding: '7px 14px', background: wf.blue, borderRadius: 8,
            fontSize: 12, fontWeight: 600, color: '#fff',
          }}>+ Transaction</div>
        </div>
      }
    >
      {/* DEBT CLEARANCE HERO */}
      <Card padding={24} style={{ marginBottom: 16, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <Label>Debt-free in</Label>
            <div style={{
              fontSize: 56, fontWeight: 700, color: wf.ink, letterSpacing: '-0.035em',
              lineHeight: 1, marginTop: 4,
            }}>
              2y 4m
            </div>
            <div style={{ fontSize: 13, color: wf.ink2, marginTop: 8 }}>
              September 2028 · 5 weeks earlier than last week <Pill tone="green" size="sm">↓ 5w</Pill>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 22 }}>
              <div>
                <Label>Total debt</Label>
                <div style={{ marginTop: 4 }}><Amount value="38,420.00" size={18} color={wf.red} /></div>
              </div>
              <div>
                <Label>This month paid</Label>
                <div style={{ marginTop: 4 }}><Amount value="1,840.00" size={18} color={wf.green} /></div>
              </div>
              <div>
                <Label>Projected interest</Label>
                <div style={{ marginTop: 4 }}><Amount value="2,180.00" size={18} color={wf.ink} /></div>
              </div>
            </div>
          </div>
          <div style={{ width: 340 }}>
            <Sparkline w={340} h={120} down={true} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: wf.ink3, marginTop: 4 }}>
              <span>Today</span><span>2027</span><span>2028</span>
            </div>
          </div>
        </div>
      </Card>

      {/* SECONDARY ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
        <Card padding={18}>
          <Label>Net worth</Label>
          <div style={{ marginTop: 6 }}><Amount value="24,180" size={22} /></div>
          <div style={{ fontSize: 11, color: wf.green, marginTop: 3, fontWeight: 600 }}>↑ RM 1,240 vs Apr</div>
          <div style={{ marginTop: 12 }}><Sparkline w={260} h={32} down={false} color={wf.blue} /></div>
        </Card>
        <Card padding={18}>
          <Label>This month spent</Label>
          <div style={{ marginTop: 6 }}>
            <Amount value="3,240" size={22} />
            <span style={{ fontSize: 13, color: wf.ink2, marginLeft: 4 }}> / 4,800</span>
          </div>
          <div style={{ marginTop: 14 }}><ProgressBar pct={67} color={wf.amber} /></div>
          <div style={{ fontSize: 11, color: wf.ink2, marginTop: 8 }}>67% of budget · 12 days left</div>
        </Card>
        <Card padding={18}>
          <Label>Wedding fund — Aug 2028</Label>
          <div style={{ marginTop: 6 }}>
            <Amount value="6,400" size={22} />
            <span style={{ fontSize: 13, color: wf.ink2, marginLeft: 4 }}> / 35,000</span>
          </div>
          <div style={{ marginTop: 14 }}><ProgressBar pct={18} color={wf.green} /></div>
          <div style={{ fontSize: 11, color: wf.green, marginTop: 8, fontWeight: 600 }}>● On track</div>
        </Card>
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
        <Card title="Upcoming" action="See all" padding={20}>
          <UpcomingRow icon="red"    title="CIMB CC statement"     sub="Due in 3 days · RM 4,210 statement" amt="486.00" tone="red" />
          <UpcomingRow icon="amber"  title="Spotify Family"        sub="Renews 16 May · monthly"            amt="14.90" />
          <UpcomingRow icon="purple" title="Installment · MacBook" sub="Month 7 of 24 · Maybank EzyPay"     amt="380.00" />
          <UpcomingRow icon="green"  title="Salary · BNP"          sub="Pay day 25 May · confirm payslip"   amt="7,200" tone="green" />
          <UpcomingRow icon="gray"   title="Unifi Home"            sub="Due 18 May · CIMB autopay"          amt="129.00" />
        </Card>

        <Card title="Alerts" padding={20}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: 12, background: 'rgba(255,69,58,0.06)', borderRadius: 10, border: '0.5px solid rgba(255,69,58,0.18)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#c8302a' }}>Eating out — 118% of budget</div>
              <div style={{ fontSize: 11, color: wf.ink2, marginTop: 3 }}>RM 590 of RM 500 · 12 days left</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(255,159,10,0.07)', borderRadius: 10, border: '0.5px solid rgba(255,159,10,0.2)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#a76600' }}>IOU · Aiman owes RM 200</div>
              <div style={{ fontSize: 11, color: wf.ink2, marginTop: 3 }}>Open for 47 days</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(0,122,255,0.05)', borderRadius: 10, border: '0.5px solid rgba(0,122,255,0.15)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: wf.blue }}>Cash drawer not reconciled</div>
              <div style={{ fontSize: 11, color: wf.ink2, marginTop: 3 }}>Last counted 9 days ago</div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}

// ============================================================
// VARIATION B — Calm / Modular
// Net worth as headline, smaller modular cards, Wallet vibe.
// ============================================================
function DashboardB() {
  const accounts = [
    { name: 'CIMB Current', last: '••4821', amt: '8,420.30', tone: 'blue' },
    { name: 'Maybank Savings', last: '••1730', amt: '2,180.00', tone: 'amber' },
    { name: 'myASNB', last: '', amt: '4,820.00', tone: 'green' },
    { name: 'KAF Digital', last: '', amt: '1,600.00', tone: 'green' },
    { name: 'Cash Wallet', last: '', amt: '180.00', tone: 'gray' },
  ];
  const debts = [
    { name: 'Maybank Visa', last: '••2204', amt: '4,210.00', limit: 53, tone: 'red' },
    { name: 'CIMB Platinum', last: '••8810', amt: '2,180.00', limit: 24, tone: 'red' },
    { name: 'SPayLater', last: '', amt: '320.00', limit: 16, tone: 'amber' },
    { name: 'Personal Loan · BSN', last: '', amt: '31,710.00', limit: 71, tone: 'red' },
  ];

  return (
    <Page subtitle="May 2026" title="Overview"
      action={<div style={{
        padding: '8px 16px', background: wf.ink, borderRadius: 10,
        fontSize: 12, fontWeight: 600, color: '#fff',
      }}>+ Add transaction</div>}
    >
      {/* HERO — net worth, big and quiet */}
      <div style={{ padding: '8px 4px 28px' }}>
        <Label>Net worth</Label>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
          <Amount value="24,180.30" size={48} weight={700} />
          <Pill tone="green">↑ RM 1,240 · this month</Pill>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 18 }}>
          {[
            { l: 'Liquid', v: '12,400', c: wf.ink },
            { l: 'Restricted', v: '6,420', c: wf.ink },
            { l: 'Retirement', v: '43,580', c: wf.ink },
            { l: 'Debt', v: '−38,220', c: wf.red },
          ].map(x => (
            <div key={x.l}>
              <div style={{ fontSize: 11, color: wf.ink2 }}>{x.l}</div>
              <Amount value={x.v} size={16} color={x.c} />
            </div>
          ))}
        </div>
      </div>

      {/* MODULAR GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <Card title="Cash & Savings" action="Accounts" padding={18}>
          {accounts.map(a => (
            <div key={a.name} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 0', borderBottom: `0.5px solid ${wf.lineSoft}`,
            }}>
              <IconStub size={26} tone={a.tone} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{a.name}</div>
                {a.last && <div style={{ fontSize: 10.5, color: wf.ink3 }}>{a.last}</div>}
              </div>
              <Amount value={a.amt} size={13} />
            </div>
          ))}
        </Card>

        <Card title="Debt" action="Plan" padding={18}>
          {debts.map(d => (
            <div key={d.name} style={{ padding: '8px 0', borderBottom: `0.5px solid ${wf.lineSoft}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <IconStub size={26} tone={d.tone} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{d.name}</div>
                  {d.last && <div style={{ fontSize: 10.5, color: wf.ink3 }}>{d.last}</div>}
                </div>
                <Amount value={d.amt} size={13} color={wf.red} />
              </div>
              <div style={{ marginTop: 8, marginLeft: 38 }}>
                <ProgressBar pct={d.limit} color={d.tone === 'red' ? wf.red : wf.amber} h={4} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <Card title="Debt clearance" padding={18}>
          <div style={{ fontSize: 32, fontWeight: 700, color: wf.ink, letterSpacing: '-0.025em' }}>Sep 2028</div>
          <div style={{ fontSize: 11, color: wf.green, marginTop: 4, fontWeight: 600 }}>5 weeks earlier</div>
          <div style={{ marginTop: 14 }}><Sparkline w={240} h={48} /></div>
        </Card>
        <Card title="Budget burn" padding={18}>
          <div style={{ fontSize: 32, fontWeight: 700, color: wf.ink, letterSpacing: '-0.025em' }}>67%</div>
          <div style={{ fontSize: 11, color: wf.ink2, marginTop: 4 }}>RM 3,240 of RM 4,800</div>
          <div style={{ marginTop: 14 }}><ProgressBar pct={67} color={wf.amber} h={8} /></div>
          <div style={{ fontSize: 10.5, color: wf.ink3, marginTop: 6 }}>12 days remaining</div>
        </Card>
        <Card title="Wedding · Aug 2028" padding={18}>
          <div style={{ fontSize: 32, fontWeight: 700, color: wf.ink, letterSpacing: '-0.025em' }}>18%</div>
          <div style={{ fontSize: 11, color: wf.ink2, marginTop: 4 }}>RM 6,400 of RM 35,000</div>
          <div style={{ marginTop: 14 }}><ProgressBar pct={18} color={wf.green} h={8} /></div>
          <div style={{ fontSize: 10.5, color: wf.green, marginTop: 6, fontWeight: 600 }}>On track</div>
        </Card>
      </div>
    </Page>
  );
}

// ============================================================
// VARIATION C — Dense / Pro
// Power-user layout. Everything visible, smaller type, multi-pane.
// ============================================================
function DashboardC() {
  return (
    <Page subtitle="13 May · Wednesday" title="Today"
      tabs={[
        { label: 'Today', active: true }, { label: 'Week' },
        { label: 'Month' }, { label: 'YTD' },
      ]}
      action={<div style={{ display: 'flex', gap: 6 }}>
        {['↻', '⇪', '⊕'].map(c => (
          <div key={c} style={{
            width: 30, height: 30, background: wf.card, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: wf.ink2,
            boxShadow: '0 0 0 0.5px rgba(0,0,0,0.08)',
          }}>{c}</div>
        ))}
      </div>}
    >
      {/* TOP STRIP — 5 micro-metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 12 }}>
        {[
          { l: 'Net worth',  v: '24,180', d: '+1,240',  tone: wf.green },
          { l: 'Total debt', v: '38,420', d: '−1,840',  tone: wf.green },
          { l: 'Free cash',  v: '10,600', d: '−240',    tone: wf.red },
          { l: 'MTD spend',  v: '3,240',  d: '67% bud', tone: wf.amber },
          { l: 'Clearance',  v: 'Sep 28', d: '−5w',     tone: wf.green },
        ].map(m => (
          <Card key={m.l} padding={14}>
            <div style={{ fontSize: 10, color: wf.ink2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.l}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: wf.ink, marginTop: 4, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{m.v.startsWith('Sep') ? m.v : 'RM ' + m.v}</div>
            <div style={{ fontSize: 10.5, color: m.tone, fontWeight: 600, marginTop: 2 }}>{m.d}</div>
          </Card>
        ))}
      </div>

      {/* MID — three column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr 1fr', gap: 12, marginBottom: 12 }}>
        <Card title="Accounts" action="Edit" padding={16}>
          {[
            ['CIMB Current', '8,420', 'blue'],
            ['Maybank Sav.', '2,180', 'amber'],
            ['myASNB',       '4,820', 'green'],
            ['KAF Digital',  '1,600', 'green'],
            ['Cash',         '180',   'gray'],
            ['─ debts ─',    '',      ''],
            ['Maybank Visa', '−4,210', 'red'],
            ['CIMB Plat.',   '−2,180', 'red'],
            ['SPayLater',    '−320',   'amber'],
            ['BSN Loan',     '−31,710', 'red'],
          ].map(([n, a, t], i) => (
            n === '─ debts ─' ? (
              <div key={i} style={{ fontSize: 9.5, color: wf.ink3, padding: '8px 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Liabilities</div>
            ) : (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <IconStub size={18} tone={t} r={4} />
                <span style={{ flex: 1, fontSize: 11.5, color: wf.ink }}>{n}</span>
                <Amount value={a} size={11.5} color={a.startsWith('−') ? wf.red : wf.ink} />
              </div>
            )
          ))}
        </Card>

        <Card title="Debt trajectory" action="Plan" padding={16}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Pill tone="blue" size="sm">Snowball</Pill>
            <Pill size="sm">Avalanche</Pill>
            <Pill size="sm">Schedule</Pill>
          </div>
          <Sparkline w={400} h={180} />
          <div style={{ fontSize: 10, color: wf.ink3, marginTop: 8 }}>
            38,420 today · 0 by Sep 2028 · RM 2,180 projected interest
          </div>
          <div style={{ marginTop: 14 }}>
            <Label>Extra payment</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <div style={{ flex: 1, height: 4, background: wf.grayFill2, borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: '35%', height: '100%', background: wf.blue, borderRadius: 2 }} />
                <div style={{ position: 'absolute', left: '35%', top: -4, width: 12, height: 12, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transform: 'translateX(-6px)' }} />
              </div>
              <Amount value="350" size={12} />
            </div>
          </div>
        </Card>

        <Card title="Categories — May" action="Budget" padding={16}>
          {[
            ['Groceries',  72, wf.green],
            ['Eating out', 118, wf.red],
            ['Transport',  54, wf.green],
            ['Subscriptions', 84, wf.amber],
            ['Family',     100, wf.amber],
            ['Hobbies',    32, wf.green],
            ['Health',     12, wf.green],
            ['Gifts',      0, wf.green],
          ].map(([n, p, c]) => (
            <div key={n} style={{ padding: '6px 0' }}>
              <div style={{ display: 'flex', fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: wf.ink }}>{n}</span>
                <span style={{ flex: 1 }} />
                <span style={{ color: p > 100 ? wf.red : wf.ink2, fontWeight: 600 }}>{p}%</span>
              </div>
              <ProgressBar pct={Math.min(p, 100)} color={c} h={3} />
            </div>
          ))}
        </Card>
      </div>

      {/* BOTTOM — upcoming + recent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card title="Upcoming · 7 days" padding={16}>
          {[
            ['CIMB CC statement',  '16 May', '486.00',  'red'],
            ['Spotify Family',     '16 May', '14.90',   'amber'],
            ['Unifi Home',         '18 May', '129.00',  'gray'],
            ['MacBook installment','22 May', '380.00',  'purple'],
            ['Salary',             '25 May', '+7,200',  'green'],
          ].map(([n, d, a, t], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: `0.5px solid ${wf.lineSoft}` }}>
              <IconStub size={20} tone={t} r={5} />
              <span style={{ flex: 1, fontSize: 11.5, color: wf.ink, fontWeight: 500 }}>{n}</span>
              <span style={{ fontSize: 10.5, color: wf.ink3, fontVariantNumeric: 'tabular-nums' }}>{d}</span>
              <span style={{ width: 70, textAlign: 'right' }}>
                <Amount value={a.replace('+', '')} size={11.5} color={a.startsWith('+') ? wf.green : wf.ink} />
              </span>
            </div>
          ))}
        </Card>

        <Card title="Recent transactions" action="All" padding={16}>
          {[
            ['Village Park', 'Eating out · Maybank ••1730', '−32.00', 'amber'],
            ['Shell Sec 13', 'Fuel · Maybank ••1730',       '−85.40', 'gray'],
            ['Grab',         'Transport · Maybank ••1730',  '−12.50', 'gray'],
            ['Aiman',        'IOU settle · CIMB ••4821',    '+200.00', 'green'],
            ['Steam',        'Gaming · Maybank ••1730',     '−24.00', 'purple'],
          ].map(([n, sub, a, t], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: `0.5px solid ${wf.lineSoft}` }}>
              <IconStub size={20} tone={t} r={5} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, color: wf.ink, fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 10, color: wf.ink3 }}>{sub}</div>
              </div>
              <Amount value={a.replace('+', '').replace('−', '')} size={11.5} color={a.startsWith('+') ? wf.green : wf.ink} prefix={a.startsWith('+') ? '+ RM' : '− RM'} />
            </div>
          ))}
        </Card>
      </div>
    </Page>
  );
}

Object.assign(window, { DashboardA, DashboardB, DashboardC, Sparkline, ProgressBar });
