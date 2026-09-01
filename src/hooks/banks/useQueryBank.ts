import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBank = (id: string, info = false) => {
	return useQuery({
		queryKey: ["banks", id, { info }] as const,
		queryFn: () => bankService.getBank(id, info),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
