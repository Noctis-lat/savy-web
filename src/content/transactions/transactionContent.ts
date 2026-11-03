import {
	ArrowDownLeft,
	ArrowRightLeft,
	ArrowUpRight,
	CalendarClock,
	CreditCard,
	type LucideIcon,
} from "lucide-react";
import type { BadgeVariants } from "@/components/ui/badge";

type TransactionBadgeVariant = NonNullable<BadgeVariants["variant"]>;

export const TRANSACTION_TYPE_ICON: Record<TransactionType, LucideIcon> = {
	INCOME: ArrowDownLeft,
	EXPENSE: ArrowUpRight,
	TRANSFER: ArrowRightLeft,
	PAYMENT: CreditCard,
	INSTALLMENT: CalendarClock,
};

export const TRANSACTION_TYPE_VARIANT: Record<
	TransactionType,
	"default" | "neutral" | "amber" | "red" | "blue"
> = {
	INCOME: "default",
	EXPENSE: "red",
	TRANSFER: "blue",
	PAYMENT: "neutral",
	INSTALLMENT: "amber",
};

export const TRANSACTION_TYPE_BADGE_VARIANT: Record<TransactionType, TransactionBadgeVariant> = {
	INCOME: "success",
	EXPENSE: "destructive",
	TRANSFER: "info",
	PAYMENT: "outline",
	INSTALLMENT: "warning",
};

export const TRANSACTION_TYPE_LABEL: Record<TransactionType, string> = {
	INCOME: "Ingreso",
	EXPENSE: "Gasto",
	TRANSFER: "Transferencia",
	PAYMENT: "Pago",
	INSTALLMENT: "Mensualidad",
};

export const TRANSACTION_TYPE_ICON_CLASS: Record<TransactionType, string> = {
	INCOME: "bg-primary/10 text-primary",
	EXPENSE: "bg-destructive/10 text-destructive",
	TRANSFER: "bg-blue-100 text-blue-500",
	PAYMENT: "bg-muted text-muted-foreground",
	INSTALLMENT: "bg-amber-500/15 text-amber-600",
};

export const TRANSACTION_TYPE_AMOUNT_CLASS: Record<TransactionType, string> = {
	INCOME: "text-primary",
	EXPENSE: "text-destructive",
	TRANSFER: "text-blue-600",
	PAYMENT: "text-muted-foreground",
	INSTALLMENT: "text-amber-600",
};

export const TRANSACTIONS_PERIOD_OPTIONS: PeriodOption[] = [
	{ label: "Todo", shortLabel: "Todo", value: undefined },
	{ label: "Hoy", shortLabel: "Hoy", value: "day" },
	{ label: "Esta semana", shortLabel: "Sem", value: "week" },
	{ label: "Este mes", shortLabel: "Mes", value: "month" },
	{ label: "Mes anterior", shortLabel: "Mes ant", value: "other_month" },
	{ label: "Trimestre", shortLabel: "Trim", value: "quarter" },
	{ label: "Semestre", shortLabel: "Semest", value: "semester" },
	{ label: "Año", shortLabel: "Año", value: "year" },
];
