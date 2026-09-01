import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BUDGETS_QUERY_KEY, budgetService } from "@/services/budgets";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => budgetService.deleteBudget(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BUDGETS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el presupuesto");
		},
	});
};
