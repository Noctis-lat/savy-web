import { create } from "zustand";

type SubscriptionsController = {
	subscriptionsFilters: SubscriptionParams;

	setSearch: (searchValue: string) => void;
	setIsActive: (activeOnly: boolean) => void;
	setSort: (sortBy: RecurringExpenseSortBy) => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: SubscriptionParams = {
	isActive: true,
	search: undefined,
	sortBy: "createdAt",
	order: "desc",
	page: 1,
	perPage: 10,
};

export const useSubscriptionsController = create<SubscriptionsController>()((set) => ({
	subscriptionsFilters: { ...DEFAULT_FILTERS },

	setSearch: (searchValue) => {
		set((state) => ({
			subscriptionsFilters: {
				...state.subscriptionsFilters,
				search: searchValue || undefined,
				page: 1,
			},
		}));
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			subscriptionsFilters: {
				...state.subscriptionsFilters,
				isActive: activeOnly ? true : undefined,
				page: 1,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			subscriptionsFilters: {
				...state.subscriptionsFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			subscriptionsFilters: {
				...state.subscriptionsFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			subscriptionsFilters: {
				...state.subscriptionsFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			subscriptionsFilters: {
				...state.subscriptionsFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ subscriptionsFilters: { ...DEFAULT_FILTERS } });
	},
}));
