import { ChevronRight, Dot } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Progress } from "@/components/ui/progress";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { buildRoute } from "@/utils/routing/buildRoute";
import { merge } from "@/utils/ui/mergeStyles";

type CreditCardListItemProps = {
	creditCard: CreditCard;
};

export const CreditCardListItem = ({ creditCard }: CreditCardListItemProps): React.ReactElement => {
	const navigate = useNavigate();
	const cardColor = creditCard.color || PRIMARY_FALLBACK;

	const hasDebt = creditCard.currentBalance > 0;
	const utilization =
		creditCard.creditLimit > 0
			? Math.round((creditCard.currentBalance / creditCard.creditLimit) * 100)
			: 0;
	const usageVariant = utilization > 90 ? "danger" : utilization > 75 ? "warning" : "default";

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${cardColor} 12%, transparent) 0%, color-mix(in oklch, ${cardColor} 5%, transparent) 60%, transparent 100%)`,
	};

	const detailRoute = buildRoute(ROUTES.APP.CREDITS.DETAIL, { credit_id: creditCard.id });

	return (
		<button
			type="button"
			onClick={() => navigate(detailRoute)}
			className={merge(
				"relative flex w-full items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0 cursor-pointer hover:brightness-115",
			)}
			style={gradientStyle}
		>
			<div
				className="flex size-10 items-center justify-center shrink-0 rounded-full shadow-sm"
				style={{ backgroundColor: cardColor }}
			>
				<DynamicIcon
					name={(creditCard.icon || "credit-card") as IconName}
					className="text-white"
					size={20}
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="text-sm font-semibold text-foreground">{creditCard.name}</span>
				<div className="flex flex-row flex-wrap items-center gap-y-0.5 text-muted-foreground">
					<span className="text-xs tabular-nums text-muted-foreground">
						Próximo corte {formatShortDate(creditCard.currentCycleCutDate)}
					</span>
					<Dot />
					<span className="text-xs tabular-nums text-muted-foreground">
						Pago {formatShortDate(creditCard.currentCyclePaymentDueDate)}
					</span>
				</div>
			</div>

			<div className="flex w-40 shrink-0 flex-col gap-1.5 sm:w-150">
				{hasDebt ? (
					<div className="flex flex-col gap-2">
						<div className="flex items-baseline justify-between gap-2">
							<span className="truncate text-xs tabular-nums text-muted-foreground">
								{formatCurrency(creditCard.availableCredit)} disponible
							</span>
							<span
								className={merge(
									"shrink-0 text-xs font-medium tabular-nums text-primary",
									usageVariant === "warning" && "text-amber-600",
									usageVariant === "danger" && "text-destructive",
								)}
							>
								{utilization}%
							</span>
						</div>
						<Progress
							value={Math.min(Math.max(utilization, 0), 100)}
							aria-label={`${utilization}% del crédito utilizado`}
							className={merge(
								"h-2",
								usageVariant === "warning" && "[&_[data-slot=progress-indicator]]:bg-amber-500",
								usageVariant === "danger" && "[&_[data-slot=progress-indicator]]:bg-destructive",
							)}
						/>
					</div>
				) : (
					<span className="text-right text-xs text-muted-foreground">
						{formatCurrency(creditCard.creditLimit)} de límite
					</span>
				)}
			</div>
			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
