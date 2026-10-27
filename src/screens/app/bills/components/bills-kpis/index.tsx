import { Receipt, TrendingDown } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BillsKpisProps = {
	info: RecurringByTypeInfo | undefined;
	total: number | undefined;
};

export const BillsKpis = ({ info, total }: BillsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<ScaleFadeIn>
				<KpiCard
					label="Total servicios"
					value={total ?? 0}
					icon={Receipt}
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
