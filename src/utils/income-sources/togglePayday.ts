import { PAYDAY_RULES } from "@/content/income-sources/incomeSourceContent";

/**
 * Toggles a payday respecting the frequency's payday count.
 * Selecting a new day when the limit is reached drops the oldest selection.
 * The result is always sorted ascending.
 */
export const togglePayday = (
	paydays: number[],
	day: number,
	frequency: IncomeSourceFrequency,
): number[] => {
	const { count } = PAYDAY_RULES[frequency];

	if (paydays.includes(day)) {
		return paydays.filter((payday) => payday !== day);
	}

	const kept = paydays.length >= count ? paydays.slice(paydays.length - count + 1) : paydays;

	return [...kept, day].sort((prev, next) => prev - next);
};
