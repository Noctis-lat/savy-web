import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

export const CREATE_ACCOUNT_DEFAULT_VALUES: CreateAccountFormValues = {
	name: "",
	type: "DEBIT",
	bankId: undefined,
	balance: 0,
	currency: "MXN",
	color: undefined,
	icon: undefined,
	interestRate: undefined,
	creditLimit: undefined,
	cutDay: undefined,
	paymentDay: undefined,
	principal: undefined,
	termMonths: undefined,
	monthlyPayment: undefined,
	startDate: undefined,
	isCashSavings: false,
	savingsTargetAmount: undefined,
	savingsDeadline: undefined,
};

/** Type-specific fields cleared when the account type changes. */
export const CREDIT_CARD_FIELDS = [
	"creditLimit",
	"cutDay",
	"paymentDay",
] as const satisfies ReadonlyArray<keyof CreateAccountFormValues>;

export const LOAN_FIELDS = [
	"principal",
	"termMonths",
	"monthlyPayment",
	"startDate",
] as const satisfies ReadonlyArray<keyof CreateAccountFormValues>;

export const SAVINGS_FIELDS = [
	"isCashSavings",
	"savingsTargetAmount",
	"savingsDeadline",
] as const satisfies ReadonlyArray<keyof CreateAccountFormValues>;
