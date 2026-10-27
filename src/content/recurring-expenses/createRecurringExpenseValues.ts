import type { CreateRecurringExpenseFormValues } from "@/schemas/recurring-expenses/createRecurringExpenseSchema";

export const CREATE_RECURRING_EXPENSE_DEFAULT_VALUES: CreateRecurringExpenseFormValues = {
	name: "",
	amount: 0,
	frequency: "MONTHLY",
	billingDay: 1,
	billingDay2: undefined,
	type: undefined,
	accountId: "",
	categoryId: undefined,
	url: "",
	color: undefined,
	icon: undefined,
};
