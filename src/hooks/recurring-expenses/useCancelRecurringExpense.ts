import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCancelRecurringExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => recurringExpenseService.cancelRecurringExpense(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [recurringExpenseKeys.recurringExpenses] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al cancelar el gasto recurrente");
		},
	});
};
