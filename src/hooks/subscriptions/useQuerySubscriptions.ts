import { useQuery } from "@tanstack/react-query";
import { subscriptionKeys } from "@/content/services";
import { subscriptionService } from "@/services/subscriptions";

type useQuerySubscriptionsReturn = {
	subscriptions: RecurringExpense[] | undefined;
	subscriptionsInfo: RecurringByTypeInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQuerySubscriptions = (params?: SubscriptionParams): useQuerySubscriptionsReturn => {
	const subscriptionsQuery = useQuery({
		queryKey: [subscriptionKeys.subscriptions, params],
		queryFn: () => subscriptionService.getSubscriptions(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		subscriptions: subscriptionsQuery.data?.data,
		subscriptionsInfo: subscriptionsQuery.data?.info,
		page: subscriptionsQuery.data?.page,
		perPage: subscriptionsQuery.data?.perPage,
		total: subscriptionsQuery.data?.total,
		totalPages: subscriptionsQuery.data?.totalPages,
		isLoading: subscriptionsQuery.isLoading,
	};
};
