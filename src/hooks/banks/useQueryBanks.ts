import { useQuery } from "@tanstack/react-query";
import { BANKS_QUERY_KEY, bankService } from "@/services/banks";

export const useQueryBanks = () => {
	return useQuery({
		queryKey: BANKS_QUERY_KEY,
		queryFn: () => bankService.getAll(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
