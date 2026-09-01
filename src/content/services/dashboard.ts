export const dashboardKeys = {
	dashboard: () => ["dashboard"] as const,
	dashboardSummary: () => [...dashboardKeys.dashboard(), "summary"] as const,
};
