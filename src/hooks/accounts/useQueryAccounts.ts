import { useQuery } from "@tanstack/react-query";
import { ACCOUNTS_QUERY_KEY, accountService } from "@/services/accounts";

export const useQueryAccounts = () => {
	return useQuery({
		queryKey: ACCOUNTS_QUERY_KEY,
		queryFn: () => accountService.getAccounts(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
