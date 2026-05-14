# WangKira — Design reference

This document anchors the visual design for the app. It distils the **WangKira Wireframes** handoff bundle (lo-fi Apple-flavored prototype, exported from `claude.ai/design`) into a single reference. The unzipped bundle lives in [`docs/wireframes/`](wireframes/) and is **reference material only** — not built, not bundled, not imported by app code.

When implementing a screen, read the source JSX in `docs/wireframes/` for the exact layout intent, but consume the tokens below — don't hand-port the inline `style={…}` blocks.

---

## 1. Preview-only warning

The bundle includes Mac-window chrome (`macos-window.jsx`), iOS chrome (`ios-frame.jsx`), and a design-canvas harness (`design-canvas.jsx`). These exist solely to render the wireframes inside the preview tool. **Do not replicate them in the real app.** The real app's chrome is a Tailwind-styled `AppShell` (T-017) with a sidebar built per §1.6 of this doc — no Mac traffic-lights, no glass blur, no design canvas.

Same applies to the `MacScreen` wrapper in `WangKira Wireframes.html` itself.

---

## 2. Design tokens

Source: [`docs/wireframes/wireframe-base.jsx`](wireframes/wireframe-base.jsx). These values become the source of truth for `tailwind.config.js` when **T-015** lands — until then they live here as constants. Do not translate to Tailwind yet.

### 2.1 Color

#### Surfaces

| Token | Value | Usage |
|------|-------|-------|
| `bg.page` | `#f5f5f7` | App-shell page background |
| `bg.chrome` | `#f0eee9` | Preview-only canvas chrome — **not used in real app** |
| `bg.card` | `#ffffff` | Card surfaces, section panels, modals |
| `bg.grayFill` | `#e8e8ed` | Filled placeholders, neutral pills |
| `bg.grayFill2` | `#f2f2f4` | Inset areas (segmented controls, numpad keys, inline cards) |

#### Ink (text)

| Token | Value | Usage |
|------|-------|-------|
| `ink.1` | `#1d1d1f` | Primary text, money display |
| `ink.2` | `#6e6e73` | Secondary text, labels, captions |
| `ink.3` | `#a1a1a6` | Tertiary text, placeholder, disabled state |

#### Accent

| Token | Value | Usage |
|------|-------|-------|
| `accent.blue` | `#007aff` | Primary action, info, info-pill |
| `accent.green` | `#30d158` | Positive, on-track, paid, on-budget |
| `accent.red` | `#ff453a` | Debt, overspend, danger, over-budget |
| `accent.amber` | `#ff9f0a` | Warning, near-limit, due-soon |
| `accent.purple` | `#af52de` | Subscriptions, installments (chip tone only) |

#### Lines

| Token | Value | Usage |
|------|-------|-------|
| `line.default` | `rgba(0,0,0,0.08)` | Card outlines, section dividers |
| `line.soft` | `rgba(0,0,0,0.05)` | Row separators inside lists |

#### Pill (tone-coded fills, derived from accent at low opacity)

| Tone | Background | Foreground |
|------|------------|------------|
| neutral | `bg.grayFill` | `ink.1` |
| blue | `rgba(0,122,255,0.12)` | `accent.blue` |
| green | `rgba(48,209,88,0.14)` | `#1f8a4a` |
| red | `rgba(255,69,58,0.12)` | `#c8302a` |
| amber | `rgba(255,159,10,0.16)` | `#a76600` |
| purple | `rgba(175,82,222,0.16)` | `accent.purple` |

### 2.2 Typography

| Property | Value |
|---------|-------|
| Font stack | `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif` |
| Money numbers | `font-variant-numeric: tabular-nums` |
| Display numbers (≥32px) | `letter-spacing: -0.025em` to `-0.035em` (more negative as size grows) |
| Page title | 26px / 700 / `letter-spacing: -0.02em` |
| Card title | 13px / 600 / `letter-spacing: -0.01em` |
| Body | 12–12.5px / 500–600 |
| Label / overline | 11px / 600 / `letter-spacing: 0.04em` / uppercase / color `ink.2` |
| Caption | 10–10.5px / color `ink.3` |
| Pill | 11px (md) or 10px (sm) / 600 |

### 2.3 Shape

| Element | Border radius | Padding | Shadow |
|---------|---------------|---------|--------|
| Card | 16px | 18–26px (varies by density) | `0 0 0 0.5px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.02)` |
| Modal sheet | 22px (compact AddTxn) | 22px | `0 24px 64px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)` |
| Pill | 6px (sm) / 8px (md) | `2px 7px` (sm) / `3px 9px` (md) | none |
| Segmented control | 9px outer, 7px tab | 3px outer pad | selected tab: `0 0 0 0.5px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)` |
| IconStub | 7px default, 4–5px compact | n/a | none, soft tinted fill |
| Progress bar | half-height (rounded ends) | n/a | track `bg.grayFill2`, fill accent |
| Sidebar item | 7px | `5px 10px`, margin `0 8px` | selected: `rgba(0,0,0,0.07)` |
| Button (primary) | 8px | `7px 14px` | flat blue, white text |
| Button (secondary) | 8px | `7px 14px` | `bg.card` + `0 0 0 0.5px rgba(0,0,0,0.08)` |

