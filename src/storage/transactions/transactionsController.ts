import { create } from "zustand";

type TransactionsController = {
	transactionsFilters: TransactionParams;

	setAccountId: (accountId: string | undefined) => void;
	setType: (type: TransactionType | undefined) => void;
	setCategoryId: (categoryId: string | undefined) => void;
	setBankId: (bankId: string | undefined) => void;
	setSearch: (search: string) => void;
	setFrom: (from: string | undefined) => void;
	setTo: (to: string | undefined) => void;
	setSortBy: (sortBy: "date" | "amount" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	setInfo: (info: boolean) => void;
	setPeriod: (period: PeriodType) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: TransactionParams = {
	accountId: undefined,
	type: undefined,
	categoryId: undefined,
	bankId: undefined,
	search: undefined,
	from: undefined,
	to: undefined,
	sortBy: "createdAt",
	order: "desc",
	page: 1,
	limit: 20,
	info: false,
	period: "day",
};

export const useTransactionsController = create<TransactionsController>()((set) => ({
	transactionsFilters: { ...DEFAULT_FILTERS },

	setAccountId: (accountId) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				accountId,
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

	setBankId: (bankId) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				bankId,
			},
		}));
	},

	setSearch: (search) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				search: search || undefined,
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

	setInfo: (info) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				info,
			},
		}));
	},

	setPeriod: (period) => {
		set((state) => ({
			transactionsFilters: {
				...state.transactionsFilters,
				period,
			},
		}));
	},

	resetFilters: () => {
		set({ transactionsFilters: { ...DEFAULT_FILTERS } });
	},
}));
