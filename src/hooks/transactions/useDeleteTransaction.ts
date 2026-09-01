import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionKeys } from "@/content/services";
import { transactionService } from "@/services/transactions";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => transactionService.deleteTransaction(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: transactionKeys.transactions() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la transaccion");
		},
	});
};
