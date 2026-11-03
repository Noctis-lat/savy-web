import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	CARD_STATEMENT_DETAIL_SECTIONS,
	CARD_STATEMENT_DETAIL_SKELETON_ROWS,
} from "@/content/card-statements/cardStatementDetailContent";

export const StatementTransactionsSkeleton = (): React.ReactElement => (
	<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
		{CARD_STATEMENT_DETAIL_SECTIONS.map((sectionKey) => (
			<GlassCard
				key={sectionKey}
				className="overflow-hidden p-0 gap-0"
			>
				<div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
					<div className="flex items-center gap-2">
						<Skeleton className="size-4 rounded" />
						<Skeleton className="h-4 w-32" />
					</div>
					<Skeleton className="h-3.5 w-6" />
				</div>
				{CARD_STATEMENT_DETAIL_SKELETON_ROWS.map((rowKey) => (
					<div
						key={rowKey}
						className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0"
					>
						<Skeleton className="size-9 rounded-full" />
						<div className="flex flex-1 flex-col gap-1.5">
							<Skeleton className="h-4 w-36" />
							<Skeleton className="h-3 w-24" />
						</div>
						<Skeleton className="h-4 w-20" />
					</div>
				))}
			</GlassCard>
		))}
	</div>
);
