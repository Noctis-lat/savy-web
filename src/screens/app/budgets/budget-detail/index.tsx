import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryBudget } from "@/hooks/budgets/useQueryBudget";

export const BudgetDetail = (): React.ReactElement => {
	const { budget_id } = useParams<{ budget_id: string }>();
	const { budget, isLoading } = useQueryBudget(budget_id);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Screen
			backRoute={ROUTES.APP.BUDGETS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT },
				{ label: budget?.name || "Detalle del presupuesto" },
			]}
		>
			<div>a</div>
		</Screen>
	);
};
