import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditCardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteCreditCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => creditCardService.deleteCreditCard(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [creditCardKeys.creditCards] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la tarjeta de credito");
		},
	});
};
