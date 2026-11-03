import type { BadgeVariants } from "@/components/ui/badge";

export const CARD_STATEMENT_STATUS_LABELS: Record<StatementStatus, string> = {
	paid: "Pagado",
	overdue: "Vencido",
	partial: "Pago parcial",
	pending: "Pendiente",
};

export const CARD_STATEMENT_STATUS_VARIANTS: Record<
	StatementStatus,
	NonNullable<BadgeVariants["variant"]>
> = {
	paid: "success",
	overdue: "error",
	partial: "warning",
	pending: "outline",
};
