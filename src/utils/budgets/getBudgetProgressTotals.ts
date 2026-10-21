/** Splits a budget progress into expense and income totals (the API totals mix both types). */
export const getBudgetProgressTotals = (items: BudgetItemProgress[]): BudgetProgressTotals => {
	const expenseItems = items.filter((item) => item.categoryType === "EXPENSE");
	const incomeItems = items.filter((item) => item.categoryType === "INCOME");

	return {
		expensesPlanned: expenseItems.reduce((total, item) => total + item.plannedAmount, 0),
		expensesSpent: expenseItems.reduce((total, item) => total + item.spentAmount, 0),
		incomesPlanned: incomeItems.reduce((total, item) => total + item.plannedAmount, 0),
		incomesReceived: incomeItems.reduce((total, item) => total + item.spentAmount, 0),
		hasExpenses: expenseItems.length > 0,
		hasIncomes: incomeItems.length > 0,
	};
};
