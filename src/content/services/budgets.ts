export const budgetKeys = {
	budgets: () => ["budgets"] as const,
	budgetsByParams: (params?: BudgetParams) => [...budgetKeys.budgets(), params ?? {}] as const,
	budget: (id: string) => [...budgetKeys.budgets(), id] as const,
	budgetProgress: (id: string) => [...budgetKeys.budgets(), id, "progress"] as const,
};
