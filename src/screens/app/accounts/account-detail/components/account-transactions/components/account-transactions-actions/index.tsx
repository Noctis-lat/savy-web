import type React from "react";
import { useCallback, useMemo } from "react";
import { FilterDateRangePicker } from "@/components/design-system/patterns/filters/filter-date-range-picker";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchFilterSelect } from "@/components/design-system/patterns/filters/search-filter-select";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import {
	TRANSACTION_SORT_OPTIONS,
	TRANSACTION_TYPE_FILTER_OPTIONS,
} from "@/content/transactions/transactionOptions";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import { useAccountTransactionsController } from "@/storage/transactions/accountTransactionsController";

export const AccountTransactionsActions = (): React.ReactElement => {
	const transactionsFilters = useAccountTransactionsController(
		(state) => state.transactionsFilters,
	);
	const setSearch = useAccountTransactionsController((state) => state.setSearch);
	const setType = useAccountTransactionsController((state) => state.setType);
	const setCategoryId = useAccountTransactionsController((state) => state.setCategoryId);
	const setFrom = useAccountTransactionsController((state) => state.setFrom);
	const setTo = useAccountTransactionsController((state) => state.setTo);
	const setSortBy = useAccountTransactionsController((state) => state.setSortBy);
	const setOrder = useAccountTransactionsController((state) => state.setOrder);
	const resetFilters = useAccountTransactionsController((state) => state.resetFilters);

	const { categories, isLoading: isLoadingCategories } = useQueryCategories("EXPENSE");

	const categoryOptions = useMemo<Option[]>(
		() =>
			(categories ?? []).map((category) => ({
				label: category.name,
				value: category.id,
			})),
		[categories],
	);

	const hasTypeFilter = transactionsFilters.type !== undefined;
	const hasCategoryFilter = transactionsFilters.categoryId !== undefined;
	const hasDateFilter =
		transactionsFilters.from !== undefined || transactionsFilters.to !== undefined;
	const hasSortFilter =
		transactionsFilters.sortBy !== "date" || transactionsFilters.order !== "desc";
	const hasSearch = transactionsFilters.search !== undefined;
	const activeFilterCount =
		(hasTypeFilter ? 1 : 0) +
		(hasCategoryFilter ? 1 : 0) +
		(hasDateFilter ? 1 : 0) +
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

	const handleDateRangeChange = (from?: string, to?: string): void => {
		setFrom(from);
		setTo(to);
	};

	const handleSortChange = (value: string): void => {
		setSortBy(value);
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={transactionsFilters.search || undefined}
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
						options={TRANSACTION_TYPE_FILTER_OPTIONS}
						value={transactionsFilters.type ?? "all"}
						onChange={handleTypeChange}
						placeholder="Tipo"
					/>
					<SearchFilterSelect
						options={categoryOptions}
						value={transactionsFilters.categoryId}
						onChange={handleCategoryChange}
						isLoading={isLoadingCategories}
						placeholder="Categoría"
						allLabel="Todas"
					/>
					<FilterDateRangePicker
						dateFrom={transactionsFilters.from}
						dateTo={transactionsFilters.to}
						onChangeRange={handleDateRangeChange}
					/>
					<FilterSortSelect
						options={TRANSACTION_SORT_OPTIONS}
						sortValue={transactionsFilters.sortBy ?? "date"}
						order={(transactionsFilters.order as "asc" | "desc") ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
