import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountKeys, savingsGoalKeys, transactionKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteSavingsGoalPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => savingsGoalService.deleteSavingsGoalPermanent(id),
		onSuccess: () => {
			toast.success("Meta de ahorro eliminada permanentemente.");
			queryClient.invalidateQueries({ queryKey: [savingsGoalKeys.savingsGoals] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.account] });
			queryClient.invalidateQueries({ queryKey: [transactionKeys.transactions] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente la meta de ahorro");
		},
	});
};
