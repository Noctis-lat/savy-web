import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryBudget } from "@/hooks/budgets/useQueryBudget";
import { BudgetHeader } from "./components/budget-header";
import { BudgetHistory } from "./components/budget-history";
import { BudgetProgress } from "./components/budget-progress";
import { BudgetSkeleton } from "./components/budget-skeleton";
import { BudgetTransactions } from "./components/budget-transactions";

export const BudgetDetail = (): React.ReactElement => {
	const { budget_id } = useParams<{ budget_id: string }>();
	const { budget, isLoading } = useQueryBudget(budget_id);

	if (isLoading) {
		return <BudgetSkeleton />;
	}

	if (!budget) {
		return <Empty />;
	}

	return (
		<Screen
			backRoute={ROUTES.APP.BUDGETS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT },
				{ label: budget.name },
			]}
		>
			<BudgetHeader budget={budget} />
			<div className="flex flex-col sm:flex-row gap-4">
				<BudgetProgress budget={budget} />
				<BudgetHistory budget={budget} />
			</div>
			<BudgetTransactions budget={budget} />
		</Screen>
	);
};
