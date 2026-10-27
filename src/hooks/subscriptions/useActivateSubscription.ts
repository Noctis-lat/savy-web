import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionKeys } from "@/content/services";
import { subscriptionService } from "@/services/subscriptions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateSubscription = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => subscriptionService.activateSubscription(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [subscriptionKeys.subscriptions] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar la suscripción");
		},
	});
};
