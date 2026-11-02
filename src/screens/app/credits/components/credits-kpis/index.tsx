import { BadgePercent, CalendarClock, CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type CreditsKpisProps = {
	info: CreditCardInfo;
};

export const CreditsKpis = ({ info }: CreditsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
			<ScaleFadeIn>
				<KpiCard
					label="Tarjetas de crédito"
					value={info.total}
					icon={CreditCard}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Crédito disponible"
					value={formatCurrency(info.totalAvailableCredit)}
					icon={TrendingUp}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Deuda total"
					value={formatCurrency(info.totalDebt)}
					icon={TrendingDown}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Pago mínimo"
					value={formatCurrency(info.totalMinPayment)}
					icon={CalendarClock}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Pago sin intereses"
					value={formatCurrency(info.totalNoInterestPayment)}
					icon={BadgePercent}
				/>
			</ScaleFadeIn>
		</div>
	);
};
