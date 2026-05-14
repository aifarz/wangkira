// Budget — 2 variations
//   A: Bars view (classic) with rollover
//   B: Burn-down dial layout, category cards with sparklines

function BudgetA() {
  const cats = [
    { name: 'Groceries',       budget: 800, spent: 576, rollover: 0,   tone: 'green',  type: 'Need' },
    { name: 'Eating out',      budget: 500, spent: 590, rollover: 0,   tone: 'red',    type: 'Want' },
    { name: 'Transport',       budget: 350, spent: 188, rollover: 40,  tone: 'green',  type: 'Need' },
    { name: 'Utilities',       budget: 320, spent: 318, rollover: 0,   tone: 'amber',  type: 'Need' },
    { name: 'Subscriptions',   budget: 180, spent: 152, rollover: 0,   tone: 'green',  type: 'Sub'  },
    { name: 'Family',          budget: 600, spent: 600, rollover: 0,   tone: 'amber',  type: 'Obl'  },
    { name: 'Hobbies',         budget: 200, spent: 64,  rollover: 80,  tone: 'green',  type: 'Want' },
    { name: 'Health',          budget: 250, spent: 30,  rollover: 0,   tone: 'green',  type: 'Need' },
    { name: 'Gifts / Charity', budget: 150, spent: 0,   rollover: 50,  tone: 'green',  type: 'Obl'  },
    { name: 'CC Installments', budget: 760, spent: 380, rollover: 0,   tone: 'green',  type: 'Debt' },
  ];
  const totalBudget = cats.reduce((s, c) => s + c.budget, 0);
  const totalSpent  = cats.reduce((s, c) => s + c.spent, 0);

  return (
    <Page subtitle="May 2026" title="Budget"
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill size="sm">‹ Apr</Pill><Pill tone="blue" size="sm">May ▾</Pill><Pill size="sm">Jun ›</Pill>
        </div>
      }
    >
      {/* Hero strip */}
      <Card padding={20} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
          <div>
            <Label>Spent of budget</Label>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <Amount value={totalSpent.toLocaleString()} size={32} />
              <span style={{ fontSize: 16, color: wf.ink2 }}>/ RM {totalBudget.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', background: wf.grayFill2 }}>
              <div style={{ width: '38%', background: wf.green }} />
              <div style={{ width: '22%', background: wf.amber }} />
              <div style={{ width: '8%',  background: wf.red }} />
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 11 }}>
              <span style={{ color: wf.ink2 }}><span style={{ display: 'inline-block', width: 8, height: 8, background: wf.green, borderRadius: 2, marginRight: 6 }}/>Need 1,112</span>
              <span style={{ color: wf.ink2 }}><span style={{ display: 'inline-block', width: 8, height: 8, background: wf.amber, borderRadius: 2, marginRight: 6 }}/>Want 656</span>
              <span style={{ color: wf.ink2 }}><span style={{ display: 'inline-block', width: 8, height: 8, background: wf.red, borderRadius: 2, marginRight: 6 }}/>Over 90</span>
              <span style={{ color: wf.ink3 }}>· 12 days left in May</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Cat list */}
      <Card padding={0}>
        <div style={{
          display: 'flex', padding: '10px 18px', borderBottom: `0.5px solid ${wf.line}`,
          fontSize: 10.5, color: wf.ink2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          <span style={{ flex: 1 }}>Category</span>
          <span style={{ width: 240 }}>Burn</span>
          <span style={{ width: 100, textAlign: 'right' }}>Spent</span>
          <span style={{ width: 100, textAlign: 'right' }}>Budget</span>
          <span style={{ width: 80,  textAlign: 'right' }}>Left</span>
        </div>
        {cats.map((c, i) => {
          const limit = c.budget + c.rollover;
          const pct = Math.round((c.spent / limit) * 100);
          const left = limit - c.spent;
          return (
            <div key={c.name} style={{
              display: 'flex', alignItems: 'center', padding: '12px 18px',
              borderBottom: i === cats.length - 1 ? 'none' : `0.5px solid ${wf.lineSoft}`,
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconStub size={24} tone={c.tone} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: wf.ink3 }}>{c.type}{c.rollover ? ` · ↻ +${c.rollover}` : ''}</div>
                </div>
              </div>
              <div style={{ width: 240, paddingRight: 16 }}>
                <ProgressBar pct={Math.min(pct, 100)} color={pct > 100 ? wf.red : pct > 85 ? wf.amber : wf.green} h={6} />
                <div style={{ fontSize: 9.5, color: wf.ink3, marginTop: 3 }}>{pct}%</div>
              </div>
              <div style={{ width: 100, textAlign: 'right' }}><Amount value={c.spent.toLocaleString() + '.00'} size={12} /></div>
              <div style={{ width: 100, textAlign: 'right' }}><Amount value={limit.toLocaleString() + '.00'} size={12} color={wf.ink2} /></div>
              <div style={{ width: 80, textAlign: 'right' }}>
                <Amount value={Math.abs(left) + '.00'} size={12} color={left < 0 ? wf.red : wf.green} prefix={left < 0 ? '−' : ''} />
              </div>
            </div>
          );
        })}
      </Card>
    </Page>
  );
}

