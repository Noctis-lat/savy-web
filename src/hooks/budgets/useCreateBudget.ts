import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BUDGETS_QUERY_KEY, budgetService } from "@/services/budgets";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateBudgetPayload) => budgetService.createBudget(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BUDGETS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el presupuesto");
		},
	});
};
