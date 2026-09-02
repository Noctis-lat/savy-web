import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { SORT_OPTIONS } from "@/content/banks/banksOptions";
import { useBanksController } from "@/storage/banks/banksController";

export const BanksFilters = (): React.ReactElement => {
	const searchQuery = useBanksController((state) => state.searchQuery);
	const banksFilters = useBanksController((state) => state.banksFilters);
	const setSearchQuery = useBanksController((state) => state.setSearchQuery);
	const setSortBy = useBanksController((state) => state.setSortBy);
	const setActiveOnly = useBanksController((state) => state.setActiveOnly);
	const resetFilters = useBanksController((state) => state.resetFilters);

	const activeOnly = banksFilters.isActive === true;
	const activeFilterCount = (banksFilters.sortBy !== "name" ? 1 : 0) + (activeOnly ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = (value: string | undefined): void => {
		setSearchQuery(value ?? "");
	};

	const handleSortChange = (value: string): void => {
		setSortBy(value as "name" | "createdAt");
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
					<FilterToggle
						label={activeOnly ? "Solo activos" : "Todos"}
						icon={activeOnly ? CheckCircle2 : LayoutGrid}
						checked={activeOnly}
						onChange={setActiveOnly}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
