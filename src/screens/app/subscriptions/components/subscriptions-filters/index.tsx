import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { SUBSCRIPTION_SORT_OPTIONS } from "@/content/subscriptions/subscriptionsOptions";
import { useSubscriptionsController } from "@/storage/subscriptions/subscriptionsController";

export const SubscriptionsFilters = (): React.ReactElement => {
	const subscriptionsFilters = useSubscriptionsController((state) => state.subscriptionsFilters);
	const setSearch = useSubscriptionsController((state) => state.setSearch);
	const setIsActive = useSubscriptionsController((state) => state.setIsActive);
	const setSort = useSubscriptionsController((state) => state.setSort);
	const setOrder = useSubscriptionsController((state) => state.setOrder);
	const resetFilters = useSubscriptionsController((state) => state.resetFilters);

	const activeOnly = subscriptionsFilters.isActive === true;
	const search = subscriptionsFilters.search ?? undefined;
	const showingAll = !activeOnly;
	const hasSortFilter =
		subscriptionsFilters.sortBy !== "createdAt" || subscriptionsFilters.order !== "desc";
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
				placeholder="Buscar suscripción..."
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
						options={SUBSCRIPTION_SORT_OPTIONS}
						sortValue={subscriptionsFilters.sortBy ?? "createdAt"}
						order={subscriptionsFilters.order ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
