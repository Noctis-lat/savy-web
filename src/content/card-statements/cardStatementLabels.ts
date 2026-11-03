import type { BadgeVariants } from "@/components/ui/badge";

export const CARD_STATEMENT_STATUS_LABELS: Record<CardStatementStatus, string> = {
	PAID: "Pagado",
	OVERDUE: "Vencido",
	PENDING: "Pendiente",
};

export const CARD_STATEMENT_STATUS_VARIANTS: Record<
	CardStatementStatus,
	NonNullable<BadgeVariants["variant"]>
> = {
	PAID: "success",
	OVERDUE: "error",
	PENDING: "warning",
};
