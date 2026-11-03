import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { budgetKeys } from "@/content/services";
import { budgetService } from "@/services/budgets";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteBudgetPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => budgetService.deleteBudgetPermanent(id),
		onSuccess: () => {
			toast.success("Presupuesto eliminado permanentemente.");
			queryClient.invalidateQueries({ queryKey: [budgetKeys.budgets] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente el presupuesto");
		},
	});
};
