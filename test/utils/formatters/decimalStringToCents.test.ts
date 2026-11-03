import { describe, expect, it } from "vitest";
import { decimalStringToCents } from "@/utils/formatters/decimalStringToCents";

describe("decimalStringToCents", () => {
	it("converts two-decimal peso strings to cents", () => {
		expect(decimalStringToCents("1000.00")).toBe(100000);
		expect(decimalStringToCents("3000.50")).toBe(300050);
	});

	it("avoids floating point errors", () => {
		expect(decimalStringToCents("0.29")).toBe(29);
		expect(decimalStringToCents("1.15")).toBe(115);
		expect(decimalStringToCents("19.99")).toBe(1999);
		expect(decimalStringToCents("333.33")).toBe(33333);
	});

	it("handles integers, single decimals and negatives", () => {
		expect(decimalStringToCents("1000")).toBe(100000);
		expect(decimalStringToCents("12.5")).toBe(1250);
		expect(decimalStringToCents("-45.10")).toBe(-4510);
	});

	it("returns 0 for empty or invalid input", () => {
		expect(decimalStringToCents("")).toBe(0);
		expect(decimalStringToCents("abc")).toBe(0);
	});
});
