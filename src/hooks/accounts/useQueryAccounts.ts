import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

type useQueryAccountsReturn = {
	accounts: Account[] | undefined;
	groupedAccounts: GroupedAccount[] | undefined;
	accountsInfo: AccountsInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryAccounts = (params?: AccountParams): useQueryAccountsReturn => {
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
