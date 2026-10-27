import { Info } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { BILL_FREQUENCY_LABELS } from "@/content/bills/billsOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { formatBillingDays } from "@/utils/recurring-expenses/formatBillingDays";

type BillDetailsProps = {
	service: RecurringExpense;
};

export const BillDetails = ({ service }: BillDetailsProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<SectionCard
				title="Información"
				icon={Info}
			>
				<div className="flex flex-col gap-3">
					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Monto</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatCurrency(service.amount)}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Frecuencia</span>
						<span className="text-sm font-semibold text-foreground">
							{BILL_FREQUENCY_LABELS[service.frequency]}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Días de cobro</span>
						<span className="text-sm font-semibold text-foreground">
							{formatBillingDays(service.frequency, service.billingDays)}
						</span>
					</div>

					{service.url && (
						<div className="flex flex-row items-baseline justify-between gap-4">
							<span className="text-sm text-muted-foreground">URL</span>
							<a
								href={service.url}
								target="_blank"
								rel="noreferrer noopener"
								className="text-sm font-semibold text-primary hover:underline"
							>
								{service.url}
							</a>
						</div>
					)}

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Fecha de creación</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatDate(service.createdAt)}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Última actualización</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatDate(service.updatedAt)}
						</span>
					</div>
				</div>
			</SectionCard>
		</ScaleFadeIn>
	);
};
