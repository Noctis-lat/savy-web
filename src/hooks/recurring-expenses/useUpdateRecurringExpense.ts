import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recurringExpenseKeys } from "@/content/services";
import { recurringExpenseService } from "@/services/recurring-expenses";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateRecurringExpense = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateRecurringExpensePayload }) =>
			recurringExpenseService.updateRecurringExpense(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [recurringExpenseKeys.recurringExpenses] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el gasto recurrente");
		},
	});
};