### 2.4 Status-color logic

Progress bars and percentage chips colour-code based on % consumed:

```
pct > 100  → accent.red
pct > 85   → accent.amber
otherwise  → accent.green   (or the caller-supplied tone)
```

For due-date chips:

```
days_until ≤ 3   → amber pill "in N days"
days_until > 3   → ink.2 plain text "in N days"
overdue          → red pill
```

### 2.5 Density modifier

`preferences.density` toggle (`comfortable` | `compact`) scales:

| Element | Comfortable | Compact |
|---------|-------------|---------|
| List/table row padding | `12px 18px` | `8px 14px` |
| List/table font | 12.5px | 11.5px |
| Dashboard-dense card padding | 18px | 14px |
| Sidebar item padding | `5px 10px` | `4px 8px` |

Focus-number cards (the big amounts on calm dashboard, payslip hero, etc.) do **not** scale with density — they stay large for emphasis.

---

## 3. Sidebar

Per [`wireframe-base.jsx`](wireframes/wireframe-base.jsx)'s `WangkiraSidebar`. Three sections:

1. **Pages** — Dashboard, Accounts, Transactions, Budget, Installments, Subscriptions, IOUs, Salary, Reports
2. **Goals** — **Wedding Fund 2028** only (MVP)
3. **Settings** — Categories, Tax profile, Backups

