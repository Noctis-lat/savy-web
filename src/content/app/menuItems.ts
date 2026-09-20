import type { LucideIcon } from "lucide-react";
import {
	ArrowUpDown,
	CreditCard,
	Landmark,
	LayoutDashboard,
	PieChart,
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
		groupLabel: "Principal",
		children: [{ label: "Dashboard", href: ROUTES.APP.ROOT, icon: LayoutDashboard }],
	},
	{
		groupLabel: "Finanzas",
		children: [
			{ label: "Bancos", href: ROUTES.APP.BANKS.ROOT, icon: Landmark },
			{ label: "Cuentas", href: ROUTES.APP.ACCOUNTS.ROOT, icon: Wallet },
			{ label: "Movimientos", href: ROUTES.APP.TRANSACTIONS, icon: ArrowUpDown },
			{ label: "Presupuestos", href: ROUTES.APP.BUDGETS, icon: PieChart },
			{ label: "Metas", href: ROUTES.APP.GOALS, icon: Target },
			{ label: "Creditos", href: ROUTES.APP.CREDITS, icon: CreditCard },
		],
	},
	{
		groupLabel: "Análisis",
		children: [{ label: "Estadísticas", href: ROUTES.APP.ANALYTICS, icon: TrendingUp }],
	},
	{
		groupLabel: "Sistema",
		children: [{ label: "Configuración", href: ROUTES.APP.SETTINGS, icon: Settings }],
	},
];
