import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountKeys, bankKeys, creditCardKeys, dashboardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateCreditCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => creditCardService.activateCreditCard(id),
		onSuccess: () => {
			toast.success("Tarjeta de crédito reactivada.");
			queryClient.invalidateQueries({ queryKey: [creditCardKeys.creditCards] });
			queryClient.invalidateQueries({ queryKey: [creditCardKeys.creditCard] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.account] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankCreditCards] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankLoans] });
			queryClient.invalidateQueries({ queryKey: [dashboardKeys.dashboardSummary] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar la tarjeta de crédito");
		},
	});
};
