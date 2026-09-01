import { CheckCircle2, CreditCard, Landmark, Plus, RefreshCw } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { FilterSelect } from "@/components/design-system/patterns/filters/filter-select";
import { FiltersWrapper } from "@/components/design-system/patterns/filters/filters-wrapper";
import { SearchInput } from "@/components/design-system/patterns/filters/search-input";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { SORT_OPTIONS, STATUS_OPTIONS } from "@/content/banks/banksOptions";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useBanksController } from "@/storage/banksController";
import { enrichBanksWithStats } from "@/utils/banks/enrichBanksWithStats";
import { filterBanks } from "@/utils/banks/filterBanks";
import { sortBanks } from "@/utils/banks/sortBanks";
import { BankRow } from "./components/bank-row";
import { BanksHeader } from "./components/banks-header";
import { BanksSkeleton } from "./components/banks-skeleton";

export const Banks = (): React.ReactElement => {
	const navigate = useNavigate();
	const banksQuery = useQueryBanks();
	const accountsQuery = useQueryAccounts();

	const searchQuery = useBanksController((state) => state.searchQuery);
	const sortBy = useBanksController((state) => state.sortBy);
	const statusFilter = useBanksController((state) => state.statusFilter);
	const order = useBanksController((state) => state.order);
	const setSearchQuery = useBanksController((state) => state.setSearchQuery);
	const setSortBy = useBanksController((state) => state.setSortBy);
	const setStatusFilter = useBanksController((state) => state.setStatusFilter);
	const resetFilters = useBanksController((state) => state.resetFilters);

	const isLoading = banksQuery.isLoading || accountsQuery.isLoading;
	const isError = banksQuery.isError || accountsQuery.isError;

	const enrichedBanks = useMemo(() => {
		if (!banksQuery.data || !accountsQuery.data) return [];
		return enrichBanksWithStats(banksQuery.data, accountsQuery.data);
	}, [banksQuery.data, accountsQuery.data]);

	const filteredBanks = useMemo(() => {
		const filtered = filterBanks(enrichedBanks, searchQuery, statusFilter);
		return sortBanks(filtered, sortBy, order);
	}, [enrichedBanks, searchQuery, statusFilter, sortBy, order]);

	const totalBanks = enrichedBanks.length.toString();
	const totalAccounts = enrichedBanks.reduce((sum, bank) => sum + bank.accountCount, 0).toString();
	const activeBanks = enrichedBanks.filter((bank) => bank.isActive).length.toString();

	const activeFilterCount = (sortBy !== "name" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0);
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
		<div className="flex flex-1 flex-col gap-6 p-6">
			<BanksHeader />

			{/* Loading */}
			{isLoading && <BanksSkeleton />}

			{/* Error */}
			{!isLoading && isError && (
				<Empty
					icon={RefreshCw}
					title="No pudimos cargar los bancos"
					description="Revisa tu conexión e inténtalo de nuevo."
					action={{
						label: "Reintentar",
						icon: RefreshCw,
						onClick: () => {
							void banksQuery.refetch();
							void accountsQuery.refetch();
						},
					}}
				/>
			)}

			{/* Success */}
			{!isLoading && !isError && (
				<>
					{/* KPI strip */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<ScaleFadeIn>
							<KpiCard
								label="Total bancos"
								value={totalBanks}
								icon={Landmark}
							/>
						</ScaleFadeIn>
						<ScaleFadeIn>
							<KpiCard
								label="Cuentas"
								value={totalAccounts}
								icon={CreditCard}
							/>
						</ScaleFadeIn>
						<ScaleFadeIn>
							<KpiCard
								label="Bancos activos"
								value={activeBanks}
								icon={CheckCircle2}
							/>
						</ScaleFadeIn>
					</div>

					{/* Filters */}
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
									value={sortBy}
									onChange={handleSortChange}
								/>
								<FilterSelect
									options={STATUS_OPTIONS}
									value={statusFilter}
									onChange={handleStatusChange}
								/>
							</div>
						</FiltersWrapper>
					</div>

					{/* Bank list */}
					{filteredBanks.length === 0 ? (
						<GlassCard>
							<Empty
								icon={Landmark}
								title="Sin bancos"
								description="Agrega tu primer banco para comenzar a organizar tus cuentas."
								action={{
									label: "Agregar banco",
									onClick: () => navigate(ROUTES.APP.BANKS_NEW),
								}}
							/>
						</GlassCard>
					) : (
						<StaggerContainer>
							<ScaleFadeIn>
								<GlassCard className="overflow-hidden p-0">
									{filteredBanks.map((bank) => (
										<BankRow
											key={bank.id}
											bank={bank}
											onClick={() => navigate(`/app/banks/${bank.id}`)}
										/>
									))}
								</GlassCard>
							</ScaleFadeIn>
						</StaggerContainer>
					)}
				</>
			)}
		</div>
	);
};
