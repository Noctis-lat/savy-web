import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

type UseQueryBankReturn = {
	bank: Bank | undefined;
	isLoading: boolean;
};

export const useQueryBank = (bankId: string | undefined, info = false): UseQueryBankReturn => {
	const bankQuery = useQuery({
		queryKey: [bankKeys.bank, bankId, { info }],
		queryFn: () => bankService.getBank(bankId as string, info),
		enabled: !!bankId,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		bank: bankQuery.data,
		isLoading: bankQuery.isLoading,
	};
};
