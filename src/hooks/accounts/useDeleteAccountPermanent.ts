import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountKeys, bankKeys, dashboardKeys } from "@/content/services";
import { accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteAccountPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => accountService.deleteAccountPermanent(id),
		onSuccess: () => {
			toast.success("Cuenta eliminada permanentemente.");
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankAccounts] });
			queryClient.invalidateQueries({ queryKey: [dashboardKeys.dashboardSummary] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente la cuenta");
		},
	});
};
