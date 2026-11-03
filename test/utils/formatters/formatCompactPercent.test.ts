import { describe, expect, it } from "vitest";
import { formatCompactPercent } from "@/utils/formatters/formatCompactPercent";

describe("formatCompactPercent", () => {
	it("drops trailing zeros", () => {
		expect(formatCompactPercent(0.36)).toBe("36%");
		expect(formatCompactPercent(0)).toBe("0%");
	});

	it("keeps up to two meaningful decimals", () => {
		expect(formatCompactPercent(0.365)).toBe("36.5%");
		expect(formatCompactPercent(0.12345)).toBe("12.35%");
	});
});
