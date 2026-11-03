import { describe, expect, it } from "vitest";
import { getCardStatementHeaderStatus } from "@/utils/card-statements/getCardStatementHeaderStatus";

const baseStatement = {
	status: "pending" as StatementStatus,
	paymentDueDate: "2026-11-12T00:00:00.000Z",
	noInterestPayment: 425000,
	paidAmount: undefined,
	remainingBalance: undefined,
};

describe("getCardStatementHeaderStatus", () => {
	it("is a success callout when paid", () => {
		expect(getCardStatementHeaderStatus({ ...baseStatement, status: "paid" })).toEqual({
			tone: "success",
			title: "Pagado",
			description: "Este estado de cuenta está liquidado.",
		});
	});

	it("is a warning callout with the due date in the title when pending", () => {
		expect(getCardStatementHeaderStatus(baseStatement)).toEqual({
			tone: "warning",
			title: "Fecha límite 12 nov",
			description: "Paga $4,250.00 para no generar intereses.",
		});
	});

	it("is a danger callout when overdue", () => {
		expect(
			getCardStatementHeaderStatus({
				...baseStatement,
				status: "overdue",
				paymentDueDate: "2026-10-28T00:00:00.000Z",
			}),
		).toEqual({
			tone: "danger",
			title: "Pago vencido",
			description: "Debías pagar $4,250.00 el 28 oct.",
		});
	});

	it("is a warning callout when partial", () => {
		expect(
			getCardStatementHeaderStatus({
				...baseStatement,
				status: "partial",
				paymentDueDate: "2026-10-28T00:00:00.000Z",
				paidAmount: 100000,
				remainingBalance: 325000,
			}),
		).toEqual({
			tone: "warning",
			title: "Pago parcial",
			description: "Pagaste parte del PNGI antes del 28 oct. Restan $3,250.00.",
		});
	});

	it("appends the remaining amount after a partial payment", () => {
		expect(
			getCardStatementHeaderStatus({
				...baseStatement,
				paidAmount: 100000,
				remainingBalance: 325000,
			}).description,
		).toBe("Paga $4,250.00 para no generar intereses. Restan $3,250.00.");
	});

	it("derives the remaining amount when the API omits it", () => {
		expect(getCardStatementHeaderStatus({ ...baseStatement, paidAmount: 100000 }).description).toBe(
			"Paga $4,250.00 para no generar intereses. Restan $3,250.00.",
		);
	});
});
