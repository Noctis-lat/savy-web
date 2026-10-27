import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

/**
 * Picks only the account fields from the create-account form, dropping credit card/loan/savings fields.
 * The form-only SAVINGS type is mapped to the real API type (CASH or DEBIT).
 */
export const buildAccountPayload = (
	accountValues: CreateAccountFormValues,
): CreateAccountPayload => {
	const { name, type, isCashSavings, bankId, balance, currency, color, icon } = accountValues;
	const isSavings = type === "SAVINGS";
	const accountType: AccountType = isSavings ? (isCashSavings ? "CASH" : "DEBIT") : type;

	const payload: CreateAccountPayload = {
		name,
		type: accountType,
		bankId,
		balance,
		currency,
		color,
		icon,
	};

	if (isSavings) {
		payload.isSavingGoal = true;
	}

	return payload;
};
