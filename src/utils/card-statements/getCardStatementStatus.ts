import { toDateOnly } from "@/utils/formatters/formatDate";

/** Paid wins; otherwise a statement is overdue once its due date (date-only, local) is in the past. */
export const getCardStatementStatus = (
	cardStatement: Pick<CardStatement, "isPaid" | "paymentDueDate">,
	today: Date = new Date(),
): CardStatementStatus => {
	if (cardStatement.isPaid) return "PAID";

	const dueDate = toDateOnly(cardStatement.paymentDueDate);
	if (dueDate !== "" && dueDate < toDateOnly(today)) return "OVERDUE";

	return "PENDING";
};
