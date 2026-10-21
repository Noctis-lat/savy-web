import type React from "react";
import { getBudgetRemainingLabel } from "@/utils/budgets/getBudgetRemainingLabel";
import { getBudgetUsageTextClass } from "@/utils/budgets/getBudgetUsageTextClass";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";
import { BudgetUsageBar } from "../../../budget-usage-bar";

type BudgetProgressRowProps = {
	item: BudgetItemProgress;
};

export const BudgetProgressRow = ({ item }: BudgetProgressRowProps): React.ReactElement => {
	const isIncome = item.categoryType === "INCOME";
	const percentage = Math.round(item.percentage);
	const isExceeded = !isIncome && item.remaining < 0;
	const amountVerb = isIncome ? "Recibido" : "Gastado";

	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-baseline justify-between gap-2">
				<span className="truncate text-sm font-medium text-foreground">{item.categoryName}</span>
				<span
					className={merge(
						"shrink-0 text-xs font-medium tabular-nums",
						getBudgetUsageTextClass(percentage, isIncome),
					)}
				>
					{percentage}%
				</span>
			</div>

			<BudgetUsageBar
				percentage={percentage}
				isIncome={isIncome}
				ariaLabel={`${item.categoryName}: ${percentage}% ${isIncome ? "recibido" : "usado"}`}
			/>

			<div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs tabular-nums">
				<span className="text-muted-foreground">
					{amountVerb} {formatCurrency(item.spentAmount)} de {formatCurrency(item.plannedAmount)}
				</span>
				<span className={isExceeded ? "font-medium text-destructive" : "text-muted-foreground"}>
					{getBudgetRemainingLabel(item.remaining, isIncome)}
				</span>
			</div>
		</div>
	);
};
