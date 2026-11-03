import { describe, expect, it } from "vitest";
import { getCardStatementStatus } from "@/utils/card-statements/getCardStatementStatus";

const today = new Date(2026, 10, 2);

describe("getCardStatementStatus", () => {
	it("returns PAID when the statement is paid, even past its due date", () => {
		expect(
			getCardStatementStatus({ isPaid: true, paymentDueDate: "2026-10-01T00:00:00.000Z" }, today),
		).toBe("PAID");
	});

	it("returns OVERDUE when unpaid and the due date is before today", () => {
		expect(
			getCardStatementStatus({ isPaid: false, paymentDueDate: "2026-11-01T00:00:00.000Z" }, today),
		).toBe("OVERDUE");
	});

	it("returns PENDING when unpaid and due today or later", () => {
		expect(
			getCardStatementStatus({ isPaid: false, paymentDueDate: "2026-11-02T00:00:00.000Z" }, today),
		).toBe("PENDING");
		expect(
			getCardStatementStatus({ isPaid: false, paymentDueDate: "2026-11-20T00:00:00.000Z" }, today),
		).toBe("PENDING");
	});

	it("returns PENDING when the due date is missing", () => {
		expect(getCardStatementStatus({ isPaid: false }, today)).toBe("PENDING");
	});
});
