import { Receipt } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { TransactionRow } from "@/components/transactions/transaction-row";

type RecentTransactionsCardProps = {
	transactions: DashboardRecentTransaction[];
	currency: string;
	locale: string;
	maxItems?: number;
	className?: string;
};

export const RecentTransactionsCard = ({
	transactions,
	currency,
	locale,
	maxItems = 5,
	className,
}: RecentTransactionsCardProps): React.ReactElement => {
	const navigate = useNavigate();
	const visible = transactions.slice(0, maxItems);
	const isEmpty = visible.length === 0;

	return (
		<SummaryCard
			title="Transacciones recientes"
			icon={Receipt}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.TRANSACTIONS)}
			onCreate={() => navigate(ROUTES.APP.TRANSACTIONS_NEW)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin transacciones"
					description="Aún no registras movimientos."
					action={{
						label: "Agregar transacción",
						onClick: () => navigate(ROUTES.APP.TRANSACTIONS_NEW),
					}}
				/>
			) : (
				<div className="flex flex-col">
					{visible.map((transaction) => (
						<TransactionRow
							key={transaction.id}
							transaction={transaction}
							currency={currency}
							locale={locale}
							onClick={() => navigate(ROUTES.APP.TRANSACTIONS)}
						/>
					))}
				</div>
			)}
		</SummaryCard>
	);
};
