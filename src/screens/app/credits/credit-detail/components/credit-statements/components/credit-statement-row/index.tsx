import { ChevronRight, Dot } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Badge } from "@/components/ui/badge";
import {
	CARD_STATEMENT_STATUS_LABELS,
	CARD_STATEMENT_STATUS_VARIANTS,
} from "@/content/card-statements/cardStatementLabels";
import { getCardStatementStatus } from "@/utils/card-statements/getCardStatementStatus";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { buildRoute } from "@/utils/routing/buildRoute";
import { merge } from "@/utils/ui/mergeStyles";

type CreditStatementRowProps = {
	cardStatement: CardStatement;
};

export const CreditStatementRow = ({
	cardStatement,
}: CreditStatementRowProps): React.ReactElement => {
	const navigate = useNavigate();
	const status = getCardStatementStatus(cardStatement);
	const hasPartialPayment = !cardStatement.isPaid && (cardStatement.paidAmount ?? 0) > 0;

	const periodLabel = `${formatShortDate(cardStatement.periodStart)} - ${formatShortDate(cardStatement.periodEnd)}`;
	const minPaymentLabel = formatCurrency(cardStatement.minPayment);
	const noInterestPaymentLabel = formatCurrency(cardStatement.noInterestPayment);

	const detailRoute = buildRoute(ROUTES.APP.CREDITS.CARDSTATEMENT_DETAIL, {
		credit_id: cardStatement.creditCardId,
		card_statement_id: cardStatement.id,
	});

	return (
		<button
			type="button"
			onClick={() => navigate(detailRoute)}
			aria-label={`Ver estado de cuenta ${periodLabel}`}
			className="flex w-full cursor-pointer items-center gap-3 border-b border-border/30 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
		>
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="truncate text-sm font-medium text-foreground tabular-nums">
					{periodLabel}
				</span>
				<div className="flex flex-wrap items-center text-xs text-muted-foreground tabular-nums">
					<span className={merge(status === "OVERDUE" && "font-medium text-destructive")}>
						Fecha límite{" "}
						{cardStatement.paymentDueDate ? formatShortDate(cardStatement.paymentDueDate) : "-"}
					</span>
					{hasPartialPayment && (
						<>
							<Dot />
							<span>
								Pago parcial
								{cardStatement.remainingBalance !== undefined &&
									`, restante ${formatCurrency(cardStatement.remainingBalance)}`}
							</span>
						</>
					)}
				</div>
				<span className="text-xs text-muted-foreground tabular-nums @3xl:hidden">
					Mínimo {minPaymentLabel} · Sin intereses {noInterestPaymentLabel}
				</span>
			</div>

			<dl className="hidden shrink-0 gap-6 @3xl:flex">
				<div className="flex w-28 flex-col items-end gap-0.5">
					<dt className="text-xs text-muted-foreground">Pago mínimo</dt>
					<dd className="text-sm font-medium text-foreground tabular-nums">{minPaymentLabel}</dd>
				</div>
				<div className="flex w-36 flex-col items-end gap-0.5">
					<dt className="text-xs text-muted-foreground">Sin intereses</dt>
					<dd className="text-sm font-medium text-foreground tabular-nums">
						{noInterestPaymentLabel}
					</dd>
				</div>
			</dl>

			<div className="flex w-28 shrink-0 flex-col items-end gap-1">
				<span className="text-sm font-semibold text-foreground tabular-nums">
					{formatCurrency(cardStatement.balance)}
				</span>
				<Badge
					variant={CARD_STATEMENT_STATUS_VARIANTS[status]}
					className="px-2 text-xs"
				>
					{CARD_STATEMENT_STATUS_LABELS[status]}
				</Badge>
			</div>

			<ChevronRight
				className="size-4 shrink-0 text-muted-foreground"
				aria-hidden="true"
			/>
		</button>
	);
};
