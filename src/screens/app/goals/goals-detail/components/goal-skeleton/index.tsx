import type React from "react";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const TX_SKELETON_ROWS = ["tx-skel-1", "tx-skel-2", "tx-skel-3"] as const;

export const GoalSkeleton = (): React.ReactElement => {
	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Skeleton className="size-4 rounded-full" />
					<Skeleton className="h-4 w-12" />
					<Skeleton className="size-3 rounded-full" />
					<Skeleton className="h-4 w-24" />
					<Skeleton className="size-3 rounded-full" />
					<Skeleton className="h-4 w-28" />
				</div>
				<Skeleton className="h-9 w-28 rounded-md" />
			</div>

			<GlassCard
				variant="light"
				className="overflow-hidden p-0"
			>
				<div className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10">
					<div className="flex min-w-0 flex-col gap-5">
						<div className="flex items-start gap-4">
							<Skeleton className="size-12 rounded-full" />
							<div className="flex min-w-0 flex-col gap-1.5">
								<div className="flex items-center gap-2">
									<Skeleton className="h-6 w-32" />
									<Skeleton className="h-5 w-16 rounded-full" />
								</div>
								<div className="flex items-center gap-4">
									<Skeleton className="h-4 w-28" />
									<Skeleton className="h-4 w-36" />
								</div>
							</div>
						</div>
						<Skeleton className="h-16 w-full max-w-md rounded-lg" />
					</div>
					<div className="flex justify-center sm:w-72">
						<Skeleton className="size-44 rounded-full" />
					</div>
				</div>
			</GlassCard>

			<div className="flex flex-row gap-4">
				<SectionCard
					title=""
					icon={() => null}
				>
					<div className="flex flex-col gap-4">
						<Skeleton className="h-6 w-full rounded-full" />
						<div className="flex flex-col gap-2 border-t border-border/30 pt-3">
							<div className="flex justify-between">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-24" />
							</div>
							<div className="flex justify-between">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-24" />
							</div>
							<div className="flex justify-between">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-24" />
							</div>
						</div>
					</div>
				</SectionCard>

				<SectionCard
					title=""
					icon={() => null}
				>
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between gap-3">
							<Skeleton className="h-9 w-full max-w-sm rounded-md" />
							<Skeleton className="size-9 rounded-md" />
						</div>
						{TX_SKELETON_ROWS.map((key) => (
							<div
								key={key}
								className="flex items-center gap-3 py-2"
							>
								<Skeleton className="size-8 rounded-full" />
								<div className="flex flex-1 flex-col gap-1">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-3 w-20" />
								</div>
								<Skeleton className="h-4 w-16" />
							</div>
						))}
					</div>
				</SectionCard>
			</div>

			<Skeleton className="h-20 w-full rounded-lg" />
		</div>
	);
};
