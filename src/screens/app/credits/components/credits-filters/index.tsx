import { CheckCircle2, LayoutGrid, ReceiptText } from "lucide-react";
import type React from "react";
import { useCallback, useMemo } from "react";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FilterSortSelect } from "@/components/design-system/patterns/filters/filter-sort-select";
import { FilterToggle } from "@/components/design-system/patterns/filters/filter-toggle";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { CREDIT_CARD_SORT_OPTIONS } from "@/content/credit-cards/creditCardsOptions";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useCreditCardsController } from "@/storage/credit-cards/creditCardsController";

export const CreditsFilters = (): React.ReactElement => {
	const creditCardsFilters = useCreditCardsController((state) => state.creditCardsFilters);
	const setSearch = useCreditCardsController((state) => state.setSearch);
	const setIsActive = useCreditCardsController((state) => state.setIsActive);
	const setBankId = useCreditCardsController((state) => state.setBankId);
	const setHasUnpaidStatement = useCreditCardsController((state) => state.setHasUnpaidStatement);
	const setSort = useCreditCardsController((state) => state.setSort);
	const setOrder = useCreditCardsController((state) => state.setOrder);
	const resetFilters = useCreditCardsController((state) => state.resetFilters);

	const { banks } = useQueryBanks({ isActive: true, perPage: 100 });

	const activeOnly = creditCardsFilters.isActive === true;
	const showingAll = !activeOnly;
	const hasUnpaidOnly = creditCardsFilters.hasUnpaidStatement === true;
	const hasBankFilter = creditCardsFilters.bankId !== undefined;
	const hasSortFilter =
		creditCardsFilters.sortBy !== "createdAt" || creditCardsFilters.order !== "desc";

	const activeFilterCount =
		(hasSortFilter ? 1 : 0) +
		(showingAll ? 1 : 0) +
		(hasUnpaidOnly ? 1 : 0) +
		(hasBankFilter ? 1 : 0);
	const hasActiveFilters = activeFilterCount > 0;

	const bankOptions = useMemo<Option[]>(
		() => [
			{ label: "Todos los bancos", value: "all" },
			...(banks?.map((bank) => ({ label: bank.name, value: bank.id })) ?? []),
		],
		[banks],
	);

	const handleSearchCommit = useCallback(
		(value: string | undefined): void => {
			setSearch(value ?? "");
		},
		[setSearch],
	);

	const handleBankChange = (value: string): void => {
		setBankId(value === "all" ? undefined : value);
	};

	const handleSortChange = (value: string): void => {
		setSort(value as "createdAt" | "creditLimit");
	};

	const handleOrderChange = (order: "asc" | "desc"): void => {
		setOrder(order);
	};

	return (
		<div className="flex items-center justify-between gap-3">
			<SearchInput
				value={creditCardsFilters.search || undefined}
				onCommit={handleSearchCommit}
				placeholder="Buscar tarjeta de crédito..."
			/>
			<FiltersWrapper
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={resetFilters}
				direction="left"
			>
				<div className="flex flex-col gap-2 sm:flex-row">
					<FilterToggle
						label={showingAll ? "Mostrando todos" : "Mostrar solo activas"}
						icon={showingAll ? LayoutGrid : CheckCircle2}
						checked={showingAll}
						onChange={(checked) => setIsActive(!checked)}
					/>

					<FilterToggle
						label={hasUnpaidOnly ? "Con deuda pendiente" : "Todos los estados"}
						icon={hasUnpaidOnly ? ReceiptText : LayoutGrid}
						checked={hasUnpaidOnly}
						onChange={setHasUnpaidStatement}
					/>

					<FilterSelect
						options={bankOptions}
						value={creditCardsFilters.bankId ?? "all"}
						onChange={handleBankChange}
						placeholder="Banco"
					/>

					<FilterSortSelect
						options={CREDIT_CARD_SORT_OPTIONS}
						sortValue={creditCardsFilters.sortBy ?? "createdAt"}
						order={creditCardsFilters.order ?? "desc"}
						onSortChange={handleSortChange}
						onOrderChange={handleOrderChange}
					/>
				</div>
			</FiltersWrapper>
		</div>
	);
};
