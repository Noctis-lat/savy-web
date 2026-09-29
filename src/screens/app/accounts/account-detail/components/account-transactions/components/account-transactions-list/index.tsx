import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TransactionRow } from "@/components/transactions/transaction-row";

type AccountTransactionsListProps = {
	transactions: Transaction[];
	account: Account;
};

export const AccountTransactionsList = ({
	transactions,
	account,
}: AccountTransactionsListProps): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<GlassCard className="h-full p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ArrowUpDown className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Transacciones</h3>
				</div>
				<button
					type="button"
					onClick={() => navigate(ROUTES.APP.TRANSACTIONS)}
					className="text-xs text-primary transition-opacity hover:opacity-80"
				>
					Ver todas
				</button>
			</div>

			<StaggerContainer className="flex flex-col">
				{transactions.map((transaction) => (
					<TransactionRow
						key={transaction.id}
						transaction={transaction}
						currency={account.currency}
						locale="es-MX"
					/>
				))}
			</StaggerContainer>
		</GlassCard>
	);
};
