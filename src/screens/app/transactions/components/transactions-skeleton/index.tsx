import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const KPI_SKELETONS = ["kpi-skel-1", "kpi-skel-2", "kpi-skel-3", "kpi-skel-4"] as const;
const ROW_SKELETONS = [
	"row-skel-1",
	"row-skel-2",
	"row-skel-3",
	"row-skel-4",
	"row-skel-5",
	"row-skel-6",
] as const;
const PERIOD_SKELETONS = [
	"period-skel-1",
	"period-skel-2",
	"period-skel-3",
	"period-skel-4",
	"period-skel-5",
] as const;

export const TransactionsSkeleton = (): React.ReactElement => {
	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Skeleton className="size-4 rounded-full" />
					<Skeleton className="h-4 w-12" />
					<Skeleton className="size-3 rounded-full" />
					<Skeleton className="h-4 w-24" />
				</div>
				<Skeleton className="h-9 w-40 rounded-md" />
			</div>

			{/* KPIs */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
				{KPI_SKELETONS.map((key) => (
					<GlassCard
						key={key}
						className="p-5"
					>
						<div className="flex items-center justify-between gap-3">
							<div className="flex flex-col gap-1">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-8 w-28" />
							</div>
							<Skeleton className="size-10 rounded-full" />
						</div>
					</GlassCard>
				))}
			</div>

			{/* Actions: search + period pills + filter trigger */}
			<div className="flex items-center justify-between gap-3">
				<Skeleton className="h-9 w-full max-w-sm rounded-md" />
				<div className="flex items-center gap-1.5">
					{PERIOD_SKELETONS.map((key) => (
						<Skeleton
							key={key}
							className="h-8 w-12 rounded-md"
						/>
					))}
					<Skeleton className="size-9 rounded-md" />
				</div>
			</div>

			{/* List */}
			<GlassCard className="flex flex-col gap-4 p-4">
				<div className="flex items-center gap-2">
					<Skeleton className="size-4 rounded-full" />
					<Skeleton className="h-4 w-28" />
				</div>

				<div className="flex flex-col">
					{ROW_SKELETONS.map((key) => (
						<div
							key={key}
							className="flex items-center gap-3 px-2 py-2.5"
						>
							<Skeleton className="size-9 shrink-0 rounded-full" />
							<div className="flex flex-1 flex-col gap-1">
								<Skeleton className="h-4 w-36" />
								<Skeleton className="h-3 w-28" />
							</div>
							<Skeleton className="h-4 w-20" />
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-32" />
					<div className="flex items-center gap-2">
						<Skeleton className="size-8 rounded-md" />
						<Skeleton className="h-4 w-16" />
						<Skeleton className="size-8 rounded-md" />
					</div>
				</div>
			</GlassCard>
		</div>
	);
};
