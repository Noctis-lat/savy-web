export const cardStatementKeys = {
	cardStatements: () => ["card-statements"] as const,
	cardStatementsByParams: (params?: CardStatementParams) =>
		[...cardStatementKeys.cardStatements(), params ?? {}] as const,
	cardStatement: (id: string) => [...cardStatementKeys.cardStatements(), id] as const,
};
