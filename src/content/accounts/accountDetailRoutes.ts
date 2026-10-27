type AccountDetailRoute = {
	path: string;
	param: string;
	byAccountId?: boolean;
};

const ACCOUNT_DETAIL_ROUTES: Record<AccountType, AccountDetailRoute> = {
	DEBIT: { path: "/app/accounts/:account_id", param: "account_id" },
	CASH: { path: "/app/accounts/:account_id", param: "account_id" },
	CREDIT: { path: "/app/credits/:credit_id", param: "credit_id", byAccountId: true },
	LOAN: { path: "/app/loans/:loan_id", param: "loan_id", byAccountId: true },
};

export const getAccountDetailRoute = (account: Account): string => {
	if (account.isSavingGoal) {
		const base = "/app/goals/:goal_id".replace(":goal_id", account.id);
		return `${base}?by=account_id`;
	}

	const route = ACCOUNT_DETAIL_ROUTES[account.type];
	const base = route.path.replace(`:${route.param}`, account.id);
	return route.byAccountId ? `${base}?by=account_id` : base;
};
