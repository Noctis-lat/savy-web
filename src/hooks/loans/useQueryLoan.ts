import { useQuery } from "@tanstack/react-query";
import { loanService } from "@/services/loans";

export const useQueryLoan = (id: string) => {
	return useQuery({
		queryKey: ["loans", id] as const,
		queryFn: () => loanService.getById(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
