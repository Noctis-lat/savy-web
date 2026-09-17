import { TrendingUp } from "lucide-react";
import type React from "react";
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { buildIncomeExpensesChartData } from "@/utils/banks/buildIncomeExpensesChartData";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type IncomeExpensesChartProps = {
	income: number;
	expenses: number;
	periodLabel: string;
	currency: string;
	locale: string;
};

export const IncomeExpensesChart = ({
	income,
	expenses,
	periodLabel,
	currency,
	locale,
}: IncomeExpensesChartProps): React.ReactElement => {
	const data = buildIncomeExpensesChartData(income, expenses);
	const netFlow = income - expenses;
	const centerValue = formatCurrency(netFlow, currency, locale);

	return (
		<GlassCard className="flex flex-col gap-4 p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<TrendingUp className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Ingresos vs gastos</h3>
				</div>
				<span className="text-xs text-muted-foreground">{periodLabel}</span>
			</div>
			<DonutChart
				data={data}
				centerValue={centerValue}
				centerLabel="Neto"
			/>
		</GlassCard>
	);
};
