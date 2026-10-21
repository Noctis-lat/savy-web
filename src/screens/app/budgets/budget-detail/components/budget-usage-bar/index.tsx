import type React from "react";
import { Progress } from "@/components/ui/progress";
import { getBudgetUsageBarClass } from "@/utils/budgets/getBudgetUsageBarClass";
import { merge } from "@/utils/ui/mergeStyles";

type BudgetUsageBarProps = {
	/** Unclamped percentage. The bar is clamped to 0-100, the color reflects the real value. */
	percentage: number;
	ariaLabel: string;
	isIncome?: boolean;
	className?: string;
};

export const BudgetUsageBar = ({
	percentage,
	ariaLabel,
	isIncome = false,
	className,
}: BudgetUsageBarProps): React.ReactElement => {
	return (
		<Progress
			value={Math.min(Math.max(percentage, 0), 100)}
			aria-label={ariaLabel}
			className={merge("h-2", getBudgetUsageBarClass(percentage, isIncome), className)}
		/>
	);
};
