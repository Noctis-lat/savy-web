import type React from "react";
import { useState } from "react";
import { Modal } from "@/components/design-system/primitives/modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
	TRANSACTION_TYPE_AMOUNT_CLASS,
	TRANSACTION_TYPE_ICON,
	TRANSACTION_TYPE_ICON_CLASS,
	TRANSACTION_TYPE_VARIANT,
} from "@/content/transactions/transactionContent";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate, formatShortDate } from "@/utils/formatters/formatDate";
import { signedAmount } from "@/utils/transactions/signedAmount";
import { merge } from "@/utils/ui/mergeStyles";
import { RemoveTransaction } from "./components/remove-transaction";
import { TransactionDetail } from "./components/transaction-detail";

type TransactionRowProps = {
	transaction: Transaction;
	currency: string;
	locale: string;
	className?: string;
};

export const TransactionRow = ({
	transaction,
	currency,
	locale,
	className,
}: TransactionRowProps): React.ReactElement => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { account, isLoading } = useQueryAccount(transaction.accountId);

	const Icon = TRANSACTION_TYPE_ICON[transaction.type];
	const description = transaction.description ?? "Sin descripción";
	const amountClass = TRANSACTION_TYPE_AMOUNT_CLASS[transaction.type];
	const signed = signedAmount(transaction.type, transaction.amount);
	const prefix = signed < 0 ? "-" : "";

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Modal
			openModal={isOpen}
			setOpenModal={setIsOpen}
			title={description}
			description={`Transaccion realizada: ${formatDate(transaction.date)}`}
			icon={Icon}
			iconVariant={TRANSACTION_TYPE_VARIANT[transaction.type]}
			content={<TransactionDetail transaction={transaction} />}
			actions={
				<RemoveTransaction
					transaction={transaction}
					onClose={handleClose}
				/>
			}
		>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={merge(
					"flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-accent/50 cursor-pointer",
					className,
				)}
			>
				<div
					className={merge(
						"flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
						TRANSACTION_TYPE_ICON_CLASS[transaction.type],
					)}
				>
					<Icon className="size-4" />
				</div>

				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<span className="truncate text-sm font-medium text-foreground">{description}</span>
					<span className="truncate text-xs text-muted-foreground">
						{formatShortDate(transaction.date)} · {isLoading ? <Skeleton /> : account?.name}
					</span>
				</div>

				<span className={merge("shrink-0 text-sm font-semibold tabular-nums", amountClass)}>
					{prefix}
					{formatCurrency(Math.abs(transaction.amount), currency, locale)}
				</span>
			</button>
		</Modal>
	);
};
