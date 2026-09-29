import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { useAccountTransactionsController } from "@/storage/transactions/accountTransactionsController";
import { AccountTransactionsActions } from "./components/account-transactions-actions";
import { AccountTransactionsList } from "./components/account-transactions-list";

type AccountTransactionsProps = {
	account: Account;
};

export const AccountTransactions = ({ account }: AccountTransactionsProps): React.ReactElement => {
	const transactionsFilters = useAccountTransactionsController(
		(state) => state.transactionsFilters,
	);

	const { transactions, isLoading } = useQueryAccountTransactions(account.id, transactionsFilters);

	if (isLoading) {
		return <Skeleton />;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<ScaleFadeIn className="flex flex-col flex-1 gap-4">
				<AccountTransactionsActions />
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
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<AccountTransactionsActions />
			<AccountTransactionsList
				transactions={transactions}
				account={account}
			/>
		</ScaleFadeIn>
	);
};
