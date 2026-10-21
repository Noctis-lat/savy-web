import { create } from "zustand";

type BudgetsController = {
	budgetsFilters: BudgetParams;

	setSearch: (searchValue: string) => void;
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
	search: undefined,
	sortBy: "name",
	order: "asc",
	page: 1,
	perPage: 10,
};

export const useBudgetsController = create<BudgetsController>()((set) => ({
	budgetsFilters: { ...DEFAULT_FILTERS },

	setSearch: (searchValue) => {
		set((state) => ({
			budgetsFilters: {
				...state.budgetsFilters,
				search: searchValue || undefined,
				page: 1,
			},
		}));
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
		set({ budgetsFilters: { ...DEFAULT_FILTERS } });
	},
}));
