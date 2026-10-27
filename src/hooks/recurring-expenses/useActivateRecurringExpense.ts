import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateRecurringExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => recurringExpenseService.activateRecurringExpense(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [recurringExpenseKeys.recurringExpenses] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar el gasto recurrente");
		},
	});
};
