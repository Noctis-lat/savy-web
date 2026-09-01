import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => budgetService.deleteBudget(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: budgetKeys.budgets() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el presupuesto");
		},
	});
};
