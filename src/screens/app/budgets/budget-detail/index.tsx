import { Edit3 } from "lucide-react";
import type React from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { Button } from "@/components/ui/button";
import { useActivateBudget } from "@/hooks/budgets/useActivateBudget";
import { useDeleteBudget } from "@/hooks/budgets/useDeleteBudget";
import { useDeleteBudgetPermanent } from "@/hooks/budgets/useDeleteBudgetPermanent";
import { useQueryBudget } from "@/hooks/budgets/useQueryBudget";
import { buildRoute } from "@/utils/routing/buildRoute";
import { BudgetHeader } from "./components/budget-header";
import { BudgetHistory } from "./components/budget-history";
import { BudgetProgress } from "./components/budget-progress";
import { BudgetSkeleton } from "./components/budget-skeleton";
import { BudgetTransactions } from "./components/budget-transactions";

export const BudgetDetail = (): React.ReactElement => {
	const { budget_id } = useParams<{ budget_id: string }>();
	const navigate = useNavigate();
	const { budget, isLoading } = useQueryBudget(budget_id);
	const { mutate: deleteBudget, isPending: isDeactivating } = useDeleteBudget();
	const { mutate: deleteBudgetPermanent, isPending: isDeleting } = useDeleteBudgetPermanent();
	const { mutate: activateBudget, isPending: isReactivating } = useActivateBudget();

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
			action={
				<Button
					onClick={() => navigate(buildRoute(ROUTES.APP.BUDGETS.EDIT, { budget_id: budget.id }))}
					size="sm"
				>
					<Edit3 className="size-4" />
					Editar
				</Button>
			}
		>
			<BudgetHeader budget={budget} />
			<div className="flex flex-col sm:flex-row gap-4">
				<BudgetProgress budget={budget} />
				<BudgetHistory budget={budget} />
			</div>
			<BudgetTransactions budget={budget} />
			<DangerZone
				entityName={budget.name}
				entityLabel="el presupuesto"
				isActive={budget.isActive}
				onDeactivate={() => deleteBudget(budget.id)}
				onReactivate={() => activateBudget(budget.id)}
				onPermanentDelete={() =>
					deleteBudgetPermanent(budget.id, { onSuccess: () => navigate(ROUTES.APP.BUDGETS.ROOT) })
				}
				isDeactivating={isDeactivating}
				isReactivating={isReactivating}
				isDeleting={isDeleting}
			/>
		</Screen>
	);
};
