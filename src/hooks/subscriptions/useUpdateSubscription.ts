import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionKeys } from "@/content/services";
import { subscriptionService } from "@/services/subscriptions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateSubscription = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateSubscriptionPayload }) =>
			subscriptionService.updateSubscription(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [subscriptionKeys.subscriptions] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la suscripción");
		},
	});
};
