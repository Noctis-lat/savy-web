import type React from "react";
import { useCallback, useMemo } from "react";
import { FilterDateRangePicker } from "@/components/design-system/patterns/filters/filter-date-range-picker";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchFilterSelect } from "@/components/design-system/patterns/filters/search-filter-select";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { Button } from "@/components/ui/button";
import { TRANSACTIONS_PERIOD_OPTIONS } from "@/content/transactions/transactionContent";
import {
	TRANSACTION_SORT_OPTIONS,
	TRANSACTION_TYPE_FILTER_OPTIONS,
} from "@/content/transactions/transactionOptions";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTransactionsController } from "@/storage/transactions/transactionsController";
import { formatAccountOptions } from "@/utils/accounts/formatAccountOptions";
import { formatBankOptions } from "@/utils/banks/formatBankOptions";
import { formatCategoryOptions } from "@/utils/categories/formatCategoryOptions";
import { merge } from "@/utils/ui/mergeStyles";

export const TransactionsActions = (): React.ReactElement => {
	const transactionsFilters = useTransactionsController((state) => state.transactionsFilters);
	const setSearch = useTransactionsController((state) => state.setSearch);
	const setType = useTransactionsController((state) => state.setType);
	const setCategoryId = useTransactionsController((state) => state.setCategoryId);
	const setBankId = useTransactionsController((state) => state.setBankId);
	const setAccountId = useTransactionsController((state) => state.setAccountId);
	const setFrom = useTransactionsController((state) => state.setFrom);
	const setTo = useTransactionsController((state) => state.setTo);
	const setSortBy = useTransactionsController((state) => state.setSortBy);
	const setOrder = useTransactionsController((state) => state.setOrder);
	const setPeriod = useTransactionsController((state) => state.setPeriod);
	const resetFilters = useTransactionsController((state) => state.resetFilters);

	const isMobile = useIsMobile();

	const { categories, isLoading: isLoadingCategories } = useQueryCategories();
	const { banks, isLoading: isLoadingBanks } = useQueryBanks();
	const { accounts, isLoading: isLoadingAccounts } = useQueryAccounts();

	const categoryOptions = useMemo<Option[]>(
		() => formatCategoryOptions(categories ?? []),
		[categories],
	);

	const bankOptions = useMemo<Option[]>(() => formatBankOptions(banks ?? []), [banks]);

	const accountOptions = useMemo<Option[]>(() => formatAccountOptions(accounts ?? []), [accounts]);

	const hasTypeFilter = transactionsFilters.type !== undefined;
	const hasCategoryFilter = transactionsFilters.categoryId !== undefined;
	const hasBankFilter = transactionsFilters.bankId !== undefined;
	const hasAccountFilter = transactionsFilters.accountId !== undefined;
	const hasDateFilter =
		transactionsFilters.from !== undefined || transactionsFilters.to !== undefined;
	const hasSortFilter =
		transactionsFilters.sortBy !== "createdAt" || transactionsFilters.order !== "desc";
	const hasSearch = transactionsFilters.search !== undefined;
	const activeFilterCount =
		(hasTypeFilter ? 1 : 0) +
		(hasCategoryFilter ? 1 : 0) +
		(hasBankFilter ? 1 : 0) +
		(hasAccountFilter ? 1 : 0) +
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

	const handleBankChange = (value: string | undefined): void => {
		setBankId(value);
	};

	const handleAccountChange = (value: string | undefined): void => {
		setAccountId(value);
	};

	const handleDateRangeChange = (from?: string, to?: string): void => {
		setFrom(from);
		setTo(to);
	};

	const handleSortChange = (value: string): void => {
		setSortBy(value as "date" | "amount" | "createdAt");
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<FiltersWrapper
			variant="headless"
			activeFilterCount={activeFilterCount}
			hasActiveFilters={hasActiveFilters}
			clearFilters={resetFilters}
		>
			{({ trigger, clear, panel }) => {
				const filtersPanel = panel(
					<div className="flex flex-col gap-2 sm:flex-row justify-end flex-1">
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
						<SearchFilterSelect
							options={bankOptions}
							value={transactionsFilters.bankId}
							onChange={handleBankChange}
							isLoading={isLoadingBanks}
							placeholder="Banco"
							allLabel="Todos"
						/>
						<SearchFilterSelect
							options={accountOptions}
							value={transactionsFilters.accountId}
							onChange={handleAccountChange}
							isLoading={isLoadingAccounts}
							placeholder="Cuenta"
							allLabel="Todas"
						/>
						<FilterDateRangePicker
							dateFrom={transactionsFilters.from}
							dateTo={transactionsFilters.to}
							onChangeRange={handleDateRangeChange}
						/>
						<FilterSortSelect
							options={TRANSACTION_SORT_OPTIONS}
							sortValue={transactionsFilters.sortBy ?? "createdAt"}
							order={(transactionsFilters.order as "asc" | "desc") ?? "desc"}
							onSortChange={handleSortChange}
							onOrderChange={handleOrderChange}
						/>
					</div>,
				);

				return (
					<div className="flex flex-col gap-3">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								<SearchInput
									className="min-w-0 flex-1 sm:flex-initial"
									value={transactionsFilters.search || undefined}
									onCommit={handleSearchCommit}
									placeholder="Buscar transacción..."
								/>
								{isMobile && filtersPanel}
							</div>

							<div className="flex items-center gap-1.5">
								<div className="flex flex-wrap items-center gap-1.5 sm:flex-nowrap sm:overflow-x-auto">
									{TRANSACTIONS_PERIOD_OPTIONS.map((option) => {
										const isSelected = transactionsFilters.period === option.value;
										return (
											<Button
												key={option.value}
												type="button"
												variant={isSelected ? "default" : "outline"}
												size="sm"
												className={merge(
													"h-8 px-3 text-xs whitespace-nowrap",
													isSelected && "bg-primary text-primary-foreground",
												)}
												onClick={() => setPeriod(option.value)}
											>
												{option.shortLabel}
											</Button>
										);
									})}
								</div>
								<div className="hidden sm:block">{trigger}</div>
								{clear}
							</div>
						</div>

						{!isMobile && filtersPanel}
					</div>
				);
			}}
		</FiltersWrapper>
	);
};
