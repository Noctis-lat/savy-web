/**
 * Percentage (0 to 100, rounded) of the billing cycle elapsed at the reference date.
 * @example getBillingCycleProgress(new Date(2026, 9, 22), new Date(2026, 10, 22), new Date(2026, 9, 27)) // 16
 */
export const getBillingCycleProgress = (
	previous: Date,
	next: Date,
	referenceDate: Date,
): number => {
	const total = next.getTime() - previous.getTime();
	if (total <= 0) return 100;

	const elapsed = referenceDate.getTime() - previous.getTime();
	const percent = (elapsed / total) * 100;

	return Math.round(Math.min(100, Math.max(0, percent)));
};
