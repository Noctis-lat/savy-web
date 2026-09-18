import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

export const useQueryBank = (id: string, info = false) => {
	const bankQuery = useQuery({
		queryKey: [bankKeys.bank, id, { info }],
		queryFn: () => bankService.getBank(id, info),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		bank: bankQuery.data,
		isLoading: bankQuery.isLoading,
	};
};
