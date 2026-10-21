import type React from "react";
import { useEffect } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { useBudgetTransactionsController } from "@/storage/budgets/budgetTransactionsController";
import { BudgetTransactionsActions } from "./components/budget-transactions-actions";
import { BudgetTransactionsList } from "./components/budget-transactions-list";

type BudgetTransactionsProps = {
	budget: Budget;
};

export const BudgetTransactions = ({ budget }: BudgetTransactionsProps): React.ReactElement => {
	const resetFilters = useBudgetTransactionsController((state) => state.resetFilters);

	// Filters are scoped to a single budget: clear them when leaving or switching budgets.
	useEffect(() => {
		if (!budget.id) return;
		return () => resetFilters();
	}, [budget.id, resetFilters]);

	return (
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<BudgetTransactionsActions budget={budget} />
			<BudgetTransactionsList budget={budget} />
		</ScaleFadeIn>
	);
};
