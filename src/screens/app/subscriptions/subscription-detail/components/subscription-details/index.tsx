import { Info } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { SUBSCRIPTION_FREQUENCY_LABELS } from "@/content/subscriptions/subscriptionsOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { formatBillingDays } from "@/utils/recurring-expenses/formatBillingDays";

type SubscriptionDetailsProps = {
	subscription: RecurringExpense;
};

export const SubscriptionDetails = ({
	subscription,
}: SubscriptionDetailsProps): React.ReactElement => {
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
							{formatCurrency(subscription.amount)}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Frecuencia</span>
						<span className="text-sm font-semibold text-foreground">
							{SUBSCRIPTION_FREQUENCY_LABELS[subscription.frequency]}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Días de cobro</span>
						<span className="text-sm font-semibold text-foreground">
							{formatBillingDays(subscription.frequency, subscription.billingDays)}
						</span>
					</div>

					{subscription.url && (
						<div className="flex flex-row items-baseline justify-between gap-4">
							<span className="text-sm text-muted-foreground">URL</span>
							<a
								href={subscription.url}
								target="_blank"
								rel="noreferrer noopener"
								className="text-sm font-semibold text-primary hover:underline"
							>
								{subscription.url}
							</a>
						</div>
					)}

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Fecha de creación</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatDate(subscription.createdAt)}
						</span>
					</div>

					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Última actualización</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatDate(subscription.updatedAt)}
						</span>
					</div>
				</div>
			</SectionCard>
		</ScaleFadeIn>
	);
};
