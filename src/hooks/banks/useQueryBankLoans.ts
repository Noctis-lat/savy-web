import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBankLoans = (id: string) => {
	return useQuery({
		queryKey: ["banks", id, "loans"] as const,
		queryFn: () => bankService.getLoans(id),
		enabled: !!id,
	});
};
