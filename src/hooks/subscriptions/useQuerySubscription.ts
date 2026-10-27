import { useQuery } from "@tanstack/react-query";
import { subscriptionKeys } from "@/content/services";
import { subscriptionService } from "@/services/subscriptions";

export const useQuerySubscription = (
	id: string | undefined,
): {
	subscription: RecurringExpense | undefined;
	isLoading: boolean;
} => {
	const subscriptionQuery = useQuery({
		queryKey: [subscriptionKeys.subscription, id],
		queryFn: () => subscriptionService.getSubscription(id as string),
		enabled: id !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		subscription: subscriptionQuery.data,
		isLoading: subscriptionQuery.isLoading,
	};
};
