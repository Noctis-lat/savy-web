import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { TRANSACTION_SORT_OPTIONS } from "@/content/transactions/transactionOptions";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { useAccountTransactionsController } from "@/storage/transactions/accountTransactionsController";
import { GoalTransactionsSkeleton } from "./components/goal-transactions-skeleton";

type GoalTransactionsProps = {
	savingsGoal: SavingsGoal;
};

export const GoalTransactions = ({ savingsGoal }: GoalTransactionsProps): React.ReactElement => {
	const transactionsFilters = useAccountTransactionsController(
		(state) => state.transactionsFilters,
	);
	const setSearch = useAccountTransactionsController((state) => state.setSearch);
	const setSortBy = useAccountTransactionsController((state) => state.setSortBy);
	const setOrder = useAccountTransactionsController((state) => state.setOrder);
	const setPage = useAccountTransactionsController((state) => state.setPage);
	const setLimit = useAccountTransactionsController((state) => state.setLimit);
	const resetFilters = useAccountTransactionsController((state) => state.resetFilters);

	const { transactions, isLoading, page, totalPages, limit, total } = useQueryAccountTransactions(
		savingsGoal.accountId,
		transactionsFilters,
	);

	const hasSortFilter =
		transactionsFilters.sortBy !== "date" || transactionsFilters.order !== "desc";
	const hasSearch = transactionsFilters.search !== undefined;
	const activeFilterCount = (hasSortFilter ? 1 : 0) + (hasSearch ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleSortChange = (value: string): void => {
		setSortBy(value);
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	const handlePageChange = (nextPage: number): void => {
		setPage(nextPage);
	};

	const handlePageSizeChange = (size: number): void => {
		setLimit(size);
		setPage(1);
	};

	return (
		<ScaleFadeIn className="flex-1">
			<SectionCard
				title="Transacciones"
				icon={ArrowDownUp}
			>
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between gap-3">
						<SearchInput
							value={transactionsFilters.search || undefined}
							onCommit={handleSearchCommit}
							placeholder="Buscar..."
						/>
						<FiltersWrapper
							activeFilterCount={activeFilterCount}
							hasActiveFilters={hasActiveFilters}
							clearFilters={resetFilters}
							direction="left"
						>
							<FilterSortSelect
								options={TRANSACTION_SORT_OPTIONS}
								sortValue={transactionsFilters.sortBy ?? "date"}
								order={(transactionsFilters.order as "asc" | "desc") ?? "desc"}
								onSortChange={handleSortChange}
								onOrderChange={handleOrderChange}
							/>
						</FiltersWrapper>
					</div>

					{isLoading ? (
						<GoalTransactionsSkeleton />
					) : !transactions || transactions.length === 0 ? (
						<Empty
							title="Sin transacciones"
							description="No hay movimientos en esta cuenta."
							icon={ArrowUpDown}
							className="py-6"
						/>
					) : (
						<>
							<div className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground">
									{total} {total === 1 ? "movimiento" : "movimientos"}
								</span>
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

							{totalPages !== undefined && totalPages >= 1 && (
								<TablePagination
									page={page ?? 1}
									totalPages={totalPages}
									onPageChange={handlePageChange}
									pageSize={limit}
									pageSizeOptions={[5, 10, 20]}
									onPageSizeChange={handlePageSizeChange}
								/>
							)}
						</>
					)}
				</div>
			</SectionCard>
		</ScaleFadeIn>
	);
};
