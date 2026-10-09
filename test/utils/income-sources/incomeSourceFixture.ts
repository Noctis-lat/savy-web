const INCOME_SOURCE_FIXTURE: IncomeSource = {
	id: "income-source-1",
	profileId: "profile-1",
	name: "Salario",
	amount: 2500000,
	frequency: "BIWEEKLY",
	paydays: [30, 15],
	destinationAccountId: "account-1",
	isActive: true,
	createdAt: "2026-10-03T00:00:00Z",
	updatedAt: "2026-10-03T00:00:00Z",
};

const DESTINATION_ACCOUNT_FIXTURE = {
	id: "account-1",
	name: "Nómina BBVA",
	type: "DEBIT",
} as Account;

export { DESTINATION_ACCOUNT_FIXTURE, INCOME_SOURCE_FIXTURE };
