import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys, bankKeys, transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateTransactionPayload) =>
			transactionService.createTransaction(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [transactionKeys.transactions] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la transacción");
		},
	});
};
