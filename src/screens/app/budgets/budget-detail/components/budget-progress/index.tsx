import { ChartNoAxesColumn, ListChecks, RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useQueryBudgetProgress } from "@/hooks/budgets/useQueryBudgetProgress";
import { BudgetProgressGroup } from "./components/budget-progress-group";
import { BudgetProgressSkeleton } from "./components/budget-progress-skeleton";

type BudgetProgressProps = {
	budget: Budget;
};

export const BudgetProgress = ({ budget }: BudgetProgressProps): React.ReactElement => {
	const { budgetProgress, isLoading } = useQueryBudgetProgress(budget.id);

	if (isLoading) {
		return <BudgetProgressSkeleton />;
	}

	if (!budgetProgress) {
		return (
			<ScaleFadeIn className="flex-1">
				<GlassCard className="h-full">
					<Empty
						icon={RefreshCw}
						title="No pudimos cargar el avance"
						description="Revisa tu conexión e inténtalo de nuevo."
						className="py-8"
					/>
				</GlassCard>
			</ScaleFadeIn>
		);
	}

	const expenseItems = budgetProgress.items
		.filter((item) => item.categoryType === "EXPENSE")
		.sort((prev, next) => next.percentage - prev.percentage);
	const incomeItems = budgetProgress.items.filter((item) => item.categoryType === "INCOME");

	if (expenseItems.length === 0 && incomeItems.length === 0) {
		return (
			<ScaleFadeIn className="flex-1">
				<GlassCard className="h-full">
					<Empty
						icon={ListChecks}
						title="Sin categorías"
						description="Agrega categorías al presupuesto para seguir su avance."
						className="py-8"
					/>
				</GlassCard>
			</ScaleFadeIn>
		);
	}

	return (
		<ScaleFadeIn className="flex-1 min-w-0">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<ChartNoAxesColumn className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Avance por categoría</h3>
				</div>

				{expenseItems.length > 0 && (
					<BudgetProgressGroup
						title="Gastos"
						items={expenseItems}
					/>
				)}
				{incomeItems.length > 0 && (
					<BudgetProgressGroup
						title="Ingresos"
						items={incomeItems}
					/>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
