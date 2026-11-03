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
import { useCreditCardTransactionsController } from "@/storage/credit-cards/creditCardTransactionsController";

export const CreditTransactionsActions = (): React.ReactElement => {
	const creditCardTransactionsFilters = useCreditCardTransactionsController(
		(state) => state.creditCardTransactionsFilters,
	);
	const setSearch = useCreditCardTransactionsController((state) => state.setSearch);
	const setType = useCreditCardTransactionsController((state) => state.setType);
	const setCategoryId = useCreditCardTransactionsController((state) => state.setCategoryId);
	const setFrom = useCreditCardTransactionsController((state) => state.setFrom);
	const setTo = useCreditCardTransactionsController((state) => state.setTo);
	const setSortBy = useCreditCardTransactionsController((state) => state.setSortBy);
	const setOrder = useCreditCardTransactionsController((state) => state.setOrder);
	const resetFilters = useCreditCardTransactionsController((state) => state.resetFilters);

	const { categories, isLoading: isLoadingCategories } = useQueryCategories("EXPENSE");

	const categoryOptions = useMemo<Option[]>(
		() =>
			(categories ?? []).map((category) => ({
				label: category.name,
				value: category.id,
			})),
		[categories],
	);

	const hasTypeFilter = creditCardTransactionsFilters.type !== undefined;
	const hasCategoryFilter = creditCardTransactionsFilters.categoryId !== undefined;
	const hasDateFilter =
		creditCardTransactionsFilters.from !== undefined ||
		creditCardTransactionsFilters.to !== undefined;
	const hasSortFilter =
		creditCardTransactionsFilters.sortBy !== "date" ||
		creditCardTransactionsFilters.order !== "desc";
	const hasSearch = creditCardTransactionsFilters.search !== undefined;
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
		<div className="flex items-center gap-2">
			<SearchInput
				className="min-w-0 flex-1 [&_input]:min-w-0"
				value={creditCardTransactionsFilters.search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar transacción..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-col gap-2">
					<FilterSelect
						options={TRANSACTION_TYPE_FILTER_OPTIONS}
						value={creditCardTransactionsFilters.type ?? "all"}
						onChange={handleTypeChange}
						placeholder="Tipo"
					/>
					<SearchFilterSelect
						options={categoryOptions}
						value={creditCardTransactionsFilters.categoryId}
						onChange={handleCategoryChange}
						isLoading={isLoadingCategories}
						placeholder="Categoría"
						allLabel="Todas"
					/>
					<FilterDateRangePicker
						dateFrom={creditCardTransactionsFilters.from}
						dateTo={creditCardTransactionsFilters.to}
						onChangeRange={handleDateRangeChange}
					/>
					<FilterSortSelect
						options={TRANSACTION_SORT_OPTIONS}
						sortValue={creditCardTransactionsFilters.sortBy ?? "date"}
						order={(creditCardTransactionsFilters.order as "asc" | "desc") ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
