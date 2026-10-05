import { describe, expect, it } from "vitest";
import { percentToRate } from "@/utils/accounts/percentToRate";

describe("percentToRate", () => {
	it("converts a decimal percent into a fraction", () => {
		expect(percentToRate(16.5)).toBe(0.165);
	});

	it("converts an integer percent into a fraction", () => {
		expect(percentToRate(36)).toBe(0.36);
	});

	it("removes floating point noise", () => {
		expect(percentToRate(0.1 + 0.2)).toBe(0.003);
		expect(percentToRate(12.34)).toBe(0.1234);
	});

	it("returns 0 for 0%", () => {
		expect(percentToRate(0)).toBe(0);
	});
});
