import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditCardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateCreditCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateCreditCardPayload) => creditCardService.createCreditCard(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: creditCardKeys.creditCards() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la tarjeta de credito");
		},
	});
};
