import { Dot } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	INSTALLMENT_PLAN_TYPE_LABELS,
	INSTALLMENT_PLAN_TYPE_VARIANTS,
	INSTALLMENT_STATUS_LABELS,
} from "@/content/card-statements/statementTransactionLabels";
import { getBudgetPercentage } from "@/utils/budgets/getBudgetPercentage";
import { decimalStringToCents } from "@/utils/formatters/decimalStringToCents";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type StatementInstallmentRowProps = {
	statementTransaction: StatementTransaction;
};

export const StatementInstallmentRow = ({
	statementTransaction,
}: StatementInstallmentRowProps): React.ReactElement | null => {
	const { installment } = statementTransaction;

	if (!installment) return null;

	const title = installment.purchase.description ?? "Compra a meses";
	const interestCents = decimalStringToCents(installment.interestAmount);
	const planPercentage = Math.round(
		getBudgetPercentage(installment.paidInstallments, installment.totalInstallments),
	);

	return (
		<div className="flex flex-col gap-2 border-b border-border/30 px-4 py-3 last:border-b-0">
			<div className="flex items-start gap-3">
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<span className="truncate text-sm font-medium text-foreground">{title}</span>
					<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground tabular-nums">
						<span>
							{installment.number} de {installment.totalInstallments}
						</span>
						<Badge
							variant={INSTALLMENT_PLAN_TYPE_VARIANTS[installment.type]}
							className="px-2 text-xs"
						>
							{INSTALLMENT_PLAN_TYPE_LABELS[installment.type]}
						</Badge>
						{installment.status !== "ACTIVE" && (
							<Badge
								variant="outline"
								className="px-2 text-xs"
							>
								{INSTALLMENT_STATUS_LABELS[installment.status]}
							</Badge>
						)}
					</div>
				</div>

				<div className="flex shrink-0 flex-col items-end gap-0.5">
					<span className="text-sm font-semibold text-foreground tabular-nums">
						{formatCurrency(decimalStringToCents(installment.monthlyAmount))}
					</span>
					<span className="text-xs text-muted-foreground">mensual</span>
				</div>
			</div>

			<Progress
				value={Math.min(Math.max(planPercentage, 0), 100)}
				aria-label={`${installment.paidInstallments} de ${installment.totalInstallments} mensualidades pagadas`}
				className="h-1.5"
			/>

			<div className="flex flex-wrap items-center text-xs text-muted-foreground tabular-nums">
				<span>
					{installment.paidInstallments} de {installment.totalInstallments} pagadas
				</span>
				<Dot aria-hidden="true" />
				<span>Restan {formatCurrency(decimalStringToCents(installment.remainingAmount))}</span>
				{interestCents > 0 && (
					<>
						<Dot aria-hidden="true" />
						<span>Intereses {formatCurrency(interestCents)}</span>
					</>
				)}
			</div>
		</div>
	);
};
