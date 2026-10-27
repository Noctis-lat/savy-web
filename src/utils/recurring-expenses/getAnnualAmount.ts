import { ANNUAL_MULTIPLIER } from "@/content/recurring-expenses/recurringExpenseContent";

/**
 * Projects a recurring amount (in cents) to a full year.
 * @example getAnnualAmount(22200, "MONTHLY") // 266400
 */
export const getAnnualAmount = (amount: number, frequency: RecurringExpenseFrequency): number => {
	return amount * ANNUAL_MULTIPLIER[frequency];
};
