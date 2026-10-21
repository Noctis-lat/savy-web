import { ChevronDown } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
import { getBudgetPercentage } from "@/utils/budgets/getBudgetPercentage";
import { getBudgetUsageTextClass } from "@/utils/budgets/getBudgetUsageTextClass";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDateRange } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";
import { BudgetUsageBar } from "../../../budget-usage-bar";

type BudgetHistoryItemProps = {
	historyPeriod: BudgetHistory;
	categoryNames: Map<string, string>;
};

export const BudgetHistoryItem = ({
	historyPeriod,
	categoryNames,
}: BudgetHistoryItemProps): React.ReactElement => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const detailId = useId();

	const periodRange = formatDateRange(historyPeriod.periodStart, historyPeriod.periodEnd);
	const percentage = Math.round(
		getBudgetPercentage(historyPeriod.totalSpent, historyPeriod.totalPlanned),
	);
	const isExceeded = historyPeriod.totalSpent > historyPeriod.totalPlanned;

	return (
		<div className="flex flex-col">
			<button
				type="button"
				aria-expanded={isExpanded}
				aria-controls={detailId}
				onClick={() => setIsExpanded((previous) => !previous)}
				className="flex w-full cursor-pointer flex-col gap-1.5 rounded-md px-2 py-3 text-left transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<div className="flex w-full items-center justify-between gap-2">
					<span className="truncate text-sm font-medium text-foreground tabular-nums">
						{periodRange}
					</span>
					<div className="flex shrink-0 items-center gap-2">
						<span
							className={merge(
								"text-xs font-medium tabular-nums",
								getBudgetUsageTextClass(percentage),
							)}
						>
							{percentage}%
						</span>
						<ChevronDown
							aria-hidden="true"
							className={merge(
								"size-4 text-muted-foreground transition-transform duration-200",
								isExpanded && "rotate-180",
							)}
						/>
					</div>
				</div>

				<BudgetUsageBar
					percentage={percentage}
					ariaLabel={`${percentage}% del presupuesto usado en ${periodRange}`}
					className="h-1.5"
				/>

				<div className="flex w-full flex-wrap items-baseline justify-between gap-x-2 text-xs tabular-nums">
					<span className="text-muted-foreground">
						{formatCurrency(historyPeriod.totalSpent)} de{" "}
						{formatCurrency(historyPeriod.totalPlanned)}
					</span>
					<span className={isExceeded ? "font-medium text-destructive" : "text-muted-foreground"}>
						{isExceeded ? "Excedido" : "Dentro del presupuesto"}
					</span>
				</div>
			</button>

			{isExpanded && (
				<ul
					id={detailId}
					className="flex flex-col gap-2 px-2 pb-3"
				>
					{historyPeriod.items.map((historyItem) => {
						const categoryName = categoryNames.get(historyItem.categoryId) ?? "Categoría eliminada";
						const itemPercentage = Math.round(
							getBudgetPercentage(historyItem.spentAmount, historyItem.plannedAmount),
						);

						return (
							<li
								key={historyItem.budgetItemId}
								className="flex items-baseline justify-between gap-2 text-xs"
							>
								<span className="truncate text-foreground">{categoryName}</span>
								<span className="shrink-0 tabular-nums text-muted-foreground">
									{formatCurrency(historyItem.spentAmount)} de{" "}
									{formatCurrency(historyItem.plannedAmount)}
									<span
										className={merge("ml-2 font-medium", getBudgetUsageTextClass(itemPercentage))}
									>
										{itemPercentage}%
									</span>
								</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
