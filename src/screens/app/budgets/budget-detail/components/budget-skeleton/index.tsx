import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { BudgetHistorySkeleton } from "../budget-history/components/budget-history-skeleton";
import { BudgetProgressSkeleton } from "../budget-progress/components/budget-progress-skeleton";
import { BudgetTransactionsSkeleton } from "../budget-transactions/components/budget-transactions-skeleton";

export const BudgetSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6 p-6">
		<div className="flex items-center justify-between">
			<Skeleton className="h-8 w-48" />
			<Skeleton className="h-9 w-24 rounded-md" />
		</div>

		<GlassCard className="overflow-hidden p-4">
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center gap-4">
					<Skeleton className="size-12 rounded-full" />
					<div className="flex flex-col gap-1">
						<Skeleton className="h-5 w-40" />
						<Skeleton className="h-3.5 w-56" />
					</div>
				</div>
				<div className="flex flex-col gap-3 pt-4">
					<Skeleton className="h-3.5 w-56" />
					<div className="grid grid-cols-3 gap-4">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
					<Skeleton className="h-2 w-full rounded-full" />
				</div>
			</div>
		</GlassCard>

		<div className="flex flex-col gap-4 sm:flex-row">
			<BudgetProgressSkeleton />
			<BudgetHistorySkeleton />
		</div>

		<BudgetTransactionsSkeleton />
	</div>
);
