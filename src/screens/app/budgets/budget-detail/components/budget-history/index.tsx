import { History, RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useQueryBudgetHistory } from "@/hooks/budgets/useQueryBudgetHistory";
import { BudgetHistoryItem } from "./components/budget-history-item";
import { BudgetHistorySkeleton } from "./components/budget-history-skeleton";

type BudgetHistoryProps = {
	budget: Budget;
};

export const BudgetHistory = ({ budget }: BudgetHistoryProps): React.ReactElement => {
	const { budgetHistory, isLoading } = useQueryBudgetHistory(budget.id);

	if (isLoading) {
		return <BudgetHistorySkeleton />;
	}

	if (!budgetHistory) {
		return (
			<ScaleFadeIn className="flex-1">
				<GlassCard className="h-full">
					<Empty
						icon={RefreshCw}
						title="No pudimos cargar el historial"
						description="Revisa tu conexión e inténtalo de nuevo."
						className="py-8"
					/>
				</GlassCard>
			</ScaleFadeIn>
		);
	}

	if (budgetHistory.length === 0) {
		return (
			<ScaleFadeIn className="flex-1">
				<GlassCard className="h-full">
					<Empty
						icon={History}
						title="Aún no hay periodos cerrados"
						description={
							budget.kind === "ONE_TIME"
								? "Este presupuesto es único: su avance se sigue en el periodo actual y puede no generar historial."
								: "Cuando termine el periodo actual, aquí verás cómo te fue comparado con lo planeado."
						}
						className="py-8"
					/>
				</GlassCard>
			</ScaleFadeIn>
		);
	}

	const categoryNames = new Map<string, string>(
		budget.items.map((item) => [item.categoryId, item.category.name]),
	);

	return (
		<ScaleFadeIn className="flex-1 min-w-0">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<History className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Periodos anteriores</h3>
					</div>
					<span className="text-xs text-muted-foreground tabular-nums">
						{budgetHistory.length} {budgetHistory.length === 1 ? "periodo" : "periodos"}
					</span>
				</div>

				<ul className="flex flex-col divide-y divide-border/30">
					{budgetHistory.map((historyPeriod) => (
						<li key={historyPeriod.id}>
							<BudgetHistoryItem
								historyPeriod={historyPeriod}
								categoryNames={categoryNames}
							/>
						</li>
					))}
				</ul>
			</GlassCard>
		</ScaleFadeIn>
	);
};
