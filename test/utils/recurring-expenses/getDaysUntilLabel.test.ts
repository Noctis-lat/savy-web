import { describe, expect, it } from "vitest";
import { getDaysUntilLabel } from "@/utils/recurring-expenses/getDaysUntilLabel";

const reference = new Date(2026, 9, 27, 18, 0);

describe("getDaysUntilLabel", () => {
	it("returns 'Hoy' for the same calendar day", () => {
		expect(getDaysUntilLabel(new Date(2026, 9, 27), reference)).toBe("Hoy");
	});

	it("returns 'Mañana' for the next calendar day", () => {
		expect(getDaysUntilLabel(new Date(2026, 9, 28), reference)).toBe("Mañana");
	});

	it("returns 'en N días' otherwise", () => {
		expect(getDaysUntilLabel(new Date(2026, 10, 22), reference)).toBe("en 26 días");
	});
});
