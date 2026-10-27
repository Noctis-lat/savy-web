import type { CreateRecurringExpenseFormValues } from "@/schemas/recurring-expenses/createRecurringExpenseSchema";

export const CREATE_RECURRING_EXPENSE_DEFAULT_VALUES: CreateRecurringExpenseFormValues = {
	name: "",
	amount: 0,
	frequency: "MONTHLY",
	billingDays: [],
	billingDate: undefined,
	accountId: "",
	categoryId: undefined,
	url: "",
	color: undefined,
	icon: undefined,
};
