// Add Transaction modal — 2 variations
//   A: Apple Wallet-style centered card with numpad
//   B: Sheet-style with rich fields and CC installment toggle

function NumPad() {
  const keys = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {keys.map(k => (
        <div key={k} style={{
          height: 44, borderRadius: 12, background: wf.grayFill2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 500, color: wf.ink,
          fontVariantNumeric: 'tabular-nums',
        }}>{k}</div>
      ))}
    </div>
  );
}

function AddTxnA() {
  return (
    <Page title="" subtitle="" bg="rgba(0,0,0,0.35)">
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 0 }}>
        <div style={{
          width: 380, background: wf.card, borderRadius: 22, padding: 22,
          boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)',
        }}>
          {/* Type segmented */}
          <div style={{
            display: 'flex', background: wf.grayFill2, borderRadius: 9,
            padding: 3, fontSize: 12, fontWeight: 600, marginBottom: 20,
          }}>
            {['Expense', 'Income', 'Transfer', 'Payment'].map((t, i) => (
              <div key={t} style={{
                flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 7,
                background: i === 0 ? wf.card : 'transparent',
                color: i === 0 ? wf.ink : wf.ink2,
                boxShadow: i === 0 ? '0 0 0 0.5px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}>{t}</div>
            ))}
          </div>

          {/* Big amount */}
          <div style={{ textAlign: 'center', padding: '8px 0 18px' }}>
            <div style={{
              fontSize: 48, fontWeight: 700, color: wf.ink,
              letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums',
            }}>
              <span style={{ fontSize: 22, color: wf.ink2, fontWeight: 600, marginRight: 6 }}>RM</span>
              32<span style={{ color: wf.ink3 }}>.00</span>
            </div>
            <div style={{ fontSize: 11, color: wf.ink3, marginTop: 4 }}>Village Park · 13 May · today</div>
          </div>

          {/* Quick fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 18, background: wf.grayFill2, borderRadius: 12, overflow: 'hidden' }}>
            {[
              ['From', 'Maybank Savings ••1730', 'amber'],
              ['Category', 'Eating out · Lifestyle', 'red'],
              ['Tags', 'reimbursable +1', 'gray'],
            ].map(([l, v, t]) => (
              <div key={l} style={{
                display: 'flex', alignItems: 'center', padding: '11px 14px',
                background: wf.card,
              }}>
                <span style={{ fontSize: 12, color: wf.ink2, width: 78 }}>{l}</span>
                <IconStub size={20} tone={t} r={5} />
                <span style={{ fontSize: 12.5, color: wf.ink, fontWeight: 500, marginLeft: 8, flex: 1 }}>{v}</span>
                <span style={{ fontSize: 14, color: wf.ink3 }}>›</span>
              </div>
            ))}
          </div>

          {/* Numpad */}
          <NumPad />

          {/* Save */}
          <div style={{
            marginTop: 18, padding: 12, background: wf.blue, borderRadius: 12,
            textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#fff',
          }}>Save · ⌘↵</div>
        </div>
      </div>
    </Page>
  );
}

