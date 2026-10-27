import { Repeat, TrendingDown } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type SubscriptionsKpisProps = {
	info: RecurringByTypeInfo | undefined;
	total: number | undefined;
};

export const SubscriptionsKpis = ({ info, total }: SubscriptionsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<ScaleFadeIn>
				<KpiCard
					label="Total suscripciones"
					value={total ?? 0}
					icon={Repeat}
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
