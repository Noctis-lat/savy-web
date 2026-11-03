import { describe, expect, it } from "vitest";
import { isEditableTransaction } from "@/utils/transactions/isEditableTransaction";
import { signedAmount } from "@/utils/transactions/signedAmount";

const baseTransaction: Transaction = {
	id: "t1",
	accountId: "account-1",
	destinationAccountId: undefined,
	categoryId: undefined,
	type: "EXPENSE",
	amount: 1000,
	description: undefined,
	note: undefined,
	date: "2026-10-05",
	createdAt: "2026-10-05",
	updatedAt: "2026-10-05",
};

describe("isEditableTransaction", () => {
	it("rejects statement-generated installments", () => {
		expect(isEditableTransaction({ ...baseTransaction, type: "INSTALLMENT" })).toBe(false);
	});

	it("accepts user-created transaction types", () => {
		for (const type of ["INCOME", "EXPENSE", "TRANSFER", "PAYMENT"] as const) {
			expect(isEditableTransaction({ ...baseTransaction, type })).toBe(true);
		}
	});
});

describe("signedAmount", () => {
	it("treats installments as charges", () => {
		expect(signedAmount("INSTALLMENT", 1000)).toBe(-1000);
	});

	it("keeps incomes positive", () => {
		expect(signedAmount("INCOME", 1000)).toBe(1000);
	});
});
