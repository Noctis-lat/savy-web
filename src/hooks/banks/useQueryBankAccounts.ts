import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBankAccounts = (id: string) => {
	return useQuery({
		queryKey: ["banks", id, "accounts"] as const,
		queryFn: () => bankService.getAccounts(id),
		enabled: !!id,
	});
};
