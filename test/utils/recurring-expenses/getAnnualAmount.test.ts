import { describe, expect, it } from "vitest";
import { getAnnualAmount } from "@/utils/recurring-expenses/getAnnualAmount";

describe("getAnnualAmount", () => {
	it("multiplies by the frequency occurrences per year", () => {
		expect(getAnnualAmount(1000, "WEEKLY")).toBe(52000);
		expect(getAnnualAmount(1000, "BIWEEKLY")).toBe(24000);
		expect(getAnnualAmount(22200, "MONTHLY")).toBe(266400);
		expect(getAnnualAmount(150000, "YEARLY")).toBe(150000);
	});
});
