import { describe, expect, it } from "vitest";
import { getCreditUtilization } from "@/utils/credit-cards/getCreditUtilization";

describe("getCreditUtilization", () => {
	it("returns the rounded used percentage with the default variant", () => {
		expect(
			getCreditUtilization({ creditLimit: 100000, currentBalance: 33333, availableCredit: 66667 }),
		).toEqual({ percentage: 33, variant: "default", isOverLimit: false });
	});

	it("uses the warning and danger thresholds", () => {
		expect(
			getCreditUtilization({ creditLimit: 1000, currentBalance: 800, availableCredit: 200 })
				.variant,
		).toBe("warning");
		expect(
			getCreditUtilization({ creditLimit: 1000, currentBalance: 950, availableCredit: 50 }).variant,
		).toBe("danger");
	});

	it("flags the card as over the limit when available credit is negative", () => {
		expect(
			getCreditUtilization({ creditLimit: 1000, currentBalance: 1200, availableCredit: -200 }),
		).toEqual({ percentage: 120, variant: "danger", isOverLimit: true });
	});

	it("returns 0% when the card has no limit", () => {
		expect(getCreditUtilization({ creditLimit: 0, currentBalance: 0, availableCredit: 0 })).toEqual(
			{ percentage: 0, variant: "default", isOverLimit: false },
		);
	});
});
