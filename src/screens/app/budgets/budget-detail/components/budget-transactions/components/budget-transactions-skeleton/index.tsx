import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { BUDGET_DETAIL_SKELETON_ROWS } from "@/content/budgets/budgetDetailContent";

export const BudgetTransactionsSkeleton = (): React.ReactElement => (
	<GlassCard className="p-4">
		<div className="flex flex-col gap-4">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-2">
						<Skeleton className="size-4 rounded" />
						<Skeleton className="h-4 w-44" />
					</div>
					<Skeleton className="h-3 w-64" />
				</div>
				<Skeleton className="h-3.5 w-16" />
			</div>
			{BUDGET_DETAIL_SKELETON_ROWS.map((rowKey) => (
				<div
					key={rowKey}
					className="flex items-center gap-3 py-2.5"
				>
					<Skeleton className="size-9 rounded-full" />
					<div className="flex flex-1 flex-col gap-1">
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-3.5 w-28" />
					</div>
					<Skeleton className="h-4 w-24" />
				</div>
			))}
		</div>
	</GlassCard>
);
