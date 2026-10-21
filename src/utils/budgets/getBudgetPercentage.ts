/** Unclamped usage percentage (can exceed 100). Returns 0 when nothing is planned. */
export const getBudgetPercentage = (spent: number, planned: number): number => {
	if (planned <= 0) return 0;
	return (spent / planned) * 100;
};
