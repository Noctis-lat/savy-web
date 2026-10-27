import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionKeys } from "@/content/services";
import { subscriptionService } from "@/services/subscriptions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateSubscription = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateSubscriptionPayload) =>
			subscriptionService.createSubscription(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [subscriptionKeys.subscriptions] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la suscripción");
		},
	});
};
