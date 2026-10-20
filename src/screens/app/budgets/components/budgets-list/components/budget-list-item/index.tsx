import { Dot, PiggyBank } from "lucide-react";
import type React from "react";
import { getBudgetKindLabel } from "@/utils/budgets/getBudgetKindLabel";
import { getBudgetPeriodLabel } from "@/utils/budgets/getBudgetPeriodLabel";
import { getBudgetPlannedTotal } from "@/utils/budgets/getBudgetPlannedTotal";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDateRange } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";

type BudgetListItemProps = {
	budget: Budget;
};

const PRIMARY_COLOR = "oklch(0.511 0.096 186.391)";

const GRADIENT_STYLE = {
	background: `linear-gradient(135deg, color-mix(in oklch, ${PRIMARY_COLOR} 12%, transparent) 0%, color-mix(in oklch, ${PRIMARY_COLOR} 5%, transparent) 60%, transparent 100%)`,
};

export const BudgetListItem = ({ budget }: BudgetListItemProps): React.ReactElement => {
	const periodLabel = getBudgetPeriodLabel(budget.period);
	const plannedTotal = getBudgetPlannedTotal(budget);
	const itemsCount = budget.items.length;

	return (
		<div
			className={merge(
				"relative flex w-full items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0",
				!budget.isActive && "opacity-60",
			)}
			style={GRADIENT_STYLE}
		>
			<div
				className="flex size-10 items-center justify-center shrink-0 rounded-full shadow-sm"
				style={{ backgroundColor: PRIMARY_COLOR }}
			>
				<PiggyBank
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

			<span className="text-sm font-medium tabular-nums text-primary">
				{formatCurrency(plannedTotal)}
			</span>
		</div>
	);
};
