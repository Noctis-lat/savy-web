import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRANSACTIONS_QUERY_KEY, transactionService } from "@/services/transactions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateTransactionPayload) =>
			transactionService.createTransaction(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la transaccion");
		},
	});
};
