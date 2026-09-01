import { useQuery } from "@tanstack/react-query";
import { INCOME_SOURCES_QUERY_KEY, incomeSourceService } from "@/services/income-sources";

export const useQueryIncomeSources = () => {
	return useQuery({
		queryKey: INCOME_SOURCES_QUERY_KEY,
		queryFn: () => incomeSourceService.getAll(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
