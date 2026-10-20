export const getBudgetPlannedTotal = (budget: Budget): number =>
	budget.items.reduce((total, item) => total + item.amount, 0);
