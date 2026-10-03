import { Repeat } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { getFrequencyLabel } from "@/utils/onboarding/getFrequencyLabel";

type SubscriptionsCardProps = {
	recurringExpenses: DashboardRecurringExpensesSummary;
	currency: string;
	locale: string;
	maxItems?: number;
	className?: string;
};

export const SubscriptionsCard = ({
	recurringExpenses,
	currency,
	locale,
	maxItems = 4,
	className,
}: SubscriptionsCardProps): React.ReactElement => {
	const navigate = useNavigate();

	const subscriptions = recurringExpenses.expenses.filter(
		(expense) => expense.type === "SUBSCRIPTION",
	);
	const visible = subscriptions.slice(0, maxItems);
	const isEmpty = visible.length === 0;

	const monthlyTotal = subscriptions.reduce((sum, expense) => {
		switch (expense.frequency) {
			case "WEEKLY":
				return sum + expense.amount * 4.33;
			case "BIWEEKLY":
				return sum + expense.amount * 2.17;
			case "MONTHLY":
				return sum + expense.amount;
			case "YEARLY":
				return sum + expense.amount / 12;
			default:
				return sum;
		}
	}, 0);

	return (
		<SummaryCard
			title="Suscripciones"
			icon={Repeat}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.SUBSCRIPTIONS.ROOT)}
			onCreate={() => navigate(ROUTES.APP.SUBSCRIPTIONS.ROOT)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin suscripciones"
					description="Registra una suscripción para ver su costo mensual."
					action={{
						label: "Agregar suscripción",
						onClick: () => navigate(ROUTES.APP.SUBSCRIPTIONS.ROOT),
					}}
				/>
			) : (
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2">
						<span className="text-xs text-muted-foreground">Costo mensual estimado</span>
						<span className="text-sm font-semibold tabular-nums text-primary">
							{formatCurrency(Math.round(monthlyTotal), currency, locale)}
						</span>
					</div>

					<div className="flex flex-col gap-2">
						{visible.map((expense) => (
							<div
								key={expense.id}
								className="flex items-center justify-between text-sm"
							>
								<div className="flex flex-col">
									<span className="font-medium text-foreground">{expense.name}</span>
									<span className="text-xs text-muted-foreground">
										{getFrequencyLabel(expense.frequency)}
									</span>
								</div>
								<span className="font-medium tabular-nums text-foreground">
									{formatCurrency(expense.amount, currency, locale)}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</SummaryCard>
	);
};
