import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeactivateBudget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => budgetService.deactivateBudget(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [budgetKeys.budgets] });
			queryClient.invalidateQueries({ queryKey: [budgetKeys.budget] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al desactivar el presupuesto");
		},
	});
};
