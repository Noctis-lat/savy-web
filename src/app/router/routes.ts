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
		SUBSCRIPTIONS: {
			ROOT: "/app/subscriptions",
			DETAIL: "/app/subscriptions/:subscription_id",
		},
		BILLS: {
			ROOT: "/app/bills",
			DETAIL: "/app/bills/:bill_id",
		},
		PAYMENTS: {
			ROOT: "/app/payments",
			DETAIL: "/app/payments/:payment_id",
		},
		CREDITS: {
			ROOT: "/app/credits",
			DETAIL: "/app/credits/:credit_id",
		},
		LOANS: {
			ROOT: "/app/loans",
			DETAIL: "/app/loans/:loan_id",
		},
		ANALYTICS: "/app/analytics",
		SETTINGS: {
			ROOT: "/app/settings",
			PROFILE: "/app/settings/profile",
			CATEGORIES: "/app/settings/categories",
			INCOME_SOURCES: "/app/settings/income-sources",
		},
	},
	AUX: {
		ROOT: "/aux",
	},
} as const;
