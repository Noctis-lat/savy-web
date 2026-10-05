import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";
import { localDateToIso } from "@/utils/formatters/localDateToIso";

/**
 * Builds the savings goal payload linked to a newly created SAVINGS account.
 * The goal reuses the account name and color; the target stays in cents.
 */
export const buildSavingsGoalPayload = (
	accountId: string,
	accountValues: CreateAccountFormValues,
): CreateSavingsGoalPayload => ({
	accountId,
	name: accountValues.name,
	targetAmount: accountValues.savingsTargetAmount ?? 0,
	...(accountValues.savingsDeadline && {
		deadline: localDateToIso(accountValues.savingsDeadline),
	}),
	...(accountValues.color && { color: accountValues.color }),
});
