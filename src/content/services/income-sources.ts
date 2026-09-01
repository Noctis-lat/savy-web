export const incomeSourceKeys = {
	incomeSources: () => ["income-sources"] as const,
	incomeSourcesByParams: (params?: IncomeSourceParams) =>
		[...incomeSourceKeys.incomeSources(), params ?? {}] as const,
};
