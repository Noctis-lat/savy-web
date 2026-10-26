import { create } from "zustand";

type SavingsGoalsController = {
	savingsGoalsFilters: SavingsGoalParams;

	setSearch: (search: string) => void;
	setIsCompleted: (completed: boolean) => void;
	setSortBy: (sortBy: "deadline" | "targetAmount" | "currentAmount") => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: SavingsGoalParams = {
	isCompleted: undefined,
	sortBy: "currentAmount",
	order: "asc",
	search: undefined,
	page: 1,
	perPage: 10,
};

export const useSavingsGoalsController = create<SavingsGoalsController>()((set) => ({
	savingsGoalsFilters: { ...DEFAULT_FILTERS },

	setSearch: (search) => {
		set((state) => ({
			savingsGoalsFilters: {
				...state.savingsGoalsFilters,
				search: search || undefined,
				page: 1,
			},
		}));
	},

	setIsCompleted: (completed) => {
		set((state) => ({
			savingsGoalsFilters: {
				...state.savingsGoalsFilters,
				isCompleted: completed ? true : undefined,
				page: 1,
			},
		}));
	},

	setSortBy: (sortBy) => {
		set((state) => ({
			savingsGoalsFilters: {
				...state.savingsGoalsFilters,
				sortBy,
				page: 1,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			savingsGoalsFilters: {
				...state.savingsGoalsFilters,
				order,
				page: 1,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			savingsGoalsFilters: {
				...state.savingsGoalsFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			savingsGoalsFilters: {
				...state.savingsGoalsFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({ savingsGoalsFilters: { ...DEFAULT_FILTERS } });
	},
}));
