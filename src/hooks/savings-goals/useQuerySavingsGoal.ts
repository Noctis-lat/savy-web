import { useQuery } from "@tanstack/react-query";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";

type useQuerySavingsGoalReturn = {
	savingsGoal: SavingsGoal | undefined;
	isLoading: boolean;
};

export const useQuerySavingsGoal = (id: string, byAccountId = false): useQuerySavingsGoalReturn => {
	const goalQuery = useQuery({
		queryKey: [savingsGoalKeys.savingsGoal, id, byAccountId ? { by: "account_id" } : {}],
		queryFn: () =>
			byAccountId
				? savingsGoalService.getSavingsGoalByAccountId(id)
				: savingsGoalService.getSavingsGoal(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		savingsGoal: goalQuery.data,
		isLoading: goalQuery.isLoading,
	};
};
