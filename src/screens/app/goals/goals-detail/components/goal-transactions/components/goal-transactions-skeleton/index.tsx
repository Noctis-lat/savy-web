import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = ["goal-tx-skel-1", "goal-tx-skel-2", "goal-tx-skel-3"] as const;

export const GoalTransactionsSkeleton = (): React.ReactElement => (
	<div className="flex flex-col gap-2">
		{SKELETON_ROWS.map((key) => (
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
);