> **Goals scope (resolution of deviation #4):** the wireframe sidebar shows three goals (Wedding, Emergency Fund, Post-wedding home). Plan §16 defers "Goal templates beyond wedding" to backlog item **B-007**. **MVP renders Wedding Fund 2028 only.** Do not grey out the others — leaving them in implies partial functionality. They simply don't exist in the sidebar until B-007 lands.

### 3.1 Icon mapping (suggested for T-015 when `lucide-react` is wired)

| Concept | Tone | lucide icon |
|---------|------|--------------------|
| Dashboard | blue | `LayoutDashboard` |
| Accounts | gray | `Wallet` |
| Transactions | gray | `ArrowLeftRight` |
| Budget | amber | `PieChart` |
| Installments | red | `CalendarClock` |
| Subscriptions | purple | `Repeat` |
| IOUs | gray | `Users` |
| Salary | green | `Banknote` |
| Reports | gray | `BarChart3` |
| Settings · Categories | gray | `Tag` |
| Settings · Tax profile | gray | `Receipt` |
| Settings · Backups | gray | `Database` |
| Wedding Fund 2028 | green | `Heart` |

---

## 4. MVP screen map

Mapping wireframe screens → plan section → implementation task(s).

| Wireframe screen | File | Plan § | Variant key | Task(s) | Page title |
|-------------------|------|--------|-------------|---------|------------|
| `DashboardA` Debt-forward | [screens-dashboard.jsx](wireframes/screens-dashboard.jsx) | §6.1.1 | `dashboard_variant=debt_forward` | T-066b | **"Today"** |
| `DashboardB` Calm/Wallet | [screens-dashboard.jsx](wireframes/screens-dashboard.jsx) | §6.1.2 | `dashboard_variant=calm` | T-066a | **"Overview"** |
| `DashboardC` Dense/Pro | [screens-dashboard.jsx](wireframes/screens-dashboard.jsx) | §6.1.3 | `dashboard_variant=dense` | T-066c | **"Dashboard"** |
| `AccountsA` Card grid | [screens-accounts.jsx](wireframes/screens-accounts.jsx) | §6.2.1 | `accounts_variant=grid` | T-024b | "Accounts" |
| `AccountsB` Dense rows | [screens-accounts.jsx](wireframes/screens-accounts.jsx) | §6.2.2 | `accounts_variant=list` | T-024c | "Accounts" |
| `AddTxnA` Compact numpad | [screens-addtxn.jsx](wireframes/screens-addtxn.jsx) | §6.4 | **canonical** | T-027 | (modal) |
| ~~`AddTxnB` Rich sheet~~ | [screens-addtxn.jsx](wireframes/screens-addtxn.jsx) | — | **B-018 (backlog)** | — | — |
| `BudgetA` Table + bars | [screens-budget.jsx](wireframes/screens-budget.jsx) | §6.5.1 | `budget_variant=table_bar` | T-034b | "Budget" |
| `BudgetB` Donut + grid | [screens-budget.jsx](wireframes/screens-budget.jsx) | §6.5.2 | `budget_variant=donut_grid` | T-034c | "Budget" |
| Installments master/detail | [screens-installments.jsx](wireframes/screens-installments.jsx) | §6.6 | — | T-045 (API), T-047 (UI), T-049 (statement) | "Installments" |
| Subscriptions | [screens-misc.jsx](wireframes/screens-misc.jsx) | §6.7 | — | T-040 | "Subscriptions" |
| IOUs | [screens-misc.jsx](wireframes/screens-misc.jsx) | §6.8 | — | T-042 | "IOUs" |
| Payslip draft | [screens-misc.jsx](wireframes/screens-misc.jsx) | §6.9 | — | T-058 (setup), T-059 (draft+confirm), T-060 (YTD) | "Payslip · 25 May" |
| iOS quick-add | [screens-ios.jsx](wireframes/screens-ios.jsx) | — | — | Phase 8 (out of MVP) | (mobile, deferred) |

### 4.1 Dashboard variant titles

Per deviation #2, each dashboard variant component sets its own page title via a `const title` at the top of the component:

```tsx
// DashboardCalm.tsx
const title = 'Overview';

// DashboardDebtForward.tsx
const title = 'Today';

// DashboardDense.tsx
const title = 'Dashboard';
```

T-066a/b/c done-when criteria should include: "page title reflects the variant constant when the variant mounts." No data-model change. No new preference.

---

## 5. Deviations from APPLICATION_PLAN.md — resolutions

These were flagged when the design bundle landed (2026-05-14). Resolutions are binding; revisit only at v2 planning.

### 5.1 Add Transaction had 2 wireframe variants

**Wireframes**: `AddTxnA` (compact numpad, 380px centered modal) and `AddTxnB` (rich sheet, 560px with inline CC installment preview).

**Resolution**: `AddTxnA` is **canonical for MVP**. T-027 implements the compact numpad design. The rich sheet (`AddTxnB`) is deferred to backlog as **B-018 — `add_txn_variant` preference (rich-sheet alternative)** (see `EXECUTION_PLAN.md` Phase 8+).

**Rationale**:
- §6.4 already specifies "calculator-style numpad" — the compact design fits the existing spec; the rich sheet would be a re-spec.
- It's the higher-frequency interaction (every transaction goes through it).
- Variant proliferation is an explicit §17 risk. Variant set locks at v1.1 (3 dashboard + 2 accounts + 2 budget) until v2.

**No model change**. `UserPreferences.add_txn_variant` is **not** added. T-027 produces a single modal.

### 5.2 Dashboard titles vary by variant

**Wireframes**: Variant A = "Dashboard", B = "Overview", C = "Today".

**Resolution**: allow variant-specific titles. Mapping per §4.1 above:
- Calm → "Overview"
- Debt-forward → "Today"
- Dense → "Dashboard"

(The intentional swap of "Today" and "Dashboard" between the dense and debt-forward variants relative to the wireframes is deliberate — debt-forward earns the top-level "Today" framing because it's the day-anchored view; dense earns the neutral "Dashboard" because it's the catch-all info layout.)

Each `DashboardX.tsx` exposes a `const title` and the variant switcher consumes it. No data-model change.

### 5.3 EPF rendered account-like in Accounts B

**Wireframe**: Accounts B lists `EPF · Employee` and `EPF · Employer` rows with running balances, alongside real accounts.

**Resolution**: **derived display, not real `Account` rows.** Data model stays as `PayrollDeduction` per §4.7. In `AccountsList` and `AccountsGrid` components (T-024b/c), after the real-account rendering completes, append two synthetic read-only cards computed from posted payslips:

```text
EPF (Employee)  = sum(PayrollDeduction.amount where type='epf_employee' and posting.status='posted')
EPF (Employer)  = sum(PayrollDeduction.amount where type='epf_employer' and posting.status='posted')
```

Synthetic cards must:

- Be visually distinguished with a `🔒 Restricted` badge in the corner (or the pill variant `neutral`, label "Restricted")
- Be **read-only** — no edit / delete / convert-to-installment affordances
- Be excluded from `last_4`, `utilisation`, and `linked_card_provider` (those fields don't apply)
- Be **counted in Net Worth's "Retirement" breakdown** per plan §8.6 — but never in the "Liquid" or "Debt" subtotals
- Be **skipped from balance-reconciliation tests** (T-030, P5 acceptance) — KWSP balance reconciles separately at the payslip level

The same convention applies anywhere account-like EPF balances would naturally appear (Reports — Net Worth chart, Salary YTD tile). Both T-024b and T-024c PRs must include this behaviour; document it in the PR description.

### 5.4 Three goals in the wireframe sidebar

**Wireframe**: Wedding 2028, Emergency Fund, Post-wedding home.

**Resolution**: render **Wedding Fund 2028 only**. Plan §16 defers other goal templates to backlog **B-007**. Do not grey out the absent goals — that implies partial functionality. The sidebar's Goals section in MVP contains a single row.

If we later want greyed placeholders for discoverability, that's a separate backlog enhancement on top of B-007.

---

## 6. Previewing the wireframes locally

The bundle pulls React 18 and Babel from `unpkg` at runtime; no install needed. From the repo root:

```bash
python -m http.server 8000 --directory docs/wireframes
```

Then open <http://localhost:8000/WangKira%20Wireframes.html>.

Do **not** add the wireframes to the app's Vite build, Flask static path, or any production bundling. They are documentation.
