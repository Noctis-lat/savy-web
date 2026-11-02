import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys, bankKeys, creditCardKeys, dashboardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateCreditCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateCreditCardPayload }) =>
			creditCardService.updateCreditCard(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [creditCardKeys.creditCards] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankCreditCards] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankLoans] });
			queryClient.invalidateQueries({ queryKey: [dashboardKeys.dashboardSummary] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la tarjeta de credito");
		},
	});
};
