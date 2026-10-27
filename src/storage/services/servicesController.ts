import { create } from "zustand";

type ServicesController = {
	servicesFilters: ServiceParams;

	setSearch: (searchValue: string) => void;
	setIsActive: (activeOnly: boolean) => void;
	setSort: (sortBy: RecurringExpenseSortBy) => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: ServiceParams = {
	isActive: true,
	search: undefined,
	sortBy: "createdAt",
	order: "desc",
	page: 1,
	perPage: 10,
};

export const useServicesController = create<ServicesController>()((set) => ({
	servicesFilters: { ...DEFAULT_FILTERS },

	setSearch: (searchValue) => {
		set((state) => ({
			servicesFilters: {
				...state.servicesFilters,
				search: searchValue || undefined,
				page: 1,
			},
		}));
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			servicesFilters: {
				...state.servicesFilters,
				isActive: activeOnly ? true : undefined,
				page: 1,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			servicesFilters: {
				...state.servicesFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			servicesFilters: {
				...state.servicesFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			servicesFilters: {
				...state.servicesFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			servicesFilters: {
				...state.servicesFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ servicesFilters: { ...DEFAULT_FILTERS } });
	},
}));
