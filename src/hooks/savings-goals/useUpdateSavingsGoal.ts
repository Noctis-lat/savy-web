import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateSavingsGoalPayload }) =>
			savingsGoalService.updateSavingsGoal(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: savingsGoalKeys.savingsGoals() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la meta de ahorro");
		},
	});
};
