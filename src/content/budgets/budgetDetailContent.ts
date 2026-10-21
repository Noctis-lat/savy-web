/** Stable keys for skeleton placeholder rows in the budget detail sections. */
export const BUDGET_DETAIL_SKELETON_ROWS = ["first", "second", "third", "fourth"];

/** Budgets only track income and expense categories, so transfers and payments are not offered. */
export const BUDGET_TRANSACTION_TYPE_FILTER_OPTIONS: Option[] = [
	{ label: "Todos los tipos", value: "all" },
	{ label: "Ingreso", value: "INCOME" },
	{ label: "Gasto", value: "EXPENSE" },
];

export const BUDGET_TRANSACTIONS_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
