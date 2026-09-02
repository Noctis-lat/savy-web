import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = ["banks-skel-1", "banks-skel-2", "banks-skel-3", "banks-skel-4"] as const;

export const BanksListSkeleton = (): React.ReactElement => (
	<GlassCard className="p-0">
		{SKELETON_ROWS.map((key) => (
			<div
				key={key}
				className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0"
			>
				<Skeleton className="size-3 rounded-full" />
				<div className="flex flex-1 flex-col gap-1">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-48" />
				</div>
				<Skeleton className="h-4 w-16" />
			</div>
		))}
	</GlassCard>
);
