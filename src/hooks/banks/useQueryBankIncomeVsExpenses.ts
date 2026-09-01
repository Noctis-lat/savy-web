import { useQuery } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";

export const useQueryBankIncomeVsExpenses = (id: string, period: PeriodType) => {
	return useQuery({
		queryKey: [bankKeys.bankIncomeVsExpenses, id, period],
		queryFn: () => bankService.getBankIncomeVsExpenses(id, period),
		enabled: !!id,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
