import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

export const useQueryAccounts = (params?: AccountParams) => {
	const accountsQuery = useQuery({
		queryKey: [accountKeys.accounts],
		queryFn: () => accountService.getAccounts(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		accounts: accountsQuery.data?.accounts,
		accountsInfo: accountsQuery.data?.info,
		isLoading: accountsQuery.isLoading,
	};
};
