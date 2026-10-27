import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteRecurringExpensePermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => recurringExpenseService.deleteRecurringExpensePermanent(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [recurringExpenseKeys.recurringExpenses] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente el gasto recurrente");
		},
	});
};
