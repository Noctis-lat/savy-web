import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { CreateTransaction } from "@/components/transactions/create-transaction";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { Button } from "@/components/ui/button";
import { BUDGET_TRANSACTIONS_PAGE_SIZE_OPTIONS } from "@/content/budgets/budgetDetailContent";
import { useQueryBudgetTransactions } from "@/hooks/budgets/useQueryBudgetTransactions";
import { useBudgetTransactionsController } from "@/storage/budgets/budgetTransactionsController";
import { BudgetTransactionsSkeleton } from "../budget-transactions-skeleton";

type BudgetTransactionsListProps = {
	budget: Budget;
};

export const BudgetTransactionsList = ({
	budget,
}: BudgetTransactionsListProps): React.ReactElement => {
	const budgetTransactionsFilters = useBudgetTransactionsController(
		(state) => state.budgetTransactionsFilters,
	);
	const setPage = useBudgetTransactionsController((state) => state.setPage);
	const setLimit = useBudgetTransactionsController((state) => state.setLimit);

	const { transactions, isLoading, page, totalPages, limit, total } = useQueryBudgetTransactions(
		budget.id,
		budgetTransactionsFilters,
	);
	const navigate = useNavigate();

	if (isLoading) {
		return <BudgetTransactionsSkeleton />;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<GlassCard>
				<Empty
					icon={ArrowUpDown}
					title="Sin movimientos"
					description="No hay movimientos del periodo actual que coincidan con los filtros."
					className="py-8"
				/>
			</GlassCard>
		);
	}

	const handlePageChange = (nextPage: number): void => {
		setPage(nextPage);
	};

	const handlePageSizeChange = (size: number): void => {
		setLimit(size);
	};

	return (
		<GlassCard className="h-full p-4 flex flex-col gap-4">
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<ArrowUpDown className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">
							Transacciones{" "}
							<span className="text-xs font-light text-muted-foreground tabular-nums">
								({total})
							</span>
						</h3>
					</div>
					<p className="text-xs text-muted-foreground">
						Movimientos del periodo actual en las categorías de este presupuesto
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="link"
						onClick={() => navigate(ROUTES.APP.TRANSACTIONS)}
					>
						Ver todas
					</Button>

					<CreateTransaction
						mode="button"
						size="sm"
					/>
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
				pageSizeOptions={BUDGET_TRANSACTIONS_PAGE_SIZE_OPTIONS}
				onPageSizeChange={handlePageSizeChange}
			/>
		</GlassCard>
	);
};
