import { describe, expect, it } from "vitest";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";
import { buildAccountPayload } from "@/utils/accounts/buildAccountPayload";

const SAVINGS_VALUES: CreateAccountFormValues = {
	...CREATE_ACCOUNT_DEFAULT_VALUES,
	name: "Fondo de emergencia",
	type: "SAVINGS",
	savingsTargetAmount: 1000000,
};

describe("buildAccountPayload", () => {
	it("maps SAVINGS to DEBIT by default", () => {
		expect(buildAccountPayload(SAVINGS_VALUES).type).toBe("DEBIT");
	});

	it("maps SAVINGS to CASH when isCashSavings is set", () => {
		expect(buildAccountPayload({ ...SAVINGS_VALUES, isCashSavings: true }).type).toBe("CASH");
	});

	it("keeps API types unchanged and drops savings fields", () => {
		const accountPayload = buildAccountPayload({ ...SAVINGS_VALUES, type: "LOAN" });
		expect(accountPayload.type).toBe("LOAN");
		expect(accountPayload).not.toHaveProperty("savingsTargetAmount");
		expect(accountPayload).not.toHaveProperty("isCashSavings");
	});
});
