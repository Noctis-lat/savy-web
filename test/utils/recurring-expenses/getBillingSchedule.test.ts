import { describe, expect, it } from "vitest";
import { getBillingSchedule } from "@/utils/recurring-expenses/getBillingSchedule";

const reference = new Date(2026, 9, 27);

describe("getBillingSchedule", () => {
	it("returns previous and next charges for a monthly day", () => {
		const { previous, upcoming } = getBillingSchedule("MONTHLY", [22], reference, 3);

		expect(previous).toEqual(new Date(2026, 9, 22));
		expect(upcoming).toEqual([
			new Date(2026, 10, 22),
			new Date(2026, 11, 22),
			new Date(2027, 0, 22),
		]);
	});

	it("clamps day 31 to the last day of February", () => {
		const { upcoming } = getBillingSchedule("MONTHLY", [31], new Date(2027, 1, 1), 2);

		expect(upcoming).toEqual([new Date(2027, 1, 28), new Date(2027, 2, 31)]);
	});

	it("handles biweekly days 1 and 15", () => {
		const { previous, upcoming } = getBillingSchedule("BIWEEKLY", [1, 15], reference, 3);

		expect(previous).toEqual(new Date(2026, 9, 15));
		expect(upcoming).toEqual([
			new Date(2026, 10, 1),
			new Date(2026, 10, 15),
			new Date(2026, 11, 1),
		]);
	});

	it("handles weekly charges on Monday (ISO 1)", () => {
		// 2026-10-27 is a Tuesday
		const { previous, upcoming } = getBillingSchedule("WEEKLY", [1], reference, 2);

		expect(previous).toEqual(new Date(2026, 9, 26));
		expect(upcoming).toEqual([new Date(2026, 10, 2), new Date(2026, 10, 9)]);
	});

	it("handles weekly charges on Sunday (ISO 7)", () => {
		const { upcoming } = getBillingSchedule("WEEKLY", [7], reference, 1);

		expect(upcoming).toEqual([new Date(2026, 10, 1)]);
	});

	it("counts a charge on the reference day as upcoming", () => {
		const { previous, upcoming } = getBillingSchedule(
			"MONTHLY",
			[27],
			new Date(2026, 9, 27, 15, 30),
			1,
		);

		expect(previous).toEqual(new Date(2026, 8, 27));
		expect(upcoming).toEqual([new Date(2026, 9, 27)]);
	});

	it("returns an empty schedule for YEARLY", () => {
		expect(getBillingSchedule("YEARLY", [15], reference, 3)).toEqual({
			previous: undefined,
			upcoming: [],
		});
	});

	it("returns an empty schedule when there are no billing days", () => {
		expect(getBillingSchedule("MONTHLY", [], reference, 3)).toEqual({
			previous: undefined,
			upcoming: [],
		});
	});
});
