import { useQuery } from "@tanstack/react-query";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";

export const useQuerySavingsGoal = (id: string) => {
	return useQuery({
		queryKey: savingsGoalKeys.savingsGoal(id),
		queryFn: () => savingsGoalService.getSavingsGoal(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
