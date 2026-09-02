# AGENTS.md — savy-web

Code rules and conventions for the frontend (React + TypeScript).

---

## Component conventions

### File structure

- **Strictly one component per file.** Even if a file only exports one component, no other component definitions (including inline `const SlotX = () => ...`) may exist in the same file.
- If a component has sub-components, the `.tsx` file becomes a **folder** following the same convention.
- **All folder names use lowercase kebab-case** — component folders, sub-component folders, everything: `account-card/`, `components/`, `balance-display/`.
- Inside a component folder:
  - `index.tsx` — the main component (single named export)
  - `{name}.d.ts` — shared types only (see Types section below)
  - `components/` — sub-components, each in its own folder with the same structure

```
account-card/
├── index.tsx
├── account-card.d.ts
└── components/
    ├── balance-display/
    │   └── index.tsx
    └── transaction-list/
        ├── index.tsx
        └── transaction-list.d.ts
```

- This structure applies **recursively**: if a sub-component has its own sub-components, repeat the pattern.
- **There is no `utils.ts` inside component folders.** Helper functions go in `src/utils/{domain}/`, constants and maps go in `src/content/{domain}/`. See the dedicated sections below.

### Exports

- **Never use `export default`** unless strictly necessary (e.g., lazy loading with `React.lazy`).
- Always use **named exports**: `export { MyComponent }`, never `export default MyComponent`.
- This applies to components, hooks, services, utils — everything.

### Types

- **`.d.ts` files are for shared types only** — types used by **2 or more files**. They are **ambient declarations** (no `export` or `import` at top-level).
- **Local component props** (`Props` exclusive to a single component) MUST be defined **inline in the `.tsx` file**, since they are never reused and co-location improves DX.
- **Do NOT create a `.d.ts` for:**
  - Props of a component that only that component uses.
  - Local types of a hook, service, or util that are not shared.
- Type files go inside the component/service/hook folder.
- Reference external types inside `.d.ts` with inline `import()`:
  ```typescript
  type MyProps = {
    account: import("@/storage/accountStorage").Account;
  };
  ```
- **NEVER use `any`**, under any circumstance. If you don't know the type, investigate first.

### State hooks

- **All `useState` calls must have the explicit generic type**, even when TypeScript could infer it:
  - `useState<boolean>(false)` — never `useState(false)`
  - `useState<number>(0)` — never `useState(0)`
  - `useState<string>("")` — never `useState("")`
  - `useState<string | null>(null)`

### Variables and naming

- **NEVER use magic variables** like `s`, `j`, `a`, `b` in callbacks or iterators.
- Use descriptive names always:
  - `(s) => s.accounts` -> `(state) => state.accounts`
  - `(a) => a.balance` -> `(account) => account.balance`
  - `(a, b) => a.date - b.date` -> `(prev, next) => prev.date - next.date`

### Helpers and utilities

- **There is no `utils.ts` inside component folders.** This file is prohibited.
- Helper functions go in `src/utils/{domain}/` — one function per file, named after the function.
- Constants, label maps, and static configuration go in `src/content/{domain}/`.
- If a helper is generic (not domain-specific), it goes in `src/utils/ui/` or `src/utils/formatters/`.

---

## Store conventions (Zustand)

- Stores go in `src/storage/` (camelCase). Suffix depends on responsibility:
  - **`{name}Storage.ts`** when the store **stores/persists domain data**: `authStorage.ts`, `accountStorage.ts`.
  - **`{name}Controller.ts`** when the store **only manages UI state/filters for a screen** (does not persist domain data): `dashboardController.ts`.
- Zustand 5 syntax: `create<Type>()((set, get) => ...)` — note the double parentheses.
- Standalone selectors exported outside `create()`, not inside.
- Store types go in `{name}.d.ts` inside the storage folder (e.g., `src/storage/auth.d.ts`).

## Hook conventions

- Hooks in `src/hooks/` named `use{Name}.ts` (camelCase): `useAccounts.ts`, `useAuth.ts`.
- Domain subfolders use **kebab-case**: `src/hooks/accounts/`, `src/hooks/auth/`.
- Query hooks auto-toast errors via the global `QueryCache.onError` handler.
  Use `meta: { suppressToast: true }` to opt out when an error is an expected business state.
- Mutation hooks must have `onError` with `getApiErrorMessage(error, "fallback")`.

## Query keys conventions

- Query keys live in `src/content/services/{domain}.ts` (one file per domain), re-exported via `src/content/services/index.ts`.
- Keys are **string constants** (not static arrays, not factory functions). Each key is a string that mirrors the service method name it feeds.
- Key naming mirrors the service method — `getAccounts()` → `accountKeys.accounts`, `getAccount(id)` → `accountKeys.account`.
- Each domain exports a `{entity}Keys` object (e.g., `accountKeys`, `bankKeys`, `categoryKeys`).
- **Forbidden**: defining query keys inline in hooks, exporting `*_QUERY_KEY` constants from services, or using generic names (`all`, `list`, `detail`).
- Hooks build the query key array inline: `queryKey: [accountKeys.accounts]`, `queryKey: [accountKeys.account, id]`.
- Use `queryKey: [accountKeys.accounts]` for invalidation — React Query's prefix matching invalidates the entire namespace.

