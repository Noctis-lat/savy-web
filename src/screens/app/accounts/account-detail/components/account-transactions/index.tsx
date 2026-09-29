import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { AccountTransactionsActions } from "./components/account-transactions-actions";
import { AccountTransactionsList } from "./components/account-transactions-list";

type AccountTransactionsProps = {
	account: Account;
};

export const AccountTransactions = ({ account }: AccountTransactionsProps): React.ReactElement => {
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
			<AccountTransactionsList
				transactions={transactions}
				account={account}
			/>
		</ScaleFadeIn>
	);
};
