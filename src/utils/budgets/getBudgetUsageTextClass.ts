import { getBudgetUsageVariant } from "./getBudgetUsageVariant";

/** Text color for a usage percentage. Income targets are positive when reached, never danger. */
export const getBudgetUsageTextClass = (percentage: number, isIncome = false): string => {
	if (isIncome) return percentage >= 100 ? "text-primary" : "text-muted-foreground";

	const usageVariant = getBudgetUsageVariant(percentage);
	if (usageVariant === "danger") return "text-destructive";
	if (usageVariant === "warning") return "text-amber-600";
	return "text-primary";
};
