import { createBrowserRouter } from "react-router";
import { AppGuardLayout } from "@/components/design-system/patterns/layouts/app-guard-layout";
import { AppLayout } from "@/components/design-system/patterns/layouts/app-layout";
import { AuthLayout } from "@/components/design-system/patterns/layouts/auth-layout";
import { LandingLayout } from "@/components/design-system/patterns/layouts/landing-layout";
import { ProtectedRoute } from "./protected-route";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
	{
		path: "*",
		lazy: () => import("@/screens/error-pages/not-found").then((m) => ({ Component: m.NotFound })),
	},
	{
		path: ROUTES.LANDING.ROOT,
		element: <LandingLayout />,
		children: [
			{
				index: true,
				lazy: () => import("@/screens/landing/home").then((m) => ({ Component: m.Home })),
			},
		],
	},
	{
		path: ROUTES.AUTH.ROOT,
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.AUTH.LOGIN,
				lazy: () => import("@/screens/auth/login").then((m) => ({ Component: m.LoginPage })),
			},
			{
				path: ROUTES.AUTH.REGISTER,
				lazy: () => import("@/screens/auth/register").then((m) => ({ Component: m.Register })),
			},
			{
				path: ROUTES.AUTH.FORGOT_PASSWORD,
				lazy: () => import("@/screens/auth/password").then((m) => ({ Component: m.Password })),
			},
			{
				path: ROUTES.AUTH.RESET_PASSWORD,
				lazy: () =>
					import("@/screens/auth/new-password").then((m) => ({ Component: m.NewPassword })),
			},
		],
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <AppGuardLayout />,
				children: [
					{
						path: ROUTES.APP.ROOT,
						element: <AppLayout />,
						children: [
							{
								index: true,
								lazy: () =>
									import("@/screens/app/dashboard").then((m) => ({ Component: m.Dashboard })),
							},
							{
								path: ROUTES.APP.BANKS.ROOT,
								lazy: () => import("@/screens/app/banks").then((m) => ({ Component: m.Banks })),
							},
							{
								path: ROUTES.APP.BANKS.DETAIL,
								lazy: () =>
									import("@/screens/app/banks/bank-detail").then((m) => ({
										Component: m.BankDetail,
									})),
							},
							{
								path: ROUTES.APP.ACCOUNTS.ROOT,
								lazy: () =>
									import("@/screens/app/accounts").then((m) => ({ Component: m.Accounts })),
							},
							{
								path: ROUTES.APP.ACCOUNTS.NEW,
								lazy: () =>
									import("@/screens/app/accounts/new").then((m) => ({ Component: m.AccountNew })),
							},
							{
								path: ROUTES.APP.TRANSACTIONS,
								lazy: () =>
									import("@/screens/app/transactions").then((m) => ({ Component: m.Transactions })),
							},
							{
								path: ROUTES.APP.TRANSACTIONS_NEW,
								lazy: () =>
									import("@/screens/app/transactions/new").then((m) => ({
										Component: m.TransactionNew,
									})),
							},
							{
								path: ROUTES.APP.BUDGETS,
								lazy: () => import("@/screens/app/budgets").then((m) => ({ Component: m.Budgets })),
							},
							{
								path: ROUTES.APP.BUDGETS_NEW,
								lazy: () =>
									import("@/screens/app/budgets/new").then((m) => ({ Component: m.BudgetNew })),
							},
							{
								path: ROUTES.APP.GOALS,
								lazy: () => import("@/screens/app/goals").then((m) => ({ Component: m.Goals })),
							},
							{
								path: ROUTES.APP.GOALS_NEW,
								lazy: () =>
									import("@/screens/app/goals/new").then((m) => ({ Component: m.GoalNew })),
							},
							{
								path: ROUTES.APP.CREDITS,
								lazy: () => import("@/screens/app/credits").then((m) => ({ Component: m.Credits })),
							},
							{
								path: ROUTES.APP.ANALYTICS,
								lazy: () =>
									import("@/screens/app/analitycs").then((m) => ({ Component: m.Analitycs })),
							},
							{
								path: ROUTES.APP.SETTINGS,
								lazy: () =>
									import("@/screens/app/settings").then((m) => ({ Component: m.Settings })),
							},
						],
					},
					{
						path: ROUTES.APP.ONBOARDING,
						lazy: () =>
							import("@/screens/app/onboarding").then((m) => ({ Component: m.Onboarding })),
					},
				],
			},
			{
				path: "*",
				lazy: () =>
					import("@/screens/error-pages/not-found").then((m) => ({ Component: m.NotFound })),
			},
		],
	},
]);