function AddTxnB() {
  return (
    <Page title="" subtitle="" bg="rgba(0,0,0,0.35)">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 560, background: wf.card, borderRadius: 18, padding: 0,
          boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          {/* Sheet header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 18px', borderBottom: `0.5px solid ${wf.line}`,
          }}>
            <span style={{ fontSize: 13, color: wf.blue, fontWeight: 500 }}>Cancel</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 14, color: wf.ink, fontWeight: 700, letterSpacing: '-0.01em' }}>New transaction</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: wf.blue, fontWeight: 600 }}>Save</span>
          </div>

          {/* Body */}
          <div style={{ padding: 18 }}>
            {/* Type tabs */}
            <div style={{
              display: 'flex', background: wf.grayFill2, borderRadius: 9,
              padding: 3, fontSize: 12, fontWeight: 600, marginBottom: 18,
            }}>
              {['Expense', 'Income', 'Transfer', 'Payment', 'Refund'].map((t, i) => (
                <div key={t} style={{
                  flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 7,
                  background: i === 0 ? wf.card : 'transparent',
                  color: i === 0 ? wf.ink : wf.ink2,
                  boxShadow: i === 0 ? '0 0 0 0.5px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}>{t}</div>
              ))}
            </div>

            {/* Amount big */}
            <div style={{
              padding: '20px 16px', background: wf.grayFill2,
              borderRadius: 12, marginBottom: 14,
              display: 'flex', alignItems: 'center',
            }}>
              <div>
                <Label>Amount</Label>
                <div style={{ marginTop: 4, fontSize: 36, fontWeight: 700, color: wf.ink, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: wf.ink2, marginRight: 6 }}>RM</span>
                  185.40
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Pill tone="blue" size="sm">⌘ K calculator</Pill>
                <Pill size="sm">MYR ▾</Pill>
              </div>
            </div>

            {/* Field rows */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <Field label="From account" value="Maybank Visa Platinum" sub="••2204 · CC · 53% utilized" tone="red" />
              <Field label="Date" value="13 May 2026" sub="today" tone="gray" />
              <Field label="Merchant" value="Shopee · Sony WH-1000XM5" sub="Auto from history" tone="purple" />
              <Field label="Category" value="Tech / Audio gear" sub="Lifestyle · Want" tone="purple" />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 14 }}>
              <Label>Notes</Label>
              <div style={{
                marginTop: 6, padding: 12, background: wf.grayFill2,
                borderRadius: 10, height: 60, color: wf.ink3, fontSize: 12,
              }}>
                Promo code SAVE15 applied. Receipt in Mail.
              </div>
            </div>

            {/* CC installment offer */}
            <div style={{
              padding: 14, background: 'rgba(0,122,255,0.05)',
              border: '0.5px solid rgba(0,122,255,0.2)', borderRadius: 12,
              marginBottom: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <IconStub size={28} tone="blue" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: wf.ink }}>Convert to installment</div>
                  <div style={{ fontSize: 11, color: wf.ink2, marginTop: 2 }}>Maybank EzyPay — 6/12/24 months · APR 0–8%</div>
                </div>
                {/* Toggle */}
                <div style={{
                  width: 38, height: 22, borderRadius: 11, background: wf.blue,
                  position: 'relative', display: 'flex', alignItems: 'center',
                }}>
                  <div style={{ position: 'absolute', right: 2, width: 18, height: 18, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              <div style={{
                marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
                fontSize: 11, fontWeight: 600,
              }}>
                {[['6 mo','0%','RM 30.90'], ['12 mo','0%','RM 15.45'], ['24 mo','3.5%','RM 8.20']].map(([t, r, m], i) => (
                  <div key={t} style={{
                    padding: '8px 10px', background: i === 1 ? wf.card : 'transparent',
                    border: i === 1 ? `1px solid ${wf.blue}` : `0.5px solid ${wf.line}`,
                    borderRadius: 9,
                  }}>
                    <div style={{ color: wf.ink }}>{t} <span style={{ color: wf.ink3, fontWeight: 500 }}>· {r}</span></div>
                    <div style={{ color: wf.ink2, marginTop: 2 }}>{m}/mo</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags + attach */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Pill size="sm">＋ tag</Pill>
              <Pill tone="amber" size="sm">reimbursable ✕</Pill>
              <Pill size="sm">＋ receipt</Pill>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: wf.ink3 }}>⌘↵ to save · ⎋ to cancel</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

function Field({ label, value, sub, tone }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{
        marginTop: 6, padding: '10px 12px', background: wf.grayFill2, borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <IconStub size={20} tone={tone} r={5} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, color: wf.ink, fontWeight: 500 }}>{value}</div>
          <div style={{ fontSize: 10.5, color: wf.ink3 }}>{sub}</div>
        </div>
        <span style={{ color: wf.ink3, fontSize: 14 }}>›</span>
      </div>
    </div>
  );
}

Object.assign(window, { AddTxnA, AddTxnB });
