import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SAVINGS_GOALS_QUERY_KEY, savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => savingsGoalService.deleteSavingsGoal(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVINGS_GOALS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la meta de ahorro");
		},
	});
};
