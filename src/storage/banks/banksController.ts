import { create } from "zustand";

type BanksController = {
	banksFilters: BankParams;
	searchQuery: string;

	setSearchQuery: (query: string) => void;
	setSortBy: (sortBy: "name" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setActiveOnly: (activeOnly: boolean) => void;
	resetFilters: () => void;
};

export const useBanksController = create<BanksController>()((set) => ({
	banksFilters: {
		isActive: true,
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

	setActiveOnly: (activeOnly) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				isActive: activeOnly ? true : undefined,
			},
		}));
	},

	resetFilters: () => {
		set({
			searchQuery: "",
			banksFilters: {
				isActive: true,
				sortBy: "name",
				order: "asc",
				info: true,
			},
		});
	},
}));
