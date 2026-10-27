import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { RecurringExpenseManagement } from "@/components/recurring-expenses/recurring-expense-management";
import { subscriptionKeys } from "@/content/services";
import { useActivateSubscription } from "@/hooks/subscriptions/useActivateSubscription";
import { useCancelSubscription } from "@/hooks/subscriptions/useCancelSubscription";
import { useDeleteSubscriptionPermanent } from "@/hooks/subscriptions/useDeleteSubscriptionPermanent";

type SubscriptionManagementProps = {
	subscription: RecurringExpense;
};

export const SubscriptionManagement = ({
	subscription,
}: SubscriptionManagementProps): React.ReactElement => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: deactivateSubscription, isPending: isDeactivating } = useCancelSubscription();
	const { mutate: activateSubscription, isPending: isActivating } = useActivateSubscription();
	const { mutate: deleteSubscriptionPermanent, isPending: isDeleting } =
		useDeleteSubscriptionPermanent();

	const handleDeactivate = () => {
		deactivateSubscription(subscription.id, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [subscriptionKeys.subscription, subscription.id],
				});
			},
		});
	};

	const handleActivate = () => {
		activateSubscription(subscription.id, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [subscriptionKeys.subscription, subscription.id],
				});
			},
		});
	};

	const handleDelete = () => {
		deleteSubscriptionPermanent(subscription.id, {
			onSuccess: () => {
				navigate(ROUTES.APP.SUBSCRIPTIONS.ROOT);
			},
		});
	};

	return (
		<RecurringExpenseManagement
			name={subscription.name}
			entityLabel="suscripción"
			isActive={subscription.isActive}
			onDeactivate={handleDeactivate}
			onActivate={handleActivate}
			onDelete={handleDelete}
			isDeactivating={isDeactivating}
			isActivating={isActivating}
			isDeleting={isDeleting}
		/>
	);
};
