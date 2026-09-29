# UI Usage — Design-System Component Reference

> Source of truth for available design-system components in savy-web.
> Agents MUST check this document before creating any UI component.
> If a pattern listed here exists, use it — do not reimplement.

---

## Primitives

Components in `src/components/design-system/primitives/`.

### ActionsMenu

**Import**: `@/components/design-system/primitives/actions-menu`
**Replaces**: manually wiring `DropdownMenu` + ellipsis trigger button.

| Prop               | Type                             | Default      |
| ------------------ | -------------------------------- | ------------ |
| `children`         | `React.ReactNode`                | —            |
| `align`            | `"start" \| "center" \| "end"`  | `"end"`      |
| `triggerDirection`  | `"vertical" \| "horizontal"`    | `"vertical"` |

```tsx
import { ActionsMenu } from "@/components/design-system/primitives/actions-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

<ActionsMenu align="end">
  <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
  <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
</ActionsMenu>
```

### Brand

**Import**: `@/components/design-system/primitives/brand`
**Replaces**: manual logo + "Savy" text link to home.

| Prop        | Type                        | Default     |
| ----------- | --------------------------- | ----------- |
| `variant`   | `"default" \| "light"`      | `"default"` |
| `size`      | `"sm" \| "md" \| "lg"`     | `"md"`      |
| `className` | `string`                    | —           |

```tsx
import { Brand } from "@/components/design-system/primitives/brand";

<Brand size="lg" variant="light" />
```

### ConfirmDialog

**Import**: `@/components/design-system/primitives/confirm-dialog`
**Replaces**: manually composing `AlertDialog` + confirmation buttons + async loading state.

