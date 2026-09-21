import { PieChart } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { CreateAccount } from "@/components/accounts/create-account";
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

const TYPE_LABEL: Record<AccountType, string> = {
	DEBIT: "Débito",
	CREDIT: "Crédito",
	LOAN: "Préstamo",
	CASH: "Efectivo",
};

const TYPE_COLOR: Record<AccountType, string> = {
	DEBIT: "var(--color-chart-1)",
	CREDIT: "var(--color-chart-2)",
	LOAN: "var(--color-chart-3)",
	CASH: "var(--color-chart-4)",
};

type AccountsDistributionCardProps = {
	distribution: DashboardAccountDistribution[];
	currency: string;
	locale: string;
	className?: string;
};

export const AccountsDistributionCard = ({
	distribution,
	currency,
	locale,
	className,
}: AccountsDistributionCardProps): React.ReactElement => {
	const navigate = useNavigate();

	const chartData = useMemo(
		() =>
			distribution.map((item) => ({
				label: TYPE_LABEL[item.type] ?? item.type,
				value: Math.max(item.totalBalance, 0),
				color: TYPE_COLOR[item.type] ?? "var(--color-primary)",
			})),
		[distribution],
	);

	const totalBalance = useMemo(
		() => distribution.reduce((sum, item) => sum + item.totalBalance, 0),
		[distribution],
	);

	const isEmpty = distribution.length === 0;

	return (
		<SummaryCard
			title="Distribución de cuentas"
			icon={PieChart}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.ACCOUNTS.ROOT)}
			createContent={<CreateAccount mode="icon" />}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin cuentas"
					description="Aún no tienes cuentas registradas."
					action={{
						label: "Agregar cuenta",
						onClick: () => navigate(ROUTES.APP.ACCOUNTS.NEW),
					}}
				/>
			) : (
				<DonutChart
					data={chartData}
					centerLabel={currency}
					centerValue={formatCurrency(totalBalance, currency, locale)}
					currency={currency}
					locale={locale}
				/>
			)}
		</SummaryCard>
	);
};
