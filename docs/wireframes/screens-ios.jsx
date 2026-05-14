// iOS quick-add — mobile peek showing fast capture flow

function IOSQuickAdd() {
  return (
    <div style={{
      display: 'flex', gap: 30, padding: 20,
      background: 'transparent', fontFamily: WF_FONT,
    }}>
      {/* Phone 1 — Today widget / home glance */}
      <IOSDevice width={360} height={740}>
        <div style={{
          height: '100%', background: 'linear-gradient(180deg, #e8f0fa 0%, #f7f4ee 100%)',
          paddingBottom: 30,
        }}>
          {/* Status placeholder via IOSNavBar */}
          <div style={{ paddingTop: 60, padding: '60px 18px 0' }}>
            <div style={{ fontSize: 11, color: '#6e6e73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>WED 13 MAY</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginTop: 4 }}>WangKira</div>
          </div>

          {/* Net worth widget */}
          <div style={{ margin: '16px 14px', padding: 18, background: '#fff', borderRadius: 20, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05), 0 6px 14px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 10.5, color: '#6e6e73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net worth</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>RM 24,180</div>
            <div style={{ fontSize: 12, color: '#30d158', fontWeight: 600, marginTop: 2 }}>↑ RM 1,240 this month</div>
            <div style={{ marginTop: 14 }}><Sparkline w={310} h={56} down={false} color="#007aff" /></div>
          </div>

          {/* Debt + Budget pair */}
          <div style={{ margin: '0 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ padding: 14, background: '#fff', borderRadius: 18, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 10, color: '#6e6e73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Debt-free</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1d1d1f', marginTop: 4, letterSpacing: '-0.02em' }}>Sep 28</div>
              <div style={{ fontSize: 11, color: '#30d158', fontWeight: 600, marginTop: 2 }}>−5 weeks</div>
            </div>
            <div style={{ padding: 14, background: '#fff', borderRadius: 18, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 10, color: '#6e6e73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>May budget</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1d1d1f', marginTop: 4, letterSpacing: '-0.02em' }}>67%</div>
              <div style={{ marginTop: 6 }}><ProgressBar pct={67} color="#ff9f0a" h={4} /></div>
            </div>
          </div>

          {/* Upcoming list */}
          <div style={{ margin: '16px 14px', background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '12px 14px 6px', fontSize: 11, color: '#6e6e73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Upcoming</div>
            {[
              ['CIMB CC stmt', 'in 3 days', '486.00', '#ff453a'],
              ['Spotify', 'in 3 days', '14.90', '#ff9f0a'],
              ['Salary', 'in 12 days', '+7,200', '#30d158'],
            ].map(([n, d, a, c], i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '10px 14px', gap: 10,
                borderTop: '0.5px solid rgba(60,60,67,0.12)',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: c, opacity: 0.18 }} />
                <span style={{ flex: 1, fontSize: 14, color: '#1d1d1f', fontWeight: 500 }}>{n}</span>
                <span style={{ fontSize: 12, color: '#8e8e93' }}>{d}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: a.startsWith('+') ? '#30d158' : '#1d1d1f', fontVariantNumeric: 'tabular-nums', width: 70, textAlign: 'right' }}>
                  RM {a.replace('+', '')}
                </span>
              </div>
            ))}
          </div>

          {/* FAB */}
          <div style={{ position: 'absolute', bottom: 50, right: 24, zIndex: 30 }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%', background: '#007aff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 28, fontWeight: 300, lineHeight: 1,
              boxShadow: '0 6px 20px rgba(0,122,255,0.4)',
            }}>＋</div>
          </div>
        </div>
      </IOSDevice>

      {/* Phone 2 — Quick add sheet */}
      <IOSDevice width={360} height={740}>
        <div style={{ height: '100%', background: 'rgba(0,0,0,0.25)', position: 'relative' }}>
          {/* Backdrop hint of home */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.4, background: 'linear-gradient(180deg, #e8f0fa 0%, #f7f4ee 100%)' }} />

          {/* Sheet */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: '#f5f5f7', borderRadius: '20px 20px 0 0',
            padding: '12px 16px 28px', minHeight: 540,
          }}>
            <div style={{ width: 36, height: 5, background: 'rgba(60,60,67,0.25)', borderRadius: 3, margin: '0 auto 14px' }} />

            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: '#007aff', fontWeight: 500 }}>Cancel</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 17, color: '#1d1d1f', fontWeight: 700 }}>Quick add</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 14, color: '#007aff', fontWeight: 600 }}>Save</span>
            </div>

            {/* Segmented */}
            <div style={{
              display: 'flex', background: 'rgba(118,118,128,0.12)', borderRadius: 9,
              padding: 2, fontSize: 13, fontWeight: 600, marginBottom: 18,
            }}>
              {['Expense', 'Income', 'Transfer'].map((t, i) => (
                <div key={t} style={{
                  flex: 1, textAlign: 'center', padding: '7px 0', borderRadius: 7,
                  background: i === 0 ? '#fff' : 'transparent',
                  color: i === 0 ? '#1d1d1f' : '#6e6e73',
                  boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}>{t}</div>
              ))}
            </div>

            {/* Big amount */}
            <div style={{ textAlign: 'center', padding: '14px 0 22px' }}>
              <div style={{
                fontSize: 56, fontWeight: 700, color: '#1d1d1f',
                letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', lineHeight: 1,
              }}>
                <span style={{ fontSize: 24, color: '#6e6e73', fontWeight: 600, marginRight: 6 }}>RM</span>
                32<span style={{ color: '#c7c7cc' }}>.00</span>
              </div>
            </div>

            {/* Quick rows */}
            <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
              {[
                ['Maybank Savings ••1730', '#ff9f0a'],
                ['Eating out · Village Park', '#ff453a'],
                ['Today · 13 May', '#8e8e93'],
              ].map(([t, c], i, arr) => (
                <div key={t} style={{
                  display: 'flex', alignItems: 'center', padding: '13px 14px', gap: 10,
                  borderTop: i === 0 ? 'none' : '0.5px solid rgba(60,60,67,0.12)',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: c, opacity: 0.2 }} />
                  <span style={{ flex: 1, fontSize: 15, color: '#1d1d1f' }}>{t}</span>
                  <span style={{ color: '#c7c7cc', fontSize: 14 }}>›</span>
                </div>
              ))}
            </div>

            {/* Numpad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map(k => (
                <div key={k} style={{
                  height: 50, borderRadius: 12, background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 400, color: '#1d1d1f',
                  fontVariantNumeric: 'tabular-nums',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}>{k}</div>
              ))}
            </div>
          </div>
        </div>
      </IOSDevice>
    </div>
  );
}

Object.assign(window, { IOSQuickAdd });
