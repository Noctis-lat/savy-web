import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys, bankKeys, transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateTransactionPayload }) =>
			transactionService.updateTransaction(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [transactionKeys.transactions] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.account] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accountIncomesExpenses] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accountTransactions] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bank] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankIncomeVsExpenses] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la transaccion");
		},
	});
};
