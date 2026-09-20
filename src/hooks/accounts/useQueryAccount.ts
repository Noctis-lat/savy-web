import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

export const useQueryAccount = (accountId?: string) => {
	const accountQuery = useQuery({
		queryKey: [accountKeys.account, accountId],
		queryFn: () => accountService.getAccount(accountId as string),
		enabled: !!accountId,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		account: accountQuery.data,
		isLoading: accountQuery.isLoading,
	};
};
