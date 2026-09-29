import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { AccountTransactionsActions } from "./components/account-transactions-actions";
import { AccountTransactionsList } from "./components/account-transactions-list";

type AccountTransactionsProps = {
	account: Account;
};

export const AccountTransactions = ({ account }: AccountTransactionsProps): React.ReactElement => {
	return (
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<AccountTransactionsActions />
			<AccountTransactionsList account={account} />
		</ScaleFadeIn>
	);
};
