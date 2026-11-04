import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountKeys, savingsGoalKeys, transactionKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateSavingsGoal = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => savingsGoalService.activateSavingsGoal(id),
		onSuccess: () => {
			toast.success("Meta de ahorro reactivada.");
			queryClient.invalidateQueries({ queryKey: [savingsGoalKeys.savingsGoals] });
			queryClient.invalidateQueries({ queryKey: [savingsGoalKeys.savingsGoal] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.account] });
			queryClient.invalidateQueries({ queryKey: [transactionKeys.transactions] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar la meta de ahorro");
		},
	});
};
