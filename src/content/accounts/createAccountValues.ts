import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

export const CREATE_ACCOUNT_DEFAULT_VALUES: CreateAccountFormValues = {
	name: "",
	type: undefined,
	bankId: undefined,
	balance: undefined,
	currency: "MXN",
	color: undefined,
	icon: undefined,
};
