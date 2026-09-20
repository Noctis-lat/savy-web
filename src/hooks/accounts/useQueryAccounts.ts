import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

export const useQueryAccounts = (params?: AccountParams) => {
	const accountsQuery = useQuery({
		queryKey: [accountKeys.accounts, params],
		queryFn: () => accountService.getAccounts(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		accounts: accountsQuery.data?.accounts,
		groupedAccounts: accountsQuery.data?.groupedAccounts,
		accountsInfo: accountsQuery.data?.info,
		page: accountsQuery.data?.page,
		perPage: accountsQuery.data?.perPage,
		total: accountsQuery.data?.total,
		totalPages: accountsQuery.data?.totalPages,
		isLoading: accountsQuery.isLoading,
	};
};
