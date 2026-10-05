import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";
import { percentToRate } from "@/utils/accounts/percentToRate";

/**
 * Builds the credit card payload from validated create-account values.
 * Money stays in cents; the rate is converted from percent to a decimal fraction.
 */
export const buildCreditCardPayload = (
	accountId: string,
	accountValues: CreateAccountFormValues,
): CreateCreditCardPayload => ({
	accountId,
	creditLimit: accountValues.creditLimit ?? 0,
	cutDay: accountValues.cutDay ?? 1,
	paymentDay: accountValues.paymentDay ?? 1,
	interestRate: percentToRate(accountValues.interestRate ?? 0),
	...(accountValues.noInterestMonths !== undefined && {
		noInterestMonths: accountValues.noInterestMonths,
	}),
});
