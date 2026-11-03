import type React from "react";
import { UsageBlock } from "@/components/design-system/patterns/data-display/usage-block";
import { getBudgetPercentage } from "@/utils/budgets/getBudgetPercentage";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type CardStatementSummaryProps = {
	cardStatement: CardStatement;
};

export const CardStatementSummary = ({
	cardStatement,
}: CardStatementSummaryProps): React.ReactElement => {
	// A settled statement reads as fully covered even if the API omits paidAmount.
	const paidAmount =
		cardStatement.isPaid && !cardStatement.paidAmount
			? cardStatement.noInterestPayment
			: (cardStatement.paidAmount ?? 0);
	const paidPercentage = Math.round(
		getBudgetPercentage(paidAmount, cardStatement.noInterestPayment),
	);
	const hasInterest = cardStatement.interestAmount > 0;

	return (
		<div className="grid grid-cols-1 gap-4 border-t border-border/30 pt-4 sm:grid-cols-2 sm:gap-6">
			<UsageBlock
				title="Pago del estado de cuenta"
				meta={`Mínimo ${formatCurrency(cardStatement.minPayment)}`}
				detail={`Pagado ${formatCurrency(paidAmount)} de ${formatCurrency(cardStatement.noInterestPayment)}`}
				percentage={paidPercentage}
				tone={cardStatement.isPaid ? "success" : "neutral"}
				ariaLabel={`${paidPercentage}% del pago para no generar intereses cubierto`}
			/>

			<UsageBlock
				title="Saldo del periodo"
				meta={formatCurrency(cardStatement.balance)}
				showBar={false}
			>
				<dl className="flex items-baseline justify-between gap-2 text-xs">
					<dt className="text-muted-foreground">Intereses del periodo</dt>
					<dd
						className={
							hasInterest ? "font-medium text-foreground tabular-nums" : "text-muted-foreground"
						}
					>
						{hasInterest ? formatCurrency(cardStatement.interestAmount) : "Sin intereses"}
					</dd>
				</dl>
			</UsageBlock>
		</div>
	);
};
