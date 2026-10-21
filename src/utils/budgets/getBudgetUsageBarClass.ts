import { getBudgetUsageVariant } from "./getBudgetUsageVariant";

/** Progress indicator color for a usage percentage. Income bars always use the primary color. */
export const getBudgetUsageBarClass = (percentage: number, isIncome = false): string => {
	if (isIncome) return "";

	const usageVariant = getBudgetUsageVariant(percentage);
	if (usageVariant === "danger") return "[&_[data-slot=progress-indicator]]:bg-destructive";
	if (usageVariant === "warning") return "[&_[data-slot=progress-indicator]]:bg-amber-500";
	return "";
};
