import { useQuery } from "@tanstack/react-query";
import { LOANS_QUERY_KEY, loanService } from "@/services/loans";

export const useQueryLoans = () => {
	return useQuery({
		queryKey: LOANS_QUERY_KEY,
		queryFn: () => loanService.getAll(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
