import { ACCOUNT_TYPE_OPTIONS } from "@/content/banks/bankContent";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

/**
 * Account types offered by the create-account form. Extends the shared API options with
 * the form-only SAVINGS choice, which is created as a DEBIT/CASH account plus a savings goal.
 */
export const CREATE_ACCOUNT_TYPE_OPTIONS: Array<{
	label: string;
	value: CreateAccountFormValues["type"];
	description: string;
}> = [
	...ACCOUNT_TYPE_OPTIONS,
	{ label: "Ahorro", value: "SAVINGS", description: "Cuenta de ahorro con meta" },
];
