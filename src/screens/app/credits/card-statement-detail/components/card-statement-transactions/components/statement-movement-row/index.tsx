import { Dot } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import {
	COMMISSION_TYPE_LABELS,
	STATEMENT_TRANSACTION_REDUCES_BALANCE,
	STATEMENT_TRANSACTION_TYPE_ICON_CLASS,
	STATEMENT_TRANSACTION_TYPE_ICONS,
	STATEMENT_TRANSACTION_TYPE_LABELS,
} from "@/content/card-statements/statementTransactionLabels";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";

type StatementMovementRowProps = {
	statementTransaction: StatementTransaction;
};

export const StatementMovementRow = ({
	statementTransaction,
}: StatementMovementRowProps): React.ReactElement => {
	const Icon = STATEMENT_TRANSACTION_TYPE_ICONS[statementTransaction.type];
	const typeLabel = STATEMENT_TRANSACTION_TYPE_LABELS[statementTransaction.type];
	const commissionLabel = statementTransaction.commissionType
		? COMMISSION_TYPE_LABELS[statementTransaction.commissionType]
		: undefined;
	const title = statementTransaction.description ?? commissionLabel ?? typeLabel;
	const reducesBalance = STATEMENT_TRANSACTION_REDUCES_BALANCE[statementTransaction.type];

	return (
		<div className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0">
			<div
				className={merge(
					"flex size-9 shrink-0 items-center justify-center rounded-full",
					STATEMENT_TRANSACTION_TYPE_ICON_CLASS[statementTransaction.type],
				)}
			>
				<Icon
					className="size-4"
					aria-hidden="true"
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="truncate text-sm font-medium text-foreground">{title}</span>
				<div className="flex flex-wrap items-center gap-y-1 text-xs text-muted-foreground tabular-nums">
					<span>{formatShortDate(statementTransaction.date)}</span>
					<Dot aria-hidden="true" />
					<span>{typeLabel}</span>
					{commissionLabel && (
						<Badge
							variant="warning"
							className="ml-2 px-2 text-xs"
						>
							Comisión: {commissionLabel}
						</Badge>
					)}
				</div>
			</div>

			<span
				className={merge(
					"shrink-0 text-sm font-semibold tabular-nums",
					reducesBalance ? "text-primary" : "text-foreground",
				)}
			>
				{reducesBalance && "-"}
				{formatCurrency(Math.abs(statementTransaction.amount))}
			</span>
		</div>
	);
};
