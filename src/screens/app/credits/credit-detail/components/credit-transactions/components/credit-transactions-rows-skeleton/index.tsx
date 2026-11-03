import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CREDIT_DETAIL_SKELETON_ROWS } from "@/content/credit-cards/creditCardDetailContent";

export const CreditTransactionsRowsSkeleton = (): React.ReactElement => (
	<div className="flex flex-col">
		{CREDIT_DETAIL_SKELETON_ROWS.map((rowKey) => (
			<div
				key={rowKey}
				className="flex items-center gap-3 px-2 py-2.5"
			>
				<Skeleton className="size-9 shrink-0 rounded-full" />
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<Skeleton className="h-4 w-3/5" />
					<Skeleton className="h-3.5 w-2/5" />
				</div>
				<Skeleton className="h-4 w-20" />
			</div>
		))}
	</div>
);
