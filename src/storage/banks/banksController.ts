import { create } from "zustand";

type BanksController = {
	banksFilters: BankParams;
	searchQuery: string;

	setSearchQuery: (query: string) => void;
	setSortBy: (sortBy: "name" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setStatusFilter: (filter: "all" | "active" | "inactive") => void;
	resetFilters: () => void;
};

export const useBanksController = create<BanksController>()((set) => ({
	banksFilters: {
		isActive: undefined,
		sortBy: "name",
		order: "asc",
		info: true,
	},

	searchQuery: "",

	setSearchQuery: (query) => {
		set({ searchQuery: query });
	},

	setSortBy: (sortBy) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				sortBy,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				order,
			},
		}));
	},

	setStatusFilter: (filter) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				isActive: filter === "all" ? undefined : filter === "active",
			},
		}));
	},

	resetFilters: () => {
		set({
			searchQuery: "",
			banksFilters: {
				isActive: undefined,
				sortBy: "name",
				order: "asc",
				info: true,
			},
		});
	},
}));
