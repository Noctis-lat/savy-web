import { useQuery } from "@tanstack/react-query";
import { savingsGoalKeys } from "@/content/services";
import { savingsGoalService } from "@/services/savings-goals";

type SavingsGoalsReturn = {
	savingGoals: SavingsGoal[] | undefined;
	info: SavingsGoalsInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQuerySavingsGoals = (): SavingsGoalsReturn => {
	const savingGoalsQuery = useQuery({
		queryKey: [savingsGoalKeys.savingsGoals],
		queryFn: () => savingsGoalService.getSavingsGoals(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		savingGoals: savingGoalsQuery.data?.savingsGoals,
		info: savingGoalsQuery.data?.info,
		page: savingGoalsQuery.data?.page,
		perPage: savingGoalsQuery.data?.perPage,
		total: savingGoalsQuery.data?.total,
		totalPages: savingGoalsQuery.data?.totalPages,
		isLoading: savingGoalsQuery.isLoading,
	};
};
