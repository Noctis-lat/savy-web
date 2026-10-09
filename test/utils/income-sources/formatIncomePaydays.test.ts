import { describe, expect, it } from "vitest";
import { formatIncomePaydays } from "@/utils/income-sources/formatIncomePaydays";

describe("formatIncomePaydays", () => {
	it("joins sorted days of month with 'y'", () => {
		expect(formatIncomePaydays("BIWEEKLY", [30, 15])).toBe("Días de pago: 15 y 30");
	});

	it("formats a single day of month", () => {
		expect(formatIncomePaydays("MONTHLY", [1])).toBe("Día de pago: 1");
	});

	it("uses weekday names for WEEKLY", () => {
		expect(formatIncomePaydays("WEEKLY", [5])).toBe("Día de pago: viernes");
	});

	it("handles empty paydays", () => {
		expect(formatIncomePaydays("MONTHLY", [])).toBe("Sin días de pago");
	});
});
