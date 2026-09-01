import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

export const useQueryBanks = () => {
	return useQuery({
		queryKey: bankKeys.banks(),
		queryFn: () => bankService.getBanks(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
