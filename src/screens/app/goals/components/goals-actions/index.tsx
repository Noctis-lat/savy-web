import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { SAVINGS_GOAL_SORT_OPTIONS } from "@/content/goals/savingsGoalsOptions";
import { useSavingsGoalsController } from "@/storage/savings-goals/savingsGoalsController";

export const GoalsActions = (): React.ReactElement => {
	const savingsGoalsFilters = useSavingsGoalsController((state) => state.savingsGoalsFilters);
	const setSearch = useSavingsGoalsController((state) => state.setSearch);
	const setIsCompleted = useSavingsGoalsController((state) => state.setIsCompleted);
	const setSortBy = useSavingsGoalsController((state) => state.setSortBy);
	const setOrder = useSavingsGoalsController((state) => state.setOrder);
	const resetFilters = useSavingsGoalsController((state) => state.resetFilters);

	const completedOnly = savingsGoalsFilters.isCompleted === true;
	const hasSortFilter =
		savingsGoalsFilters.sortBy !== "currentAmount" || savingsGoalsFilters.order !== "asc";
	const activeFilterCount = (hasSortFilter ? 1 : 0) + (completedOnly ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleSortChange = (value: string): void => {
		setSortBy(value as "deadline" | "targetAmount" | "currentAmount");
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={savingsGoalsFilters.search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar meta..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-1 flex-col gap-2 sm:flex-row">
					<FilterToggle
						label={completedOnly ? "Completadas" : "En progreso"}
						icon={completedOnly ? CheckCircle2 : LayoutGrid}
						checked={completedOnly}
						onChange={setIsCompleted}
					/>
					<FilterSortSelect
						options={SAVINGS_GOAL_SORT_OPTIONS}
						sortValue={savingsGoalsFilters.sortBy ?? "currentAmount"}
						order={savingsGoalsFilters.order ?? "asc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
