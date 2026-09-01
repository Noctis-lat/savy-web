import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

export const useQueryBankLoans = (id: string) => {
	return useQuery({
		queryKey: bankKeys.bankLoans(id),
		queryFn: () => bankService.getBankLoans(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
