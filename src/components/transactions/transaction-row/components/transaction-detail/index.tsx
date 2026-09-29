import { CalendarPlus, CalendarSync, Copy, File, Wallet } from "lucide-react";
import type React from "react";
import { InfoItem } from "@/components/design-system/primitives/info-item";
import { TransactionTypeBadge } from "@/components/transactions/transaction-type-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useSkeletonStore } from "@/storage/skeletonTestStorage";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";

type TransactionDetailProps = {
	transaction: Transaction;
};

export const TransactionDetail = ({ transaction }: TransactionDetailProps): React.ReactElement => {
	const { account: originAccount, isLoading: originLoading } = useQueryAccount(
		transaction.accountId,
	);
	const { account: destinationAccount, isLoading: destinationLoading } = useQueryAccount(
		transaction.destinationAccountId,
	);

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="flex flex-row items-center gap-6">
				<div className="flex flex-col gap-1">
					<p className="text-sm text-muted-foreground">Monto</p>
					<p className="text-lg font-semibold tabular-nums">{formatCurrency(transaction.amount)}</p>
				</div>
				<TransactionTypeBadge transaction={transaction} />
			</div>

			{originLoading ? (
				<Skeleton />
			) : (
				<InfoItem
					label="Cuenta origen"
					value={originAccount?.name}
					icon={Wallet}
				/>
			)}

			{transaction.destinationAccountId &&
				(destinationLoading ? (
					<Skeleton />
				) : (
					<InfoItem
						label="Cuenta destino"
						value={destinationAccount?.name}
						icon={Wallet}
					/>
				))}

			<InfoItem
				label="Categoria"
				value={transaction.categoryId}
				icon={Copy}
			/>

			<InfoItem
				label="Creada el:"
				value={formatDate(transaction.createdAt)}
				icon={CalendarPlus}
			/>

			<InfoItem
				label="Actualizada el:"
				value={formatDate(transaction.updatedAt)}
				icon={CalendarSync}
			/>

			<InfoItem
				label="Notas"
				value={transaction.note}
				icon={File}
				className="col-span-2"
			/>
		</div>
	);
};
