import { ChevronRight, type LucideIcon, Plus } from "lucide-react";
import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

type SummaryCardProps = {
	title: string;
	icon?: LucideIcon;
	actionLabel?: string;
	onAction?: () => void;
	onCreate?: () => void;
	createContent?: React.ReactElement;
	children: React.ReactNode;
	className?: string;
};

export const SummaryCard = ({
	title,
	icon: Icon,
	actionLabel,
	onAction,
	onCreate,
	createContent,
	children,
	className,
}: SummaryCardProps): React.ReactElement => {
	const hasAction = actionLabel && onAction;

	return (
		<GlassCard
			variant="light"
			className={merge("p-5", className)}
		>
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					{Icon && <Icon className="size-5 text-primary" />}
					<h2 className="text-base font-semibold text-foreground">{title}</h2>
				</div>

				<div className="flex items-center gap-2">
					{createContent
						? createContent
						: onCreate && (
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={onCreate}
									aria-label={`Crear ${title.toLowerCase()}`}
									className="text-primary hover:bg-primary/10"
								>
									<Plus className="size-4" />
								</Button>
							)}

					{hasAction && (
						<button
							type="button"
							onClick={onAction}
							className="flex items-center gap-0.5 text-sm text-primary hover:underline"
						>
							{actionLabel}
							<ChevronRight className="size-4" />
						</button>
					)}
				</div>
			</div>

			<div className="mt-4">{children}</div>
		</GlassCard>
	);
};
