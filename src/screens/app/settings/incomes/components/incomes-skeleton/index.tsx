import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const CARD_SKELETONS = ["card-skel-1", "card-skel-2", "card-skel-3"] as const;

export const IncomesSkeleton = (): React.ReactElement => {
	return (
		<div
			className="flex flex-col gap-4 py-4"
			aria-busy="true"
		>
			<span className="sr-only">Cargando fuentes de ingreso</span>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center gap-2">
					<Skeleton className="size-6 rounded-md" />
					<div className="flex flex-col gap-1.5">
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-3 w-64" />
					</div>
				</div>
				<Skeleton className="h-8 w-32" />
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{CARD_SKELETONS.map((key) => (
					<GlassCard
						key={key}
						className="flex min-h-36 flex-col gap-3 p-4"
					>
						<div className="flex flex-row items-center justify-between">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-5 w-16 rounded-full" />
						</div>
						<Skeleton className="h-6 w-32" />
						<div className="flex flex-col gap-1.5">
							<Skeleton className="h-3 w-36" />
							<Skeleton className="h-3 w-28" />
						</div>
					</GlassCard>
				))}
			</div>
		</div>
	);
};
