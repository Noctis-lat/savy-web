import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

export const CREATE_ACCOUNT_DEFAULT_VALUES: CreateAccountFormValues = {
	name: "",
	type: "DEBIT",
	bankId: undefined,
	balance: 0,
	currency: "MXN",
	color: undefined,
	icon: undefined,
};
