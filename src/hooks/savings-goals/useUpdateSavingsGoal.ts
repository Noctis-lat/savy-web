import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SAVINGS_GOALS_QUERY_KEY, savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateSavingsGoalPayload }) =>
			savingsGoalService.updateSavingsGoal(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SAVINGS_GOALS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la meta de ahorro");
		},
	});
};
