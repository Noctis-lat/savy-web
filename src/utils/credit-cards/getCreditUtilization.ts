import { getBudgetUsageVariant } from "@/utils/budgets/getBudgetUsageVariant";

/** Credit usage reading shared by the credits list and the credit detail header. */
export const getCreditUtilization = (
	creditCard: Pick<CreditCard, "creditLimit" | "currentBalance" | "availableCredit">,
): CreditUtilization => {
	const isOverLimit = creditCard.availableCredit < 0;

	if (creditCard.creditLimit <= 0) {
		return {
			percentage: isOverLimit ? 100 : 0,
			variant: isOverLimit ? "danger" : "default",
			isOverLimit,
		};
	}

	const percentage = Math.round((creditCard.currentBalance / creditCard.creditLimit) * 100);

	return {
		percentage,
		variant: isOverLimit ? "danger" : getBudgetUsageVariant(percentage),
		isOverLimit,
	};
};
