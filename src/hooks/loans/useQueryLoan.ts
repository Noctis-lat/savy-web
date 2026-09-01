import { useQuery } from "@tanstack/react-query";
import { loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";

export const useQueryLoan = (id: string) => {
	return useQuery({
		queryKey: [loanKeys.loan, id],
		queryFn: () => loanService.getLoan(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
