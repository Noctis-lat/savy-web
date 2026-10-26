import { Target } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQuerySavingsGoals } from "@/hooks/savings-goals/useQuerySavingsGoals";
import { useSavingsGoalsController } from "@/storage/savings-goals/savingsGoalsController";
import { GoalItem } from "./components/goal-item";
import { GoalsListSkeleton } from "./components/goals-list-skeleton";

export const GoalsList = (): React.ReactElement => {
	const savingsGoalsFilters = useSavingsGoalsController((state) => state.savingsGoalsFilters);
	const setPage = useSavingsGoalsController((state) => state.setPage);
	const setPerPage = useSavingsGoalsController((state) => state.setPerPage);

	const { savingGoals, isLoading, page, totalPages, perPage } =
		useQuerySavingsGoals(savingsGoalsFilters);

	if (isLoading) {
		return <GoalsListSkeleton />;
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

	if (savingGoals && savingGoals.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{savingGoals.map((goal) => (
								<GoalItem
									key={goal.id}
									goal={goal}
								/>
							))}
						</GlassCard>
					</ScaleFadeIn>
				</StaggerContainer>
				{pagination}
			</div>
		);
	}

	return (
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<GlassCard>
				<Empty
					icon={Target}
					title="Sin metas"
					description="No hay metas de ahorro para mostrar"
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
