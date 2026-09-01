import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_QUERY_KEY, dashboardService } from "@/services/dashboard";

export const useQueryDashboardSummary = () => {
	return useQuery({
		queryKey: [...DASHBOARD_QUERY_KEY, "summary"] as const,
		queryFn: () => dashboardService.getSummary(),
		staleTime: 60_000,
		gcTime: 1000 * 60 * 5,
	});
};
