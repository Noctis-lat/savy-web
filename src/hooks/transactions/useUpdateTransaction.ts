import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateTransactionPayload }) =>
			transactionService.updateTransaction(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: transactionKeys.transactions() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la transaccion");
		},
	});
};
