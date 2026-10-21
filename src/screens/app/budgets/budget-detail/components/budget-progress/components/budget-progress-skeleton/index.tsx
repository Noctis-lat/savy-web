import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { BUDGET_DETAIL_SKELETON_ROWS } from "@/content/budgets/budgetDetailContent";

export const BudgetProgressSkeleton = (): React.ReactElement => (
	<GlassCard className="h-full flex-1 p-4">
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Skeleton className="size-4 rounded" />
				<Skeleton className="h-4 w-36" />
			</div>
			<Skeleton className="h-3 w-16" />
			{BUDGET_DETAIL_SKELETON_ROWS.map((rowKey) => (
				<div
					key={rowKey}
					className="flex flex-col gap-2"
				>
					<div className="flex items-center justify-between">
						<Skeleton className="h-3.5 w-28" />
						<Skeleton className="h-3.5 w-10" />
					</div>
					<Skeleton className="h-2 w-full rounded-full" />
					<div className="flex items-center justify-between">
						<Skeleton className="h-3 w-36" />
						<Skeleton className="h-3 w-20" />
					</div>
				</div>
			))}
		</div>
	</GlassCard>
);
