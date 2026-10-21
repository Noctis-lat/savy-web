type BudgetUsageVariant = "default" | "warning" | "danger";

// Same thresholds as the design-system ProgressBar, but without clamping so overspending stays visible.
export const getBudgetUsageVariant = (percentage: number): BudgetUsageVariant => {
	if (percentage > 90) return "danger";
	if (percentage > 75) return "warning";
	return "default";
};
