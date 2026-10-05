import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys, bankKeys, dashboardKeys } from "@/content/services";
import { accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

type UseDeleteAccountOptions = {
	/** Set to false when the caller shows its own error feedback (e.g. silent rollbacks). Default: true */
	showErrorToast?: boolean;
};

export const useDeleteAccount = ({ showErrorToast = true }: UseDeleteAccountOptions = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => accountService.deleteAccount(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankAccounts] });
			queryClient.invalidateQueries({ queryKey: [dashboardKeys.dashboardSummary] });
		},
		onError: (error: unknown) => {
			if (showErrorToast) apiErrorToast(error, "Error al eliminar la cuenta");
		},
	});
};
