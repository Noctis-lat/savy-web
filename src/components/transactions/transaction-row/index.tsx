import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, CreditCard } from "lucide-react";
import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { signedAmount } from "@/utils/transactions/signedAmount";
import { merge } from "@/utils/ui/mergeStyles";

type TransactionRowProps = {
	transaction: Transaction;
	currency: string;
	locale: string;
	onClick?: () => void;
	className?: string;
};

const TYPE_ICON: Record<TransactionType, React.ElementType> = {
	INCOME: ArrowDownLeft,
	EXPENSE: ArrowUpRight,
	TRANSFER: ArrowRightLeft,
	PAYMENT: CreditCard,
};

const TYPE_ICON_CLASS: Record<TransactionType, string> = {
	INCOME: "bg-primary/10 text-primary",
	EXPENSE: "bg-destructive/10 text-destructive",
	TRANSFER: "bg-blue-300 text-blue-600",
	PAYMENT: "bg-muted text-muted-foreground",
};

const TYPE_AMOUNT_CLASS: Record<TransactionType, string> = {
	INCOME: "text-primary",
	EXPENSE: "text-destructive",
	TRANSFER: "text-blue-600",
	PAYMENT: "text-muted-foreground",
};

export const TransactionRow = ({
	transaction,
	currency,
	locale,
	onClick,
	className,
}: TransactionRowProps): React.ReactElement => {
	const { account, isLoading } = useQueryAccount(transaction.accountId);

	const Icon = TYPE_ICON[transaction.type];
	const description = transaction.description ?? "Sin descripción";
	const amountClass = TYPE_AMOUNT_CLASS[transaction.type];
	const signed = signedAmount(transaction.type, transaction.amount);
	const prefix = signed < 0 ? "-" : "";

	const content = (
		<>
			<div
				className={merge(
					"flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
					TYPE_ICON_CLASS[transaction.type],
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
		</>
	);

	if (onClick) {
		return (
			<button
				type="button"
				onClick={onClick}
				className={merge(
					"flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-accent/50",
					className,
				)}
			>
				{content}
			</button>
		);
	}

	return (
		<div className={merge("flex items-center gap-3 rounded-md px-2 py-2.5", className)}>
			{content}
		</div>
	);
};
