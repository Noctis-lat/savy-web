import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { EditSubscription } from "@/components/subscriptions/edit-subscription";
import { useQuerySubscription } from "@/hooks/subscriptions/useQuerySubscription";
import { SubscriptionDangerZone } from "./components/subscription-danger-zone";
import { SubscriptionDetails } from "./components/subscription-details";
import { SubscriptionHeader } from "./components/subscription-header";
import { SubscriptionSkeleton } from "./components/subscription-skeleton";

export const SubscriptionDetail = (): React.ReactElement => {
	const { subscription_id } = useParams<{ subscription_id: string }>();
	const { subscription, isLoading } = useQuerySubscription(subscription_id);

	if (isLoading) {
		return <SubscriptionSkeleton />;
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
			<SubscriptionHeader subscription={subscription} />
			<SubscriptionDetails subscription={subscription} />
			<SubscriptionDangerZone subscription={subscription} />
		</Screen>
	);
};
