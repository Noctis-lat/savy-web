import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { BILL_SORT_OPTIONS } from "@/content/bills/billsOptions";
import { useServicesController } from "@/storage/services/servicesController";

export const BillsFilters = (): React.ReactElement => {
	const servicesFilters = useServicesController((state) => state.servicesFilters);
	const setSearch = useServicesController((state) => state.setSearch);
	const setIsActive = useServicesController((state) => state.setIsActive);
	const setSort = useServicesController((state) => state.setSort);
	const setOrder = useServicesController((state) => state.setOrder);
	const resetFilters = useServicesController((state) => state.resetFilters);

	const activeOnly = servicesFilters.isActive === true;
	const search = servicesFilters.search ?? undefined;
	const showingAll = !activeOnly;
	const hasSortFilter = servicesFilters.sortBy !== "createdAt" || servicesFilters.order !== "desc";
	const activeFilterCount = (hasSortFilter ? 1 : 0) + (showingAll ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleSortChange = (value: string): void => {
		setSort(value as RecurringExpenseSortBy);
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar servicio..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-col gap-2 sm:flex-row">
					<FilterToggle
						label={showingAll ? "Mostrando todos" : "Mostrar solo activos"}
						icon={showingAll ? LayoutGrid : CheckCircle2}
						checked={showingAll}
						onChange={(checked) => setIsActive(!checked)}
					/>

					<FilterSortSelect
						options={BILL_SORT_OPTIONS}
						sortValue={servicesFilters.sortBy ?? "createdAt"}
						order={servicesFilters.order ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
