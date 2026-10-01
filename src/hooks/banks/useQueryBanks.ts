import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

type UseQueryBanksReturn = {
	banks: Bank[] | undefined;
	banksInfo: BankInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryBanks = (params?: BankParams): UseQueryBanksReturn => {
	const banksQuery = useQuery({
		queryKey: [bankKeys.banks, params],
		queryFn: () => bankService.getBanks(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		banks: banksQuery.data?.banks,
		banksInfo: banksQuery.data?.info,
		page: banksQuery.data?.page,
		perPage: banksQuery.data?.perPage,
		total: banksQuery.data?.total,
		totalPages: banksQuery.data?.totalPages,
		isLoading: banksQuery.isLoading,
	};
};
