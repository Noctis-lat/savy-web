import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateAccountPayload) => accountService.createAccount(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la cuenta");
		},
	});
};
