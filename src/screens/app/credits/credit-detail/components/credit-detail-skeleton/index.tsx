import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	CREDIT_HEADER_FIGURE_KEYS,
	CREDIT_HEADER_FIGURE_SPACING,
	CREDIT_USAGE_ROW_KEYS,
} from "@/content/credit-cards/creditCardDetailContent";
import { merge } from "@/utils/ui/mergeStyles";
import { CreditStatementsSkeleton } from "../credit-statements/components/credit-statements-skeleton";
import { CreditTransactionsSkeleton } from "../credit-transactions/components/credit-transactions-skeleton";

export const CreditDetailSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6 p-6">
		<div className="flex items-center justify-between">
			<Skeleton className="h-8 w-48" />
		</div>

		<GlassCard className="overflow-hidden p-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
				<div className="flex min-w-0 flex-row items-center gap-4">
					<Skeleton className="size-12 shrink-0 rounded-full" />
					<div className="flex min-w-0 flex-col gap-1">
						<Skeleton className="h-5 w-40" />
						<Skeleton className="h-3.5 w-56 max-w-full" />
					</div>
				</div>
				<div className="grid grid-cols-3 gap-3 md:flex md:shrink-0 md:gap-0 md:divide-x md:divide-border/40">
					{CREDIT_HEADER_FIGURE_KEYS.map((figureKey) => (
						<div
							key={figureKey}
							className={merge("flex flex-col gap-1.5 md:items-end", CREDIT_HEADER_FIGURE_SPACING)}
						>
							<Skeleton className="h-3.5 w-20" />
							<Skeleton className="h-6 w-24" />
						</div>
					))}
				</div>
			</div>
		</GlassCard>

		<GlassCard className="p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Skeleton className="size-4 rounded" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-3.5 w-28" />
			</div>
			<div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
				<Skeleton className="aspect-2/1 w-full max-w-64 shrink-0 rounded-t-full" />
				<div className="grid w-full flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
					<div className="flex flex-col gap-2.5">
						{CREDIT_USAGE_ROW_KEYS.map((rowKey) => (
							<div
								key={rowKey}
								className="flex items-center justify-between"
							>
								<Skeleton className="h-4 w-28" />
								<Skeleton className="h-4 w-24" />
							</div>
						))}
					</div>
					<div className="flex flex-col gap-2.5">
						{CREDIT_USAGE_ROW_KEYS.map((rowKey) => (
							<div
								key={rowKey}
								className="flex items-center justify-between"
							>
								<Skeleton className="h-4 w-28" />
								<Skeleton className="h-4 w-32" />
							</div>
						))}
					</div>
				</div>
			</div>
		</GlassCard>

		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<CreditTransactionsSkeleton />
			<CreditStatementsSkeleton />
		</div>
	</div>
);
