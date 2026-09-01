import { useQuery } from "@tanstack/react-query";
import { incomeSourceKeys } from "@/content/services";
import { incomeSourceService } from "@/services/income-sources";

export const useQueryIncomeSources = () => {
	return useQuery({
		queryKey: incomeSourceKeys.incomeSources(),
		queryFn: () => incomeSourceService.getIncomeSources(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
