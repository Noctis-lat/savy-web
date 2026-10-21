import type React from "react";
import { useCallback, useMemo } from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchFilterSelect } from "@/components/design-system/patterns/filters/search-filter-select";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { BUDGET_TRANSACTION_TYPE_FILTER_OPTIONS } from "@/content/budgets/budgetDetailContent";
import { TRANSACTION_SORT_OPTIONS } from "@/content/transactions/transactionOptions";
import { useBudgetTransactionsController } from "@/storage/budgets/budgetTransactionsController";
import { getBudgetCategoryOptions } from "@/utils/budgets/getBudgetCategoryOptions";

type BudgetTransactionsActionsProps = {
	budget: Budget;
};

export const BudgetTransactionsActions = ({
	budget,
}: BudgetTransactionsActionsProps): React.ReactElement => {
	const budgetTransactionsFilters = useBudgetTransactionsController(
		(state) => state.budgetTransactionsFilters,
	);
	const setSearch = useBudgetTransactionsController((state) => state.setSearch);
	const setType = useBudgetTransactionsController((state) => state.setType);
	const setCategoryId = useBudgetTransactionsController((state) => state.setCategoryId);
	const setSortBy = useBudgetTransactionsController((state) => state.setSortBy);
	const setOrder = useBudgetTransactionsController((state) => state.setOrder);
	const resetFilters = useBudgetTransactionsController((state) => state.resetFilters);

	const categoryOptions = useMemo<Option[]>(() => getBudgetCategoryOptions(budget), [budget]);

	const hasTypeFilter = budgetTransactionsFilters.type !== undefined;
	const hasCategoryFilter = budgetTransactionsFilters.categoryId !== undefined;
	const hasSortFilter =
		budgetTransactionsFilters.sortBy !== "date" || budgetTransactionsFilters.order !== "desc";
	const hasSearch = budgetTransactionsFilters.search !== undefined;
	const activeFilterCount =
		(hasTypeFilter ? 1 : 0) +
		(hasCategoryFilter ? 1 : 0) +
		(hasSortFilter ? 1 : 0) +
		(hasSearch ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleTypeChange = (value: string): void => {
		setType(value === "all" ? undefined : (value as TransactionType));
	};

	const handleCategoryChange = (value: string | undefined): void => {
		setCategoryId(value);
	};

	const handleSortChange = (value: string): void => {
		setSortBy(value as BudgetTransactionsSortBy);
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={budgetTransactionsFilters.search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar transacción..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-col gap-2 sm:flex-row">
					<FilterSelect
						options={BUDGET_TRANSACTION_TYPE_FILTER_OPTIONS}
						value={budgetTransactionsFilters.type ?? "all"}
						onChange={handleTypeChange}
						placeholder="Tipo"
					/>
					<SearchFilterSelect
						options={categoryOptions}
						value={budgetTransactionsFilters.categoryId}
						onChange={handleCategoryChange}
						placeholder="Categoría"
						allLabel="Todas"
					/>
					<FilterSortSelect
						options={TRANSACTION_SORT_OPTIONS}
						sortValue={budgetTransactionsFilters.sortBy ?? "date"}
						order={budgetTransactionsFilters.order ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
