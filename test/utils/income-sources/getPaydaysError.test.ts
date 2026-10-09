import { describe, expect, it } from "vitest";
import { getPaydaysError } from "@/utils/income-sources/getPaydaysError";

describe("getPaydaysError", () => {
	it("accepts one weekday between 1 and 7 for WEEKLY", () => {
		expect(getPaydaysError("WEEKLY", [5])).toBeUndefined();
		expect(getPaydaysError("WEEKLY", [8])).toBe("Los días de pago deben estar entre 1 y 7");
		expect(getPaydaysError("WEEKLY", [])).toBe("Selecciona un día de la semana");
	});

	it("requires exactly two distinct days of month for BIWEEKLY", () => {
		expect(getPaydaysError("BIWEEKLY", [15, 30])).toBeUndefined();
		expect(getPaydaysError("BIWEEKLY", [15])).toBe("Selecciona dos días del mes");
		expect(getPaydaysError("BIWEEKLY", [15, 15])).toBe("Los días de pago no pueden repetirse");
		expect(getPaydaysError("BIWEEKLY", [0, 15])).toBe("Los días de pago deben estar entre 1 y 31");
	});

	it("requires one day of month between 1 and 31 for MONTHLY", () => {
		expect(getPaydaysError("MONTHLY", [31])).toBeUndefined();
		expect(getPaydaysError("MONTHLY", [32])).toBe("Los días de pago deben estar entre 1 y 31");
		expect(getPaydaysError("MONTHLY", [1, 15])).toBe("Selecciona un día del mes");
	});
});
