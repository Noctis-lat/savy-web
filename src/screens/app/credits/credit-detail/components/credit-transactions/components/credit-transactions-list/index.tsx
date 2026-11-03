import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { CREDIT_TRANSACTIONS_PAGE_SIZE_OPTIONS } from "@/content/credit-cards/creditCardDetailContent";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { useCreditCardTransactionsController } from "@/storage/credit-cards/creditCardTransactionsController";
import { CreditTransactionsRowsSkeleton } from "../credit-transactions-rows-skeleton";

type CreditTransactionsListProps = {
	creditCard: CreditCard;
};

export const CreditTransactionsList = ({
	creditCard,
}: CreditTransactionsListProps): React.ReactElement => {
	const creditCardTransactionsFilters = useCreditCardTransactionsController(
		(state) => state.creditCardTransactionsFilters,
	);
	const setPage = useCreditCardTransactionsController((state) => state.setPage);
	const setLimit = useCreditCardTransactionsController((state) => state.setLimit);

	const { transactions, isLoading, page, totalPages, limit } = useQueryAccountTransactions(
		creditCard.accountId,
		creditCardTransactionsFilters,
	);

	if (isLoading) {
		return <CreditTransactionsRowsSkeleton />;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<Empty
				icon={ArrowUpDown}
				title="Sin transacciones"
				description="No hay movimientos de esta tarjeta que coincidan con los filtros."
				className="py-6"
			/>
		);
	}

	const handlePageChange = (nextPage: number): void => {
		setPage(nextPage);
	};

	const handlePageSizeChange = (size: number): void => {
		setLimit(size);
		setPage(1);
	};

	return (
		<>
			<StaggerContainer className="flex min-w-0 flex-col">
				{transactions.map((transaction) => (
					<TransactionRow
						key={transaction.id}
						transaction={transaction}
						locale="es-MX"
						editable
					/>
				))}
			</StaggerContainer>

			<TablePagination
				page={page ?? 1}
				totalPages={totalPages ?? 0}
				onPageChange={handlePageChange}
				pageSize={limit}
				pageSizeOptions={CREDIT_TRANSACTIONS_PAGE_SIZE_OPTIONS}
				onPageSizeChange={handlePageSizeChange}
			/>
		</>
	);
};
