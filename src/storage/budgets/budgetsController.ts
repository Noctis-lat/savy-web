import { create } from "zustand";

type BudgetsController = {
	budgetsFilters: BudgetParams;
	searchQuery: string;

	setSearchQuery: (query: string) => void;
	setIsActive: (activeOnly: boolean) => void;
	setKind: (kind: BudgetKind | undefined) => void;
	setPeriod: (period: BudgetPeriod | undefined) => void;
	setSort: (sortBy: "name" | "startDate" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: BudgetParams = {
	isActive: true,
	kind: undefined,
	period: undefined,
	sortBy: "name",
	order: "asc",
	page: 1,
	perPage: 10,
};

export const useBudgetsController = create<BudgetsController>()((set) => ({
	budgetsFilters: { ...DEFAULT_FILTERS },
	searchQuery: "",

	setSearchQuery: (query) => {
		set({ searchQuery: query });
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				isActive: activeOnly ? true : undefined,
				page: 1,
			},
		}));
	},

	setKind: (kind) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				kind,
				page: 1,
			},
		}));
	},

	setPeriod: (period) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				period,
				page: 1,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ budgetsFilters: { ...DEFAULT_FILTERS }, searchQuery: "" });
	},
}));
