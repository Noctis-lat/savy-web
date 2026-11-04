import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountKeys, bankKeys, creditCardKeys, dashboardKeys } from "@/content/services";
import { creditCardService } from "@/services/credit-cards";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteCreditCardPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => creditCardService.deleteCreditCardPermanent(id),
		onSuccess: () => {
			toast.success("Tarjeta de crédito eliminada permanentemente.");
			queryClient.invalidateQueries({ queryKey: [creditCardKeys.creditCards] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.account] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankCreditCards] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankLoans] });
			queryClient.invalidateQueries({ queryKey: [dashboardKeys.dashboardSummary] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente la tarjeta de crédito");
		},
	});
};
