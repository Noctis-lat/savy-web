import { Scale } from "lucide-react";
import type React from "react";
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { buildBalanceChartData } from "@/utils/banks/buildBalanceChartData";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BalanceChartProps = {
	assets: number;
	liabilities: number;
	netWorth: number;
	currency: string;
	locale: string;
};

export const BalanceChart = ({
	assets,
	liabilities,
	netWorth,
	currency,
	locale,
}: BalanceChartProps): React.ReactElement => {
	const data = buildBalanceChartData(assets, liabilities);
	const centerValue = formatCurrency(netWorth, currency, locale);

	return (
		<GlassCard className="flex flex-col gap-4 p-6">
			<div className="flex items-center gap-2">
				<Scale className="size-4 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Balance general</h3>
			</div>
			<DonutChart
				data={data}
				centerValue={centerValue}
				centerLabel="Patrimonio"
			/>
		</GlassCard>
	);
};
