import { CheckCircle2, LayoutGrid } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import {
	BUDGET_KIND_OPTIONS,
	BUDGET_PERIOD_OPTIONS,
	BUDGET_SORT_OPTIONS,
} from "@/content/budgets/budgetsOptions";
import { useBudgetsController } from "@/storage/budgets/budgetsController";

export const BudgetsFilters = (): React.ReactElement => {
	const budgetsFilters = useBudgetsController((state) => state.budgetsFilters);
	const setSearch = useBudgetsController((state) => state.setSearch);
	const setIsActive = useBudgetsController((state) => state.setIsActive);
	const setKind = useBudgetsController((state) => state.setKind);
	const setPeriod = useBudgetsController((state) => state.setPeriod);
	const setSort = useBudgetsController((state) => state.setSort);
	const setOrder = useBudgetsController((state) => state.setOrder);
	const resetFilters = useBudgetsController((state) => state.resetFilters);

	const activeOnly = budgetsFilters.isActive === true;
	const search = budgetsFilters.search ?? undefined;
	const showingAll = !activeOnly;
	const hasKindFilter = budgetsFilters.kind !== undefined;
	const hasPeriodFilter = budgetsFilters.period !== undefined;
	const hasSortFilter = budgetsFilters.sortBy !== "name" || budgetsFilters.order !== "asc";
	const activeFilterCount =
		(hasSortFilter ? 1 : 0) +
		(showingAll ? 1 : 0) +
		(hasKindFilter ? 1 : 0) +
		(hasPeriodFilter ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleKindChange = (value: string): void => {
		setKind(value === "all" ? undefined : (value as BudgetKind));
	};

	const handlePeriodChange = (value: string): void => {
		setPeriod(value === "all" ? undefined : (value as BudgetPeriod));
	};

	const handleSortChange = (value: string): void => {
		setSort(value as "name" | "startDate" | "createdAt");
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar presupuesto..."
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
						options={BUDGET_KIND_OPTIONS}
						value={budgetsFilters.kind ?? "all"}
						onChange={handleKindChange}
						placeholder="Tipo de presupuesto"
					/>

					<FilterSelect
						options={BUDGET_PERIOD_OPTIONS}
						value={budgetsFilters.period ?? "all"}
						onChange={handlePeriodChange}
						placeholder="Periodo"
					/>

					<FilterSortSelect
						options={BUDGET_SORT_OPTIONS}
						sortValue={budgetsFilters.sortBy ?? "name"}
						order={budgetsFilters.order ?? "asc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