### Structure per domain

```typescript
export const accountKeys = {
	accounts: "getAccounts",
	account: "getAccount",
};
```

- `{entity}s` — base key for list queries and invalidation (prefix match clears all entries in the namespace).
- `{entity}` — single entity detail (used as `[entityKeys.entity, id]` in hooks).
- Custom keys (e.g., `bankAccounts`, `budgetProgress`) mirror the corresponding service method name.

## Screen conventions — entity list pages

Entity list pages (banks, accounts, transactions, budgets, etc.) follow a strict component decomposition. The page `index.tsx` is a **layout orchestrator only** — no data logic, no handlers, no memoization. Each section is a self-contained component that manages its own data fetching, loading, and error states.

### Page structure

```
screens/app/{entity}/
├── index.tsx                  ← layout only: renders components in order
├── {entity}.d.ts              ← screen-level shared types (e.g., enriched types)
└── components/
    ├── {entity}-header/       ← breadcrumbs, page title, actions
    ├── {entity}-kpis/         ← KPI cards, fetches its own data
    ├── {entity}-filters/      ← search + filter controls, reads/writes controller
    └── {entity}-list/         ← list with loading/error/empty states
        └── components/
            └── {entity}-list-skeleton/
```

### `index.tsx` — layout orchestrator only

The page index contains ONLY the component composition. No hooks, no queries, no handlers, no `useMemo`.

```tsx
export const Banks = (): React.ReactElement => {
	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<BanksHeader />
			<BanksKpis />
			<BanksFilters />
			<BanksList />
		</div>
	);
};
```

### Data fetching — shared query, deduplicated

Each component calls the same query hook with the same params. React Query deduplicates identical queries — **one HTTP request, one shared cache entry**. Each component reads `data`, `isLoading`, and `isError` independently.

- **KPIs component**: calls `useQuery{Entity}s(filters)` from the controller. On error or empty data, shows `0` values — never shows error or empty states.
- **List component**: calls `useQuery{Entity}s(filters)` + any enrichment queries (e.g., `useQueryAccounts` for bank stats). Manages its own `isLoading`, `isError`, and empty states. The skeleton, error, and empty states only appear in the list component.
- **Filters component**: reads/writes the controller. Does NOT fetch data.

### Controller — `{entity}Controller.ts` in `src/storage/`

Manages UI state for the screen: `searchQuery` (client-side) and `{entity}Filters: {Entity}Params` (server-side). The filters object is passed directly to the query hook — the API handles sorting and filtering.

```typescript
type BanksController = {
	banksFilters: BankParams;
	searchQuery: string;

	setSearchQuery: (query: string) => void;
	setSortBy: (sortBy: "name" | "createdAt") => void;
	setActiveOnly: (activeOnly: boolean) => void;
	resetFilters: () => void;
};
```

### Search — client-side only

Search filtering stays client-side. The list component filters the enriched data by `searchQuery` from the controller. Search is NOT sent to the API as a param.

### Filters — server-side via params

Sort, status, and other filter params flow from the controller to the query hook to the API. The API returns pre-sorted and pre-filtered data.

- **Binary filters** (e.g., "active only") use `FilterToggle` from the design system — a toggle button with dynamic label and icon.
- **Multi-option filters** (e.g., sort by) use `FilterSelect`.
- **Filter options** live in `src/content/{entity}/{entity}Options.ts`.

### `FilterToggle` — design system primitive

Binary filter toggle button located at `src/components/design-system/patterns/filters/filter-toggle/`. Shows active state with `bg-primary/10 border-primary/20 text-primary`. Supports dynamic label, icon, and `aria-pressed`.

```tsx
<FilterToggle
	label={activeOnly ? "Solo activos" : "Todos"}
	icon={activeOnly ? CheckCircle2 : LayoutGrid}
	checked={activeOnly}
	onChange={setActiveOnly}
/>
```

## Service conventions

- Services in `src/services/{name}/` (one folder per domain).
- Service types in `{name}.d.ts` inside the service folder.
- Services are **pure functions** — no UI logic, no React imports.
- Services reuse `httpClient`, `unwrap`, and existing utilities.
- The `/api` prefix is already included in `httpClient` `baseURL` — never add it manually.
- The backend wraps ALL responses in `{ success: boolean, data: T, message?: string }`.
  Use `unwrap<T>()` to extract the inner `data` — never access `response.data.data` manually.

### Type file structure (`.d.ts`)

Types MUST live in the `.d.ts` file, never in `index.ts`. The `.d.ts` is an ambient declaration file (no `export` or `import` at top-level). Reference external types with inline `import()`.

Order within the `.d.ts`:

1. **Enums / unions** — string literal unions used by the entity (e.g., `AccountType`, `CategoryType`, `TransactionType`, `BudgetPeriod`, `PeriodType`, `IncomeSourceFrequency`).
2. **Entity** — the main domain model (e.g., `Account`, `Bank`, `Category`).
3. **Service type** — the interface that defines the service contract (e.g., `AccountService`, `BankService`).
4. **Method types** — `*Params` for list/filter parameters, `Create*Payload` for creation, `Update*Payload` for updates, and any response-specific types.

