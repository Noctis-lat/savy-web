import type { CreateIncomeSourceFormValues } from "@/schemas/income-sources/createIncomeSourceSchema";

export const CREATE_INCOME_SOURCE_DEFAULT_VALUES: CreateIncomeSourceFormValues = {
	name: "",
	amount: 0,
	frequency: "MONTHLY",
	paydays: [],
	destinationAccountId: "",
};
