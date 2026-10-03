import { CreditCard } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { MiniGauge } from "@/components/design-system/patterns/data-display/mini-gauge";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";

type CreditOverviewCardProps = {
	creditOverview: DashboardCreditOverview;
	currency: string;
	locale: string;
	className?: string;
};

export const CreditOverviewCard = ({
	creditOverview,
	currency,
	locale,
	className,
}: CreditOverviewCardProps): React.ReactElement => {
	const navigate = useNavigate();

	const totalLimit = creditOverview.creditCards.reduce((sum, card) => sum + card.creditLimit, 0);
	const totalAvailable = creditOverview.creditCards.reduce(
		(sum, card) => sum + (card.available ?? 0),
		0,
	);
	const totalUsed = Math.max(totalLimit - totalAvailable, 0);
	const hasCards = creditOverview.creditCards.length > 0;
	const hasLoans = creditOverview.loans.length > 0;
	const isEmpty = !hasCards && !hasLoans;

	return (
		<SummaryCard
			title="Crédito"
			icon={CreditCard}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.CREDITS.ROOT)}
			onCreate={() => navigate(ROUTES.APP.CREDITS.ROOT)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin productos de crédito"
					description="Registra una tarjeta de crédito o préstamo."
					action={{
						label: "Agregar crédito",
						onClick: () => navigate(ROUTES.APP.CREDITS.ROOT),
					}}
				/>
			) : (
				<div className="flex flex-col gap-4">
					{hasCards && (
						<div className="flex flex-col items-center gap-2">
							<MiniGauge
								value={totalUsed}
								max={totalLimit}
								label="Uso de crédito"
								formatValue={(value) => formatCurrency(value, currency, locale)}
							/>
						</div>
					)}

					{hasLoans && (
						<div className="flex flex-col gap-2 border-t border-border/50 pt-3">
							<h3 className="text-sm font-medium text-foreground">Préstamos</h3>
							{creditOverview.loans.map((loan) => (
								<div
									key={loan.id}
									className="flex items-center justify-between text-sm"
								>
									<div className="flex flex-col">
										<span className="text-muted-foreground">Saldo restante</span>
										<span className="text-xs text-muted-foreground">
											Pago: {formatDate(loan.nextPaymentDue)}
										</span>
									</div>
									<div className="flex flex-col items-end">
										<span className="font-medium tabular-nums text-foreground">
											{formatCurrency(loan.remaining, currency, locale)}
										</span>
										<span className="text-xs tabular-nums text-muted-foreground">
											{formatCurrency(loan.monthlyPayment, currency, locale)}/mes
										</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</SummaryCard>
	);
};
