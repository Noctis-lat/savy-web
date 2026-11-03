import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatementTransactionsSkeleton } from "../card-statement-transactions/components/statement-transactions-skeleton";

export const CardStatementSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6 p-6">
		<div className="flex items-center justify-between">
			<Skeleton className="h-8 w-64" />
		</div>

		<GlassCard className="overflow-hidden p-4">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="flex flex-row items-center gap-4">
						<Skeleton className="size-12 rounded-full" />
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2">
								<Skeleton className="h-5 w-36" />
								<Skeleton className="h-5 w-20 rounded-full" />
							</div>
							<Skeleton className="h-3.5 w-64" />
						</div>
					</div>
					<Skeleton className="h-14 w-full rounded-md sm:w-72" />
				</div>
				<div className="grid grid-cols-1 gap-4 border-t border-border/30 pt-4 sm:grid-cols-2 sm:gap-6">
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-4 w-44" />
							<Skeleton className="h-3.5 w-24" />
						</div>
						<Skeleton className="h-3.5 w-52" />
						<Skeleton className="h-2 w-full rounded-full" />
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3.5 w-24" />
						</div>
						<div className="flex items-center justify-between">
							<Skeleton className="h-3.5 w-32" />
							<Skeleton className="h-3.5 w-20" />
						</div>
					</div>
				</div>
			</div>
		</GlassCard>

		<StatementTransactionsSkeleton />
	</div>
);
