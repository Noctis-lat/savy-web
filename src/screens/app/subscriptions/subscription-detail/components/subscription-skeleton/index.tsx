import type React from "react";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const DETAIL_SKELETON_ROWS = [
	"detail-skel-1",
	"detail-skel-2",
	"detail-skel-3",
	"detail-skel-4",
] as const;

export const SubscriptionSkeleton = (): React.ReactElement => {
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
						<div className="flex min-w-0 flex-col gap-1.5">
							<div className="flex items-center gap-2">
								<Skeleton className="h-6 w-32" />
								<Skeleton className="h-5 w-16 rounded-full" />
							</div>
							<div className="flex items-center gap-4">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-32" />
							</div>
						</div>
					</div>
					<Skeleton className="h-8 w-28" />
				</div>
			</GlassCard>

			<SectionCard
				title=""
				icon={() => null}
			>
				<div className="flex flex-col gap-3">
					{DETAIL_SKELETON_ROWS.map((key) => (
						<div
							key={key}
							className="flex flex-row items-baseline justify-between"
						>
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-4 w-24" />
						</div>
					))}
				</div>
			</SectionCard>

			<Skeleton className="h-20 w-full rounded-lg" />
		</div>
	);
};
