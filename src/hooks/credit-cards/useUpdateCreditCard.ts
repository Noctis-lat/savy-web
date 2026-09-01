import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREDIT_CARDS_QUERY_KEY, creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateCreditCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateCreditCardPayload }) =>
			creditCardService.updateCreditCard(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CREDIT_CARDS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la tarjeta de credito");
		},
	});
};
