type CreditUsageVariant = "default" | "warning" | "danger";

type CreditUtilization = {
	/** Unclamped used percentage of the credit limit (can exceed 100 when over the limit). */
	percentage: number;
	variant: CreditUsageVariant;
	isOverLimit: boolean;
};
