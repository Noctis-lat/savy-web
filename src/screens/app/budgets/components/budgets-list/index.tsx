import { PiggyBank } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQueryBudgets } from "@/hooks/budgets/useQueryBudgets";
import { useBudgetsController } from "@/storage/budgets/budgetsController";
import { filterBudgets } from "@/utils/budgets/filterBudgets";
import { BudgetListItem } from "./components/budget-list-item";
import { BudgetsListSkeleton } from "./components/budgets-list-skeleton";

export const BudgetsList = (): React.ReactElement => {
	const budgetsFilters = useBudgetsController((state) => state.budgetsFilters);
	const searchQuery = useBudgetsController((state) => state.searchQuery);
	const setPage = useBudgetsController((state) => state.setPage);
	const setPerPage = useBudgetsController((state) => state.setPerPage);

	const { budgets, isLoading, page, totalPages, perPage } = useQueryBudgets(budgetsFilters);

	const filteredBudgets = useMemo<Budget[]>(
		() => filterBudgets(budgets ?? [], searchQuery),
		[budgets, searchQuery],
	);

	if (isLoading) {
		return <BudgetsListSkeleton />;
	}

	const handlePageChange = (nextPage: number): void => {
		setPage(nextPage);
	};

	const handlePageSizeChange = (size: number): void => {
		setPerPage(size);
	};

	const pagination = totalPages !== undefined && totalPages >= 1 && (
		<TablePagination
			page={page ?? 1}
			totalPages={totalPages}
			onPageChange={handlePageChange}
			pageSize={perPage}
			pageSizeOptions={[10, 20, 50]}
			onPageSizeChange={handlePageSizeChange}
		/>
	);

	if (filteredBudgets.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{filteredBudgets.map((budget) => (
								<BudgetListItem
									key={budget.id}
									budget={budget}
								/>
							))}
						</GlassCard>
					</ScaleFadeIn>
				</StaggerContainer>
				{pagination}
			</div>
		);
	}

	const hasSearchWithoutMatches = searchQuery.trim() !== "" && (budgets?.length ?? 0) > 0;

	return (
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<GlassCard>
				<Empty
					icon={PiggyBank}
					title="Sin presupuestos"
					description={
						hasSearchWithoutMatches
							? "No hay presupuestos que coincidan con la búsqueda"
							: "No hay presupuestos para mostrar"
					}
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
