import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

export const useQueryBanks = (params?: BankParams) => {
	return useQuery({
		queryKey: [bankKeys.banks, params],
		queryFn: () => bankService.getBanks(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
