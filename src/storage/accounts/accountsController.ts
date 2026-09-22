import { create } from "zustand";

type AccountsController = {
	accountsFilters: AccountParams;

	setSearch: (search: string) => void;
	setType: (type: AccountType) => void;
	setBank: (id: string) => void;
	setIsActive: (activeOnly: boolean) => void;
	setSort: (sortBy: "balance" | "name" | "createdAt") => void;
	setOrder: (order: "asc" | "desc") => void;
	setPage: (page: number) => void;
	setPerPage: (perPage: number) => void;
	setGroupedBy: (grouped: AccountGrouped) => void;
	resetFilters: () => void;
};

const DEFAULT_FILTERS: AccountParams = {
	search: undefined,
	type: undefined,
	bankId: undefined,
	isActive: true,
	sortBy: "name",
	order: "asc",
	page: 1,
	perPage: 10,
	info: true,
	groupedBy: "banks",
};

export const useAccountsController = create<AccountsController>()((set) => ({
	accountsFilters: { ...DEFAULT_FILTERS },

	setSearch: (search) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				search: search || undefined,
			},
		}));
	},

	setType: (type) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				type,
			},
		}));
	},

	setBank: (id) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				bankId: id,
			},
		}));
	},

	setIsActive: (activeOnly) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				isActive: activeOnly ? true : undefined,
			},
		}));
	},

	setSort: (sortBy) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				sortBy,
			},
		}));
	},

	setOrder: (order) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				order,
			},
		}));
	},

	setPage: (page) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				page,
			},
		}));
	},

	setPerPage: (perPage) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				perPage,
			},
		}));
	},

	setGroupedBy: (grouped) => {
		set((state) => ({
			accountsFilters: {
				...state.accountsFilters,
				groupedBy: grouped === "all" ? undefined : grouped,
			},
		}));
	},

	resetFilters: () => {
		set({ accountsFilters: { ...DEFAULT_FILTERS } });
	},
}));
