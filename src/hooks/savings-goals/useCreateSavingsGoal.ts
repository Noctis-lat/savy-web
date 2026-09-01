import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateSavingsGoalPayload) =>
			savingsGoalService.createSavingsGoal(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [savingsGoalKeys.savingsGoals] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la meta de ahorro");
		},
	});
};
