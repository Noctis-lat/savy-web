import { create } from "zustand";

type RecurringExpensesController = {
	recurringExpensesFilters: RecurringExpenseParams;

	setType: (type: RecurringExpenseType | undefined) => void;
	setIsActive: (activeOnly: boolean) => void;
	setSort: (sortBy: RecurringExpenseSortBy) => void;
	setOrder: (order: "asc" | "desc") => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: RecurringExpenseParams = {
	type: undefined,
	isActive: true,
	sortBy: "createdAt",
	order: "desc",
};

export const useRecurringExpensesController = create<RecurringExpensesController>()((set) => ({
	recurringExpensesFilters: { ...DEFAULT_FILTERS },

	setType: (type) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				type,
			},
		}));
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				isActive: activeOnly ? true : undefined,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				sortBy,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			recurringExpensesFilters: {
				...state.recurringExpensesFilters,
				order,
			},
		}));
	},

	resetFilters: () => {
		set({ recurringExpensesFilters: { ...DEFAULT_FILTERS } });
	},
}));
