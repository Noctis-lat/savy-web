import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const ROW_SKELETONS = [
	"row-skel-1",
	"row-skel-2",
	"row-skel-3",
	"row-skel-4",
	"row-skel-5",
] as const;

export const AccountsListSkeleton = (): React.ReactElement => (
	<StaggerContainer>
		<ScaleFadeIn>
			<GlassCard className="overflow-hidden p-0">
				{ROW_SKELETONS.map((key) => (
					<div
						key={key}
						className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0"
					>
						<Skeleton className="size-10 rounded-full" />
						<div className="flex flex-1 flex-col gap-1">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-48" />
						</div>
						<Skeleton className="h-4 w-20" />
						<Skeleton className="size-4 rounded-full" />
					</div>
				))}
			</GlassCard>
		</ScaleFadeIn>
	</StaggerContainer>
);
