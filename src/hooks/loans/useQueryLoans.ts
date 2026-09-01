import { useQuery } from "@tanstack/react-query";
import { loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";

export const useQueryLoans = () => {
	return useQuery({
		queryKey: [loanKeys.loans],
		queryFn: () => loanService.getLoans(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
