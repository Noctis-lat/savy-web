import { useQuery } from "@tanstack/react-query";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";

export const useQuerySavingsGoals = () => {
	return useQuery({
		queryKey: savingsGoalKeys.savingsGoals(),
		queryFn: () => savingsGoalService.getSavingsGoals(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
