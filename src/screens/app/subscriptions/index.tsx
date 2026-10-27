import { Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { Button } from "@/components/ui/button";
import { useQuerySubscriptions } from "@/hooks/subscriptions/useQuerySubscriptions";
import { SubscriptionsFilters } from "./components/subscriptions-filters";
import { SubscriptionsKpis } from "./components/subscriptions-kpis";
import { SubscriptionsList } from "./components/subscriptions-list";
import { SubscriptionsSkeleton } from "./components/subscriptions-skeleton";

export const Subscriptions = (): React.ReactElement => {
	const { subscriptionsInfo, total, isLoading } = useQuerySubscriptions();

	if (isLoading) {
		return <SubscriptionsSkeleton />;
	}

	if (!subscriptionsInfo) {
		return (
			<Empty
				title="Sin suscripciones para mostrar"
				description="No hay suscripciones para mostrar"
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Suscripciones" }]}
			action={
				<Button asChild>
					<Link to={ROUTES.APP.SUBSCRIPTIONS.NEW}>
						<Plus />
						Nueva suscripción
					</Link>
				</Button>
			}
		>
			<SubscriptionsKpis
				info={subscriptionsInfo}
				total={total}
			/>
			<SubscriptionsFilters />
			<SubscriptionsList />
		</Screen>
	);
};
