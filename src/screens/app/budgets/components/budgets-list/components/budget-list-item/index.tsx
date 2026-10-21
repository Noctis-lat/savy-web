import { Dot } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { Progress } from "@/components/ui/progress";
import { getBudgetKindLabel } from "@/utils/budgets/getBudgetKindLabel";
import { getBudgetPeriodLabel } from "@/utils/budgets/getBudgetPeriodLabel";
import { getBudgetUsageVariant } from "@/utils/budgets/getBudgetUsageVariant";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDateRange } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";

type BudgetListItemProps = {
	budget: Budget;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const BudgetListItem = ({ budget }: BudgetListItemProps): React.ReactElement => {
	const budgetColor = budget.color || PRIMARY_FALLBACK;
	const periodLabel = getBudgetPeriodLabel(budget.period);
	const itemsCount = budget.items.length;

	const hasExpenses = budget.totalExpenses > 0;
	const percentage = Math.round(budget.percentage);
	const usageVariant = getBudgetUsageVariant(percentage);

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${budgetColor} 12%, transparent) 0%, color-mix(in oklch, ${budgetColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<div
			className={merge(
				"relative flex w-full items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0",
				!budget.isActive && "opacity-60",
			)}
			style={gradientStyle}
		>
			<div
				className="flex size-10 items-center justify-center shrink-0 rounded-full shadow-sm"
				style={{ backgroundColor: budgetColor }}
			>
				<DynamicIcon
					name={(budget.icon || "piggy-bank") as IconName}
					className="text-white"
					size={20}
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<div className="flex flex-row items-center gap-2">
					<span className="text-sm font-semibold text-foreground">{budget.name}</span>
					{!budget.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactivo
						</span>
					)}
				</div>
				<div className="flex flex-row flex-wrap items-center gap-y-0.5 text-muted-foreground">
					<span className="text-xs text-muted-foreground">{getBudgetKindLabel(budget.kind)}</span>
					{periodLabel && (
						<>
							<Dot />
							<span className="text-xs text-muted-foreground">{periodLabel}</span>
						</>
					)}
					<Dot />
					<span className="text-xs tabular-nums text-muted-foreground">
						{formatDateRange(budget.startDate, budget.endDate)}
					</span>
					<Dot />
					<span className="text-xs tabular-nums text-muted-foreground">
						{itemsCount} {itemsCount === 1 ? "categoría" : "categorías"}
					</span>
				</div>
			</div>

			<div className="flex w-40 shrink-0 flex-col gap-1.5 sm:w-150">
				{hasExpenses ? (
					<div className="flex flex-col gap-2">
						<div className="flex items-baseline justify-between gap-2">
							<span className="truncate text-xs tabular-nums text-muted-foreground">
								{formatCurrency(budget.periodExpenses)} de {formatCurrency(budget.totalExpenses)}
							</span>
							<span
								className={merge(
									"shrink-0 text-xs font-medium tabular-nums text-primary",
									usageVariant === "warning" && "text-amber-600",
									usageVariant === "danger" && "text-destructive",
								)}
							>
								{percentage}%
							</span>
						</div>
						<Progress
							value={Math.min(Math.max(percentage, 0), 100)}
							aria-label={`${percentage}% del presupuesto de gastos usado`}
							className={merge(
								"h-2",
								usageVariant === "warning" && "[&_[data-slot=progress-indicator]]:bg-amber-500",
								usageVariant === "danger" && "[&_[data-slot=progress-indicator]]:bg-destructive",
							)}
						/>
					</div>
				) : (
					<span className="text-right text-xs text-muted-foreground">
						Sin gastos presupuestados
					</span>
				)}
			</div>
		</div>
	);
};
