import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNTS_QUERY_KEY, accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => accountService.deleteAccount(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la cuenta");
		},
	});
};
