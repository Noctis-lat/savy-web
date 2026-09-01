import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => accountService.deleteAccount(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la cuenta");
		},
	});
};
