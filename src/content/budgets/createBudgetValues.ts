import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";

export const CREATE_BUDGET_DEFAULT_VALUES: CreateBudgetFormValues = {
	name: "",
	kind: "RECURRING",
	period: "MONTHLY",
	startDate: "",
	endDate: undefined,
	items: [],
};
