import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SAVINGS_GOALS_QUERY_KEY, savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateSavingsGoalPayload) =>
			savingsGoalService.createSavingsGoal(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVINGS_GOALS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la meta de ahorro");
		},
	});
};
