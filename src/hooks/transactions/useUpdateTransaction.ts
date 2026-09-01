import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRANSACTIONS_QUERY_KEY, transactionService } from "@/services/transactions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateTransactionPayload }) =>
			transactionService.updateTransaction(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la transaccion");
		},
	});
};
