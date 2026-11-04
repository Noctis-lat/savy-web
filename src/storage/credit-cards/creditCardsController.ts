import { create } from "zustand";

type CreditCardsController = {
	creditCardsFilters: CreditCardParams;

	setSearch: (search: string) => void;
	setIsActive: (activeOnly: boolean) => void;
	setBankId: (bankId: string | undefined) => void;
	setHasUnpaidStatement: (hasUnpaidStatement: boolean) => void;
	setSort: (sortBy: "createdAt" | "creditLimit") => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: CreditCardParams = {
	isActive: true,
	bankId: undefined,
	hasUnpaidStatement: undefined,
	search: undefined,
	sortBy: "createdAt",
	order: "desc",
	page: 1,
	perPage: 10,
};

export const useCreditCardsController = create<CreditCardsController>()((set) => ({
	creditCardsFilters: { ...DEFAULT_FILTERS },

	setSearch: (search) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				search: search || undefined,
				page: 1,
			},
		}));
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				isActive: activeOnly,
				page: 1,
			},
		}));
	},

	setBankId: (bankId) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				bankId,
				page: 1,
			},
		}));
	},

	setHasUnpaidStatement: (hasUnpaidStatement) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				hasUnpaidStatement: hasUnpaidStatement ? true : undefined,
				page: 1,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			creditCardsFilters: {
				...state.creditCardsFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ creditCardsFilters: { ...DEFAULT_FILTERS } });
	},
}));
