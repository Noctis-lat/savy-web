export const ROUTES = {
	LANDING: {
		ROOT: "/",
	},

	AUTH: {
		ROOT: "/auth",
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		FORGOT_PASSWORD: "/auth/forgot-password",
		RESET_PASSWORD: "/auth/reset-password",
	},

	APP: {
		ROOT: "/app",
		DASHBOARD: "/app",
		BANKS: {
			ROOT: "/app/banks",
			DETAIL: "/app/banks/:id",
		},
		ACCOUNTS: {
			ROOT: "/app/accounts",
			DETAIL: "/app/accounts/:account_id",
			NEW: "/app/accounts/new",
			EDIT: "/app/accounts/:account_id/edit",
		},
		TRANSACTIONS: "/app/transactions",
		TRANSACTIONS_NEW: "/app/transactions/new",
		BUDGETS: "/app/budgets",
		BUDGETS_NEW: "/app/budgets/new",
		GOALS: "/app/goals",
		GOALS_NEW: "/app/goals/new",
		CREDITS: "/app/credits",
		ANALYTICS: "/app/analytics",
		SETTINGS: "/app/settings",
		ONBOARDING: "/app/onboarding",
	},
	AUX: {
		ROOT: "/aux",
	},
} as const;
