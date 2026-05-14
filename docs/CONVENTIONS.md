# Conventions

## Branches
- `feat/T-XXX-short-name` — new task implementation
- `fix/T-XXX-short-name` — bug fix on existing task
- `chore/T-XXX-short-name` — non-feature work (deps, docs, cleanup)
- `wip/T-XXX-short-name` — work in progress, not for merge

## Commits — Conventional Commits
- `feat(T-XXX): add account CRUD endpoints`
- `fix(T-XXX): correct EPF rounding for >5k bracket`
- `docs(T-XXX): update README setup section`
- `test(T-XXX): add PCB calculator edge cases`
- `chore(T-XXX): bump dependencies`

## PR titles
`T-XXX: <task title from EXECUTION_PLAN.md>`

## Code style
- Python: PEP 8, Black, isort
- TypeScript: Prettier, ESLint, strict mode
- SQL: `lower_snake_case` for tables/columns
- React: PascalCase component files, named exports for hooks

## Money math (CRITICAL)
- Backend: only `decimal.Decimal`, never `float`
- Frontend: only `Decimal` (decimal.js) or `string`, never `number`
- Monetary columns: `Numeric(15, 2)`
- Round with `ROUND_HALF_EVEN` (banker's rounding)

## Timezone
- Storage: UTC
- Display: MYT (`Asia/Kuala_Lumpur`)
- Use `app.lib.datetime_myt` helpers, never bare `datetime.now()`

## Audit
Every mutating service call goes through `audit.log_change()`. No exceptions.

## Status tracking
When starting a task, change `**Status** TODO` → `**Status** WIP` in `docs/EXECUTION_PLAN.md`.
When merging the PR, change it to `**Status** DONE`.
Never delete a task — mark `SKIP` with reason if dropped.
