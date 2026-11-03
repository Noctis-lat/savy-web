import type { LucideIcon } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

type StatementSectionProps = {
	title: string;
	icon: LucideIcon;
	count: number;
	emptyTitle: string;
	emptyDescription: string;
	children: React.ReactNode;
};

export const StatementSection = ({
	title,
	icon: Icon,
	count,
	emptyTitle,
	emptyDescription,
	children,
}: StatementSectionProps): React.ReactElement => {
	return (
		<ScaleFadeIn className="min-w-0">
			<GlassCard className="h-full overflow-hidden p-0 gap-0">
				<div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
					<div className="flex items-center gap-2">
						<Icon className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">{title}</h3>
					</div>
					<span className="text-xs text-muted-foreground tabular-nums">{count}</span>
				</div>

				{count > 0 ? (
					<StaggerContainer className="flex flex-col">{children}</StaggerContainer>
				) : (
					<Empty
						icon={Icon}
						title={emptyTitle}
						description={emptyDescription}
						className="py-6"
					/>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
