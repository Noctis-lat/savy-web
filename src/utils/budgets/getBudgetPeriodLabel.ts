import { BUDGET_PERIOD_LABELS } from "@/content/budgets/budgetsOptions";

export const getBudgetPeriodLabel = (period: BudgetPeriod | null): string | undefined => {
	if (!period) return undefined;
	return BUDGET_PERIOD_LABELS[period] ?? period;
};
