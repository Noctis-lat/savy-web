import { CircleAlert, CircleCheck } from "lucide-react";
import type React from "react";
import { Alert } from "@/components/design-system/primitives/alert";
import { useQueryBudgetProgress } from "@/hooks/budgets/useQueryBudgetProgress";
import { getBudgetHeaderStatus } from "@/utils/budgets/getBudgetHeaderStatus";
import { getBudgetProgressTotals } from "@/utils/budgets/getBudgetProgressTotals";

type BudgetHeaderStatusProps = {
	budget: Budget;
};

export const BudgetHeaderStatus = ({
	budget,
}: BudgetHeaderStatusProps): React.ReactElement | null => {
	const { budgetProgress } = useQueryBudgetProgress(budget.id);

	if (!budgetProgress) {
		return null;
	}

	const headerStatus = getBudgetHeaderStatus(getBudgetProgressTotals(budgetProgress.items));

	if (!headerStatus) {
		return null;
	}

	return (
		<Alert
			variant={headerStatus.variant}
			title={headerStatus.title}
			icon={headerStatus.variant === "destructive" ? CircleAlert : CircleCheck}
			className="w-full sm:w-auto sm:max-w-xs"
		>
			<span className="tabular-nums">{headerStatus.description}</span>
		</Alert>
	);
};
