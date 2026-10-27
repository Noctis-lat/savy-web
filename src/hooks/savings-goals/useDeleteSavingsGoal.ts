import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => savingsGoalService.deleteSavingsGoal(id),
		onSuccess: () => {
			toast.success(`Meta de ahorro eliminada exitosamente.`);
			queryClient.invalidateQueries({ queryKey: [savingsGoalKeys.savingsGoals] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la meta de ahorro");
		},
	});
};
