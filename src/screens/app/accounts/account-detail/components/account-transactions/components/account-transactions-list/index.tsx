import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { useAccountTransactionsController } from "@/storage/transactions/accountTransactionsController";

type AccountTransactionsListProps = {
	account: Account;
};

export const AccountTransactionsList = ({
	account,
}: AccountTransactionsListProps): React.ReactElement => {
	const transactionsFilters = useAccountTransactionsController(
		(state) => state.transactionsFilters,
	);

	const { transactions, isLoading } = useQueryAccountTransactions(account.id, transactionsFilters);
	const navigate = useNavigate();

	if (isLoading) {
		return <Skeleton className="w-full h-65" />;
	}

	if ((!transactions || transactions.length === 0) && !isLoading) {
		return (
			<ScaleFadeIn className="flex flex-col flex-1 gap-4">
				<Empty
					title="Sin transacciones"
					description="No hay movimientos que coincidan con los filtros."
					icon={ArrowUpDown}
					className="py-8"
				/>
			</ScaleFadeIn>
		);
	}

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
