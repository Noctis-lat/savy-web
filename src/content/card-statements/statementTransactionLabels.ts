import {
	ArrowDownLeft,
	ArrowRightLeft,
	ArrowUpRight,
	CalendarClock,
	CreditCard,
	type LucideIcon,
} from "lucide-react";
import type { BadgeVariants } from "@/components/ui/badge";

export const STATEMENT_TRANSACTION_TYPE_LABELS: Record<StatementTransactionType, string> = {
	INCOME: "Ingreso",
	EXPENSE: "Compra",
	TRANSFER: "Transferencia",
	PAYMENT: "Pago",
	INSTALLMENT: "Mensualidad",
};

export const STATEMENT_TRANSACTION_TYPE_ICONS: Record<StatementTransactionType, LucideIcon> = {
	INCOME: ArrowDownLeft,
	EXPENSE: ArrowUpRight,
	TRANSFER: ArrowRightLeft,
	PAYMENT: CreditCard,
	INSTALLMENT: CalendarClock,
};

export const STATEMENT_TRANSACTION_TYPE_ICON_CLASS: Record<StatementTransactionType, string> = {
	INCOME: "bg-primary/10 text-primary",
	EXPENSE: "bg-destructive/10 text-destructive",
	TRANSFER: "bg-blue-100 text-blue-500",
	PAYMENT: "bg-primary/10 text-primary",
	INSTALLMENT: "bg-amber-500/10 text-amber-600",
};

/** Payments and credits reduce the statement balance, so they are shown as negative amounts. */
export const STATEMENT_TRANSACTION_REDUCES_BALANCE: Record<StatementTransactionType, boolean> = {
	INCOME: true,
	EXPENSE: false,
	TRANSFER: false,
	PAYMENT: true,
	INSTALLMENT: false,
};

export const COMMISSION_TYPE_LABELS: Record<CommissionType, string> = {
	ANNUAL_FEE: "Anualidad",
	LATE_PAYMENT: "Pago tardío",
	CASH_ADVANCE: "Disposición de efectivo",
};

export const INSTALLMENT_PLAN_TYPE_LABELS: Record<InstallmentPlanType, string> = {
	MSI: "Meses sin intereses",
	MSCI: "Meses con intereses",
};

export const INSTALLMENT_PLAN_TYPE_VARIANTS: Record<
	InstallmentPlanType,
	NonNullable<BadgeVariants["variant"]>
> = {
	MSI: "info",
	MSCI: "warning",
};

export const INSTALLMENT_STATUS_LABELS: Record<InstallmentStatus, string> = {
	ACTIVE: "Activo",
	COMPLETED: "Completado",
	CANCELLED: "Cancelado",
	PAID_OFF: "Liquidado",
};
