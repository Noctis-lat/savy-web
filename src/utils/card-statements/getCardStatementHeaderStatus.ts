import { CARD_STATEMENT_HEADER_STATUS_COPY } from "@/content/card-statements/cardStatementStatusCopy";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";

/** Header callout for a card statement. A partial payment appends the remaining amount. */
export const getCardStatementHeaderStatus = (
	cardStatement: Pick<
		CardStatement,
		"status" | "paymentDueDate" | "noInterestPayment" | "paidAmount" | "remainingBalance"
	>,
): StatusCalloutContent => {
	const status = cardStatement.status;

	if (status === "paid") {
		return {
			tone: "success",
			title: CARD_STATEMENT_HEADER_STATUS_COPY.paid.title,
			description: CARD_STATEMENT_HEADER_STATUS_COPY.paid.description,
		};
	}

	const amount = formatCurrency(cardStatement.noInterestPayment);
	const dueDate = formatShortDate(cardStatement.paymentDueDate ?? "");
	const paidAmount = cardStatement.paidAmount ?? 0;
	const remainingAmount =
		cardStatement.remainingBalance ?? Math.max(cardStatement.noInterestPayment - paidAmount, 0);
	const remainingSentence =
		paidAmount > 0
			? ` ${CARD_STATEMENT_HEADER_STATUS_COPY.remaining(formatCurrency(remainingAmount))}`
			: "";

	if (status === "overdue") {
		return {
			tone: "danger",
			title: CARD_STATEMENT_HEADER_STATUS_COPY.overdue.title,
			description: `${CARD_STATEMENT_HEADER_STATUS_COPY.overdue.description(amount, dueDate)}${remainingSentence}`,
		};
	}

	if (status === "partial") {
		return {
			tone: "warning",
			title: CARD_STATEMENT_HEADER_STATUS_COPY.partial.title,
			description: `${CARD_STATEMENT_HEADER_STATUS_COPY.partial.description(dueDate)}${remainingSentence}`,
		};
	}

	return {
		tone: "warning",
		title: CARD_STATEMENT_HEADER_STATUS_COPY.pending.title(dueDate),
		description: `${CARD_STATEMENT_HEADER_STATUS_COPY.pending.description(amount)}${remainingSentence}`,
	};
};
