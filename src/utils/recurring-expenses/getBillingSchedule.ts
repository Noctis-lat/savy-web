import { addDays, getDaysInMonth, startOfDay } from "date-fns";

type BillingSchedule = {
	previous: Date | undefined;
	upcoming: Date[];
};

const SCAN_WINDOW_DAYS = 400;

const matchesBillingDay = (
	date: Date,
	frequency: RecurringExpenseFrequency,
	billingDays: number[],
): boolean => {
	if (frequency === "WEEKLY") {
		const isoWeekday = date.getDay() === 0 ? 7 : date.getDay();
		return billingDays.includes(isoWeekday);
	}

	const daysInMonth = getDaysInMonth(date);
	return billingDays.some((billingDay) => date.getDate() === Math.min(billingDay, daysInMonth));
};

/**
 * Computes the last charge before the reference date and the next `count` charges
 * (a charge on the reference day counts as upcoming).
 * YEARLY returns an empty schedule because the billing month is not persisted.
 * @example getBillingSchedule("MONTHLY", [22], new Date(2026, 9, 27), 1)
 * // { previous: 2026-10-22, upcoming: [2026-11-22] }
 */
export const getBillingSchedule = (
	frequency: RecurringExpenseFrequency,
	billingDays: number[],
	referenceDate: Date,
	count: number,
): BillingSchedule => {
	if (frequency === "YEARLY" || billingDays.length === 0 || count <= 0) {
		return { previous: undefined, upcoming: [] };
	}

	const reference = startOfDay(referenceDate);
	let previous: Date | undefined;
	const upcoming: Date[] = [];

	for (let offset = -SCAN_WINDOW_DAYS; offset <= SCAN_WINDOW_DAYS; offset++) {
		const date = addDays(reference, offset);
		if (!matchesBillingDay(date, frequency, billingDays)) continue;

		if (offset < 0) {
			previous = date;
			continue;
		}

		upcoming.push(date);
		if (upcoming.length >= count) break;
	}

	return { previous, upcoming };
};
