import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Screen } from "@/components/design-system/primitives/screen";
import { CreateTransaction } from "@/components/transactions/create-transaction";
import { TransactionsActions } from "./components/transactions-actions";
import { TransactionsHeader } from "./components/transactions-header";
import { TransactionsList } from "./components/transactions-list";

export const Transactions = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Transacciones" }]}
			action={<CreateTransaction />}
		>
			<TransactionsHeader />
			<TransactionsActions />
			<TransactionsList />
		</Screen>
	);
};
