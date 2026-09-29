import {
	ArrowDownLeft,
	ArrowRightLeft,
	ArrowUpRight,
	CreditCard,
	type LucideIcon,
} from "lucide-react";

export const TRANSACTION_TYPE_ICON: Record<TransactionType, LucideIcon> = {
	INCOME: ArrowDownLeft,
	EXPENSE: ArrowUpRight,
	TRANSFER: ArrowRightLeft,
	PAYMENT: CreditCard,
};

export const TRANSACTION_TYPE_VARIANT: Record<
	TransactionType,
	"default" | "neutral" | "amber" | "red" | "blue"
> = {
	INCOME: "default",
	EXPENSE: "red",
	TRANSFER: "blue",
	PAYMENT: "neutral",
};

export const TRANSACTION_TYPE_ICON_CLASS: Record<TransactionType, string> = {
	INCOME: "bg-primary/10 text-primary",
	EXPENSE: "bg-destructive/10 text-destructive",
	TRANSFER: "bg-blue-300 text-blue-600",
	PAYMENT: "bg-muted text-muted-foreground",
};

export const TRANSACTION_TYPE_AMOUNT_CLASS: Record<TransactionType, string> = {
	INCOME: "text-primary",
	EXPENSE: "text-destructive",
	TRANSFER: "text-blue-600",
	PAYMENT: "text-muted-foreground",
};
