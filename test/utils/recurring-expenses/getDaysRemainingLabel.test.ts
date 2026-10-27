import { describe, expect, it } from "vitest";
import { getDaysRemainingLabel } from "@/utils/recurring-expenses/getDaysRemainingLabel";

describe("getDaysRemainingLabel", () => {
	const referenceDate = new Date(2026, 9, 27);

	it("returns the plural label for several days", () => {
		expect(getDaysRemainingLabel(new Date(2026, 10, 22), referenceDate)).toBe("Faltan 26 días");
	});

	it("returns the singular label for one day", () => {
		expect(getDaysRemainingLabel(new Date(2026, 9, 28), referenceDate)).toBe("Falta 1 día");
	});

	it("returns the same-day label when the charge is today or past", () => {
		expect(getDaysRemainingLabel(new Date(2026, 9, 27), referenceDate)).toBe("El cobro es hoy");
		expect(getDaysRemainingLabel(new Date(2026, 9, 25), referenceDate)).toBe("El cobro es hoy");
	});
});
