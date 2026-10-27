import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { RecurringExpenseDetailSkeleton } from "@/components/recurring-expenses/recurring-expense-detail-skeleton";
import { RecurringExpenseHeader } from "@/components/recurring-expenses/recurring-expense-header";
import { RecurringExpenseSchedule } from "@/components/recurring-expenses/recurring-expense-schedule";
import { EditSubscription } from "@/components/subscriptions/edit-subscription";
import { useQuerySubscription } from "@/hooks/subscriptions/useQuerySubscription";
import { SubscriptionDetails } from "./components/subscription-details";
import { SubscriptionManagement } from "./components/subscription-management";

export const SubscriptionDetail = (): React.ReactElement => {
	const { subscription_id } = useParams<{ subscription_id: string }>();
	const { subscription, isLoading } = useQuerySubscription(subscription_id);

	if (isLoading) {
		return <RecurringExpenseDetailSkeleton />;
	}

	if (!subscription) {
		return (
			<Empty
				title="Sin información"
				description="La suscripción que solicitaste no pudo ser encontrada."
				icon={FlagOff}
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.SUBSCRIPTIONS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Suscripciones", href: ROUTES.APP.SUBSCRIPTIONS.ROOT },
				{ label: subscription.name },
			]}
			action={<EditSubscription recurringExpense={subscription} />}
		>
			<RecurringExpenseHeader
				recurringExpense={subscription}
				fallbackIcon="repeat"
			/>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<RecurringExpenseSchedule recurringExpense={subscription} />
				</div>
				<SubscriptionDetails subscription={subscription} />
			</div>
			<SubscriptionManagement subscription={subscription} />
		</Screen>
	);
};
