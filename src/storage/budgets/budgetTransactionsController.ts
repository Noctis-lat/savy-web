import { create } from "zustand";

type BudgetTransactionsController = {
	budgetTransactionsFilters: BudgetTransactionsParams;

	setSearch: (search: string) => void;
	setType: (type: TransactionType | undefined) => void;
	setCategoryId: (categoryId: string | undefined) => void;
	setSortBy: (sortBy: BudgetTransactionsSortBy) => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	resetFilters: () => void;
};

// No from/to: the endpoint defaults to the budget's current period.
const DEFAULT_FILTERS: BudgetTransactionsParams = {
	search: undefined,
	type: undefined,
	categoryId: undefined,
	page: 1,
	limit: 5,
	sortBy: "date",
	order: "desc",
};

export const useBudgetTransactionsController = create<BudgetTransactionsController>()((set) => ({
	budgetTransactionsFilters: { ...DEFAULT_FILTERS },

	setSearch: (search) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				search: search || undefined,
				page: 1,
			},
		}));
	},

	setType: (type) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				type,
				page: 1,
			},
		}));
	},

	setCategoryId: (categoryId) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				categoryId,
				page: 1,
			},
		}));
	},

	setSortBy: (sortBy) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				page,
			},
		}));
	},

	setLimit: (limit) => {
		set((state) => ({
			budgetTransactionsFilters: {
				...state.budgetTransactionsFilters,
				limit,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ budgetTransactionsFilters: { ...DEFAULT_FILTERS } });
	},
}));
