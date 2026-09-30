import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { useQueryTransactions } from "@/hooks/transactions/useQueryTransactions";
import { useTransactionsController } from "@/storage/transactions/transactionsController";

export const TransactionsList = (): React.ReactElement => {
	const transactionsFilters = useTransactionsController((state) => state.transactionsFilters);
	const setPage = useTransactionsController((state) => state.setPage);
	const setLimit = useTransactionsController((state) => state.setLimit);

	const handlePageChange = (nextPage: number): void => {
		setPage(nextPage);
	};

	const handlePageSizeChange = (size: number): void => {
		setLimit(size);
		setPage(1);
	};

	const { transactions, isLoading, page, totalPages, limit } =
		useQueryTransactions(transactionsFilters);

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!transactions || transactions.length === 0) {
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
		<GlassCard className=" p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ArrowUpDown className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Transacciones </h3>
				</div>
			</div>

			<StaggerContainer className="flex flex-col">
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
				pageSizeOptions={[5, 10, 20, 50]}
				onPageSizeChange={handlePageSizeChange}
			/>
		</GlassCard>
	);
};
