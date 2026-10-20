import { Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { Button } from "@/components/ui/button";
import { useQueryBudgets } from "@/hooks/budgets/useQueryBudgets";
import { BudgetsFilters } from "./components/budgets-filters";
import { BudgetsKpis } from "./components/budgets-kpis";
import { BudgetsList } from "./components/budgets-list";
import { BudgetsSkeleton } from "./components/budgets-skeleton";

export const Budgets = (): React.ReactElement => {
	const { budgetsInfo, total, isLoading } = useQueryBudgets();

	if (isLoading) {
		return <BudgetsSkeleton />;
	}

	if (!budgetsInfo) {
		return (
			<Empty
				title="Sin presupuestos para mostrar"
				description="No hay presupuestos para mostrar"
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Presupuestos" }]}
			action={
				<Button asChild>
					<Link to={ROUTES.APP.BUDGETS.NEW}>
						<Plus />
						Nuevo presupuesto
					</Link>
				</Button>
			}
		>
			<BudgetsKpis
				info={budgetsInfo}
				total={total}
			/>
			<BudgetsFilters />
			<BudgetsList />
		</Screen>
	);
};
