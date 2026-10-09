import { describe, expect, it } from "vitest";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";

const BASE_VALUES: CreateAccountFormValues = {
	...CREATE_ACCOUNT_DEFAULT_VALUES,
	name: "Cuenta de prueba",
};

const getIssuePaths = (values: CreateAccountFormValues): string[] => {
	const result = createAccountSchema.safeParse(values);
	if (result.success) return [];
	return result.error.issues.map((issue) => issue.path.join("."));
};

describe("createAccountSchema", () => {
	it("accepts a DEBIT account without type-specific fields", () => {
		expect(createAccountSchema.safeParse(BASE_VALUES).success).toBe(true);
	});

	it("ignores credit/loan fields for CASH accounts", () => {
		expect(getIssuePaths({ ...BASE_VALUES, type: "CASH" })).toEqual([]);
	});

	describe("CREDIT", () => {
		const validCredit: CreateAccountFormValues = {
			...BASE_VALUES,
			type: "CREDIT",
			creditLimit: 5000000,
			cutDay: 15,
			paymentDay: 25,
			interestRate: 36.5,
		};

		it("accepts valid credit card fields", () => {
			expect(createAccountSchema.safeParse(validCredit).success).toBe(true);
		});

		it("requires creditLimit, cutDay, paymentDay and interestRate", () => {
			expect(getIssuePaths({ ...BASE_VALUES, type: "CREDIT" })).toEqual(
				expect.arrayContaining(["creditLimit", "cutDay", "paymentDay", "interestRate"]),
			);
		});

		it("rejects a zero credit limit", () => {
			expect(getIssuePaths({ ...validCredit, creditLimit: 0 })).toEqual(["creditLimit"]);
		});

		it("rejects days outside 1-31 or non integers", () => {
			expect(getIssuePaths({ ...validCredit, cutDay: 0, paymentDay: 32 })).toEqual([
				"cutDay",
				"paymentDay",
			]);
			expect(getIssuePaths({ ...validCredit, cutDay: 1.5 })).toEqual(["cutDay"]);
		});

		it("rejects interest rates outside 0-100", () => {
			expect(getIssuePaths({ ...validCredit, interestRate: 100.5 })).toEqual(["interestRate"]);
			expect(getIssuePaths({ ...validCredit, interestRate: -1 })).toEqual(["interestRate"]);
		});
	});

	describe("LOAN", () => {
		const validLoan: CreateAccountFormValues = {
			...BASE_VALUES,
			type: "LOAN",
			principal: 10000000,
			interestRate: 15,
			termMonths: 36,
			monthlyPayment: 350000,
			startDate: "2026-10-03",
		};

		it("accepts valid loan fields", () => {
			expect(createAccountSchema.safeParse(validLoan).success).toBe(true);
		});

		it("requires principal, interestRate, termMonths, monthlyPayment and startDate", () => {
			expect(getIssuePaths({ ...BASE_VALUES, type: "LOAN" })).toEqual(
				expect.arrayContaining([
					"principal",
					"interestRate",
					"termMonths",
					"monthlyPayment",
					"startDate",
				]),
			);
		});

		it("rejects a term below 1 month or non integer", () => {
			expect(getIssuePaths({ ...validLoan, termMonths: 0 })).toEqual(["termMonths"]);
			expect(getIssuePaths({ ...validLoan, termMonths: 2.5 })).toEqual(["termMonths"]);
		});

		it("rejects an empty start date", () => {
			expect(getIssuePaths({ ...validLoan, startDate: "" })).toEqual(["startDate"]);
		});

		it("rejects malformed or impossible start dates", () => {
			expect(getIssuePaths({ ...validLoan, startDate: "not-a-date" })).toEqual(["startDate"]);
			expect(getIssuePaths({ ...validLoan, startDate: "2026-02-30" })).toEqual(["startDate"]);
			expect(getIssuePaths({ ...validLoan, startDate: "03/10/2026" })).toEqual(["startDate"]);
		});
	});

	describe("SAVINGS", () => {
		const validSavings: CreateAccountFormValues = {
			...BASE_VALUES,
			type: "SAVINGS",
			savingsTargetAmount: 1000000,
		};

		it("accepts a savings target without deadline", () => {
			expect(createAccountSchema.safeParse(validSavings).success).toBe(true);
		});

		it("accepts a savings target with a valid deadline", () => {
			expect(
				createAccountSchema.safeParse({ ...validSavings, savingsDeadline: "2027-06-30" }).success,
			).toBe(true);
		});

		it("requires a positive savings target", () => {
			expect(getIssuePaths({ ...validSavings, savingsTargetAmount: undefined })).toEqual([
				"savingsTargetAmount",
			]);
			expect(getIssuePaths({ ...validSavings, savingsTargetAmount: 0 })).toEqual([
				"savingsTargetAmount",
			]);
		});

		it("rejects an invalid deadline", () => {
			expect(getIssuePaths({ ...validSavings, savingsDeadline: "2027-02-30" })).toEqual([
				"savingsDeadline",
			]);
		});
	});
});
