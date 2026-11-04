import type { LucideIcon } from "lucide-react";
import type React from "react";
import {
	DANGER_ZONE_ICON_TONE_CLASS,
	DANGER_ZONE_ROW_TONE_CLASS,
	DANGER_ZONE_TITLE_TONE_CLASS,
} from "@/content/ui/dangerZoneTones";
import { merge } from "@/utils/ui/mergeStyles";

type DangerZoneRowProps = {
	icon: LucideIcon;
	tone: DangerZoneTone;
	title: string;
	description: string;
	action: React.ReactElement;
	className?: string;
};

export const DangerZoneRow = ({
	icon: Icon,
	tone,
	title,
	description,
	action,
	className,
}: DangerZoneRowProps): React.ReactElement => {
	return (
		<div
			className={merge(
				"flex flex-col gap-3 border-t border-border/40 p-4 sm:flex-row sm:items-center sm:justify-between",
				DANGER_ZONE_ROW_TONE_CLASS[tone],
				className,
			)}
		>
			<div className="flex min-w-0 items-start gap-3">
				<div
					className={merge(
						"flex size-9 shrink-0 items-center justify-center rounded-lg",
						DANGER_ZONE_ICON_TONE_CLASS[tone],
					)}
				>
					<Icon
						className="size-4"
						aria-hidden="true"
					/>
				</div>
				<div className="flex min-w-0 flex-col gap-0.5">
					<p className={merge("text-sm font-medium", DANGER_ZONE_TITLE_TONE_CLASS[tone])}>
						{title}
					</p>
					<p className="max-w-prose text-xs text-muted-foreground">{description}</p>
				</div>
			</div>

			<div className="shrink-0 [&>button]:w-full sm:[&>button]:w-auto">{action}</div>
		</div>
	);
};
