import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, CreditCard } from "lucide-react";
import type React from "react";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "PAYMENT";

type TransactionRowTransaction = {
	id: string;
	type: TransactionType;
	amount: number;
	description: string | null;
	date: string;
	accountName: string;
	categoryName: string | null;
};

type TransactionRowProps = {
	transaction: TransactionRowTransaction;
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
	TRANSFER: "bg-muted text-muted-foreground",
	PAYMENT: "bg-muted text-muted-foreground",
};

const TYPE_AMOUNT_CLASS: Record<TransactionType, string> = {
	INCOME: "text-primary",
	EXPENSE: "text-destructive",
	TRANSFER: "text-muted-foreground",
	PAYMENT: "text-muted-foreground",
};

function formatShortDate(value: string): string {
	const date = parseISO(value);
	if (!isValid(date)) return "-";
	return format(date, "d MMM", { locale: es });
}

function signedAmount(type: TransactionType, amount: number): number {
	return type === "EXPENSE" || type === "PAYMENT" ? -amount : amount;
}

export const TransactionRow = ({
	transaction,
	currency,
	locale,
	onClick,
	className,
}: TransactionRowProps): React.ReactElement => {
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
					{formatShortDate(transaction.date)} · {transaction.accountName}
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
