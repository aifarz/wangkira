# WangKira — Execution Plan (Task Backlog)
**Version 1.1** · Companion to `APPLICATION_PLAN.md` · **Date**: 2026-05-13

This file decomposes the 8-phase plan into individual tasks (T-001 onward).
Each task is sized to one PR (1–4 hours of work) with explicit dependencies,
file scope, and acceptance criteria.

> **v1.1 changes**: added UserPreferences (T-013a), variant tasks for Accounts (T-024a/b), Budget (T-034a/b), Dashboard (T-066a/b/c), Display Preferences UI (T-081). Effort summary updated.

---

## How to use this file

**Status legend**:
- `TODO` — not started
- `WIP` — in progress
- `DONE` — merged
- `BLOCKED` — note the blocker
- `SKIP` — decided not to do

**Workflow per task**:
1. Move status to `WIP`, create branch `feat/T-XXX-short-name`
2. Implement against the file scope
3. Run verification commands
4. Tick every Done-when checkbox
5. PR titled `T-XXX: <title>` referencing this file
6. Move status to `DONE` after merge

**Pinning the plan**: never delete tasks. If dropped, mark `SKIP` with one-line reason.

**Critical path**: T-001 → T-005 → T-006 → T-013a → T-016 → T-018 → T-022 → T-024 → P1 onwards.

---

## Phase 0 — Foundation
**Goal**: empty app boots, DB migrated, accounts visible (zero balances), **preference system live**.
**Duration**: week 1.

### T-001 — Repo scaffold and conventions
**Effort** 1h · **Deps** — · **Status** DONE

**Files**: `README.md`, `.gitignore`, `.editorconfig`, root `package.json`, `LICENSE`

**Do**:
1. `git init`, create GitHub repo `wangkira` (private)
2. Add `.gitignore`: Python, Node, SQLite db, `/backups/`, `.env`
3. Document branch naming, commit format (Conventional Commits), PR title format
4. Minimal `README.md`

**Done when**:
- [ ] Repo exists, first commit pushed
- [ ] `.gitignore` excludes `*.db`, `*.db-journal`, `node_modules/`, `__pycache__/`, `.env`, `/backups/`
- [ ] README points to `APPLICATION_PLAN.md` and `EXECUTION_PLAN.md`

---

### T-002 — Backend project scaffold
**Effort** 2h · **Deps** T-001 · **Status** DONE

**Files**: `backend/requirements.txt`, `backend/run.py`, `backend/app/__init__.py`, `backend/app/config.py`, `backend/.env.example`

**Do**:
1. `python -m venv backend/.venv`
2. Install: Flask, Flask-Cors, SQLAlchemy, Alembic, Pydantic, python-dotenv, APScheduler, openpyxl, pytest, factory-boy
3. Flask app factory; config loads DATABASE_URL, TIMEZONE='Asia/Kuala_Lumpur', SECRET_KEY from env
4. `run.py` boots dev server on :5000

**Done when**:
- [ ] `python run.py` starts without error
- [ ] `GET /api/health` returns `{"status":"ok","tz":"Asia/Kuala_Lumpur"}`
- [ ] CORS enabled for `http://localhost:5173`

---

### T-003 — Database setup (SQLAlchemy + Alembic)
**Effort** 1.5h · **Deps** T-002 · **Status** WIP

**Files**: `backend/app/database.py`, `backend/alembic.ini`, `backend/migrations/env.py`

**Do**:
1. `alembic init migrations`
2. `env.py` imports models metadata from `app.models`
3. SQLite with WAL mode pragma
4. Scoped session factory

**Done when**:
- [ ] `alembic current` runs without error
- [ ] `database.py` exposes `SessionLocal`, `Base`, `engine`
- [ ] WAL mode set on connection

---

### T-004 — Decimal & timezone helpers
**Effort** 1h · **Deps** T-002 · **Status** TODO

**Files**: `backend/app/lib/money.py`, `backend/app/lib/datetime_myt.py`, `backend/tests/test_money.py`, `backend/tests/test_datetime_myt.py`

**Do**:
1. `money.py`: `to_decimal()`, `round_money()` ROUND_HALF_EVEN 2dp, `format_myr()`, `parse_myr()`
2. `datetime_myt.py`: `now_myt()`, `to_myt()`, `to_utc()`, `today_myt()`
3. Tests for boundary cases

