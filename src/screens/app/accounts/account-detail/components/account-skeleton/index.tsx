import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeletonRow = (): React.ReactElement => (
	<div className="flex flex-col gap-2">
		<div className="flex items-center justify-between">
			<Skeleton className="h-3.5 w-28" />
			<Skeleton className="h-3.5 w-20" />
		</div>
		<Skeleton className="h-2 w-full rounded-full" />
	</div>
);

const TransactionSkeletonRow = (): React.ReactElement => (
	<div className="flex items-center gap-3 py-2.5">
		<Skeleton className="size-9 rounded-full" />
		<div className="flex flex-1 flex-col gap-1">
			<Skeleton className="h-4 w-40" />
			<Skeleton className="h-3.5 w-28" />
		</div>
		<Skeleton className="h-4 w-24" />
	</div>
);

export const AccountSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6 p-6">
		<div className="flex items-center justify-between">
			<Skeleton className="h-8 w-48" />
			<Skeleton className="h-9 w-24 rounded-md" />
		</div>

		<GlassCard className="overflow-hidden p-4">
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center gap-4">
					<Skeleton className="size-12 rounded-full" />
					<div className="flex flex-col gap-1">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-3.5 w-24" />
					</div>
				</div>
				<div className="flex flex-col gap-0.5 pr-6">
					<Skeleton className="h-3.5 w-28" />
					<Skeleton className="h-6 w-32" />
				</div>
			</div>
		</GlassCard>

		<div className="flex flex-row gap-4">
			<GlassCard className="h-full flex-1 p-4">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton className="size-4 rounded" />
							<Skeleton className="h-4 w-32" />
						</div>
						<Skeleton className="h-3.5 w-16" />
					</div>
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-1">
							<Skeleton className="h-3.5 w-16" />
							<Skeleton className="h-5 w-24" />
						</div>
						<div className="flex flex-col gap-1">
							<Skeleton className="h-3.5 w-16" />
							<Skeleton className="h-5 w-24" />
						</div>
					</div>
					<Skeleton className="h-2 w-full rounded-full" />
					<Skeleton className="h-3.5 w-40" />
				</div>
			</GlassCard>

			<GlassCard className="h-full flex-1 p-4">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Skeleton className="size-4 rounded" />
						<Skeleton className="h-4 w-36" />
					</div>
					<CategorySkeletonRow />
					<CategorySkeletonRow />
					<CategorySkeletonRow />
				</div>
			</GlassCard>
		</div>

		<GlassCard className="p-4">
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Skeleton className="size-4 rounded" />
						<Skeleton className="h-4 w-28" />
					</div>
					<Skeleton className="h-3.5 w-20" />
				</div>
				<div className="flex items-center justify-between">
					<Skeleton className="h-8 w-64 rounded-md" />
					<Skeleton className="h-8 w-48 rounded-md" />
				</div>
				<TransactionSkeletonRow />
				<TransactionSkeletonRow />
				<TransactionSkeletonRow />
				<TransactionSkeletonRow />
				<TransactionSkeletonRow />
			</div>
		</GlassCard>
	</div>
);
