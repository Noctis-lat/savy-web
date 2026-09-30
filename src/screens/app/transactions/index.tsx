import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { CreateTransaction } from "@/components/transactions/create-transaction";
import { useQueryTransactions } from "@/hooks/transactions/useQueryTransactions";
import { TransactionsActions } from "./components/transactions-actions";
import { TransactionsHeader } from "./components/transactions-header";
import { TransactionsList } from "./components/transactions-list";

export const Transactions = (): React.ReactElement => {
	const { transactionsInfo, isLoading, total } = useQueryTransactions({ info: true });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!transactionsInfo) {
		return (
			<Empty
				title="Sin transacciones para mostrar"
				description="No hay transacciones, puedes crear una desde el boton de arriba"
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Transacciones" }]}
			action={<CreateTransaction />}
		>
			<TransactionsHeader
				info={transactionsInfo}
				total={total}
			/>
			<TransactionsActions />
			<TransactionsList />
		</Screen>
	);
};
