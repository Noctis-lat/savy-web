import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "@/content/services";
import { dashboardService } from "@/services/dashboard";

export const useQueryDashboardSummary = () => {
	return useQuery({
		queryKey: [dashboardKeys.dashboardSummary],
		queryFn: () => dashboardService.getSummary(),
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
