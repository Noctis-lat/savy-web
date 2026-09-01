export const bankKeys = {
	banks: () => ["banks"] as const,
	banksByParams: (params?: BankParams) => [...bankKeys.banks(), params ?? {}] as const,
	bank: (id: string, info?: boolean) => [...bankKeys.banks(), id, { info: info ?? false }] as const,
	bankAccounts: (id: string) => [...bankKeys.banks(), id, "accounts"] as const,
	bankCreditCards: (id: string) => [...bankKeys.banks(), id, "credit-cards"] as const,
	bankLoans: (id: string) => [...bankKeys.banks(), id, "loans"] as const,
	bankIncomeVsExpenses: (id: string, period: PeriodType) =>
		[...bankKeys.banks(), id, "income-vs-expenses", period] as const,
};
