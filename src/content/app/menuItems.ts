import type { LucideIcon } from "lucide-react";
import {
	ArrowUpDown,
	CalendarClock,
	CreditCard,
	HandCoins,
	Landmark,
	LayoutDashboard,
	PieChart,
	Receipt,
	Repeat,
	Settings,
	Target,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { ROUTES } from "@/app/router/routes";

type MenuItem = {
	label: string;
	href: string;
	icon: LucideIcon;
};

type MenuGroup = {
	groupLabel: string;
	children: MenuItem[];
};

export type { MenuGroup, MenuItem };

export const menuItems: MenuGroup[] = [
	{
		groupLabel: "General",
		children: [{ label: "Dashboard", href: ROUTES.APP.ROOT, icon: LayoutDashboard }],
	},
	{
		groupLabel: "Finanzas",
		children: [
			{ label: "Bancos", href: ROUTES.APP.BANKS.ROOT, icon: Landmark },
			{ label: "Cuentas", href: ROUTES.APP.ACCOUNTS.ROOT, icon: Wallet },
			{ label: "Movimientos", href: ROUTES.APP.TRANSACTIONS, icon: ArrowUpDown },
		],
	},
	{
		groupLabel: "Organización",
		children: [
			{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT, icon: PieChart },
			{ label: "Metas", href: ROUTES.APP.GOALS.ROOT, icon: Target },
			{ label: "Suscripciones", href: ROUTES.APP.SUBSCRIPTIONS.ROOT, icon: Repeat },
			{ label: "Servicios", href: ROUTES.APP.BILLS.ROOT, icon: Receipt },
			{ label: "Gastos recurrentes", href: ROUTES.APP.PAYMENTS.ROOT, icon: CalendarClock },
		],
	},
	{
		groupLabel: "Compromisos",
		children: [
			{ label: "Créditos", href: ROUTES.APP.CREDITS.ROOT, icon: CreditCard },
			{ label: "Préstamos", href: ROUTES.APP.LOANS.ROOT, icon: HandCoins },
		],
	},
	{
		groupLabel: "Análisis",
		children: [{ label: "Estadísticas", href: ROUTES.APP.ANALYTICS, icon: TrendingUp }],
	},
	{
		groupLabel: "Sistema",
		children: [{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT, icon: Settings }],
	},
];
