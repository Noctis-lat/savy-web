import { create } from "zustand";

type RecurringExpensesController = {
	recurringExpensesFilters: RecurringExpenseParams;

	setType: (type: RecurringExpenseType | undefined) => void;
	setSearch: (searchValue: string) => void;
	setIsActive: (activeOnly: boolean) => void;
	setSort: (sortBy: RecurringExpenseSortBy) => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: RecurringExpenseParams = {
	type: undefined,
	isActive: true,
	search: undefined,
	sortBy: "createdAt",
	order: "desc",
	page: 1,
	perPage: 10,
};

export const useRecurringExpensesController = create<RecurringExpensesController>()((set) => ({
	recurringExpensesFilters: { ...DEFAULT_FILTERS },

	setType: (type) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				type,
				page: 1,
			},
		}));
	},

	setSearch: (searchValue) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				search: searchValue || undefined,
				page: 1,
			},
		}));
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				isActive: activeOnly ? true : undefined,
				page: 1,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ recurringExpensesFilters: { ...DEFAULT_FILTERS } });
	},
}));
