import { Gauge } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GaugeChart } from "@/components/design-system/patterns/data-display/gauge-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import {
	CREDIT_USAGE_DOT_CLASS,
	CREDIT_USAGE_GAUGE_COLOR,
} from "@/content/credit-cards/creditCardDetailContent";
import { getCreditUtilization } from "@/utils/credit-cards/getCreditUtilization";
import { formatCompactPercent } from "@/utils/formatters/formatCompactPercent";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { CreditUsageRow } from "./components/credit-usage-row";

type CreditUsageProps = {
	creditCard: CreditCard;
};

export const CreditUsage = ({ creditCard }: CreditUsageProps): React.ReactElement => {
	const utilization = getCreditUtilization(creditCard);
	const isOverLimit = utilization.isOverLimit;

	return (
		<ScaleFadeIn>
			<GlassCard className="p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<Gauge className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Uso del crédito</h3>
					</div>
					<span className="text-xs text-muted-foreground tabular-nums">
						Límite {formatCurrency(creditCard.creditLimit)}
					</span>
				</div>

				<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
					{/* The gauge clamps at 100%: over the limit the arc is full (danger) and the label says so. */}
					<GaugeChart
						value={creditCard.currentBalance}
						max={creditCard.creditLimit}
						label={isOverLimit ? "Sobre el límite" : "Crédito usado"}
						formatValue={formatCurrency}
						color={CREDIT_USAGE_GAUGE_COLOR[utilization.variant]}
						className="w-full max-w-64 shrink-0"
					/>

					<div className="grid w-full min-w-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
						<dl className="flex flex-col gap-2">
							<CreditUsageRow
								label="Usado"
								value={formatCurrency(creditCard.currentBalance)}
								dotClassName={CREDIT_USAGE_DOT_CLASS[utilization.variant]}
							/>
							<CreditUsageRow
								label={isOverLimit ? "Sobre el límite" : "Disponible"}
								value={formatCurrency(creditCard.availableCredit)}
								dotClassName="bg-muted-foreground/30"
								valueClassName={isOverLimit ? "text-destructive" : undefined}
							/>
							<CreditUsageRow
								label="Límite de crédito"
								value={formatCurrency(creditCard.creditLimit)}
							/>
						</dl>

						<dl className="flex flex-col gap-2 border-t border-border/30 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
							<CreditUsageRow
								label="Próximo corte"
								value={formatDate(creditCard.currentCycleCutDate)}
							/>
							<CreditUsageRow
								label="Fecha de pago"
								value={formatDate(creditCard.currentCyclePaymentDueDate)}
							/>
							<CreditUsageRow
								label="Tasa anual"
								value={formatCompactPercent(creditCard.interestRate)}
							/>
						</dl>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
