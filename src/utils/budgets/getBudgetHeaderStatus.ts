import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BudgetHeaderStatus = {
	variant: "destructive" | "success";
	title: string;
	description: string;
};

/**
 * Current-period status of the budget, based on real spending:
 * remaining = planned expenses - actual expenses.
 * Positive → surplus, negative → exceeded, zero or no expense items → no status.
 */
export const getBudgetHeaderStatus = (
	totals: BudgetProgressTotals,
): BudgetHeaderStatus | undefined => {
	const { expensesPlanned, expensesSpent } = totals;

	if (expensesPlanned <= 0) return undefined;

	const remaining = expensesPlanned - expensesSpent;

	if (remaining < 0) {
		return {
			variant: "destructive",
			title: "Presupuesto excedido",
			description: `Te pasaste por ${formatCurrency(Math.abs(remaining))} en este periodo`,
		};
	}

	if (remaining > 0) {
		return {
			variant: "success",
			title: "Sobrante",
			description: `Te quedan ${formatCurrency(remaining)} por gastar en este periodo`,
		};
	}

	return undefined;
};
