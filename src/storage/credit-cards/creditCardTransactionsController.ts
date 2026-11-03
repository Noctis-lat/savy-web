import { create } from "zustand";

type CreditCardTransactionsController = {
	creditCardTransactionsFilters: AccountTransactionsParams;

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

export const useCreditCardTransactionsController = create<CreditCardTransactionsController>()(
	(set) => ({
		creditCardTransactionsFilters: { ...DEFAULT_FILTERS },

		setSearch: (search) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					search: search || undefined,
				},
			}));
		},

		setType: (type) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					type: type ?? undefined,
				},
			}));
		},

		setCategoryId: (categoryId) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					categoryId,
				},
			}));
		},

		setFrom: (from) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					from,
				},
			}));
		},

		setTo: (to) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					to,
				},
			}));
		},

		setPage: (page) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					page,
				},
			}));
		},

		setLimit: (limit) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					limit,
				},
			}));
		},

		setSortBy: (sortBy) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					sortBy,
				},
			}));
		},

		setOrder: (order) => {
			set((state) => ({
				creditCardTransactionsFilters: {
					...state.creditCardTransactionsFilters,
					order,
				},
			}));
		},

		resetFilters: () => {
			set({ creditCardTransactionsFilters: { ...DEFAULT_FILTERS } });
		},
	}),
);
