import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";
import { percentToRate } from "@/utils/accounts/percentToRate";
import { localDateToIso } from "@/utils/formatters/localDateToIso";

/**
 * Builds the loan payload from validated create-account values.
 * Money stays in cents; the rate is converted from percent to a decimal fraction.
 * `remaining` is omitted on purpose — the backend defaults it to `principal`.
 */
export const buildLoanPayload = (
	accountId: string,
	accountValues: CreateAccountFormValues,
): CreateLoanPayload => ({
	accountId,
	principal: accountValues.principal ?? 0,
	interestRate: percentToRate(accountValues.interestRate ?? 0),
	termMonths: accountValues.termMonths ?? 1,
	monthlyPayment: accountValues.monthlyPayment ?? 0,
	startDate: accountValues.startDate
		? localDateToIso(accountValues.startDate)
		: new Date().toISOString(),
});