```typescript
// ====================== ENUMS =========================

type AccountType = "DEBIT" | "CREDIT" | "LOAN" | "CASH";

// ====================== ENTITY =========================

type Account = { /* ... */ };

// ====================== SERVICE =========================

type AccountService = {
	getAccounts: (params?: AccountParams) => Promise<Account[]>;
	getAccount: (id: string) => Promise<Account>;
	createAccount: (payload: CreateAccountPayload) => Promise<Account>;
	updateAccount: (id: string, payload: UpdateAccountPayload) => Promise<Account>;
	deleteAccount: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type AccountParams = { /* ... */ };
type CreateAccountPayload = { /* ... */ };
type UpdateAccountPayload = { /* ... */ };
```

### Method naming

Services are the bridge to the API, decoupled from the frontend. Method names MUST be explicit and domain-specific — never generic (`getAll`, `getById`, `create`, `update`, `remove` are forbidden).

| Operation | Pattern | Example |
|-----------|---------|---------|
| List | `get{Entity}s` | `getAccounts`, `getBanks`, `getTransactions` |
| Single | `get{Entity}` | `getAccount`, `getBank`, `getTransaction` |
| Create | `create{Entity}` | `createAccount`, `createBank` |
| Update | `update{Entity}` | `updateAccount`, `updateBank` |
| Delete | `delete{Entity}` | `deleteAccount`, `deleteBank` |
| Custom | `{verb}{Entity}{Detail}` | `getBankIncomeVsExpenses`, `getBudgetProgress`, `getTopCategoriesByBank` |

### Parameter naming

- List/filter parameters MUST be named `{Entity}Params` (e.g., `AccountParams`, `TransactionParams`), never `{Entity}Filters` or bare `filters`.
- The service method parameter MUST be named `params`, not `filters`.
- Creation payloads: `Create{Entity}Payload`.
- Update payloads: `Update{Entity}Payload`.

### `index.ts` structure

The `index.ts` file contains ONLY:
- The `import` from `../http-client`.
- The service object implementation (typed by the service type from the `.d.ts`).

No type definitions, no type aliases, no interfaces, no query key constants in `index.ts`.

### HTTP client

- `src/services/http-client.ts` — shared axios instance with:
  - `unwrap<T>()` — strips the `APIResponse<T>` envelope, returns clean `T`.
  - Request interceptor — injects Bearer token from `useAuthStorage.getState()`, resolves `baseURL` by `serviceKey`.
  - 401 interceptor — queues concurrent requests, refreshes token via `authService.refresh`, retries once, logs out on failure.
- `src/services/types.d.ts` — `APIResponse<T>` envelope + `QueuedRequest` types (ambient, shared by all services).
- `src/services/query-client.ts` — global `QueryClient` with `QueryCache.onError` toast handler.
- `src/services/persister.ts` — async storage persister for React Query cache.

### Error handling

- `src/utils/errors/getApiErrorMessage.ts` — extracts `response.data.message` from the `APIResponse` envelope, falls back to `Error.message`, then to a passed fallback string.
- `src/types/query-meta.d.ts` — TanStack Query `Register` augmentation for `meta: { suppressToast: true }`.
- Every mutation hook must call `getApiErrorMessage(error, "fallback")` in its `onError`.
- The global `QueryCache.onError` handler toasts all failed queries unless `suppressToast` is set.

## Storybook conventions

- **Only components in `src/components/` have stories.** Screens (`src/screens/`) never have `.stories.tsx` files.
- Every component in `src/components/` (both `ui/` and `design-system/`) MUST have a `.stories.tsx` file co-located in its folder.
- Stories must be kept up to date. When a component's props or behavior changes, the story must be updated in the same commit.
- Storybook uses CSF format — `export default meta` is the only accepted use of `export default` in the project.

## Testing conventions

- **All tests live in `test/` at the project root**, organized by domain mirroring `src/`.
- Never place test files (`*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`) inside `src/`.
- No `__tests__/` directories anywhere.

```
test/
├── screens/
│   └── app/
│       └── dashboard/
│           └── dashboard.test.tsx
├── hooks/
│   └── accounts/
│       └── useAccounts.test.ts
├── utils/
│   └── banks/
│       └── enrichBanksWithStats.test.ts
└── services/
    └── accounts/
        └── accountsService.test.ts
```

## General conventions

- TypeScript strict with `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`.
- `import type` for type-only imports (`verbatimModuleSyntax: true`).
- Biome as linter and formatter.
- Package manager: **bun** (never npm or yarn).
- OKLCH for colors.
- Elevation: ring or box-shadow, whichever looks better for the case.
- Icons: Lucide React.
- Toast: Sonner.

## Response style

- **Brief, technical, direct.** No verbose explanations or redundant context.
- Go straight to the point: what was done, why, and code if applicable.
- Don't repeat context the user already knows.
- Prioritize token efficiency in every response.