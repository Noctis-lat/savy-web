import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

export const useQueryAccounts = () => {
	return useQuery({
		queryKey: accountKeys.accounts(),
		queryFn: () => accountService.getAccounts(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
