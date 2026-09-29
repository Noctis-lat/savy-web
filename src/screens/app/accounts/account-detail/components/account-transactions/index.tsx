import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { TransactionRow } from "@/components/design-system/patterns/data-display/transaction-row";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { AccountTransactionsActions } from "./components/account-transactions-actions";

type AccountTransactionsProps = {
	account: Account;
};

export const AccountTransactions = ({ account }: AccountTransactionsProps): React.ReactElement => {
	const navigate = useNavigate();

	const { transactions, isLoading } = useQueryAccountTransactions(account.id, {
		limit: "5",
		sortBy: "date",
		order: "desc",
	});

	if (isLoading) {
		return <Skeleton />;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<Empty
				title="Sin transacciones"
				description="No hay movimientos en esta cuenta."
				icon={ArrowUpDown}
				className="py-8"
			/>
		);
	}

	return (
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<AccountTransactionsActions />
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
							transaction={{
								id: transaction.id,
								type: transaction.type,
								amount: transaction.amount,
								description: transaction.description,
								date: transaction.date,
								accountName: account.name,
								categoryName: null,
							}}
							currency={account.currency}
							locale="es-MX"
						/>
					))}
				</StaggerContainer>
			</GlassCard>
		</ScaleFadeIn>
	);
};
