import { ChevronRight, Dot } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import {
	RECURRING_EXPENSE_FREQUENCY_LABELS,
	RECURRING_EXPENSE_TYPE_LABELS,
} from "@/content/recurring-expenses/recurringExpensesOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { buildRoute } from "@/utils/routing/buildRoute";
import { merge } from "@/utils/ui/mergeStyles";

type PaymentListItemProps = {
	recurringExpense: RecurringExpense;
};

export const PaymentListItem = ({ recurringExpense }: PaymentListItemProps): React.ReactElement => {
	const navigate = useNavigate();
	const expenseColor = recurringExpense.color || PRIMARY_FALLBACK;
	const frequencyLabel = RECURRING_EXPENSE_FREQUENCY_LABELS[recurringExpense.frequency];
	const typeLabel = RECURRING_EXPENSE_TYPE_LABELS[recurringExpense.type];
	const billingDaysText =
		recurringExpense.billingDays.length === 1
			? `Día ${recurringExpense.billingDays[0]}`
			: `Días ${recurringExpense.billingDays.join(", ")}`;

	const detailRoute = buildRoute(ROUTES.APP.PAYMENTS.DETAIL, { payment_id: recurringExpense.id });

	return (
		<button
			type="button"
			onClick={() => navigate(detailRoute)}
			className={merge(
				"relative flex w-full items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0 cursor-pointer hover:brightness-115",
				!recurringExpense.isActive && "opacity-60",
			)}
		>
			<div
				className="flex size-10 items-center justify-center shrink-0 rounded-full shadow-sm"
				style={{ backgroundColor: expenseColor }}
			>
				<DynamicIcon
					name={(recurringExpense.icon || "repeat") as IconName}
					className="text-white"
					size={20}
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<div className="flex flex-row items-center gap-2">
					<span className="text-sm font-semibold text-foreground">{recurringExpense.name}</span>
					{!recurringExpense.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactivo
						</span>
					)}
				</div>
				<div className="flex flex-row flex-wrap items-center gap-y-0.5 text-muted-foreground">
					<span className="text-xs text-muted-foreground">{typeLabel}</span>
					<Dot />
					<span className="text-xs text-muted-foreground">{frequencyLabel}</span>
					<Dot />
					<span className="text-xs tabular-nums text-muted-foreground">{billingDaysText}</span>
				</div>
			</div>

			<span className="text-sm font-semibold tabular-nums text-foreground shrink-0">
				{formatCurrency(recurringExpense.amount)}
			</span>
			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
