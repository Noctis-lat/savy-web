import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys, bankKeys } from "@/content/services";
import { accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateAccountPayload) => accountService.createAccount(payload),
		onSuccess: (newAccount: Account) => {
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankAccounts, newAccount.bankId] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la cuenta");
		},
	});
};
