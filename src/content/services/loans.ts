export const loanKeys = {
	loans: () => ["loans"] as const,
	loansByParams: (params?: LoanParams) => [...loanKeys.loans(), params ?? {}] as const,
	loan: (id: string) => [...loanKeys.loans(), id] as const,
};
