import { create } from "zustand";

type BanksController = {
	banksFilters: BankParams;

	setSearch: (search: string) => void;
	setSortBy: (sortBy: "name" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setActiveOnly: (activeOnly: boolean) => void;
	resetFilters: () => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
};

export const useBanksController = create<BanksController>()((set) => ({
	banksFilters: {
		isActive: true,
		search: undefined,
		sortBy: "name",
		order: "asc",
		page: 1,
		perPage: 10,
		info: true,
	},

	setSearch: (search) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				search: search || undefined,
				page: 1,
			},
		}));
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

	setPage: (page) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			banksFilters: {
				...state.banksFilters,
				perPage,
				page: 1,
			},
		}));
	},

	resetFilters: () => {
		set({
			banksFilters: {
				isActive: true,
				search: undefined,
				sortBy: "name",
				order: "asc",
				page: 1,
				perPage: 10,
				info: true,
			},
		});
	},
}));
