import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { CreateTransaction } from "@/components/transactions/create-transaction";
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
	const setPage = useAccountTransactionsController((state) => state.setPage);
	const setLimit = useAccountTransactionsController((state) => state.setLimit);

	const { transactions, isLoading, page, totalPages, limit, total } = useQueryAccountTransactions(
		account.id,
		transactionsFilters,
	);
	const navigate = useNavigate();

	if (isLoading) {
		return <Skeleton className="w-full h-65" />;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<ScaleFadeIn className="flex flex-col flex-1 gap-4">
				<GlassCard>
					<Empty
						title="Sin transacciones"
						description="No hay movimientos que coincidan con los filtros."
						icon={ArrowUpDown}
						className="py-8"
						action={
							<CreateTransaction
								size="sm"
								accountId={account.id}
							/>
						}
					/>
				</GlassCard>
			</ScaleFadeIn>
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
		<GlassCard className="h-full p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<ArrowUpDown className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">
						Transacciones{" "}
						<span className="text-xs text-muted-foreground font-light ">({total})</span>
					</h3>
				</div>

				<div className="flex flex-row-reverse gap-4">
					<CreateTransaction
						size="sm"
						mode="icon"
						accountId={account.id}
					/>

					<button
						type="button"
						onClick={() => navigate(ROUTES.APP.TRANSACTIONS)}
						className="text-xs text-primary transition-opacity hover:opacity-80 cursor-pointer"
					>
						Ver todas
					</button>
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
