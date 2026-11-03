import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditTransactionsRowsSkeleton } from "../credit-transactions-rows-skeleton";

export const CreditTransactionsSkeleton = (): React.ReactElement => (
	<GlassCard className="h-full p-4 flex flex-col gap-4">
		<div className="flex items-start justify-between gap-4">
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-2">
					<Skeleton className="size-4 rounded" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-3 w-44" />
			</div>
			<Skeleton className="h-8 w-36 rounded-md" />
		</div>
		<div className="flex items-center gap-2">
			<Skeleton className="h-9 flex-1 rounded-md" />
			<Skeleton className="h-9 w-24 rounded-md" />
		</div>
		<CreditTransactionsRowsSkeleton />
	</GlassCard>
);
