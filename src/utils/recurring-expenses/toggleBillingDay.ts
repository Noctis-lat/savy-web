import { BILLING_DAY_RULES } from "@/content/recurring-expenses/recurringExpenseContent";

/**
 * Toggles a billing day respecting the frequency's billing day count.
 * Selecting a new day when the limit is reached drops the oldest selection.
 * The result is always sorted ascending.
 */
export const toggleBillingDay = (
	billingDays: number[],
	day: number,
	frequency: RecurringExpenseFrequency,
): number[] => {
	const { count } = BILLING_DAY_RULES[frequency];

	if (billingDays.includes(day)) {
		return billingDays.filter((billingDay) => billingDay !== day);
	}

	const kept =
		billingDays.length >= count ? billingDays.slice(billingDays.length - count + 1) : billingDays;

	return [...kept, day].sort((prev, next) => prev - next);
};
