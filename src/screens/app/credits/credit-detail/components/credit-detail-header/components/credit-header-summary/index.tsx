import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CREDIT_HEADER_FIGURE_SPACING } from "@/content/credit-cards/creditCardDetailContent";
import { useQueryPendingCardStatement } from "@/hooks/card-statements/useQueryPendingCardStatement";
import { getCardStatementStatus } from "@/utils/card-statements/getCardStatementStatus";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";
import { CreditHeaderFigure } from "../credit-header-figure";

type CreditHeaderSummaryProps = {
	creditCard: CreditCard;
};

export const CreditHeaderSummary = ({
	creditCard,
}: CreditHeaderSummaryProps): React.ReactElement => {
	const { pendingStatement, isLoading, isError } = useQueryPendingCardStatement(creditCard.id);
	const isOverLimit = creditCard.availableCredit < 0;

	const isOverdue =
		pendingStatement !== undefined && getCardStatementStatus(pendingStatement) === "OVERDUE";
	const dueDate = pendingStatement?.paymentDueDate
		? formatShortDate(pendingStatement.paymentDueDate)
		: undefined;
	const missingStatementHelper = isError ? "No disponible" : "Sin estado pendiente";
	const dueDateHelper = dueDate ? `${isOverdue ? "Venció" : "Vence"} ${dueDate}` : undefined;
	const noInterestHelper = pendingStatement ? dueDateHelper : missingStatementHelper;

	return (
		<dl className="grid grid-cols-3 gap-3 md:flex md:shrink-0 md:items-start md:gap-0 md:divide-x md:divide-border/40">
			<CreditHeaderFigure
				label="Disponible"
				value={formatCurrency(creditCard.availableCredit)}
				helper={isOverLimit ? "Sobre el límite" : undefined}
				tone={isOverLimit ? "danger" : "default"}
				helperTone={isOverLimit ? "danger" : "muted"}
				align="end"
				className={CREDIT_HEADER_FIGURE_SPACING}
				isPrimary
			/>

			{isLoading ? (
				<>
					<div
						className={merge("flex flex-col gap-1.5 md:items-end", CREDIT_HEADER_FIGURE_SPACING)}
					>
						<Skeleton className="h-3.5 w-20" />
						<Skeleton className="h-6 w-24" />
					</div>
					<div
						className={merge("flex flex-col gap-1.5 md:items-end", CREDIT_HEADER_FIGURE_SPACING)}
					>
						<Skeleton className="h-3.5 w-36" />
						<Skeleton className="h-6 w-24" />
					</div>
				</>
			) : (
				<>
					<CreditHeaderFigure
						label="Pago mínimo"
						value={pendingStatement ? formatCurrency(pendingStatement.minPayment) : "-"}
						tone={pendingStatement ? "default" : "muted"}
						align="end"
						className={CREDIT_HEADER_FIGURE_SPACING}
					/>
					<CreditHeaderFigure
						label="Pago para no generar intereses"
						value={pendingStatement ? formatCurrency(pendingStatement.noInterestPayment) : "-"}
						helper={noInterestHelper}
						tone={pendingStatement ? "default" : "muted"}
						helperTone={isOverdue ? "danger" : "muted"}
						align="end"
						className={CREDIT_HEADER_FIGURE_SPACING}
					/>
				</>
			)}
		</dl>
	);
};
