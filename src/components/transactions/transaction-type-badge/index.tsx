import type React from "react";
import { Badge } from "@/components/ui/badge";
import {
	TRANSACTION_TYPE_BADGE_VARIANT,
	TRANSACTION_TYPE_ICON,
	TRANSACTION_TYPE_LABEL,
} from "@/content/transactions/transactionContent";

type TransactionTypeBadgeProps = {
	transaction: Transaction;
};

export const TransactionTypeBadge = ({
	transaction,
}: TransactionTypeBadgeProps): React.ReactElement => {
	const Icon = TRANSACTION_TYPE_ICON[transaction.type];

	return (
		<Badge
			variant={TRANSACTION_TYPE_BADGE_VARIANT[transaction.type]}
			className="text-xs px-3"
		>
			{TRANSACTION_TYPE_LABEL[transaction.type]}
			<Icon />
		</Badge>
	);
};
