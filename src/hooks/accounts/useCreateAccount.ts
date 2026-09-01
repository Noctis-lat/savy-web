import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNTS_QUERY_KEY, accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateAccountPayload) => accountService.createAccount(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la cuenta");
		},
	});
};
