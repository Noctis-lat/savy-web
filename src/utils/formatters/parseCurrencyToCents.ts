export const parseCurrencyToCents = (value: string): number => {
	const numeric = value.replace(/[^\d]/g, "");
	return Number(numeric || 0);
};
