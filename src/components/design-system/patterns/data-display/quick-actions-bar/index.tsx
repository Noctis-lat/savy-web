import {
	ArrowDownRight,
	ArrowLeftRight,
	ArrowUpRight,
	BarChart3,
	CreditCard,
	Landmark,
	PiggyBank,
	Target,
	Wallet,
} from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

type QuickAction = {
	label: string;
	icon: React.ElementType;
	path: string;
};

const ACTIONS: QuickAction[] = [
	{ label: "Bancos", icon: Landmark, path: ROUTES.APP.BANKS.ROOT },
	{ label: "Cuentas", icon: Wallet, path: ROUTES.APP.ACCOUNTS.ROOT },
	{ label: "Transacciones", icon: ArrowLeftRight, path: ROUTES.APP.TRANSACTIONS },
	{ label: "Ingresos", icon: ArrowUpRight, path: `${ROUTES.APP.TRANSACTIONS}?type=INCOME` },
	{ label: "Gastos", icon: ArrowDownRight, path: `${ROUTES.APP.TRANSACTIONS}?type=EXPENSE` },
	{ label: "Presupuestos", icon: PiggyBank, path: ROUTES.APP.BUDGETS },
	{ label: "Metas", icon: Target, path: ROUTES.APP.GOALS },
	{ label: "Créditos", icon: CreditCard, path: ROUTES.APP.CREDITS },
	{ label: "Estadísticas", icon: BarChart3, path: ROUTES.APP.ANALYTICS },
];

type QuickActionsBarProps = {
	className?: string;
};

export const QuickActionsBar = ({ className }: QuickActionsBarProps): React.ReactElement => {
	const navigate = useNavigate();

	const handleClick = (path: string): void => {
		navigate(path);
	};

	return (
		<div className={merge("flex w-full gap-2 overflow-x-auto md:flex-nowrap", className)}>
			{ACTIONS.map((action) => (
				<Button
					key={action.label}
					variant="ghost"
					size="sm"
					className="shrink-0"
					onClick={() => handleClick(action.path)}
				>
					<action.icon className="size-4" />
					{action.label}
				</Button>
			))}
		</div>
	);
};
