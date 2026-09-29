import { create } from "zustand";

type AccountTransactionsController = {
	transactionsFilters: AccountTransactionsParams;

	setSearch: (search: string) => void;
	setType: (type: TransactionType | undefined) => void;
	setCategoryId: (categoryId: string | undefined) => void;
	setFrom: (from: string | undefined) => void;
	setTo: (to: string | undefined) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	setSortBy: (sortBy: string) => void;
	setOrder: (order: "asc" | "desc") => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: AccountTransactionsParams = {
	search: undefined,
	type: undefined,
	categoryId: undefined,
	from: undefined,
	to: undefined,
	page: undefined,
	limit: 5,
	sortBy: "date",
	order: "desc",
};

export const useAccountTransactionsController = create<AccountTransactionsController>()((set) => ({
	transactionsFilters: { ...DEFAULT_FILTERS },

	setSearch: (search) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				search: search || undefined,
			},
		}));
	},

	setType: (type) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				type: type ?? undefined,
			},
		}));
	},

	setCategoryId: (categoryId) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				categoryId,
			},
		}));
	},

	setFrom: (from) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				from,
			},
		}));
	},

	setTo: (to) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				to,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				page,
			},
		}));
	},

	setLimit: (limit) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				limit,
			},
		}));
	},

	setSortBy: (sortBy) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				sortBy,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				order,
			},
		}));
	},

	resetFilters: () => {
		set({ transactionsFilters: { ...DEFAULT_FILTERS } });
	},
}));
