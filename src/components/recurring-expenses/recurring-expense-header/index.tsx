import { Repeat } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { BILLING_AMOUNT_SUFFIX } from "@/content/recurring-expenses/recurringExpenseContent";
import { RECURRING_EXPENSE_FREQUENCY_LABELS } from "@/content/recurring-expenses/recurringExpensesOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatBillingDays } from "@/utils/recurring-expenses/formatBillingDays";
import { getAnnualAmount } from "@/utils/recurring-expenses/getAnnualAmount";
import { merge } from "@/utils/ui/mergeStyles";

type RecurringExpenseHeaderProps = {
	recurringExpense: RecurringExpense;
	fallbackIcon: IconName;
};

export const RecurringExpenseHeader = ({
	recurringExpense,
	fallbackIcon,
}: RecurringExpenseHeaderProps): React.ReactElement => {
	const expenseColor = recurringExpense.color ?? PRIMARY_FALLBACK;
	const annualAmount = getAnnualAmount(recurringExpense.amount, recurringExpense.frequency);
	const isYearly = recurringExpense.frequency === "YEARLY";

	const projectionLabel = isYearly
		? `≈ ${formatCurrency(Math.round(annualAmount / 12))} al mes`
		: `≈ ${formatCurrency(annualAmount)} al año`;

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${expenseColor} 12%, transparent) 0%, color-mix(in oklch, ${expenseColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<ScaleFadeIn>
			<GlassCard
				variant="light"
				className="overflow-hidden p-0"
			>
				<div
					className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
					style={gradientStyle}
				>
					<div className="flex min-w-0 items-start gap-4">
						<div
							className={merge(
								"flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm",
								!recurringExpense.isActive && "opacity-80",
							)}
							style={{ backgroundColor: expenseColor }}
						>
							<DynamicIcon
								name={(recurringExpense.icon ?? fallbackIcon) as IconName}
								className="text-white"
								size={24}
								aria-hidden="true"
							/>
						</div>

						<div className="flex min-w-0 flex-col gap-1.5">
							<div className="flex flex-wrap items-center gap-2">
								<h1 className="text-xl font-semibold tracking-tight text-foreground">
									{recurringExpense.name}
								</h1>
								<Badge variant={recurringExpense.isActive ? "default" : "secondary"}>
									{recurringExpense.isActive ? "Activo" : "Inactivo"}
								</Badge>
							</div>

							<p className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<Repeat
									className="size-4 shrink-0"
									aria-hidden="true"
								/>
								<span>
									{RECURRING_EXPENSE_FREQUENCY_LABELS[recurringExpense.frequency]} ·{" "}
									{formatBillingDays(recurringExpense.frequency, recurringExpense.billingDays)}
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-1 sm:text-right">
						<p className="text-foreground">
							<span className="text-3xl font-bold tracking-tight tabular-nums">
								{formatCurrency(recurringExpense.amount)}
							</span>{" "}
							<span className="text-sm font-medium text-muted-foreground">
								{BILLING_AMOUNT_SUFFIX[recurringExpense.frequency]}
							</span>
						</p>
						<p className="text-sm text-muted-foreground tabular-nums">{projectionLabel}</p>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
