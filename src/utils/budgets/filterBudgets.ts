export const filterBudgets = (budgets: Budget[], searchQuery: string): Budget[] => {
	const normalizedQuery = searchQuery.trim().toLowerCase();

	if (normalizedQuery === "") return budgets;

	return budgets.filter((budget) => budget.name.toLowerCase().includes(normalizedQuery));
};
