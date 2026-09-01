import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREDIT_CARDS_QUERY_KEY, creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateCreditCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateCreditCardPayload) => creditCardService.createCreditCard(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CREDIT_CARDS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la tarjeta de credito");
		},
	});
};
