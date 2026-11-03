import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CREDIT_DETAIL_SKELETON_ROWS } from "@/content/credit-cards/creditCardDetailContent";

export const CreditStatementsSkeleton = (): React.ReactElement => (
	<GlassCard className="@container h-full overflow-hidden p-0 gap-0">
		<div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
			<div className="flex items-center gap-2">
				<Skeleton className="size-4 rounded" />
				<Skeleton className="h-4 w-36" />
			</div>
			<Skeleton className="h-3.5 w-16" />
		</div>
		{CREDIT_DETAIL_SKELETON_ROWS.map((rowKey) => (
			<div
				key={rowKey}
				className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0"
			>
				<div className="flex flex-1 flex-col gap-1.5">
					<Skeleton className="h-4 w-36" />
					<Skeleton className="h-3 w-28" />
				</div>
				<div className="hidden gap-6 @3xl:flex">
					<Skeleton className="h-8 w-28" />
					<Skeleton className="h-8 w-36" />
				</div>
				<div className="flex flex-col items-end gap-1.5">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-5 w-16 rounded-full" />
				</div>
			</div>
		))}
	</GlassCard>
);
