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
		ONBOARDING: "/app/onboarding",
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
		BUDGETS: {
			ROOT: "/app/budgets",
			NEW: "/app/budgets/new",
		},
		GOALS: {
			ROOT: "/app/goals",
			NEW: "/app/goals/new",
		},
		CREDITS: {
			ROOT: "/app/credits",
			DETAIL: "/app/credits/:credit_id",
		},
		ANALYTICS: "/app/analytics",
		SETTINGS: {
			ROOT: "/app/settings",
		},
	},
	AUX: {
		ROOT: "/aux",
	},
} as const;
