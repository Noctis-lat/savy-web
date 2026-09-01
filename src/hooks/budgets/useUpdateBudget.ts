import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BUDGETS_QUERY_KEY, budgetService } from "@/services/budgets";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateBudgetPayload }) =>
			budgetService.updateBudget(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BUDGETS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el presupuesto");
		},
	});
};
