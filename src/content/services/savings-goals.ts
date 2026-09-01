export const savingsGoalKeys = {
	savingsGoals: () => ["savings-goals"] as const,
	savingsGoalsByParams: (params?: SavingsGoalParams) =>
		[...savingsGoalKeys.savingsGoals(), params ?? {}] as const,
	savingsGoal: (id: string) => [...savingsGoalKeys.savingsGoals(), id] as const,
};
