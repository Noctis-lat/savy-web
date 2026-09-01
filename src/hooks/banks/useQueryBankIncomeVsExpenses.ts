import { useQuery } from "@tanstack/react-query";
import { bankService } from "@/services/banks";

export const useQueryBankIncomeVsExpenses = (id: string, period: PeriodType) => {
	return useQuery({
		queryKey: ["banks", id, "income-vs-expenses", period] as const,
		queryFn: () => bankService.getBankIncomeVsExpenses(id, period),
		enabled: !!id,
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
