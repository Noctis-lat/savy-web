import type React from "react";
import { getBudgetPercentage } from "@/utils/budgets/getBudgetPercentage";
import { getBudgetUsageTextClass } from "@/utils/budgets/getBudgetUsageTextClass";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";
import { BudgetUsageBar } from "../../../../../budget-usage-bar";

type BudgetHeaderUsageBlockProps = {
	title: string;
	planned: number;
	/** Spent amount for expenses, received amount for incomes. */
	used: number;
	hasItems: boolean;
	emptyLabel: string;
	isIncome?: boolean;
};

export const BudgetHeaderUsageBlock = ({
	title,
	planned,
	used,
	hasItems,
	emptyLabel,
	isIncome = false,
}: BudgetHeaderUsageBlockProps): React.ReactElement => {
	const percentage = Math.round(getBudgetPercentage(used, planned));
	const usedVerb = isIncome ? "recibido" : "usado";

	return (
		<div className="flex min-w-0 flex-col gap-2">
			<div className="flex items-baseline justify-between gap-2">
				<span className="text-sm font-medium text-foreground">{title}</span>
				{hasItems && (
					<span className="truncate text-xs text-muted-foreground tabular-nums">
						Planeado {formatCurrency(planned)}
					</span>
				)}
			</div>

			{hasItems ? (
				<div className="flex flex-col gap-1.5">
					<div className="flex items-baseline justify-between gap-2">
						<span className="truncate text-xs text-muted-foreground tabular-nums">
							{isIncome ? "Recibido" : "Gastado"} {formatCurrency(used)} de{" "}
							{formatCurrency(planned)}
						</span>
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
						ariaLabel={`${title}: ${percentage}% ${usedVerb} en el periodo actual`}
					/>
				</div>
			) : (
				<span className="text-xs text-muted-foreground">{emptyLabel}</span>
			)}
		</div>
	);
};
