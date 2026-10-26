type AccountDetailRoute = {
	path: string;
	param: string;
};

const ACCOUNT_DETAIL_ROUTES: Record<AccountType, AccountDetailRoute> = {
	DEBIT: { path: "/app/accounts/:account_id", param: "account_id" },
	CASH: { path: "/app/accounts/:account_id", param: "account_id" },
	CREDIT: { path: "/app/credits/:credit_id", param: "credit_id" },
	LOAN: { path: "/app/loans/:loan_id", param: "loan_id" },
};

export const getAccountDetailRoute = (account: Account): string => {
	const route = ACCOUNT_DETAIL_ROUTES[account.type];
	return route.path.replace(`:${route.param}`, account.id);
};
