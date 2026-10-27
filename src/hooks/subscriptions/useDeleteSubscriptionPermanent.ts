import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionKeys } from "@/content/services";
import { subscriptionService } from "@/services/subscriptions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteSubscriptionPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => subscriptionService.deleteSubscriptionPermanent(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [subscriptionKeys.subscriptions] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente la suscripción");
		},
	});
};
