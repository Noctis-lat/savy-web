import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const UPCOMING_SKELETON_ROWS = ["upcoming-skel-1", "upcoming-skel-2", "upcoming-skel-3"] as const;
const DETAIL_SKELETON_ITEMS = [
	"detail-skel-1",
	"detail-skel-2",
	"detail-skel-3",
	"detail-skel-4",
] as const;
const MANAGEMENT_SKELETON_ROWS = ["management-skel-1", "management-skel-2"] as const;

export const RecurringExpenseDetailSkeleton = (): React.ReactElement => {
	return (
		<div className="flex flex-1 flex-col gap-6 p-0 sm:p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Skeleton className="size-4 rounded-full" />
					<Skeleton className="h-4 w-12" />
					<Skeleton className="size-3 rounded-full" />
					<Skeleton className="h-4 w-28" />
					<Skeleton className="size-3 rounded-full" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-9 w-28 rounded-md" />
			</div>

			<GlassCard
				variant="light"
				className="overflow-hidden p-0"
			>
				<div className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10">
					<div className="flex items-start gap-4">
						<Skeleton className="size-12 rounded-full" />
						<div className="flex min-w-0 flex-col gap-2">
							<div className="flex items-center gap-2">
								<Skeleton className="h-6 w-36" />
								<Skeleton className="h-5 w-16 rounded-full" />
							</div>
							<Skeleton className="h-4 w-52" />
						</div>
					</div>
					<div className="flex flex-col gap-2 sm:items-end">
						<Skeleton className="h-9 w-44" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
			</GlassCard>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<GlassCard className="p-4 lg:col-span-2">
					<div className="flex items-center gap-4">
						<Skeleton className="size-5 rounded-full" />
						<Skeleton className="h-4 w-28" />
					</div>
					<div className="mt-4 flex flex-col gap-5">
						<div className="flex items-center gap-3">
							<Skeleton className="h-8 w-56" />
							<Skeleton className="h-5 w-20 rounded-full" />
						</div>
						<div className="flex flex-col gap-2">
							<Skeleton className="h-1.5 w-full rounded-full" />
							<div className="flex justify-between">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<Skeleton className="h-3 w-28" />
							{UPCOMING_SKELETON_ROWS.map((key) => (
								<div
									key={key}
									className="flex justify-between"
								>
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-20" />
								</div>
							))}
						</div>
					</div>
				</GlassCard>

				<GlassCard className="p-4">
					<div className="flex items-center gap-4">
						<Skeleton className="size-5 rounded-full" />
						<Skeleton className="h-4 w-20" />
					</div>
					<div className="mt-4 flex flex-col gap-4">
						{DETAIL_SKELETON_ITEMS.map((key) => (
							<div
								key={key}
								className="flex flex-col gap-1.5"
							>
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-4 w-32" />
							</div>
						))}
					</div>
				</GlassCard>
			</div>

			<GlassCard className="p-0">
				<div className="flex items-center gap-2 p-4 pb-0">
					<Skeleton className="size-4 rounded-full" />
					<Skeleton className="h-4 w-28" />
				</div>
				<div className="divide-y divide-border/40">
					{MANAGEMENT_SKELETON_ROWS.map((key) => (
						<div
							key={key}
							className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
						>
							<div className="flex flex-col gap-1.5">
								<Skeleton className="h-4 w-40" />
								<Skeleton className="h-3 w-64" />
							</div>
							<Skeleton className="h-8 w-28 rounded-md" />
						</div>
					))}
				</div>
			</GlassCard>
		</div>
	);
};
