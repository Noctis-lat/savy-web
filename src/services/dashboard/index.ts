import { httpClient, unwrap } from "../http-client";

export const DASHBOARD_QUERY_KEY = ["dashboard"] as const;

export const dashboardService: DashboardService = {
	getSummary: async (): Promise<DashboardSummary> => {
		const response = await httpClient.get<APIResponse<DashboardSummary>>("/dashboard/summary");
		return unwrap<DashboardSummary>(response);
	},
};
