import type React from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { SORT_OPTIONS, STATUS_OPTIONS } from "@/content/banks/banksOptions";
import { useBanksController } from "@/storage/banks/banksController";

export const BanksFilters = (): React.ReactElement => {
	const searchQuery = useBanksController((state) => state.searchQuery);
	const banksFilters = useBanksController((state) => state.banksFilters);
	const setSearchQuery = useBanksController((state) => state.setSearchQuery);
	const setSortBy = useBanksController((state) => state.setSortBy);
	const setStatusFilter = useBanksController((state) => state.setStatusFilter);
	const resetFilters = useBanksController((state) => state.resetFilters);

	const statusValue =
		banksFilters.isActive === undefined ? "all" : banksFilters.isActive ? "active" : "inactive";
	const activeFilterCount =
		(banksFilters.sortBy !== "name" ? 1 : 0) + (statusValue !== "all" ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = (value: string | undefined): void => {
		setSearchQuery(value ?? "");
	};

	const handleSortChange = (value: string): void => {
		setSortBy(value as "name" | "createdAt");
	};

	const handleStatusChange = (value: string): void => {
		setStatusFilter(value as "all" | "active" | "inactive");
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={searchQuery || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar banco..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-col gap-2 sm:flex-row">
					<FilterSelect
						options={SORT_OPTIONS}
						value={banksFilters.sortBy ?? "name"}
						onChange={handleSortChange}
					/>
					<FilterSelect
						options={STATUS_OPTIONS}
						value={statusValue}
						onChange={handleStatusChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
