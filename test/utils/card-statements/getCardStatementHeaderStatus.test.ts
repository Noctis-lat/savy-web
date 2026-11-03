import { describe, expect, it } from "vitest";
import { getCardStatementHeaderStatus } from "@/utils/card-statements/getCardStatementHeaderStatus";

const today = new Date(2026, 10, 2);
const baseStatement = {
	isPaid: false,
	paymentDueDate: "2026-11-12T00:00:00.000Z",
	noInterestPayment: 425000,
	paidAmount: undefined,
	remainingBalance: undefined,
};

describe("getCardStatementHeaderStatus", () => {
	it("is a success callout when paid", () => {
		expect(getCardStatementHeaderStatus({ ...baseStatement, isPaid: true }, today)).toEqual({
			tone: "success",
			title: "Pagado",
			description: "Este estado de cuenta está liquidado.",
		});
	});

	it("is a warning callout with the due date in the title when pending", () => {
		expect(getCardStatementHeaderStatus(baseStatement, today)).toEqual({
			tone: "warning",
			title: "Fecha límite 12 nov",
			description: "Paga $4,250.00 para no generar intereses.",
		});
	});

	it("is a danger callout when overdue", () => {
		expect(
			getCardStatementHeaderStatus(
				{ ...baseStatement, paymentDueDate: "2026-10-28T00:00:00.000Z" },
				today,
			),
		).toEqual({
			tone: "danger",
			title: "Pago vencido",
			description: "Debías pagar $4,250.00 el 28 oct.",
		});
	});

	it("appends the remaining amount after a partial payment", () => {
		expect(
			getCardStatementHeaderStatus(
				{ ...baseStatement, paidAmount: 100000, remainingBalance: 325000 },
				today,
			).description,
		).toBe("Paga $4,250.00 para no generar intereses. Restan $3,250.00.");
	});

	it("derives the remaining amount when the API omits it", () => {
		expect(
			getCardStatementHeaderStatus({ ...baseStatement, paidAmount: 100000 }, today).description,
		).toBe("Paga $4,250.00 para no generar intereses. Restan $3,250.00.");
	});
});
