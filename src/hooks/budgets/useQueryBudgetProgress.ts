import { useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services/budgets";

export const useQueryBudgetProgress = (id: string) => {
	return useQuery({
		queryKey: ["budgets", id, "progress"] as const,
		queryFn: () => budgetService.getProgress(id),
		enabled: !!id,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
