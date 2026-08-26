import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBank = (id: string, info = false) => {
	return useQuery({
		queryKey: ["banks", id, { info }] as const,
		queryFn: () => bankService.getById(id, info),
		enabled: !!id,
	});
};
