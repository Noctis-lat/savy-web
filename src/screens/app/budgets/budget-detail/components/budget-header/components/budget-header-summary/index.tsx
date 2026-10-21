import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBudgetProgress } from "@/hooks/budgets/useQueryBudgetProgress";
import { getBudgetProgressTotals } from "@/utils/budgets/getBudgetProgressTotals";
import { BudgetHeaderUsageBlock } from "./components/budget-header-usage-block";

type BudgetHeaderSummaryProps = {
	budget: Budget;
};

export const BudgetHeaderSummary = ({ budget }: BudgetHeaderSummaryProps): React.ReactElement => {
	const { budgetProgress, isLoading } = useQueryBudgetProgress(budget.id);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-4 border-t border-border/30 pt-4 sm:grid-cols-2 sm:gap-6">
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-40" />
					<Skeleton className="h-3.5 w-full" />
					<Skeleton className="h-2 w-full rounded-full" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-40" />
					<Skeleton className="h-3.5 w-full" />
					<Skeleton className="h-2 w-full rounded-full" />
				</div>
			</div>
		);
	}

	if (!budgetProgress) {
		return (
			<p className="border-t border-border/30 pt-4 text-xs text-muted-foreground">
				No pudimos cargar el avance del periodo actual.
			</p>
		);
	}

	const totals = getBudgetProgressTotals(budgetProgress.items);

	return (
		<div className="grid grid-cols-1 gap-4 border-t border-border/30 pt-4 sm:grid-cols-2 sm:gap-6">
			<BudgetHeaderUsageBlock
				title="Gastos"
				planned={totals.expensesPlanned}
				used={totals.expensesSpent}
				hasItems={totals.hasExpenses}
				emptyLabel="Sin gastos presupuestados"
			/>
			<BudgetHeaderUsageBlock
				title="Ingresos"
				planned={totals.incomesPlanned}
				used={totals.incomesReceived}
				hasItems={totals.hasIncomes}
				emptyLabel="Sin ingresos presupuestados"
				isIncome
			/>
		</div>
	);
};
