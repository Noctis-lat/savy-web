import { TrendingUp } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { buildIncomeExpensesChartData } from "@/utils/banks/buildIncomeExpensesChartData";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type IncomeExpensesChartProps = {
	incomeVsExpenses: IncomeVsExpenses;
	currency: string;
	locale: string;
};

export const IncomeExpensesChart = ({
	incomeVsExpenses,
	currency,
	locale,
}: IncomeExpensesChartProps): React.ReactElement => {
	const data = buildIncomeExpensesChartData(incomeVsExpenses.income, incomeVsExpenses.expenses);
	const netFlow = incomeVsExpenses.income - incomeVsExpenses.expenses;
	const centerValue = formatCurrency(netFlow, currency, locale);

	return (
		<ScaleFadeIn>
			<GlassCard className="flex flex-col gap-4 p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<TrendingUp className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Ingresos vs gastos</h3>
					</div>
					<span className="text-xs text-muted-foreground">{incomeVsExpenses.periodLabel}</span>
				</div>
				<DonutChart
					data={data}
					centerValue={centerValue}
					centerLabel="Neto"
					currency={currency}
					locale={locale}
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
