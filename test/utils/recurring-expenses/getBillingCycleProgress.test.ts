import { describe, expect, it } from "vitest";
import { getBillingCycleProgress } from "@/utils/recurring-expenses/getBillingCycleProgress";

const previous = new Date(2026, 9, 1);
const next = new Date(2026, 9, 11);

describe("getBillingCycleProgress", () => {
	it("returns the rounded elapsed percent", () => {
		expect(getBillingCycleProgress(previous, next, new Date(2026, 9, 6))).toBe(50);
	});

	it("clamps to 0 before the previous charge", () => {
		expect(getBillingCycleProgress(previous, next, new Date(2026, 8, 20))).toBe(0);
	});

	it("clamps to 100 after the next charge", () => {
		expect(getBillingCycleProgress(previous, next, new Date(2026, 9, 20))).toBe(100);
	});
});