function BudgetB() {
  const cats = [
    { name: 'Groceries',     pct: 72, spent: 576, budget: 800, tone: 'green'  },
    { name: 'Eating out',    pct: 118, spent: 590, budget: 500, tone: 'red'    },
    { name: 'Transport',     pct: 54, spent: 188, budget: 350, tone: 'green'  },
    { name: 'Utilities',     pct: 99, spent: 318, budget: 320, tone: 'amber'  },
    { name: 'Subscriptions', pct: 84, spent: 152, budget: 180, tone: 'amber'  },
    { name: 'Family',        pct: 100, spent: 600, budget: 600, tone: 'amber'  },
    { name: 'Hobbies',       pct: 32, spent: 64, budget: 200, tone: 'green'  },
    { name: 'Health',        pct: 12, spent: 30, budget: 250, tone: 'green'  },
  ];

  // Donut math
  function Donut({ pct = 67, size = 200, color = wf.amber }) {
    const r = (size - 24) / 2;
    const c = 2 * Math.PI * r;
    return (
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke={wf.grayFill} strokeWidth="12" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="12" fill="none"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct/100)}
          strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
    );
  }

  return (
    <Page subtitle="May 2026 · 12 days left" title="Budget"
      tabs={[{ label: 'Monthly', active: true }, { label: 'Annual' }, { label: 'Rollover' }]}
      action={<Pill tone="blue" size="sm">Edit limits</Pill>}
    >
      {/* hero donut + numbers */}
      <Card padding={26} style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 36 }}>
        <div style={{ position: 'relative' }}>
          <Donut pct={67} color={wf.amber} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: wf.ink, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums' }}>67%</div>
            <div style={{ fontSize: 11, color: wf.ink2, marginTop: 2 }}>of RM 4,800</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {[
            ['Spent so far', '3,240.00', wf.ink],
            ['Daily avg',    '249.00',   wf.ink],
            ['Projected EoM','5,180.00', wf.red],
            ['Rollover next','—120.00',  wf.red],
          ].map(([l, v, c]) => (
            <div key={l}>
              <Label>{l}</Label>
              <div style={{ marginTop: 4 }}><Amount value={v} size={20} color={c} /></div>
            </div>
          ))}
        </div>
      </Card>

      {/* Cat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {cats.map(c => (
          <Card key={c.name} padding={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <IconStub size={22} tone={c.tone} />
              <div style={{ fontSize: 12, fontWeight: 600, color: wf.ink }}>{c.name}</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.pct > 100 ? wf.red : wf.ink, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{c.pct}%</div>
            <div style={{ fontSize: 10.5, color: wf.ink3, marginTop: 2 }}>RM {c.spent} / {c.budget}</div>
            <div style={{ marginTop: 10 }}>
              <ProgressBar pct={Math.min(c.pct, 100)} color={c.pct > 100 ? wf.red : c.pct > 85 ? wf.amber : wf.green} h={4} />
            </div>
            <div style={{ marginTop: 10 }}>
              <Sparkline w={160} h={28} color={c.pct > 100 ? wf.red : wf.ink2} down={c.pct < 60} />
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

Object.assign(window, { BudgetA, BudgetB });
