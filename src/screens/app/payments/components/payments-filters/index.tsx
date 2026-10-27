import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import {
	RECURRING_EXPENSE_SORT_OPTIONS,
	RECURRING_EXPENSE_TYPE_OPTIONS,
} from "@/content/recurring-expenses/recurringExpensesOptions";
import { useRecurringExpensesController } from "@/storage/recurring-expenses/recurringExpensesController";

export const PaymentsFilters = (): React.ReactElement => {
	const recurringExpensesFilters = useRecurringExpensesController(
		(state) => state.recurringExpensesFilters,
	);
	const setSearch = useRecurringExpensesController((state) => state.setSearch);
	const setIsActive = useRecurringExpensesController((state) => state.setIsActive);
	const setType = useRecurringExpensesController((state) => state.setType);
	const setSort = useRecurringExpensesController((state) => state.setSort);
	const setOrder = useRecurringExpensesController((state) => state.setOrder);
	const resetFilters = useRecurringExpensesController((state) => state.resetFilters);

	const activeOnly = recurringExpensesFilters.isActive === true;
	const search = recurringExpensesFilters.search ?? undefined;
	const showingAll = !activeOnly;
	const hasTypeFilter = recurringExpensesFilters.type !== undefined;
	const hasSortFilter =
		recurringExpensesFilters.sortBy !== "createdAt" || recurringExpensesFilters.order !== "desc";
	const activeFilterCount =
		(hasSortFilter ? 1 : 0) + (showingAll ? 1 : 0) + (hasTypeFilter ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleTypeChange = (value: string): void => {
		setType(value === "all" ? undefined : (value as RecurringExpenseType));
	};

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
				placeholder="Buscar gasto recurrente..."
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

					<FilterSelect
						options={RECURRING_EXPENSE_TYPE_OPTIONS}
						value={recurringExpensesFilters.type ?? "all"}
						onChange={handleTypeChange}
						placeholder="Tipo"
					/>

					<FilterSortSelect
						options={RECURRING_EXPENSE_SORT_OPTIONS}
						sortValue={recurringExpensesFilters.sortBy ?? "createdAt"}
						order={recurringExpensesFilters.order ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
