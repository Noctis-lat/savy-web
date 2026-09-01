import { useQuery } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";

export const useQueryAccount = (id: string) => {
	return useQuery({
		queryKey: [accountKeys.account, id],
		queryFn: () => accountService.getAccount(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
