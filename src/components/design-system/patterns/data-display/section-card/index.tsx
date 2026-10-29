import type { LucideIcon } from "lucide-react";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";
import { GlassCard } from "../../glass-card";

type SectionCardProps = {
	children: React.ReactNode;
	title: string;
	description?: string;
	icon?: LucideIcon;
	className?: string;
	contentClassName?: string;
	action?: React.ReactElement;
};

export const SectionCard = ({
	children,
	title,
	description,
	icon,
	className,
	contentClassName,
	action,
}: SectionCardProps): React.ReactElement => {
	const Icon = icon;
	return (
		<GlassCard className={merge("p-4", className)}>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center gap-4">
					{Icon ? <Icon className="h-5 w-5 text-primary" /> : null}
					<div className="flex flex-col">
						<h3 className="text-sm font-semibold text-foreground">{title}</h3>
						{description && <p className="text-xs text-muted-foreground">{description}</p>}
					</div>
				</div>

				{action}
			</div>

			<div className={merge("", contentClassName)}>{children}</div>
		</GlassCard>
	);
};