**Done when**:
- [ ] No `float` types in money helpers
- [ ] `round_money(Decimal('1.005'))` → `Decimal('1.00')` (banker's)
- [ ] `now_myt()` returns timezone-aware datetime in Asia/Kuala_Lumpur

---

### T-005 — SQLAlchemy models: Account (polymorphic)
**Effort** 3h · **Deps** T-003 · **Status** TODO

**Files**: `backend/app/models/__init__.py`, `backend/app/models/account.py`

**Do**:
1. Base `Account` with type discriminator (joined-table inheritance)
2. Subclasses: AccountDebit, AccountCreditCard, AccountBNPL, AccountLoan, AccountSavings, AccountCash, AccountInvestment
3. Per §4.1 of plan; `Numeric(15, 2)` for money
4. Soft delete via `deleted_at`

**Done when**:
- [ ] All seven subclasses with type-specific fields
- [ ] `last_4` exists on Debit, CreditCard, Savings (nullable on Savings)
- [ ] `__repr__` shows name + type + last_4 if present

---

### T-006 — SQLAlchemy models: Transaction, Category
**Effort** 2h · **Deps** T-005 · **Status** TODO

**Files**: `backend/app/models/transaction.py`, `backend/app/models/category.py`

**Do**:
1. `Transaction` per §4.2 incl. `is_converted`, `source_for_installment_id`
2. `Category` self-referential parent_id, hierarchical
3. `BudgetSnapshot`
4. Indexes on date, account_id, category_id

**Done when**:
- [ ] Models import into Alembic env
- [ ] Foreign keys correctly reference Account, Category
- [ ] Tags stored as JSON

---

### T-007 — SQLAlchemy models: Installment, Subscription, IOU
**Effort** 2h · **Deps** T-006 · **Status** TODO

**Files**: `backend/app/models/installment.py`, `backend/app/models/subscription.py`, `backend/app/models/iou.py`

**Do**: `Installment` + `InstallmentSchedule`, `Subscription`, `IOU` + `IOUSettlement`.

**Done when**:
- [ ] Installment schedule rows ordered by installment_no
- [ ] IOUSettlement service-level check prevents over-settle

---

### T-008 — SQLAlchemy models: Salary, Payroll, Income
**Effort** 2h · **Deps** T-006 · **Status** TODO

**Files**: `backend/app/models/salary.py`, `backend/app/models/income.py`

**Do**: SalarySetup, PayrollDeduction, PayrollAllowance, PayslipPosting, IncomeSource.

**Done when**:
- [ ] Effective-dating works (effective_from/to)
- [ ] snapshot_json column accepts arbitrary nested dict

---

### T-009 — SQLAlchemy models: Projection, Audit, Recurring, Notification
**Effort** 1.5h · **Deps** T-008 · **Status** TODO

**Files**: `backend/app/models/projection.py`, `backend/app/models/audit.py`, `backend/app/models/recurring.py`, `backend/app/models/notification.py`

**Do**: ProjectionRun, AuditLog, RecurringRule, Notification (added early to avoid mid-phase migration later).

**Done when**:
- [ ] All models import successfully
- [ ] No orphaned tables on autogenerate

---

### T-010 — SQLAlchemy models: UserPreferences + TaxProfile (singletons)
**Effort** 1h · **Deps** T-009 · **Status** TODO

**Files**: `backend/app/models/preferences.py`, `backend/app/models/tax_profile.py`

**Do**:
1. `UserPreferences` per §4.12 of plan
2. `TaxProfile` (marital_status, num_children, reliefs, zakat_method)
3. Both enforce id=1 via Python-level guard (singleton pattern)

**Done when**:
- [ ] Models import cleanly
- [ ] Default values defined in column defaults
- [ ] Singleton helper `get_or_create()` works

---

### T-011 — Migration 0001: full initial schema
**Effort** 1.5h · **Deps** T-010 · **Status** TODO

**Files**: `backend/migrations/versions/0001_initial_schema.py`

**Do**:
1. `alembic revision --autogenerate -m "initial schema"`
2. Review autogen; fix joined-table inheritance, indexes, check constraints
3. Insert default UserPreferences (id=1) and default TaxProfile (id=1) in migration's `data_upgrades()`
4. `alembic upgrade head`

**Done when**:
- [ ] Migration applies cleanly to empty DB
- [ ] `downgrade base` then `upgrade head` idempotent
- [ ] After migration, `SELECT * FROM user_preferences WHERE id=1` returns the default row

---

### T-012 — Pydantic schemas
**Effort** 2h · **Deps** T-010 · **Status** TODO

**Files**: `backend/app/schemas/*.py`

**Do**:
1. One schema module per model module
2. Variants: `Create`, `Update`, `Read`
3. `Read` uses `from_attributes=True`
4. Money fields Decimal with quantize validator
5. `UserPreferencesUpdate` makes all fields optional (partial PATCH support)

**Done when**:
- [ ] Schemas import without circular deps
- [ ] `AccountRead` discriminator works for polymorphic serialisation
- [ ] Decimal serialises as string in JSON

---

### T-013 — Audit log service
**Effort** 1.5h · **Deps** T-009 · **Status** TODO

**Files**: `backend/app/services/audit.py`, `backend/tests/test_audit.py`

**Do**:
1. `log_change(session, entity, action, diff, reason=None)`
2. Diff generator: compare old vs new, only changed fields
3. SQLAlchemy event listeners on key models

**Done when**:
- [ ] Updating a Transaction creates an AuditLog row with diff
- [ ] Soft delete logs `action=delete`
- [ ] Test: 5 edits produce 5 audit rows

---

### T-013a — UserPreferences API + service
**Effort** 2h · **Deps** T-013 · **Status** TODO

**Files**: `backend/app/api/preferences.py`, `backend/app/services/preferences.py`, `backend/tests/test_preferences.py`

**Do**:
1. `GET /api/preferences` returns current prefs
2. `PATCH /api/preferences` accepts partial update (any subset of fields)
3. Service: in-memory cache, invalidated on write
4. Response includes `X-Preferences-Updated-At` header for tab sync
5. Validate variant values against enum

**Done when**:
- [ ] PATCH only-`dashboard_variant` updates only that field
- [ ] Invalid variant value returns 400 with clear error
- [ ] Audit log entry created on update
- [ ] Cache hit/miss observable via debug log

**Verify**:
```bash
curl -X PATCH http://localhost:5000/api/preferences \
  -H "Content-Type: application/json" \
  -d '{"dashboard_variant":"dense"}'
```

---

### T-014 — Health + base API blueprint structure
**Effort** 1h · **Deps** T-002 · **Status** TODO

**Files**: `backend/app/api/__init__.py`, `backend/app/api/health.py`

**Do**:
1. Blueprint pattern: `/api/{resource}`
2. Health endpoint reports DB connectivity, MYT time, schema version
3. JSON 404/500 error handler

**Done when**:
- [ ] `/api/health` shows `{"db":"ok","schema":"0001","myt":"…"}`
- [ ] 404 returns JSON not HTML
- [ ] Errors logged with stack trace

---

### T-015 — Frontend scaffold (Vite + React + TS)
**Effort** 2h · **Deps** T-001 · **Status** TODO

**Files**: `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.json`, `frontend/src/main.tsx`, `frontend/src/App.tsx`

**Do**:
1. `npm create vite@latest frontend -- --template react-ts`
2. Install: react-router-dom, axios, decimal.js, dayjs (with timezone), recharts, lucide-react, zustand (for prefs store)
3. Vite proxy: `/api` → `http://localhost:5000`
4. Strict TS, ESLint, Prettier

**Done when**:
- [ ] `npm run dev` boots on :5173
- [ ] Hot reload works
- [ ] `axios.get('/api/health')` succeeds via proxy

---

### T-016 — Frontend lib: money, date, api, types
**Effort** 1.5h · **Deps** T-015 · **Status** TODO

**Files**: `frontend/src/lib/money.ts`, `frontend/src/lib/date.ts`, `frontend/src/lib/api.ts`, `frontend/src/lib/types.ts`

**Do**:
1. `money.ts`: `formatMYR(value, opts?)` with `hideCents` option, `parseMYR`, ops
2. `date.ts`: dayjs config with Asia/Kuala_Lumpur, `formatDate(d, format)`, `formatDateTime`
3. `api.ts`: axios instance, error interceptors, header sync (X-Preferences-Updated-At)
4. `types.ts`: TS interfaces mirroring backend Pydantic schemas

**Done when**:
- [ ] `formatMYR("1234.5")` → `"RM 1,234.50"`; with `hideCents: true` → `"RM 1,235"`
- [ ] All API calls funnel through `api.ts`
- [ ] No `number` for money in TS — always Decimal or string

---

### T-016a — Frontend preferences store (Zustand) + hook
**Effort** 2h · **Deps** T-013a, T-016 · **Status** TODO

**Files**: `frontend/src/store/preferences.ts`, `frontend/src/hooks/usePreferences.ts`

**Do**:
1. Zustand store with initial fetch on app boot
2. `usePreferences()` hook returns prefs + `update(partial)` function
3. `update` calls PATCH and updates store optimistically with rollback on error
4. Response header check: if `X-Preferences-Updated-At` newer than local, refetch (tab sync)

**Done when**:
- [ ] Calling `update({ dashboard_variant: 'dense' })` updates UI immediately
- [ ] Refresh persists choice
- [ ] Two tabs: changing in one updates other within 5s of next request

---

### T-017 — Tailwind + base layout shell + theme support
**Effort** 2.5h · **Deps** T-016a · **Status** TODO

**Files**: `frontend/tailwind.config.js`, `frontend/src/index.css`, `frontend/src/layouts/AppShell.tsx`, `frontend/src/components/Sidebar.tsx`, `frontend/src/components/TopBar.tsx`

**Do**:
1. Tailwind with green/red/amber/blue palette per §9
2. AppShell: sidebar + main + top bar
3. Sidebar nav: Dashboard, Accounts, Transactions, Budget, Subscriptions, Installments, IOUs, Salary, Reports, Settings
4. Theme support reading `preferences.theme` (light/dark/system); apply `data-theme` attribute to html
5. Density support reading `preferences.density`; apply `data-density` attribute

**Done when**:
- [ ] All 10 nav items render and route works
- [ ] Theme toggle (manually flipping pref) flips the UI light/dark
- [ ] Density compact: list rows visibly tighter

---

### T-018 — Seed: categories taxonomy
**Effort** 1h · **Deps** T-011 · **Status** TODO

**Files**: `backend/app/seed/categories.py`, `backend/app/seed/__init__.py`

**Do**:
1. Taxonomy from §4.3 of plan, hard-coded
2. Idempotent: skip if exists
3. CLI: `flask seed-categories`

**Done when**:
- [ ] First run creates ~50 categories with parent/child relationships
- [ ] Re-running is a no-op

---

### T-019 — Seed: real accounts
**Effort** 1.5h · **Deps** T-018 · **Status** TODO

**Files**: `backend/app/seed/accounts.py`, `backend/seed_data/accounts.json` (gitignored)

**Do**:
1. JSON template + private file with real CC last_4, limits, statement/due days, APR, loan balances, ASB/KAF
2. Seed script reads JSON, creates accounts with opening balances

**Done when**:
- [ ] CIMB Current, Maybank Savings/Debit, myASNB, KAF, Cash, real CCs/BNPL/loans seeded
- [ ] Re-running idempotent

**Blocker**: requires §14 data from real life. List what's missing here when blocked.

---

### T-020 — Seed: income source presets
**Effort** 0.5h · **Deps** T-019 · **Status** TODO

**Files**: `backend/app/seed/income_sources.py`

**Do**: Preset list from §4.8 of plan. Default account assigned where obvious.

**Done when**:
- [ ] ~15 income source presets visible
- [ ] Each links to appropriate default account

---

### T-021 — Dev setup docs
**Effort** 1h · **Deps** all of P0 · **Status** TODO

**Files**: `README.md`, `docs/SETUP.md`, `docs/CONVENTIONS.md`

**Do**: Setup walkthrough, conventions, PR template, code style.

**Done when**:
- [ ] Fresh clone → working dev env in <15 min via SETUP.md
- [ ] README links to both plan docs

---

**Phase 0 acceptance**: empty app boots, `/api/health` green, all tables exist, accounts seeded, **`GET /api/preferences` returns default singleton row**.

---

## Phase 1 — Transactions & Accounts
**Goal**: enter a week of transactions, balances reconcile to bank apps, **both accounts variants work**.
**Duration**: week 2.

### T-022 — API: Account CRUD
**Effort** 2h · **Deps** T-014, T-019 · **Status** TODO

**Files**: `backend/app/api/accounts.py`, `backend/app/services/account.py`

**Do**: GET list/single, POST create, PATCH update, DELETE soft-delete. All five endpoints.

**Done when**:
- [ ] All endpoints work with polymorphic accounts
- [ ] Create rejects invalid type-specific combos (e.g. last_4 on cash)
- [ ] Soft delete filters from default list

---

### T-023 — Service: balance computation
**Effort** 2h · **Deps** T-022 · **Status** TODO

**Files**: `backend/app/services/balance.py`, `backend/tests/test_balance.py`

**Do**: `compute_balance(account_id, as_of=None) -> Decimal`. Cache keyed by (account_id, as_of_date), invalidated on transaction write.

**Done when**:
- [ ] 10 expenses + 1 income matches manual calc
- [ ] Transfer between two accounts nets to zero
- [ ] CC payment reduces CC debt and source debit equally

---

### T-024 — API: Transaction CRUD
**Effort** 3h · **Deps** T-023 · **Status** TODO

**Files**: `backend/app/api/transactions.py`, `backend/app/services/transaction.py`

**Do**: list with filters, single, create, update, soft-delete. Validate type/account/counterparty combinations.

**Done when**:
- [ ] All five types create successfully
- [ ] Transfer requires counterparty; expense rejects it
- [ ] Audit log entries created on every write

---

### T-024a — UI: Accounts page shell with variant switcher
**Effort** 1.5h · **Deps** T-022, T-016a · **Status** TODO

**Files**: `frontend/src/pages/AccountsPage.tsx`, `frontend/src/components/VariantToggle.tsx`

**Do**:
1. Page reads `preferences.accounts_variant`
2. Renders `<AccountsGrid />` or `<AccountsList />` accordingly
3. Quick-toggle button in top-right (icon: 4-squares for grid, 3-lines for list)
4. Reusable `VariantToggle` component (used later by Budget + Dashboard)
5. `V` keyboard shortcut cycles variant when `quick_toggle_enabled`

**Done when**:
- [ ] Switching variant updates page immediately
- [ ] Preference persists across reload
- [ ] Toggle hidden when `quick_toggle_enabled = false`
- [ ] `V` key cycles variant

---

### T-024b — UI: AccountsGrid variant
**Effort** 2.5h · **Deps** T-024a · **Status** TODO

**Files**: `frontend/src/components/accounts/AccountsGrid.tsx`, `frontend/src/components/accounts/AccountCard.tsx`

**Do**:
1. Responsive grid: 2/3/4 cols
2. Card: icon, institution band, name + last_4, big balance, type pill, utilisation bar for CC/BNPL
3. Hover lift
4. Group headers per type with subtotals
5. Tap card → account detail

**Done when**:
- [ ] Cards render for all seeded accounts
- [ ] Maybank Visa shows `•••• 1234` + balance + limit utilisation
- [ ] Cash card shows location
- [ ] Subtotals correct per type

---

### T-024c — UI: AccountsList variant
**Effort** 2h · **Deps** T-024a · **Status** TODO

**Files**: `frontend/src/components/accounts/AccountsList.tsx`, `frontend/src/components/accounts/AccountRow.tsx`

**Do**:
1. Table-style: Icon · Name + last_4 · Type · Balance · Utilisation · Last activity
2. Sortable columns
3. Sticky group headers per type with subtotals
4. Grand total at bottom

**Done when**:
- [ ] All accounts render compactly (30+ visible on one screen)
- [ ] Sort by balance descending works
- [ ] Group subtotals correct
- [ ] Row click → account detail

---

### T-025 — UI: Account detail page
**Effort** 2.5h · **Deps** T-024, T-024b · **Status** TODO

**Files**: `frontend/src/pages/AccountDetailPage.tsx`, `frontend/src/components/TransactionRow.tsx`

**Do**:
1. Header: name, balance, type-specific info (CC: statement date, available credit)
2. Transactions list filtered to this account
3. Mini balance chart (last 30 days)
4. Edit account button

**Done when**:
- [ ] Detail page renders for all account types
- [ ] CC shows revolving + installments separately
- [ ] List scrolls smoothly with 500+ rows

---

### T-026 — UI: Add/Edit account modal
**Effort** 2h · **Deps** T-024b · **Status** TODO

**Files**: `frontend/src/components/AccountFormModal.tsx`

**Do**:
1. Type selector first → reveals type-specific fields
2. Validation per type (credit_limit > 0 for CC, etc.)
3. Last_4 fields enforce 4-digit numeric
4. Submit creates/updates, refetches list

**Done when**:
- [ ] Switching type clears irrelevant fields
- [ ] All 7 types submit successfully
- [ ] Last_4 validation works

---

### T-027 — UI: Add transaction modal (core)
**Effort** 3h · **Deps** T-024, T-025 · **Status** TODO

**Files**: `frontend/src/components/AddTransactionModal.tsx`

**Do**:
1. Type tabs default per `preferences.default_add_txn_type`
2. Account picker default per `preferences.default_add_txn_account_id`
3. Amount with calculator-style numpad
4. Date defaults today MYT
5. Merchant + category autocomplete (stub for T-028)

**Done when**:
- [ ] Each type shows correct fields
- [ ] Default type and account come from preferences
- [ ] Amount stored as Decimal string

---

### T-028 — UI: Merchant autocomplete + category suggestion
**Effort** 2h · **Deps** T-027 · **Status** TODO

**Files**: `backend/app/api/lookup.py`, `frontend/src/components/MerchantAutocomplete.tsx`

**Do**:
1. Backend: `/api/lookup/merchants?q=…`, `/api/lookup/category-for-merchant`
2. Frontend: debounced search, click-to-fill

**Done when**:
- [ ] Typing prefix suggests prior merchants
- [ ] Selecting merchant auto-fills last-used category
- [ ] First-time merchants don't break flow

---

### T-029 — UI: Transactions list page with filters
**Effort** 2.5h · **Deps** T-024 · **Status** TODO

**Files**: `frontend/src/pages/TransactionsPage.tsx`, `frontend/src/components/TransactionFilters.tsx`

**Do**:
1. Filter bar: date range presets, account multi-select, category, type, search
2. Grouped by date with daily totals
3. Inline edit
4. Quick-add FAB

**Done when**:
- [ ] All filters combinable
- [ ] Date grouping correct
- [ ] Search matches merchant or description case-insensitively

---

### T-030 — Reconciliation: enter first week of real data
**Effort** 2h · **Deps** T-027, T-029 · **Status** TODO

**Files**: (data entry; create `docs/reconciliation_notes.md`)

**Do**:
1. Enter last 7 days across CIMB, Maybank, cash, CCs
2. Match bank app statements
3. Adjust opening balances if needed
4. Note discrepancies

**Done when**:
- [ ] CIMB balance app = bank app (to the sen)
- [ ] Maybank balance matches
- [ ] CC outstanding matches
- [ ] Any diff explained in reconciliation notes

---

**Phase 1 acceptance**: §15.3 — one week of transactions reconciles to banks; both account variants render and switch via quick-toggle.

---

## Phase 2 — Categories & Budget
**Goal**: set May 2026 budget, see burn-down update on each transaction, **both budget variants work**.
**Duration**: week 3.

### T-031 — API: Category CRUD
**Effort** 1.5h · **Deps** T-018 · **Status** TODO

**Files**: `backend/app/api/categories.py`, `backend/app/services/category.py`

**Do**: hierarchical tree response; CRUD; protect against deleting categories in use (require reassignment).

**Done when**:
- [ ] Tree nests subcategories under parents
- [ ] Delete with `?reassign_to=<id>` updates transactions before delete

---

### T-032 — API: BudgetSnapshot CRUD
**Effort** 1.5h · **Deps** T-031 · **Status** TODO

**Files**: `backend/app/api/budgets.py`, `backend/app/services/budget.py`

**Do**:
1. `GET /api/budgets/<year_month>` returns category limits + actuals
2. `PUT /api/budgets/<year_month>/<category_id>` sets/updates limit
3. Actual computed from transactions

**Done when**:
- [ ] Setting May 2026 limit creates BudgetSnapshot
- [ ] Actuals correct after new transactions

---

### T-033 — UI: Category management page
**Effort** 2h · **Deps** T-031 · **Status** TODO

**Files**: `frontend/src/pages/SettingsCategoriesPage.tsx`, `frontend/src/components/CategoryTree.tsx`

**Do**: drag-to-reorder, add/edit/archive, inline monthly budget, rollover policy toggle.

**Done when**:
- [ ] Tree renders, drag works
- [ ] Edit reflects immediately
- [ ] Archive hides from picker but preserves history

---

### T-034a — UI: Budget page shell with variant switcher
**Effort** 1h · **Deps** T-032, T-024a · **Status** TODO

**Files**: `frontend/src/pages/BudgetPage.tsx`

**Do**:
1. Page reads `preferences.budget_variant`
2. Renders `<BudgetTableBar />` or `<BudgetDonutGrid />`
3. Re-use `<VariantToggle />` from T-024a
4. Month selector at top (shared across variants)

**Done when**:
- [ ] Switching variant updates page immediately
- [ ] Month selector state preserved across variant change

---

### T-034b — UI: BudgetTableBar variant
**Effort** 2.5h · **Deps** T-034a · **Status** TODO

**Files**: `frontend/src/components/budget/BudgetTableBar.tsx`, `frontend/src/components/budget/BudgetTableRow.tsx`

**Do**:
1. Table: Category · Budget · Spent · Remaining · Progress (inline bar)
2. Sortable columns
3. Inline edit on Budget column (click → input → save on blur)
4. Row click → drill to filtered transactions
5. Footer totals row

**Done when**:
- [ ] Bars colored correctly (green/amber/red)
- [ ] Inline edit updates BudgetSnapshot via PUT
- [ ] Sort by any column works
- [ ] Drill-down filters TransactionsPage correctly

---

### T-034c — UI: BudgetDonutGrid variant
**Effort** 3h · **Deps** T-034a · **Status** TODO

**Files**: `frontend/src/components/budget/BudgetDonutGrid.tsx`, `frontend/src/components/budget/BudgetCategoryCard.tsx`

**Do**:
1. Recharts donut showing spend share by parent category
2. Donut center: "Spent RM X of RM Y" + overall progress
3. Below: grid of category cards
   - Mini progress ring per card
   - Category name, remaining amount
   - Color-coded by status
4. Card click → drill to transactions

**Done when**:
- [ ] Donut accurate, slices clickable
- [ ] Cards display correct mini-ring values
- [ ] Hover on donut slice highlights matching card

---

### T-035 — Service: month-end rollover job
**Effort** 1.5h · **Deps** T-032 · **Status** TODO

**Files**: `backend/app/jobs/budget_rollover.py`, `backend/app/scheduler.py`

**Do**: APScheduler cron 1st of month 00:05 MYT. Create next month's BudgetSnapshots with carried amount.

**Done when**:
- [ ] Manual trigger creates next month snapshots
- [ ] Accumulate policy carries unspent forward
- [ ] Overspend carries negative
- [ ] Job logged to AuditLog

---

### T-036 — Test: budget integration
**Effort** 1h · **Deps** T-034b, T-034c · **Status** TODO

**Files**: `backend/tests/test_budget_integration.py`

**Do**: tests for limit set + actuals, rollover policies, archived categories in historical budgets.

**Done when**:
- [ ] All tests green
- [ ] `services/budget.py` coverage >80%

---

**Phase 2 acceptance**: May 2026 budget set; burn-down live; both budget variants render and switch via quick-toggle.

---

## Phase 3 — Subscriptions & IOUs
**Goal**: Spotify reminder fires; IOU lifecycle works end-to-end.
**Duration**: week 4.

### T-037 — API: Subscription CRUD
**Effort** 2h · **Deps** T-014 · **Status** TODO

**Files**: `backend/app/api/subscriptions.py`, `backend/app/services/subscription.py`

**Do**: CRUD; `advance_next_due(sub, action)` for confirm/skip/cancel; annualised cost.

**Done when**:
- [ ] Confirm renewal creates Transaction + advances next_due
- [ ] Annualised total endpoint sums all active subs

---

### T-038 — APScheduler + subscription reminder job
**Effort** 2h · **Deps** T-037 · **Status** TODO

**Files**: `backend/app/scheduler.py` (extend), `backend/app/jobs/subscription_reminders.py`

**Do**: Daily 08:00 MYT job. Finds subs where `next_due_date - reminder_days <= today`. Creates Notification rows.

**Done when**:
- [ ] Spotify due in 3 days creates notification record
- [ ] Notification appears in UI

---

### T-039 — Notifications UI badge + dropdown
**Effort** 2h · **Deps** T-038 · **Status** TODO

**Files**: `frontend/src/components/NotificationsDropdown.tsx`, `backend/app/api/notifications.py`

**Do**: Bell icon with unread count in TopBar. Dropdown shows last 20.

**Done when**:
- [ ] Bell shows unread count
- [ ] Click marks read + navigates to target_url
- [ ] Empty state when nothing pending

---

### T-040 — UI: Subscriptions page
**Effort** 2h · **Deps** T-037 · **Status** TODO

**Files**: `frontend/src/pages/SubscriptionsPage.tsx`

**Do**: list active, annualised total card, confirm/skip/pause/cancel, history.

**Done when**:
- [ ] List sorted by next_due ascending
- [ ] Annualised total correct
- [ ] Cancel moves to cancelled tab, stops notifications

---

### T-041 — API: IOU CRUD + settlement
**Effort** 2h · **Deps** T-014 · **Status** TODO

**Files**: `backend/app/api/ious.py`, `backend/app/services/iou.py`

**Do**: CRUD; `POST /api/ious/<id>/settle`; status auto-updates open → partial → settled.

**Done when**:
- [ ] Full settlement → status=settled
- [ ] Partial accumulates correctly
- [ ] Cannot settle more than outstanding

---

### T-042 — UI: IOUs page
**Effort** 2h · **Deps** T-041 · **Status** TODO

**Files**: `frontend/src/pages/IOUsPage.tsx`

**Do**: tabs (They owe me / I owe / All / Settled); rows with quick settle; write-off with reason.

**Done when**:
- [ ] Both directions render
- [ ] Settle creates Transaction + updates status
- [ ] Overdue IOUs flagged amber

---

**Phase 3 acceptance**: Spotify subscription with working reminders; one outstanding IOU tracked through partial then full settlement.

---

## Phase 4 — CC Installments
**Goal**: convert purchase to installment; schedule visible; monthly postings work.
**Duration**: week 5.

### T-043 — Service: amortisation calculator
**Effort** 2h · **Deps** T-004 · **Status** TODO

**Files**: `backend/app/services/amortisation.py`, `backend/tests/test_amortisation.py`

**Do**: §8.5 formula. Handle 0% interest (flat split) and interest-bearing. Tests match Maybank EzyPay published values.

**Done when**:
- [ ] Tests match published Maybank values
- [ ] All Decimal, no floats
- [ ] Sum of rows = principal + total interest exactly

---

### T-044 — Service: installment lifecycle
**Effort** 2.5h · **Deps** T-043 · **Status** TODO

**Files**: `backend/app/services/installment.py`

**Do**: `convert_transaction(txn_id, tenure, apr)`. Atomic. Mark source `is_converted=true`. Cancellation logic.

**Done when**:
- [ ] Atomic (rollback on error)
- [ ] Source transaction's balance impact replaced by schedule
- [ ] Cancellation flips status, preserves history

---

### T-045 — API: Installments + Convert endpoint
**Effort** 1.5h · **Deps** T-044 · **Status** TODO

**Files**: `backend/app/api/installments.py`

**Do**: GET list (active/completed), GET single with schedule, POST convert, POST pay-monthly.

**Done when**:
- [ ] Convert works via curl end-to-end
- [ ] Pay-monthly marks schedule row paid + creates transaction
- [ ] List paginates

---

### T-046 — UI: Convert to installment modal
**Effort** 2h · **Deps** T-045 · **Status** TODO

**Files**: `frontend/src/components/ConvertToInstallmentModal.tsx`

**Do**: open from CC transaction row; tenure picker; APR with card default; live preview.

**Done when**:
- [ ] Modal preview accurate
- [ ] Submit creates installment, closes modal
- [ ] Source transaction badge: "Converted to 12-mo installment"

---

### T-047 — UI: Installments page (active + backlog)
**Effort** 2.5h · **Deps** T-045 · **Status** TODO

**Files**: `frontend/src/pages/InstallmentsPage.tsx`, `frontend/src/components/InstallmentScheduleTable.tsx`

**Do**: tabs Active/Completed/All; expand for schedule; from backlog see total interest + completion.

**Done when**:
- [ ] Active list shows progress bars
- [ ] Backlog satisfies "what already paid before" requirement
- [ ] Schedule sortable, paid rows visually distinct

---

### T-048 — Service: pay statement allocation
**Effort** 2h · **Deps** T-044 · **Status** TODO

**Files**: `backend/app/services/cc_payment.py`

**Do**: `pay_statement(card, amount, from_account, allocation='auto'|'manual')`. Auto: this-cycle installments first, then revolving.

**Done when**:
- [ ] Full payment clears all due installments + revolving
- [ ] Minimum applies to installments first
- [ ] Overpayment rejected with clear error

---

### T-049 — UI: CC statement view + pay flow
**Effort** 2.5h · **Deps** T-048 · **Status** TODO

**Files**: `frontend/src/components/CCStatementView.tsx`, `frontend/src/components/PayStatementModal.tsx`

**Do**: statement view (revolving + this-cycle installments + min payment); pay button with full/min/custom; receipt with allocation breakdown.

**Done when**:
- [ ] Statement accurate for any CC
- [ ] Pay flow reduces balance + marks installments paid
- [ ] Receipt shown after payment

---

**Phase 4 acceptance**: real CC purchase converted; one monthly cycle paid; installment progress increments.

---

## Phase 5 — Salary & Payroll
**Goal**: payday produces payslip matching bank credit; YTD statutory visible.
**Duration**: week 6.

### T-050 — Service: EPF calculator
**Effort** 1h · **Deps** T-004 · **Status** TODO

**Files**: `backend/app/services/statutory/epf.py`

**Do**: §8.1 logic; rounded up to next ringgit per Third Schedule.

**Done when**:
- [ ] RM 4,000 gross → emp 440, er 520
- [ ] RM 6,000 gross → emp 660, er 720
- [ ] Tests match EPF Schedule

---

### T-051 — Service: SOCSO calculator (lookup table)
**Effort** 2h · **Deps** T-004 · **Status** TODO

**Files**: `backend/app/services/statutory/socso.py`, `backend/app/services/statutory/socso_schedule.py`

**Do**: Category I table as Python dict. Cap RM 6,000.

**Done when**:
- [ ] Values match PERKESO publication
- [ ] Cap correctly applied

---

### T-052 — Service: EIS calculator (lookup table)
**Effort** 1h · **Deps** T-051 · **Status** TODO

**Files**: `backend/app/services/statutory/eis.py`

**Do**: Similar to SOCSO; ~0.2% each side.

**Done when**:
- [ ] Tests match published values
- [ ] Cap applied

---

### T-053 — Service: PCB calculator (formula method)
**Effort** 3h · **Deps** T-050 · **Status** TODO

**Files**: `backend/app/services/statutory/pcb.py`, `backend/tests/test_pcb.py`

**Do**: §8.4 logic. Brackets per §8.4. Reliefs as input. Zakat reduction. YTD reconciliation.

**Done when**:
- [ ] Single, married, with-kids scenarios all match LHDN ± RM 1
- [ ] Zakat paid reduces PCB rm-for-rm

---

### T-054 — API: TaxProfile
**Effort** 1h · **Deps** T-053 · **Status** TODO

**Files**: `backend/app/api/tax_profile.py`

**Do**: GET, PUT singleton. UI in Settings.

**Done when**:
- [ ] Editable from UI
- [ ] PCB recomputes when profile changes

---

### T-055 — API: SalarySetup + Deductions + Allowances
**Effort** 2h · **Deps** T-054 · **Status** TODO

**Files**: `backend/app/api/salary.py`, `backend/app/services/salary.py`

**Do**: CRUD for setup, deductions, allowances. Effective-dating on reads.

**Done when**:
- [ ] Setup + statutory defaults added
- [ ] New effective-from version doesn't break history

---

### T-056 — Service: Payslip draft generator
**Effort** 2.5h · **Deps** T-055 · **Status** TODO

**Files**: `backend/app/services/payslip.py`

**Do**: `generate_draft(setup_id, pay_date)`. Computes statutory deductions; snapshots inputs; status=draft.

**Done when**:
- [ ] Draft matches expected net for sample
- [ ] Allowances added correctly (EPF-contributory ones in EPF base)
- [ ] Snapshot complete and re-computable

---

### T-057 — Service: Payslip post + reverse
**Effort** 2h · **Deps** T-056 · **Status** TODO

**Files**: `backend/app/services/payslip.py` (extend)

**Do**: post creates one income txn (gross) + negative txn per deduction, net to CIMB. Reverse undoes all. Atomic.

**Done when**:
- [ ] Post creates correct number of transactions
- [ ] CIMB balance increases by net only
- [ ] Reverse cleanly undoes everything

---

### T-058 — UI: Salary setup page
**Effort** 2h · **Deps** T-055 · **Status** TODO

**Files**: `frontend/src/pages/SalaryPage.tsx`, `frontend/src/components/DeductionList.tsx`

**Do**: setup card (gross, employer, pay day, payout); deductions list; allowances list; tax profile link.

**Done when**:
- [ ] Editable
- [ ] Statutory deductions auto-populated when setup created
- [ ] Save reflects in next draft

---

### T-059 — UI: Payslip draft + confirm
**Effort** 2.5h · **Deps** T-057, T-058 · **Status** TODO

**Files**: `frontend/src/components/PayslipDraftModal.tsx`

**Do**: triggered on pay-day notification or manual; show breakdown; allow manual override per line; match-to-bank field; confirm to post.

**Done when**:
- [ ] Draft matches typical bank credit
- [ ] Override allows e.g. OT adjustment
- [ ] Confirm posts transactions + closes modal

---

### T-060 — UI: YTD statutory tile + history
**Effort** 1.5h · **Deps** T-059 · **Status** TODO

**Files**: `frontend/src/components/YTDStatutoryCard.tsx`, `frontend/src/pages/SalaryPage.tsx` (extend)

**Do**: tile showing YTD gross, net, EPF (emp+er), SOCSO, EIS, PCB, zakat. History list with expandable payslips.

**Done when**:
- [ ] YTD numbers = sum of payslips
- [ ] Each payslip viewable with original snapshot
- [ ] Compares well to KWSP and EA form

---

### T-061 — API + UI: IncomeSource management
**Effort** 1.5h · **Deps** T-020 · **Status** TODO

**Files**: `backend/app/api/income_sources.py`, `frontend/src/pages/SettingsIncomeSourcesPage.tsx`

**Do**: CRUD; Settings page to add/edit/archive; selector in Add Transaction (Income type).

**Done when**:
- [ ] Adding "Duit Raya 2026" works
- [ ] ASB Dividend posted via this flow

---

**Phase 5 acceptance**: one real pay cycle posted; net matches CIMB credit to the sen; YTD EPF matches KWSP statement.

---

## Phase 6 — Debt Projection & Dashboard
**Goal**: dashboard shows projected debt clearance date; **all 3 variants render and switch**.
**Duration**: week 7.

### T-062 — Service: debt projection engine
**Effort** 4h · **Deps** T-044, T-048 · **Status** TODO

**Files**: `backend/app/services/projection.py`, `backend/tests/test_projection.py`

**Do**: §5.8 / §8 algorithm. Inputs: state, strategy, extra, horizon. Output: ProjectionRun with timeline.

**Done when**:
- [ ] Single-debt test: RM 10k @ 18% APR + RM 500/mo extra clears in expected timeframe
- [ ] Snowball vs avalanche produce different clearance dates
- [ ] Schedule-only projects beyond horizon if applicable

---

### T-063 — Service: projection trigger + debounce
**Effort** 2h · **Deps** T-062 · **Status** TODO

**Files**: `backend/app/services/projection_trigger.py`

**Do**: hook into Transaction post-save; if debt-affecting, enqueue projection; debounce 30s.

**Done when**:
- [ ] New CC transaction triggers recompute within 30s
- [ ] Burst of transactions = one recompute
- [ ] Latest result accessible via API

---

### T-064 — API: Projection endpoints
**Effort** 1h · **Deps** T-063 · **Status** TODO

**Files**: `backend/app/api/projection.py`

**Do**: GET latest, POST run (with strategy + extra), GET timeline.

**Done when**:
- [ ] Manual run returns within 3s
- [ ] Timeline ready for Recharts

---

### T-065 — UI: Dashboard page shell with variant switcher
**Effort** 1.5h · **Deps** T-064, T-024a · **Status** TODO

**Files**: `frontend/src/pages/DashboardPage.tsx`

**Do**:
1. Page reads `preferences.dashboard_variant`
2. Renders `<DashboardCalm />` / `<DashboardDebtForward />` / `<DashboardDense />`
3. Re-use `<VariantToggle />` (3-option mode this time)

**Done when**:
- [ ] Switching variant updates immediately
- [ ] Preference persists across reload

---

### T-066 — UI: Shared dashboard widgets
**Effort** 3h · **Deps** T-064 · **Status** TODO

**Files**: `frontend/src/components/dashboard/widgets/NetWorthWidget.tsx`, `DebtClearanceWidget.tsx`, `BudgetBurnWidget.tsx`, `WeddingFundWidget.tsx`, `UpcomingEventsWidget.tsx`, `QuickAddWidget.tsx`

**Do**:
1. Each widget accepts `size: 'sm'|'md'|'lg'|'hero'` and `density: 'comfortable'|'compact'`
2. Strict prop contract — each widget renders correctly at all sizes
3. Render tests per widget per size

**Done when**:
- [ ] All 6 widgets renderable in all 4 sizes
- [ ] Render tests pass
- [ ] No widget assumes a specific dashboard layout

---

### T-066a — UI: DashboardCalm variant (ship first)
**Effort** 2.5h · **Deps** T-066, T-065 · **Status** TODO

**Files**: `frontend/src/components/dashboard/DashboardCalm.tsx`

**Do**:
1. 2-column grid, 3 rows of large cards (~p-8 rounded-2xl)
2. 6 cards: Net Worth · Debt Clearance · This Month · Wedding Fund · Next Event · Quick Add
3. No micro-charts; muted palette; large touch targets
4. All widgets used at `size="lg"`, `density="comfortable"`

**Done when**:
- [ ] Renders cleanly with real data
- [ ] Generous whitespace visible
- [ ] Mobile-friendly (large tap targets)

---

### T-066b — UI: DashboardDebtForward variant
**Effort** 3h · **Deps** T-066a · **Status** TODO

**Files**: `frontend/src/components/dashboard/DashboardDebtForward.tsx`, `frontend/src/components/dashboard/HeroDebtCard.tsx`, `frontend/src/components/WhatIfModal.tsx`

**Do**:
1. Hero card (top 50–60%): big projected date, months remaining + delta, big debt chart, strategy + what-if inline
2. Mid row: Net Worth + This Month + Wedding Fund as small label+number tiles
3. Bottom: 4-row upcoming list
4. Use `DebtClearanceWidget` at `size="hero"`; others at `size="sm"`

**Done when**:
- [ ] Hero dominates the viewport
- [ ] What-if slider drags smoothly with debounced recompute
- [ ] Numbers tie back to projection engine

---

### T-066c — UI: DashboardDense variant
**Effort** 3h · **Deps** T-066b · **Status** TODO

**Files**: `frontend/src/components/dashboard/DashboardDense.tsx`, `frontend/src/components/dashboard/Sparkline.tsx`, `frontend/src/components/dashboard/TabbedPanel.tsx`

**Do**:
1. 4×2 tile grid (8 tiles) at ~120px height each
2. Mid row: 3 mini-charts (debt trajectory, net worth 12mo, category bars)
3. Bottom: tabbed panel (Upcoming / Recent / Alerts)
4. Smaller fonts (text-sm), tighter padding (p-3)
5. Sparklines inside applicable tiles

**Done when**:
- [ ] 8+ data points visible above the fold on a 1080p display
- [ ] No horizontal scroll on standard desktop
- [ ] Sparklines render correctly

---

**Phase 6 acceptance**: dashboard at `/` works; all 3 variants render with real data; switch via quick-toggle.

---

## Phase 7 — Reports, Backup, Polish
**Goal**: full month exportable; nightly backup running; recurring rules live; **Display Preferences settings page complete**.
**Duration**: week 8+.

### T-067 — Reports page shell
**Effort** 2h · **Deps** T-065 · **Status** TODO

**Files**: `frontend/src/pages/ReportsPage.tsx`, `frontend/src/components/reports/*`

**Do**: tabbed page (Net Worth, Income/Expense, Categories, Debt, Subscriptions, Income Sources, Statutory YTD). Each has chart + summary + export.

---

### T-068 — Chart: Net Worth over time
**Effort** 2h · **Deps** T-067 · **Status** TODO

**Files**: `frontend/src/components/reports/NetWorthChart.tsx`, `backend/app/api/reports.py`

**Do**: endpoint computes monthly net worth N months; Recharts line chart with Liquid/Restricted/Retirement/Debt lines.

---

### T-069 — Chart: Spend by category
**Effort** 1.5h · **Deps** T-067 · **Status** TODO

**Files**: `frontend/src/components/reports/CategorySpendChart.tsx`

**Do**: donut + bar combo; filter by month/quarter/year; drill on click.

---

### T-070 — Chart: Debt trajectory
**Effort** 2h · **Deps** T-064 · **Status** TODO

**Files**: `frontend/src/components/reports/DebtTrajectoryChart.tsx`

**Do**: stacked area (each debt as a series); forward projection overlay (dashed); target zero-line.

---

### T-071 — Chart: Subscriptions waterfall
**Effort** 1h · **Deps** T-040 · **Status** TODO

**Files**: `frontend/src/components/reports/SubscriptionsWaterfall.tsx`

**Do**: sorted bars per sub annualised; cumulative line.

---

### T-072 — Service: XLSX export
**Effort** 3h · **Deps** T-068 · **Status** TODO

**Files**: `backend/app/services/export.py`, `backend/app/api/export.py`

**Do**: multi-sheet XLSX via openpyxl; MYT timestamps; sheets for Accounts, Transactions, Categories, Budgets, Installments, Subscriptions, IOUs, Payslips, IncomeSources, Projection.

**Done when**:
- [ ] Full export runs in <5s
- [ ] Real Excel numbers + dates (not strings)
- [ ] Dates in MYT

---

### T-073 — Service: Nightly backup job
**Effort** 1.5h · **Deps** T-035 · **Status** TODO

**Files**: `backend/app/jobs/backup.py`

**Do**: APScheduler 03:00 MYT; VACUUM INTO /backups/wangkira-YYYY-MM-DD.db; retention 30 daily, 12 monthly, ∞ yearly.

**Done when**:
- [ ] Backup file appears next morning
- [ ] Retention enforces after 30+ days
- [ ] Integrity verified via PRAGMA post-backup

---

### T-074 — UI: Restore from backup
**Effort** 2h · **Deps** T-073 · **Status** TODO

**Files**: `frontend/src/pages/SettingsBackupPage.tsx`, `backend/app/api/backup.py`

**Do**: list backup files; restore with typed confirmation; backend stops scheduler, swaps DB, restarts.

**Done when**:
- [ ] Restore from yesterday works
- [ ] App functional immediately after
- [ ] Audit log captures the restore

---

### T-075 — Service + UI: Recurring rules
**Effort** 3h · **Deps** T-024 · **Status** TODO

**Files**: `backend/app/api/recurring.py`, `backend/app/jobs/recurring.py`, `frontend/src/pages/SettingsRecurringPage.tsx`

**Do**: CRUD; daily 09:00 MYT prompt for rules with next_run_date <= today; auto-post option per rule.

**Done when**:
- [ ] TNB bill recurring set up; prompt fires
- [ ] Confirmation creates transaction + advances next_run_date
- [ ] Auto-post works for fixed deductions

---

### T-076 — UI: Audit log viewer
**Effort** 1.5h · **Deps** T-013 · **Status** TODO

**Files**: `frontend/src/pages/SettingsAuditPage.tsx`

**Do**: paginated list; filter by entity_type, action, date range; expand row to see diff JSON formatted.

---

### T-077 — UI: Tax Profile settings
**Effort** 1.5h · **Deps** T-054 · **Status** TODO

**Files**: `frontend/src/pages/SettingsTaxProfilePage.tsx`

**Do**: form for marital_status, dependants, all reliefs; recompute preview shows next month's PCB.

---

### T-078 — UI: Display Preferences settings page
**Effort** 3h · **Deps** T-024a, T-034a, T-065 · **Status** TODO

**Files**: `frontend/src/components/settings/DisplayPreferences.tsx`, `frontend/src/components/settings/VariantThumbnail.tsx`

**Do**:
1. Section per preference group (variants, theme, density, format, behaviour)
2. **Variant pickers** with SVG thumbnail previews:
   - Dashboard: 3 thumbs side-by-side
   - Accounts: 2 thumbs
   - Budget: 2 thumbs
3. Theme: light/dark/system radio
4. Density: comfortable/compact radio
5. Toggles: hide_cents, show_currency_code, quick_toggle_enabled
6. Date format: 3 options with preview
7. First day of week: 3 options
8. Default add-txn account/type pickers

**Done when**:
- [ ] All settings render and update immediately
- [ ] Variant thumbnails clearly distinguishable
- [ ] Selecting a variant in Settings = clicking quick-toggle (same endpoint)
- [ ] Reload preserves all choices
- [ ] Quick-toggle on pages can be hidden by toggling `quick_toggle_enabled`

---

### T-079 — UI/UX polish pass
**Effort** 3h · **Deps** all previous · **Status** TODO

**Files**: assorted

**Do**:
1. Empty states for every page
2. Loading skeletons (not "loading…" text)
3. Error toasts standardised
4. Keyboard shortcuts (Cmd+N, Cmd+F, Cmd+,, V)
5. Color/spacing consistency

**Done when**:
- [ ] No raw "loading…" anywhere
- [ ] Every page has meaningful empty state
- [ ] Shortcuts documented in a Help modal

---

### T-080 — MVP smoke test against §15
**Effort** 2h · **Deps** all · **Status** TODO

**Files**: `docs/MVP_CHECKLIST.md`

**Do**: run through §15 Definition of Done. Fix failures. Tick each criterion.

**Done when**:
- [ ] All 13 §15 criteria pass (incl. variant criteria)
- [ ] At least one full month of real data in app
- [ ] Reconciles to bank apps
- [ ] All 3 dashboard variants + 2 accounts variants + 2 budget variants functional

---

**Phase 7 acceptance**: MVP ready. WangKira v1.0 tagged in git.

---

## Phase 8+ — Backlog

- **B-001** CSV import: CIMB statement parser
- **B-002** CSV import: Maybank statement parser
- **B-003** Multi-currency expense with FX auto-fetch
- **B-004** Receipt OCR via local Tesseract → draft transaction
- **B-005** Telegram weekly digest bot
- **B-006** Post-wedding housing tracker (RSKU/SRP module)
- **B-007** Goal templates beyond wedding
- **B-008** Spouse read-only access mode
- **B-009** Mobile-responsive overhaul / PWA
- **B-010** ASB dividend forecaster based on monthly avg balance
- **B-011** Auto-categorisation via merchant pattern learning
- **B-012** Insurance policy module
- **B-013** Stock/crypto portfolio module
- **B-014** Recurring rule conflict detection
- **B-015** Bill negotiation reminders
- **B-016** Additional dashboard variants (v2 — e.g. "tile-grid", "card-stack")
- **B-017** Custom variant builder (drag-and-drop widget composer)

---

## Cross-cutting concerns

Reviewed at each PR:
- [ ] All money math uses Decimal — no float in money paths
- [ ] All timestamps stored UTC, displayed MYT
- [ ] All writes log to AuditLog
- [ ] All API responses have explicit Pydantic schemas
- [ ] All UI lists handle empty state
- [ ] All forms validate inputs with clear errors
- [ ] All destructive actions soft-delete + confirm
- [ ] All endpoints have at least one happy-path test
- [ ] Migration files reviewed before commit
- [ ] Frontend types match backend schemas
- [ ] **Variant-aware pages read prefs reactively (no stale prop)**
- [ ] **Shared dashboard widgets respect `size` and `density` props**

---

## Effort summary

| Phase | Tasks | Est. effort | Cumulative |
|-------|-------|-------------|------------|
| P0    | 22    | ~33h        | 33h        |
| P1    | 11    | ~25h        | 58h        |
| P2    | 8     | ~14h        | 72h        |
| P3    | 6     | ~12h        | 84h        |
| P4    | 7     | ~15h        | 99h        |
| P5    | 12    | ~22h        | 121h       |
| P6    | 7     | ~19h        | 140h       |
| P7    | 14    | ~30h        | 170h       |

At 10–12 hours per week of evening work, **MVP completes in ~15–17 weeks**. Bumped from v1.0's 13–15 weeks due to variant work (additional ~22h across P1/P2/P6/P7).

**Acceleration tip**: P6 ships `DashboardCalm` (T-066a) as the critical path. `DashboardDebtForward` (T-066b) and `DashboardDense` (T-066c) can slip into P6.5/P7 without blocking MVP — Definition of Done #10 just needs all three functional by tag time.

---

## Status tracking

Update inline `**Status** WIP` → `DONE`. Periodic count:
```bash
grep -c "Status\*\* DONE" EXECUTION_PLAN.md
grep -c "Status\*\* TODO" EXECUTION_PLAN.md
grep -c "Status\*\* BLOCKED" EXECUTION_PLAN.md
```

---

**Next action**: confirm §13 decisions in `APPLICATION_PLAN.md` (especially 11–15 for variant defaults), then start T-001.
