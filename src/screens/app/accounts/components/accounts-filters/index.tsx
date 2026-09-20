import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { ACCOUNT_SORT_OPTIONS, ACCOUNT_TYPE_OPTIONS } from "@/content/accounts/accountsOptions";
import { useAccountsController } from "@/storage/accounts/accountsController";

export const AccountsFilters = (): React.ReactElement => {
	const accountsFilters = useAccountsController((state) => state.accountsFilters);
	const setSearch = useAccountsController((state) => state.setSearch);
	const setSort = useAccountsController((state) => state.setSort);
	const setOrder = useAccountsController((state) => state.setOrder);
	const setType = useAccountsController((state) => state.setType);
	const setIsActive = useAccountsController((state) => state.setIsActive);
	const resetFilters = useAccountsController((state) => state.resetFilters);

	const activeOnly = accountsFilters.isActive === true;
	const showingAll = !activeOnly;
	const hasTypeFilter = accountsFilters.type !== undefined;
	const hasSortFilter = accountsFilters.sortBy !== "name" || accountsFilters.order !== "asc";
	const activeFilterCount =
		(hasSortFilter ? 1 : 0) + (showingAll ? 1 : 0) + (hasTypeFilter ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleSortChange = (value: string): void => {
		setSort(value as "balance" | "name" | "createdAt");
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	const handleTypeChange = (value: string): void => {
		setType(value === "all" ? (undefined as unknown as AccountType) : (value as AccountType));
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={accountsFilters.search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar cuenta..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-col gap-2 sm:flex-row">
					<FilterToggle
						label={showingAll ? "Mostrando todas" : "Mostrar solo activas"}
						icon={showingAll ? LayoutGrid : CheckCircle2}
						checked={showingAll}
						onChange={(checked) => setIsActive(!checked)}
					/>
					<FilterSelect
						options={ACCOUNT_TYPE_OPTIONS}
						value={accountsFilters.type ?? "all"}
						onChange={handleTypeChange}
						placeholder="Tipo de cuenta"
					/>

					<FilterSortSelect
						options={ACCOUNT_SORT_OPTIONS}
						sortValue={accountsFilters.sortBy ?? "name"}
						order={accountsFilters.order ?? "asc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