| Prop           | Type                                     | Default          |
| -------------- | ---------------------------------------- | ---------------- |
| `children`     | `React.ReactElement` (trigger)           | —                |
| `title`        | `string`                                 | —                |
| `description`  | `string`                                 | —                |
| `variant`      | `"default" \| "destructive" \| "success"`| `"destructive"`  |
| `onConfirm`    | `() => void \| Promise<void>`            | —                |
| `loading`      | `boolean`                                | `false`          |
| `disabled`     | `boolean`                                | `false`          |
| `confirmText`  | `string`                                 | `"Confirmar"`    |
| `cancelText`   | `string`                                 | `"Cancelar"`     |
| `confirmIcon`  | `LucideIcon`                             | `Trash2`         |
| `open`         | `boolean`                                | — (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void`                | — (uncontrolled) |

```tsx
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";

<ConfirmDialog
  title="Delete account?"
  description="This action cannot be undone."
  onConfirm={handleDelete}
  loading={isPending}
>
  <Button variant="destructive">Delete</Button>
</ConfirmDialog>
```

### InfoItem

**Import**: `@/components/design-system/primitives/info-item`
**Replaces**: manually building icon + label + description rows with borders and backdrop blur.

| Prop          | Type              | Default |
| ------------- | ----------------- | ------- |
| `icon`        | `LucideIcon`      | —       |
| `title`       | `string`          | —       |
| `description` | `string`          | —       |
| `children`    | `React.ReactNode` | —       |
| `action`      | `React.ReactNode` | —       |
| `className`   | `string`          | —       |

```tsx
import { InfoItem } from "@/components/design-system/primitives/info-item";
import { Mail } from "lucide-react";

<InfoItem icon={Mail} title="Email" description="user@example.com" />
```

### LogoutButton

**Import**: `@/components/design-system/primitives/logout-button`
**Replaces**: manually wiring the `useLogout` mutation to a button with pending state.

No props. Self-contained.

```tsx
import { LogoutButton } from "@/components/design-system/primitives/logout-button";

<LogoutButton />
```

### Modal

**Import**: `@/components/design-system/primitives/modal`
**Replaces**: manually composing `Dialog` + header with icon badge + separator + footer.

| Prop           | Type                                           | Default     |
| -------------- | ---------------------------------------------- | ----------- |
| `title`        | `string`                                       | —           |
| `description`  | `string`                                       | —           |
| `content`      | `React.ReactElement`                           | —           |
| `children`     | `React.ReactElement` (trigger, optional)       | —           |
| `icon`         | `React.ElementType`                            | —           |
| `iconVariant`  | `"orange" \| "neutral" \| "amber" \| "red"`   | `"orange"`  |
| `actions`      | `React.ReactElement`                           | —           |
| `showCancel`   | `boolean`                                      | `false`     |
| `showClose`    | `boolean`                                      | `true`      |
| `openModal`    | `boolean`                                      | `false`     |
| `setOpenModal` | `(open: boolean) => void`                      | —           |
| `className`    | `string`                                       | —           |

```tsx
import { Modal } from "@/components/design-system/primitives/modal";
import { Settings } from "lucide-react";

<Modal
  title="Settings"
  description="Adjust your preferences."
  icon={Settings}
  content={<SettingsForm />}
  actions={<Button onClick={save}>Save</Button>}
  showCancel
>
  <Button variant="outline">Open Settings</Button>
</Modal>
```

### Steps

**Import**: `@/components/design-system/primitives/steps`
**Replaces**: manually building step indicators with progress lines/bars.

| Prop          | Type               | Default  |
| ------------- | ------------------ | -------- |
| `steps`       | `Step[]`           | —        |
| `currentStep` | `number`           | —        |
| `variant`     | `"line" \| "bar"`  | `"line"` |
| `label`       | `string`           | —        |
| `className`   | `string`           | —        |

`Step = { step: number; label?: string }`

```tsx
import { Steps } from "@/components/design-system/primitives/steps";

<Steps
  steps={[{ step: 1, label: "Info" }, { step: 2, label: "Review" }, { step: 3, label: "Done" }]}
  currentStep={2}
  variant="bar"
/>
```

### ThemeToggle

**Import**: `@/components/design-system/primitives/theme-toggle`
**Replaces**: manually wiring `next-themes` + Sun/Moon icons.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | —       |

```tsx
import { ThemeToggle } from "@/components/design-system/primitives/theme-toggle";

<ThemeToggle />
```

### TruncatedText

**Import**: `@/components/design-system/primitives/truncated-text`
**Replaces**: manually combining `truncate` CSS + `Tooltip` to reveal full text on hover.

| Prop               | Type     | Default |
| ------------------ | -------- | ------- |
| `text`             | `string` | —       |
| `className`        | `string` | —       |
| `tooltipClassName` | `string` | —       |

```tsx
import { TruncatedText } from "@/components/design-system/primitives/truncated-text";

<TruncatedText text="Very long account name that will be truncated" />
```

---

## Patterns

### Animations

Components in `src/components/design-system/patterns/animations/`.

All animation components respect `prefers-reduced-motion`.

#### ScaleFadeIn

**Import**: `@/components/design-system/patterns/animations/scale-fade-in`
**Replaces**: manual `motion.div` with opacity + scale entrance.

| Prop        | Type              | Default |
| ----------- | ----------------- | ------- |
| `children`  | `React.ReactNode` | —       |
| `className` | `string`          | —       |
| `delay`     | `number`          | `0`     |
| `scale`     | `number`          | `0.95`  |

```tsx
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";

<ScaleFadeIn delay={0.2}>
  <Card>...</Card>
</ScaleFadeIn>
```

#### ScrollReveal

**Import**: `@/components/design-system/patterns/animations/scroll-reveal`
**Replaces**: manual `motion.div` with `whileInView` and directional slide.

| Prop        | Type                                      | Default |
| ----------- | ----------------------------------------- | ------- |
| `children`  | `React.ReactNode`                         | —       |
| `className` | `string`                                  | —       |
| `delay`     | `number`                                  | `0`     |
| `direction` | `"up" \| "down" \| "left" \| "right"`    | `"up"`  |
| `distance`  | `number`                                  | `20`    |

```tsx
import { ScrollReveal } from "@/components/design-system/patterns/animations/scroll-reveal";

<ScrollReveal direction="left" delay={0.1}>
  <FeatureCard />
</ScrollReveal>
```

#### SlideUp

**Import**: `@/components/design-system/patterns/animations/slide-up`
**Replaces**: manual `motion.div` with simple opacity + Y slide entrance.

| Prop        | Type              | Default |
| ----------- | ----------------- | ------- |
| `children`  | `React.ReactNode` | —       |
| `className` | `string`          | —       |

```tsx
import { SlideUp } from "@/components/design-system/patterns/animations/slide-up";

<SlideUp>
  <PageContent />
</SlideUp>
```

#### StaggerContainer

**Import**: `@/components/design-system/patterns/animations/stagger-container`
**Replaces**: manual `motion.div` parent with `staggerChildren` variant.

Children should use `motion.div` with `variants={{ hidden: ..., visible: ... }}`.

| Prop        | Type                            | Default |
| ----------- | ------------------------------- | ------- |
| `children`  | `React.ReactNode`               | —       |
| `className` | `string`                        | —       |
| `stagger`   | `number` (seconds)              | `0.12`  |
| `as`        | `"div" \| "ul" \| "section"`   | `"div"` |

```tsx
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";

<StaggerContainer stagger={0.08} as="ul">
  {items.map((item) => (
    <motion.li key={item.id} variants={childVariants}>
      {item.name}
    </motion.li>
  ))}
</StaggerContainer>
```

---

### Data Display

Components in `src/components/design-system/patterns/data-display/`.

#### AppTable

**Import**: `@/components/design-system/patterns/data-display/app-table`
**Replaces**: manually composing `Table` + skeleton rows + empty state + pagination + sorting + bulk actions.

Generic component: `AppTable<T>`.

| Prop                    | Type                                  | Default |
| ----------------------- | ------------------------------------- | ------- |
| `headers`               | `AppTableHeader[]`                    | —       |
| `elements`              | `T[] \| undefined`                    | —       |
| `renderRow`             | `(item: T) => ReactNode`             | —       |
| `getRowId`              | `(item: T, index: number) => Key`    | —       |
| `isLoading`             | `boolean`                             | `false` |
| `fixedLayout`           | `boolean`                             | `false` |
| `hideHeadersWhenEmpty`  | `boolean`                             | `false` |
| `empty`                 | `{ icon, title, description }`        | —       |
| `pagination`            | `AppTablePaginationConfig`            | —       |
| `sort`                  | `AppTableSortConfig`                  | —       |
| `selection`             | `AppTableSelectionConfig<T>`          | —       |
| `bulkActions`           | `AppTableBulkActionsConfig`           | —       |

Also exports `BulkActionsBar` for standalone use.

```tsx
import { AppTable } from "@/components/design-system/patterns/data-display/app-table";

<AppTable
  headers={[{ label: "Name" }, { label: "Amount", sortField: "amount" }]}
  elements={accounts}
  renderRow={(account) => <AccountRow account={account} />}
  getRowId={(account) => account.id}
  isLoading={isLoading}
  pagination={{ page, totalPages, onPageChange }}
  sort={{ value: sortValue, onSort: handleSort }}
/>
```

#### BankCard

**Import**: `@/components/banks/bank-card`
**Replaces**: custom card-shaped account display with gradient, balance, and type icon.

> **Entity-coupled component** — lives in `src/components/banks/` because its props reference `Account`.

| Prop        | Type          | Default |
| ----------- | ------------- | ------- |
| `account`   | `BankCardAccount` (id, name, balance, currency, type, isActive) | — |
| `bankName`  | `string`      | —       |
| `bankColor` | `string`      | —       |
| `creditCard`| `{ creditLimit }` | —   |
| `onClick`   | `() => void`  | —       |
| `className` | `string`      | —       |

```tsx
import { BankCard } from "@/components/banks/bank-card";

<BankCard account={account} bankName="BBVA" bankColor="#0040a1" onClick={handleClick} />
```

#### BankChip

**Import**: `@/components/banks/bank-chip`
**Replaces**: inline pill/badge with bank logo/color dot + name + account count.

> **Entity-coupled component** — lives in `src/components/banks/` because its props reference a bank-shaped type.

| Prop        | Type                                                      | Default |
| ----------- | --------------------------------------------------------- | ------- |
| `bank`      | `{ id, name, color, logo, accountCount }` | —       |
| `onClick`   | `() => void`                                              | —       |
| `className` | `string`                                                  | —       |

```tsx
import { BankChip } from "@/components/banks/bank-chip";

<BankChip bank={bank} onClick={handleBankFilter} />
```

#### DonutChart

**Import**: `@/components/design-system/patterns/data-display/donut-chart`
**Replaces**: manually composing recharts `PieChart` + legend + tooltip + empty state.

| Prop          | Type                                     | Default |
| ------------- | ---------------------------------------- | ------- |
| `data`        | `{ label, value, color? }[]`             | —       |
| `centerLabel` | `string`                                 | —       |
| `centerValue` | `string`                                 | —       |
| `emptyIcon`   | `LucideIcon`                             | —       |
| `className`   | `string`                                 | —       |

```tsx
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";

<DonutChart
  data={[{ label: "Food", value: 3500 }, { label: "Transport", value: 1200 }]}
  centerValue="$4,700"
  centerLabel="Total"
/>
```

#### FlipCardViewer

**Import**: `@/components/design-system/patterns/data-display/flip-card-viewer`
**Replaces**: custom 3D flip card + lightbox dialog for credential/ID card images.

| Prop        | Type     | Default    |
| ----------- | -------- | ---------- |
| `frontUrl`  | `string` | —          |
| `backUrl`   | `string` | —          |
| `ownerName` | `string` | `"Person"` |

```tsx
import { FlipCardViewer } from "@/components/design-system/patterns/data-display/flip-card-viewer";

<FlipCardViewer frontUrl={frontImage} backUrl={backImage} ownerName="Juan" />
```

#### ImagePreviewDialog

**Import**: `@/components/design-system/patterns/data-display/image-preview-dialog`
**Replaces**: thumbnail + dialog with full-size preview.

| Prop               | Type     | Default   |
| ------------------ | -------- | --------- |
| `src`              | `string` | —         |
| `alt`              | `string` | `"image"` |
| `title`            | `string` | —         |
| `className`        | `string` | —         |
| `previewClassName` | `string` | —         |

```tsx
import { ImagePreviewDialog } from "@/components/design-system/patterns/data-display/image-preview-dialog";

<ImagePreviewDialog src={receipt.url} alt="Receipt" title="Payment receipt" />
```

#### InfoCard

**Import**: `@/components/design-system/patterns/data-display/info-card`
**Replaces**: manual Info icon + Popover for contextual help.

| Prop       | Type                                    | Default |
| ---------- | --------------------------------------- | ------- |
| `children` | `React.ReactElement`                    | —       |
| `size`     | `"xs" \| "sm" \| "md" \| "lg"`         | `"md"` |
| `position` | `"top" \| "right" \| "left" \| "bottom"`| `"top"` |

```tsx
import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";

<InfoCard size="xs" position="top">
  <span>This field represents the monthly limit.</span>
</InfoCard>
```

#### KpiCard

**Import**: `@/components/design-system/patterns/data-display/kpi-card`
**Replaces**: glass card with label + big value + delta arrow indicator.

| Prop        | Type               | Default |
| ----------- | ------------------ | ------- |
| `label`     | `string`           | —       |
| `value`     | `string`           | —       |
| `delta`     | `number \| null`   | —       |
| `icon`      | `LucideIcon`       | —       |
| `currency`  | `string`           | —       |
| `className` | `string`           | —       |

```tsx
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { Wallet } from "lucide-react";

<KpiCard label="Total Balance" value="$12,500.00" delta={5.3} icon={Wallet} />
```

#### MiniGauge

**Import**: `@/components/design-system/patterns/data-display/mini-gauge`
**Replaces**: custom semicircle SVG gauge with animated arc.

| Prop          | Type                          | Default              |
| ------------- | ----------------------------- | -------------------- |
| `value`       | `number`                      | —                    |
| `max`         | `number`                      | —                    |
| `label`       | `string`                      | —                    |
| `formatValue` | `(value: number) => string`   | —                    |
| `color`       | `string`                      | `"var(--color-primary)"` |
| `className`   | `string`                      | —                    |

```tsx
import { MiniGauge } from "@/components/design-system/patterns/data-display/mini-gauge";

<MiniGauge value={7500} max={10000} label="Budget used" />
```

#### ProgressBar

**Import**: `@/components/design-system/patterns/data-display/progress-bar`
**Replaces**: manual `Progress` + label + formatted currency values + auto-variant coloring.

| Prop         | Type                                    | Default     |
| ------------ | --------------------------------------- | ----------- |
| `label`      | `string`                                | —           |
| `current`    | `number`                                | —           |
| `total`      | `number`                                | —           |
| `currency`   | `string`                                | `"MXN"`     |
| `locale`     | `string`                                | `"es-MX"`   |
| `showValues` | `boolean`                               | `true`      |
| `variant`    | `"default" \| "warning" \| "danger"`    | auto (>75% warning, >90% danger) |
| `className`  | `string`                                | —           |

```tsx
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";

<ProgressBar label="Food" current={8500} total={10000} currency="MXN" />
```

#### QuickActionsBar

**Import**: `@/components/design-system/patterns/data-display/quick-actions-bar`
**Replaces**: horizontal scrollable row of navigation shortcut buttons.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | —       |

Self-contained — uses hardcoded app routes. No configuration needed.

```tsx
import { QuickActionsBar } from "@/components/design-system/patterns/data-display/quick-actions-bar";

<QuickActionsBar />
```

#### SummaryCard

**Import**: `@/components/design-system/patterns/data-display/summary-card`
**Replaces**: glass card with title + icon + "View all" link + optional create button.

| Prop          | Type              | Default |
| ------------- | ----------------- | ------- |
| `title`       | `string`          | —       |
| `icon`        | `LucideIcon`      | —       |
| `actionLabel` | `string`          | —       |
| `onAction`    | `() => void`      | —       |
| `onCreate`    | `() => void`      | —       |
| `children`    | `React.ReactNode` | —       |
| `className`   | `string`          | —       |

```tsx
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { PiggyBank } from "lucide-react";

<SummaryCard title="Budgets" icon={PiggyBank} actionLabel="View all" onAction={goToBudgets}>
  <BudgetList items={budgets} />
</SummaryCard>
```

#### TransactionRow

**Import**: `@/components/transactions/transaction-row`
**Replaces**: custom transaction list item with type icon, description, date, and signed amount.

> **Entity-coupled component** — lives in `src/components/transactions/` because its props reference `TransactionRowTransaction` with `accountName`, `categoryName`.

| Prop          | Type                                                  | Default |
| ------------- | ----------------------------------------------------- | ------- |
| `transaction` | `{ id, type, amount, description, date, accountName, categoryName }` | — |
| `currency`    | `string`                                              | —       |
| `locale`      | `string`                                              | —       |
| `onClick`     | `() => void`                                          | —       |
| `className`   | `string`                                              | —       |

`type`: `"INCOME" | "EXPENSE" | "TRANSFER" | "PAYMENT"` — auto-selects icon and color.

```tsx
import { TransactionRow } from "@/components/transactions/transaction-row";

<TransactionRow transaction={tx} currency="MXN" locale="es-MX" onClick={() => openDetail(tx)} />
```

#### WaffleChart

**Import**: `@/components/design-system/patterns/data-display/waffle-chart`
**Replaces**: 10x10 grid percentage visualization.

| Prop         | Type     | Default              |
| ------------ | -------- | -------------------- |
| `percentage` | `number` | —                    |
| `label`      | `string` | —                    |
| `color`      | `string` | `"var(--color-primary)"` |
| `className`  | `string` | —                    |

```tsx
import { WaffleChart } from "@/components/design-system/patterns/data-display/waffle-chart";

<WaffleChart percentage={73} label="Goal progress" />
```

---

### Feedback

Components in `src/components/design-system/patterns/feedback/`.

#### AppToaster

**Import**: `@/components/design-system/patterns/feedback/app-toaster`
**Replaces**: raw `<Toaster />` from Sonner — pre-configured with theme, position, and styling.

No props. Render once at app root.

```tsx
import { AppToaster } from "@/components/design-system/patterns/feedback/app-toaster";

<AppToaster />
```

#### Empty

**Import**: `@/components/design-system/patterns/feedback/empty`
**Replaces**: custom empty state with icon circle + title + description + optional action button.

| Prop          | Type                                    | Default                |
| ------------- | --------------------------------------- | ---------------------- |
| `title`       | `string`                                | `"Sin resultados"`     |
| `description` | `string`                                | `"No hay informacion..."` |
| `icon`        | `LucideIcon`                            | —                      |
| `action`      | `{ label, onClick, icon? }`             | —                      |
| `className`   | `string`                                | —                      |

```tsx
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { FolderOpen, Plus } from "lucide-react";

<Empty
  icon={FolderOpen}
  title="No accounts"
  description="Create your first account to get started."
  action={{ label: "Create account", onClick: handleCreate, icon: Plus }}
/>
```

#### ErrorFallback

**Import**: `@/components/design-system/patterns/feedback/error-boundary`
**Replaces**: custom error boundary UI with warning icon + retry button.

| Prop         | Type         | Default |
| ------------ | ------------ | ------- |
| `error`      | `unknown`    | —       |
| `resetError` | `() => void` | —       |

Shows the error message in dev mode only.

```tsx
import { ErrorFallback } from "@/components/design-system/patterns/feedback/error-boundary";

<ErrorBoundary fallback={({ error, resetError }) => (
  <ErrorFallback error={error} resetError={resetError} />
)}>
  <DangerousComponent />
</ErrorBoundary>
```

#### Skeletons

Pre-built skeleton compositions for common page elements.

| Component            | Import path                                                              | What it renders                       |
| -------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| `BreadcrumbSkeleton` | `@/components/design-system/patterns/feedback/skeletons/breadcrumb-skeleton` | Circle + two text bars                |
| `ButtonSkeleton`     | `@/components/design-system/patterns/feedback/skeletons/button-skeleton`     | Button-shaped skeleton with size variants |
| `PageTitleSkeleton`  | `@/components/design-system/patterns/feedback/skeletons/page-title-skeleton` | Square icon + title + subtitle bars   |
| `PageHeaderSkeleton` | `@/components/design-system/patterns/feedback/skeletons/page-header-skeleton`| Breadcrumb + title + button skeletons |

`ButtonSkeleton` props: `size` (button size variant), `className`, `fullWidth`.

```tsx
import { PageHeaderSkeleton } from "@/components/design-system/patterns/feedback/skeletons/page-header-skeleton";

if (isLoading) return <PageHeaderSkeleton />;
```

---

### Filters

Components in `src/components/design-system/patterns/filters/`.

#### FilterDateRangePicker

**Import**: `@/components/design-system/patterns/filters/filter-date-range-picker`
**Replaces**: manual Popover + Calendar range selection + date formatting.

| Prop            | Type                                      | Default              |
| --------------- | ----------------------------------------- | -------------------- |
| `dateFrom`      | `string` (YYYY-MM-DD)                     | —                    |
| `dateTo`        | `string` (YYYY-MM-DD)                     | —                    |
| `onChangeRange` | `(from?: string, to?: string) => void`    | —                    |
| `placeholder`   | `string`                                  | `"Rango de fechas"`  |
| `disabled`      | `boolean`                                 | `false`              |
| `className`     | `string`                                  | —                    |

```tsx
import { FilterDateRangePicker } from "@/components/design-system/patterns/filters/filter-date-range-picker";

<FilterDateRangePicker
  dateFrom={filters.dateFrom}
  dateTo={filters.dateTo}
  onChangeRange={(from, to) => setFilters({ dateFrom: from, dateTo: to })}
/>
```

#### FilterSelect

**Import**: `@/components/design-system/patterns/filters/filter-select`
**Replaces**: manual Select with active-state styling for filter bars.

| Prop             | Type                        | Default            |
| ---------------- | --------------------------- | ------------------ |
| `label`          | `string`                    | —                  |
| `options`        | `Option[]`                  | —                  |
| `value`          | `string`                    | —                  |
| `onChange`        | `(value: string) => void`   | —                  |
| `placeholder`    | `string`                    | `"Seleccionar..."` |
| `disabled`       | `boolean`                   | `false`            |
| `className`      | `string`                    | —                  |
| `labelClassName` | `string`                    | —                  |
| `inputClassName` | `string`                    | —                  |

```tsx
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";

<FilterSelect
  options={[{ value: "all", label: "All" }, { value: "INCOME", label: "Income" }]}
  value={filters.type}
  onChange={(value) => setFilters({ type: value })}
/>
```

#### FiltersWrapper

**Import**: `@/components/design-system/patterns/filters/filters-wrapper`
**Replaces**: manual filter toggle button + collapsible filter panel + mobile sheet.

Supports three variants: `"inline"` (horizontal), `"panel"` (collapsible block), `"headless"` (render-prop).

| Prop                | Type                                                   | Default       |
| ------------------- | ------------------------------------------------------ | ------------- |
| `activeFilterCount` | `number`                                               | —             |
| `hasActiveFilters`  | `boolean`                                              | —             |
| `clearFilters`      | `() => void`                                           | —             |
| `children`          | `ReactElement` or `(args: HeadlessRenderArgs) => ReactElement` | —     |
| `variant`           | `"inline" \| "panel" \| "headless"`                    | `"inline"`    |
| `direction`         | `"left" \| "right"`                                    | `"right"`     |
| `mobileTitle`       | `string`                                               | `"Filtros"`   |
| `mobileDescription` | `string`                                              | —             |

```tsx
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";

<FiltersWrapper
  activeFilterCount={2}
  hasActiveFilters={true}
  clearFilters={handleClear}
>
  <FilterSelect ... />
  <FilterDateRangePicker ... />
</FiltersWrapper>
```

#### SearchFilterSelect

**Import**: `@/components/design-system/patterns/filters/search-filter-select`
**Replaces**: searchable dropdown for filter bars with debounced search, "All" option, and active styling.

| Prop                | Type                                     | Default            |
| ------------------- | ---------------------------------------- | ------------------ |
| `options`           | `Option[]`                               | —                  |
| `value`             | `string \| undefined`                    | —                  |
| `onChange`           | `(value: string \| undefined) => void`  | —                  |
| `placeholder`       | `string`                                 | `"Seleccionar..."` |
| `allLabel`          | `string`                                 | `"Todos"`          |
| `searchPlaceholder` | `string`                                 | `"Buscar..."`      |
| `isLoading`         | `boolean`                                | `false`            |
| `onSearch`          | `(term: string) => void`                 | —                  |
| `className`         | `string`                                 | —                  |

```tsx
import { SearchFilterSelect } from "@/components/design-system/patterns/filters/search-filter-select";

<SearchFilterSelect
  options={bankOptions}
  value={filters.bankId}
  onChange={(value) => setFilters({ bankId: value })}
  onSearch={handleBankSearch}
  placeholder="Bank"
/>
```

#### SearchInput

**Import**: `@/components/design-system/patterns/filters/search-input`
**Replaces**: manual debounced search input with icon.

| Prop          | Type                                     | Default      |
| ------------- | ---------------------------------------- | ------------ |
| `value`       | `string \| undefined`                    | —            |
| `onCommit`    | `(value: string \| undefined) => void`   | —            |
| `placeholder` | `string`                                 | `"Buscar..."` |
| `className`   | `string`                                 | —            |

Uses `useSearch` hook internally for debouncing.

```tsx
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";

<SearchInput value={filters.search} onCommit={(value) => setFilters({ search: value })} />
```

---

### Forms

Components in `src/components/design-system/patterns/forms/`.

All form components integrate with React Hook Form via `Controller`. They accept a generic `<T extends FieldValues>` and require `form: UseFormReturn<T>` + `name: FieldPath<T>`.

#### FormField

**Import**: `@/components/design-system/patterns/forms/form-field`
**Replaces**: manual `Controller` + `Input` + label + error display + password toggle + currency/number formatting.

| Prop            | Type                                                                         | Default  |
| --------------- | ---------------------------------------------------------------------------- | -------- |
| `label`         | `string`                                                                     | —        |
| `name`          | `FieldPath<T>`                                                               | —        |
| `form`          | `UseFormReturn<T>`                                                           | —        |
| `type`          | `"text" \| "email" \| "password" \| "tel" \| "number" \| "currency" \| "percentage"` | `"text"` |
| `placeholder`   | `string`                                                                     | —        |
| `required`      | `boolean`                                                                    | `false`  |
| `optional`      | `boolean`                                                                    | `false`  |
| `helperText`    | `string`                                                                     | —        |
| `info`          | `string`                                                                     | —        |
| `min` / `max`   | `number` (number type only)                                                  | —        |
| `allowDecimals` | `boolean` (number type only)                                                 | `false`  |
| `allowNegative` | `boolean` (number type only)                                                 | `false`  |
| `disabled`      | `boolean`                                                                    | `false`  |
| `className`     | `string`                                                                     | —        |

```tsx
import { FormField } from "@/components/design-system/patterns/forms/form-field";

<FormField label="Account name" name="name" form={form} required />
<FormField label="Balance" name="balance" form={form} type="currency" />
<FormField label="Interest rate" name="rate" form={form} type="percentage" />
```

#### FormSelect

**Import**: `@/components/design-system/patterns/forms/form-select`
**Replaces**: manual `Controller` + `Select` + label + error + optional search.

| Prop                | Type              | Default            |
| ------------------- | ----------------- | ------------------ |
| `label`             | `string`          | —                  |
| `name`              | `FieldPath<T>`    | —                  |
| `form`              | `UseFormReturn<T>`| —                  |
| `options`           | `Option[]`        | —                  |
| `placeholder`       | `string`          | `"Seleccionar..."` |
| `required`          | `boolean`         | `false`            |
| `searchable`        | `boolean`         | `false`            |
| `searchPlaceholder` | `string`          | `"Buscar..."`      |
| `action`            | `React.ReactNode` | —                  |
| `disabled`          | `boolean`         | —                  |
| `helperText`        | `string`          | —                  |
| `info`              | `string`          | —                  |
| `optional`          | `boolean`         | `false`            |
| `className`         | `string`          | —                  |

```tsx
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";

<FormSelect
  label="Currency"
  name="currency"
  form={form}
  options={[{ value: "MXN", label: "MXN" }, { value: "USD", label: "USD" }]}
  required
/>
```

#### FormMultiSelect

**Import**: `@/components/design-system/patterns/forms/form-multi-select`
**Replaces**: manual `Controller` + `Command` + multi-select popover with checkmarks.

| Prop          | Type               | Default            |
| ------------- | ------------------ | ------------------ |
| `label`       | `string`           | —                  |
| `name`        | `FieldPath<T>`     | —                  |
| `form`        | `UseFormReturn<T>` | —                  |
| `options`     | `Option[]`         | —                  |
| `placeholder` | `string`           | `"Select options"` |
| `required`    | `boolean`          | `false`            |
| `disabled`    | `boolean`          | —                  |
| `helperText`  | `string`           | —                  |
| `info`        | `string`           | —                  |
| `optional`    | `boolean`          | `false`            |
| `className`   | `string`           | —                  |

Field value is `string[]`.

```tsx
import { FormMultiSelect } from "@/components/design-system/patterns/forms/form-multi-select";

<FormMultiSelect
  label="Categories"
  name="categoryIds"
  form={form}
  options={categoryOptions}
/>
```

#### FormAsyncSelect

**Import**: `@/components/design-system/patterns/forms/form-async-select`
**Replaces**: manual `Controller` + async searchable single-select with load-more.

| Prop                | Type                        | Default            |
| ------------------- | --------------------------- | ------------------ |
| `label`             | `string`                    | —                  |
| `name`              | `FieldPath<T>`              | —                  |
| `form`              | `UseFormReturn<T>`          | —                  |
| `options`           | `Option[]`                  | —                  |
| `isLoading`         | `boolean`                   | `false`            |
| `hasMore`           | `boolean`                   | `false`            |
| `onSearch`          | `(value: string) => void`   | —                  |
| `onLoadMore`        | `() => void`                | —                  |
| `placeholder`       | `string`                    | `"Seleccionar..."` |
| `searchPlaceholder` | `string`                    | `"Buscar..."`      |
| `required`          | `boolean`                   | `false`            |
| `disabled`          | `boolean`                   | `false`            |
| `action`            | `React.ReactNode`           | —                  |
| `helperText`        | `string`                    | —                  |
| `info`              | `string`                    | —                  |
| `optional`          | `boolean`                   | `false`            |
| `className`         | `string`                    | —                  |

```tsx
import { FormAsyncSelect } from "@/components/design-system/patterns/forms/form-async-select";

<FormAsyncSelect
  label="Bank"
  name="bankId"
  form={form}
  options={bankOptions}
  onSearch={handleSearch}
  isLoading={isFetching}
  required
/>
```

#### FormAsyncMultiSelect

**Import**: `@/components/design-system/patterns/forms/form-async-multi-select`
**Replaces**: manual async multi-select with Command + search + load more.

Same interface as `FormAsyncSelect` but field value is `string[]`. Also accepts `open` / `onOpenChange` for controlled popover state.

```tsx
import { FormAsyncMultiSelect } from "@/components/design-system/patterns/forms/form-async-multi-select";

<FormAsyncMultiSelect
  label="Tags"
  name="tagIds"
  form={form}
  options={tagOptions}
  onSearch={handleSearch}
  onLoadMore={loadMore}
/>
```

#### FormDatePicker

**Import**: `@/components/design-system/patterns/forms/form-date-picker`
**Replaces**: manual `Controller` + `Calendar` popover for single/range/multiple date selection.

| Prop               | Type                          | Default |
| ------------------ | ----------------------------- | ------- |
| `mode`             | `"single" \| "range" \| "multiple"` | —  |
| `label`            | `string`                      | —       |
| `name`             | `FieldPath<T>`                | —       |
| `form`             | `UseFormReturn<T>`            | —       |
| `required`         | `boolean`                     | —       |
| `disabled`         | `boolean`                     | `false` |
| `minDate`          | `Date`                        | —       |
| `maxDate`          | `Date`                        | —       |
| `disabledDates`    | `Matcher \| Matcher[]`        | —       |
| `maxSelected`      | `number` (multiple mode)      | —       |
| `disableNavigation`| `boolean` (multiple mode)     | —       |
| `helperText`       | `string`                      | —       |
| `info`             | `string`                      | —       |
| `optional`         | `boolean`                     | —       |
| `className`        | `string`                      | —       |

Field value format: `"YYYY-MM-DD"` (single), `"ISO|ISO"` (range), `string[]` (multiple).

```tsx
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";

<FormDatePicker mode="single" label="Start date" name="startDate" form={form} required />
```

#### FormSwitch

**Import**: `@/components/design-system/patterns/forms/form-switch`
**Replaces**: manual `Controller` + `Switch` + label + active/inactive text.

| Prop           | Type               | Default      |
| -------------- | ------------------ | ------------ |
| `label`        | `string`           | —            |
| `name`         | `FieldPath<T>`     | —            |
| `form`         | `UseFormReturn<T>` | —            |
| `activeText`   | `string`           | `"Activo"`   |
| `inactiveText` | `string`           | `"Inactivo"` |
| `required`     | `boolean`          | `false`      |
| `disabled`     | `boolean`          | `false`      |
| `helperText`   | `string`           | —            |
| `info`         | `string`           | —            |
| `optional`     | `boolean`          | `false`      |
| `className`    | `string`           | —            |

```tsx
import { FormSwitch } from "@/components/design-system/patterns/forms/form-switch";

<FormSwitch label="Active" name="isActive" form={form} />
```

#### FormTextarea

**Import**: `@/components/design-system/patterns/forms/form-textarea`
**Replaces**: manual `Controller` + `Textarea` + label + error.

| Prop          | Type               | Default |
| ------------- | ------------------ | ------- |
| `label`       | `string`           | —       |
| `name`        | `FieldPath<T>`     | —       |
| `form`        | `UseFormReturn<T>` | —       |
| `placeholder` | `string`           | —       |
| `required`    | `boolean`          | `false` |
| `rows`        | `number`           | `4`     |
| `action`      | `React.ReactElement`| —      |
| `helperText`  | `string`           | —       |
| `info`        | `string`           | —       |
| `optional`    | `boolean`          | `false` |
| `className`   | `string`           | —       |

```tsx
import { FormTextarea } from "@/components/design-system/patterns/forms/form-textarea";

<FormTextarea label="Notes" name="notes" form={form} placeholder="Add notes..." rows={3} />
```

#### FormErrors

**Import**: `@/components/design-system/patterns/forms/form-errors`
**Replaces**: manual error summary block — collects all RHF schema errors + cross-field errors.

Must be used inside a `<FormProvider>`.

| Prop            | Type                                       | Default |
| --------------- | ------------------------------------------ | ------- |
| `sectionTitles` | `Record<string, string>` (field key -> title) | —    |
| `crossErrors`   | `FormError[]`                              | `[]`    |

`FormError = { key: string; title: string; message: string }`

```tsx
import { FormErrors } from "@/components/design-system/patterns/forms/form-errors";

<FormErrors sectionTitles={{ general: "General", payment: "Payment" }} />
```

#### FormSheet

**Import**: `@/components/design-system/patterns/forms/form-sheet`
**Replaces**: manual `Sheet` + header with icon + separators + footer.

| Prop           | Type                         | Default   |
| -------------- | ---------------------------- | --------- |
| `open`         | `boolean`                    | —         |
| `onOpenChange` | `(open: boolean) => void`    | —         |
| `icon`         | `React.ElementType`          | —         |
| `title`        | `string`                     | —         |
| `description`  | `string`                     | —         |
| `maxWidth`     | `string`                     | `"28rem"` |
| `children`     | `React.ReactNode` (body)     | —         |
| `footer`       | `React.ReactNode` (actions)  | —         |

```tsx
import { FormSheet } from "@/components/design-system/patterns/forms/form-sheet";
import { Plus } from "lucide-react";

<FormSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  icon={Plus}
  title="New Account"
  description="Fill in the details."
  footer={<Button onClick={handleSubmit}>Create</Button>}
>
  <div className="flex flex-col gap-4 p-6">
    <FormField ... />
  </div>
</FormSheet>
```

#### Optional

**Import**: `@/components/design-system/patterns/forms/optional`
**Replaces**: inline "OPCIONAL" label badge.

No props. Used internally by form components when `optional` is true.

```tsx
import { Optional } from "@/components/design-system/patterns/forms/optional";

<Optional />
```

---

### Glass

Components in `src/components/design-system/patterns/glass-card/`.

#### GlassCard

**Import**: `@/components/design-system/patterns/glass-card`
**Replaces**: manual glassmorphism styles (backdrop-blur, semi-transparent bg, ring).

Extends all `Card` props.

| Prop        | Type                   | Default   |
| ----------- | ---------------------- | --------- |
| `variant`   | `"light" \| "dark"`    | `"light"` |
| `className` | `string`               | —         |
| `children`  | `React.ReactNode`      | —         |

```tsx
import { GlassCard } from "@/components/design-system/patterns/glass-card";

<GlassCard variant="light" className="p-6">
  <h2>Dashboard</h2>
</GlassCard>
```

---

### Layouts

Components in `src/components/design-system/patterns/layouts/`.

#### Screen

**Import**: `@/components/design-system/patterns/layouts/screen`
**Replaces**: manual page wrapper with header (breadcrumbs + icon + title + description + actions).

| Prop              | Type                    | Default |
| ----------------- | ----------------------- | ------- |
| `title`           | `string`                | —       |
| `titleElement`    | `React.ReactElement`    | —       |
| `description`     | `string \| ReactElement`| —       |
| `icon`            | `LucideIcon`            | —       |
| `actions`         | `React.ReactElement`    | —       |
| `headerActions`   | `React.ReactElement`    | —       |
| `backRoute`       | `string`                | —       |
| `breadCrumbConfig`| `BreadcrumbItemConfig[]`| —       |
| `children`        | `React.ReactNode`       | —       |

```tsx
import { Screen } from "@/components/design-system/patterns/layouts/screen";
import { Wallet } from "lucide-react";

<Screen
  title="Accounts"
  icon={Wallet}
  backRoute="/app"
  headerActions={<Button>New Account</Button>}
>
  <AccountList />
</Screen>
```

#### SectionTitle

**Import**: `@/components/design-system/patterns/layouts/section-title`
**Replaces**: manual section heading with icon + optional edit button or action slot.

Two rendering modes: with `description` (large variant) or without (compact variant).

| Prop          | Type              | Default    |
| ------------- | ----------------- | ---------- |
| `icon`        | `LucideIcon`      | —          |
| `title`       | `string`          | —          |
| `description` | `string`          | —          |
| `action`      | `React.ReactNode` | —          |
| `onEdit`      | `() => void`      | —          |
| `editLabel`   | `string`          | `"Editar"` |

```tsx
import { SectionTitle } from "@/components/design-system/patterns/layouts/section-title";
import { CreditCard } from "lucide-react";

<SectionTitle icon={CreditCard} title="Credit Details" onEdit={handleEdit} />
```

#### FormScreen

**Import**: `@/components/design-system/patterns/layouts/form-screen`
**Replaces**: two-column layout with form on left + sticky navigator sidebar on right.

| Prop                | Type              | Default |
| ------------------- | ----------------- | ------- |
| `formElement`       | `React.ReactElement`| —     |
| `submitElement`     | `React.ReactElement`| —     |
| `navItems`          | `NavigatorItem[]`  | —      |
| `navigatorTitle`    | `string`           | —      |
| `navigatorSubtitle` | `string`           | —      |
| `navigatorIcon`     | `React.ElementType`| —      |

```tsx
import { FormScreen } from "@/components/design-system/patterns/layouts/form-screen";

<FormScreen
  formElement={<AccountForm />}
  submitElement={<Button type="submit">Save</Button>}
  navItems={[{ id: "general", label: "General" }, { id: "limits", label: "Limits" }]}
  navigatorTitle="New Account"
  navigatorSubtitle="Fill all sections"
  navigatorIcon={Wallet}
/>
```

#### AppLayout

**Import**: `@/components/design-system/patterns/layouts/app-layout`
**Replaces**: app shell with sidebar + header + gradient background. Route layout — renders `<Outlet />`.

No props. Used as a route element.

#### AuthLayout

**Import**: `@/components/design-system/patterns/layouts/auth-layout`
**Replaces**: auth page shell with branding panel + glass card form. Route layout — renders `<Outlet />`.

No props. Includes auth guard redirect.

#### AppGuardLayout

**Import**: `@/components/design-system/patterns/layouts/app-guard-layout`
**Replaces**: profile loading guard + redirect logic. Route layout — renders `<Outlet />`.

No props. Shows skeleton while profile loads, redirects via `profileGuard`.

#### LandingLayout

**Import**: `@/components/design-system/patterns/layouts/landing-layout`
**Replaces**: public landing page shell with header. Route layout — renders `<Outlet />`.

No props.

#### DevTools

**Import**: `@/components/design-system/patterns/layouts/dev-tools`
**Replaces**: draggable floating dev button with React Query devtools + skeleton testing toggle.

No props. Render conditionally: `{!import.meta.env.PROD && <DevTools />}`.

---

### Navigation

Components in `src/components/design-system/patterns/navigation/`.

#### AppBreadcrumbs

**Import**: `@/components/design-system/patterns/navigation/app-breadcrumbs`
**Replaces**: manual back-arrow button + breadcrumb trail.

| Prop        | Type                    | Default |
| ----------- | ----------------------- | ------- |
| `backRoute` | `string`                | —       |
| `config`    | `BreadcrumbItemConfig[]`| —       |

```tsx
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";

<AppBreadcrumbs
  backRoute="/app/accounts"
  config={[{ label: "Accounts", href: "/app/accounts" }, { label: "BBVA" }]}
/>
```

#### AppTabs

**Import**: `@/components/design-system/patterns/navigation/app-tabs`
**Replaces**: manual `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` with config-driven rendering.

Generic: `AppTabs<TData>` — the `data` prop is passed to each tab's `content(data)` render function.

| Prop               | Type                     | Default     |
| ------------------ | ------------------------ | ----------- |
| `config`           | `AppTabsConfig<TData>`   | —           |
| `data`             | `TData`                  | —           |
| `defaultValue`     | `string`                 | first tab   |
| `variant`          | `"default" \| "line"`    | `"default"` |
| `className`        | `string`                 | —           |
| `tabListClassname` | `string`                 | —           |

`AppTabsConfig<T> = Array<{ value: string; label: string; icon?: LucideIcon; content: (data: T) => ReactElement }>`

```tsx
import { AppTabs } from "@/components/design-system/patterns/navigation/app-tabs";

<AppTabs
  data={account}
  config={[
    { value: "overview", label: "Overview", content: (acc) => <Overview account={acc} /> },
    { value: "transactions", label: "Transactions", content: (acc) => <TxList accountId={acc.id} /> },
  ]}
  variant="line"
/>
```

#### TablePagination

**Import**: `@/components/design-system/patterns/navigation/table-pagination`
**Replaces**: manual prev/next buttons + page counter + page-size selector.

Usually consumed via `AppTable`'s `pagination` prop. Use standalone only for non-table lists.

| Prop               | Type                        | Default |
| ------------------ | --------------------------- | ------- |
| `page`             | `number`                    | —       |
| `totalPages`       | `number`                    | —       |
| `onPageChange`     | `(page: number) => void`    | —       |
| `pageSize`         | `number`                    | —       |
| `onPageSizeChange` | `(size: number) => void`    | —       |

```tsx
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";

{totalPages >= 1 && (
  <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
)}
```

---

## UI Primitives (shadcn)

Standard shadcn/ui components in `src/components/ui/`. Use as-is — refer to [shadcn/ui docs](https://ui.shadcn.com) for full API.

| Component          | Import path                             |
| ------------------ | --------------------------------------- |
| `Accordion`        | `@/components/ui/accordion`             |
| `AlertDialog`      | `@/components/ui/alert-dialog`          |
| `Alert`            | `@/components/ui/alert`                 |
| `Avatar`           | `@/components/ui/avatar`                |
| `Badge`            | `@/components/ui/badge`                 |
| `Breadcrumb`       | `@/components/ui/breadcrumb`            |
| `Button`           | `@/components/ui/button`                |
| `Calendar`         | `@/components/ui/calendar`              |
| `Card`             | `@/components/ui/card`                  |
| `Chart`            | `@/components/ui/chart`                 |
| `Checkbox`         | `@/components/ui/checkbox`              |
| `Command`          | `@/components/ui/command`               |
| `ContextMenu`      | `@/components/ui/context-menu`          |
| `Dialog`           | `@/components/ui/dialog`                |
| `DropdownMenu`     | `@/components/ui/dropdown-menu`         |
| `Field`            | `@/components/ui/field`                 |
| `InputGroup`       | `@/components/ui/input-group`           |
| `Input`            | `@/components/ui/input`                 |
| `Label`            | `@/components/ui/label`                 |
| `NavigationMenu`   | `@/components/ui/navigation-menu`       |
| `Pagination`       | `@/components/ui/pagination`            |
| `Popover`          | `@/components/ui/popover`               |
| `Progress`         | `@/components/ui/progress`              |
| `RadioGroup`       | `@/components/ui/radio-group`           |
| `Select`           | `@/components/ui/select`                |
| `Separator`        | `@/components/ui/separator`             |
| `Sheet`            | `@/components/ui/sheet`                 |
| `Sidebar`          | `@/components/ui/sidebar`               |
| `Skeleton`         | `@/components/ui/skeleton`              |
| `Slider`           | `@/components/ui/slider`                |
| `Sonner` (Toaster) | `@/components/ui/sonner`                |
| `Switch`           | `@/components/ui/switch`                |
| `Table`            | `@/components/ui/table`                 |
| `Tabs`             | `@/components/ui/tabs`                  |
| `Textarea`         | `@/components/ui/textarea`              |
| `Tooltip`          | `@/components/ui/tooltip`               |
