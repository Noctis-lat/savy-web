import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/services/accounts";

export const useQueryAccount = (id: string) => {
	return useQuery({
		queryKey: ["accounts", id] as const,
		queryFn: () => accountService.getById(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
