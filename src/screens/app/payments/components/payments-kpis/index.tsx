import { CalendarClock, TrendingDown } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type PaymentsKpisProps = {
	info: RecurringByTypeInfo | undefined;
	total: number | undefined;
};

export const PaymentsKpis = ({ info, total }: PaymentsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<ScaleFadeIn>
				<KpiCard
					label="Total gastos recurrentes"
					value={total ?? 0}
					icon={CalendarClock}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Estimado mensual"
					value={formatCurrency(info?.totalEstimated ?? 0)}
					icon={TrendingDown}
				/>
			</ScaleFadeIn>
		</div>
	);
};
