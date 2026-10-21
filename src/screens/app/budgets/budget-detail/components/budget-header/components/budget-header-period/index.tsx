import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBudgetProgress } from "@/hooks/budgets/useQueryBudgetProgress";
import { formatDateRange } from "@/utils/formatters/formatDate";

type BudgetHeaderPeriodProps = {
	budget: Budget;
};

export const BudgetHeaderPeriod = ({
	budget,
}: BudgetHeaderPeriodProps): React.ReactElement | null => {
	const { budgetProgress, isLoading } = useQueryBudgetProgress(budget.id);

	if (isLoading) {
		return <Skeleton className="h-3.5 w-48" />;
	}

	if (!budgetProgress) {
		return null;
	}

	return (
		<span className="text-xs text-muted-foreground tabular-nums">
			Periodo actual: {formatDateRange(budgetProgress.periodStart, budgetProgress.periodEnd)}
		</span>
	);
};
