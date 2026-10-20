import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BudgetsKpisProps = {
	info: BudgetsInfo | undefined;
	total: number | undefined;
};

export const BudgetsKpis = ({ info, total }: BudgetsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<ScaleFadeIn>
				<KpiCard
					label="Total presupuestos"
					value={total ?? 0}
					icon={PiggyBank}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Ingresos presupuestados"
					value={formatCurrency(info?.totalIncomes ?? 0)}
					icon={TrendingUp}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Gastos presupuestados"
					value={formatCurrency(info?.totalExpenses ?? 0)}
					icon={TrendingDown}
				/>
			</ScaleFadeIn>
		</div>
	);
};
