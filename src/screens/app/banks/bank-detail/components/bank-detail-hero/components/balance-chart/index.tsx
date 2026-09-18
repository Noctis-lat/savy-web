import { Scale } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { buildBalanceChartData } from "@/utils/banks/buildBalanceChartData";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BalanceChartProps = {
	bank: Bank;
	currency: string;
	locale: string;
};

export const BalanceChart = ({ bank, currency, locale }: BalanceChartProps): React.ReactElement => {
	const info = bank.info;
	const data = buildBalanceChartData(
		info.balanceBreakdown.assets,
		info.balanceBreakdown.liabilities,
	);
	const centerValue = formatCurrency(info.netWorth, currency, locale);

	return (
		<ScaleFadeIn>
			<GlassCard className="flex flex-col gap-4 p-6">
				<div className="flex items-center gap-2">
					<Scale className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Balance general</h3>
				</div>
				<DonutChart
					data={data}
					centerValue={centerValue}
					centerLabel="Patrimonio"
					currency={currency}
					locale={locale}
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
