import { BUDGET_KIND_LABELS } from "@/content/budgets/budgetsOptions";

export const getBudgetKindLabel = (kind: BudgetKind): string => BUDGET_KIND_LABELS[kind] ?? kind;
