import { Info } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { RECURRING_EXPENSE_FREQUENCY_LABELS } from "@/content/recurring-expenses/recurringExpensesOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { formatBillingDays } from "@/utils/recurring-expenses/formatBillingDays";

type PaymentDetailsProps = {
	recurringExpense: RecurringExpense;
};

export const PaymentDetails = ({ recurringExpense }: PaymentDetailsProps): React.ReactElement => {
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
							{formatCurrency(recurringExpense.amount)}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Frecuencia</span>
						<span className="text-sm font-semibold text-foreground">
							{RECURRING_EXPENSE_FREQUENCY_LABELS[recurringExpense.frequency]}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Días de cobro</span>
						<span className="text-sm font-semibold text-foreground">
							{formatBillingDays(recurringExpense.frequency, recurringExpense.billingDays)}
						</span>
					</div>

					{recurringExpense.url && (
						<div className="flex flex-row items-baseline justify-between gap-4">
							<span className="text-sm text-muted-foreground">URL</span>
							<a
								href={recurringExpense.url}
								target="_blank"
								rel="noreferrer noopener"
								className="text-sm font-semibold text-primary hover:underline"
							>
								{recurringExpense.url}
							</a>
						</div>
					)}

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Fecha de creación</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatDate(recurringExpense.createdAt)}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Última actualización</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatDate(recurringExpense.updatedAt)}
						</span>
					</div>
				</div>
			</SectionCard>
		</ScaleFadeIn>
	);
};
