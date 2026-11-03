/** Converts an API decimal string in pesos (e.g. "1000.00") to integer cents. Invalid input yields 0. */
export const decimalStringToCents = (value: string): number => {
	const amount = Number(value);
	if (value.trim() === "" || !Number.isFinite(amount)) return 0;
	return Math.round(amount * 100);
};
