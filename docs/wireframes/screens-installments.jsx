// Installments — shows active CC installments + amortisation schedule
// Single variation: master/detail layout with schedule

function Installments() {
  const active = [
    { name: 'MacBook Air M3', card: 'Maybank ••2204', total: 6840, monthly: 380, n: 7, of: 24, apr: '3.5%' },
    { name: 'Sony WH-1000XM5', card: 'CIMB ••8810',  total: 1850, monthly: 154, n: 3, of: 12, apr: '0%' },
    { name: 'iPad Pro 11"',   card: 'Maybank ••2204', total: 4200, monthly: 350, n: 11, of: 12, apr: '0%' },
  ];

  const schedule = Array.from({ length: 24 }, (_, i) => {
    const n = i + 1;
    const principal = 280 - i * 0.6;
    const interest = 100 - i * 4;
    const total = principal + interest;
    return { n, principal, interest, total, status: n <= 7 ? 'paid' : (n === 8 ? 'due' : 'pending') };
  });

  return (
    <Page subtitle="3 active · RM 884/mo" title="Installments"
      tabs={[{ label: 'Active', active: true }, { label: 'Completed (8)' }, { label: 'Cancelled' }]}
      action={<div style={{ padding: '7px 14px', background: wf.blue, borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#fff' }}>+ Convert purchase</div>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 14 }}>
        {/* LEFT — list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {active.map((it, i) => {
            const pct = Math.round((it.n / it.of) * 100);
            return (
              <Card key={it.name} padding={14} style={{
                outline: i === 0 ? `2px solid ${wf.blue}` : 'none',
                outlineOffset: i === 0 ? -1 : 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <IconStub size={28} tone="purple" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>{it.name}</div>
                    <div style={{ fontSize: 10.5, color: wf.ink3 }}>{it.card} · APR {it.apr}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: wf.ink2 }}>Month {it.n} of {it.of}</span>
                  <Amount value={it.monthly + '.00'} size={13} />
                </div>
                <div style={{ marginTop: 8 }}>
                  <ProgressBar pct={pct} color={wf.blue} h={5} />
                </div>
                <div style={{ fontSize: 10, color: wf.ink3, marginTop: 6 }}>
                  Paid RM {(it.n * it.monthly).toLocaleString()} of {it.total.toLocaleString()}
                </div>
              </Card>
            );
          })}

          <Card padding={14} style={{ border: `1px dashed ${wf.line}`, boxShadow: 'none', background: 'transparent' }}>
            <div style={{ textAlign: 'center', color: wf.ink3, fontSize: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 4, opacity: 0.4 }}>＋</div>
              Convert past CC purchase
            </div>
          </Card>
        </div>

        {/* RIGHT — detail */}
        <Card padding={0}>
          {/* Detail header */}
          <div style={{ padding: '18px 22px', borderBottom: `0.5px solid ${wf.line}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Label>Source · 7 Oct 2025</Label>
                <div style={{ fontSize: 22, fontWeight: 700, color: wf.ink, letterSpacing: '-0.02em', marginTop: 4 }}>
                  MacBook Air M3 13"
                </div>
                <div style={{ fontSize: 12, color: wf.ink2, marginTop: 4 }}>
                  Switch Megamall · paid Maybank Visa Platinum ••2204
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Pill size="sm">Edit</Pill>
                <Pill tone="red" size="sm">Cancel plan</Pill>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginTop: 18 }}>
              {[
                ['Principal',      '6,840.00', wf.ink],
                ['APR',            '3.50%',    wf.ink],
                ['Tenure',         '24 months', wf.ink],
                ['Monthly',        '380.00',   wf.ink],
                ['Total interest', '280.00',   wf.amber],
              ].map(([l, v, c]) => (
                <div key={l}>
                  <Label>{l}</Label>
                  <div style={{ marginTop: 4 }}><Amount value={v} size={16} color={c} prefix={l === 'APR' || l === 'Tenure' ? '' : 'RM'} /></div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <ProgressBar pct={29} color={wf.blue} h={6} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: wf.ink3 }}>
                <span>Paid 7 of 24 · RM 2,660</span>
                <span>17 remaining · RM 6,460</span>
              </div>
            </div>
          </div>

          {/* Schedule table */}
          <div style={{
            display: 'flex', padding: '10px 22px', background: wf.grayFill2,
            borderBottom: `0.5px solid ${wf.line}`,
            fontSize: 10.5, color: wf.ink2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            <span style={{ width: 40 }}>#</span>
            <span style={{ flex: 1 }}>Due date</span>
            <span style={{ width: 110, textAlign: 'right' }}>Principal</span>
            <span style={{ width: 110, textAlign: 'right' }}>Interest</span>
            <span style={{ width: 110, textAlign: 'right' }}>Total</span>
            <span style={{ width: 110, textAlign: 'right' }}>Status</span>
          </div>
          <div style={{ maxHeight: 380, overflow: 'hidden' }}>
            {schedule.slice(0, 12).map((row, i) => {
              const months = ['Nov 25','Dec 25','Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26','Sep 26','Oct 26'];
              return (
                <div key={row.n} style={{
                  display: 'flex', alignItems: 'center', padding: '10px 22px',
                  borderBottom: i === 11 ? 'none' : `0.5px solid ${wf.lineSoft}`,
                  background: row.status === 'due' ? 'rgba(255,159,10,0.05)' : 'transparent',
                }}>
                  <span style={{ width: 40, fontSize: 12, color: wf.ink2, fontVariantNumeric: 'tabular-nums' }}>{row.n}</span>
                  <span style={{ flex: 1, fontSize: 12.5, color: wf.ink }}>{months[i]} · 22nd</span>
                  <span style={{ width: 110, textAlign: 'right' }}><Amount value={row.principal.toFixed(2)} size={12} color={wf.ink} /></span>
                  <span style={{ width: 110, textAlign: 'right' }}><Amount value={row.interest.toFixed(2)} size={12} color={wf.ink2} /></span>
                  <span style={{ width: 110, textAlign: 'right' }}><Amount value={row.total.toFixed(2)} size={12} weight={600} /></span>
                  <span style={{ width: 110, textAlign: 'right' }}>
                    {row.status === 'paid'   && <Pill tone="green" size="sm">✓ Paid</Pill>}
                    {row.status === 'due'    && <Pill tone="amber" size="sm">Due 22 May</Pill>}
                    {row.status === 'pending'&& <Pill size="sm">Pending</Pill>}
                  </span>
                </div>
              );
            })}
            <div style={{ padding: '10px 22px', fontSize: 11, color: wf.ink3, textAlign: 'center', background: wf.grayFill2 }}>
              12 more rows · scroll for full schedule
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}

Object.assign(window, { Installments });
