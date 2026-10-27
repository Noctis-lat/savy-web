import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateRecurringExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateRecurringExpensePayload) =>
			recurringExpenseService.createRecurringExpense(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [recurringExpenseKeys.recurringExpenses] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el gasto recurrente");
		},
	});
};
