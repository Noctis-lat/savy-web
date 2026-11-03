import type React from "react";
import { Progress } from "@/components/ui/progress";
import { STATUS_TONE_BAR_CLASS, STATUS_TONE_TEXT_CLASS } from "@/content/ui/statusToneStyles";
import { merge } from "@/utils/ui/mergeStyles";

type UsageBlockProps = {
	title: string;
	/** Muted secondary value on the title row, e.g. "Disponible $8,000.00". */
	meta?: string;
	/** Muted line above the bar, e.g. "Usado $2,000.00 de $10,000.00". */
	detail?: string;
	/** Unclamped percentage. The bar is clamped to 0-100; omit it to render an empty, neutral bar. */
	percentage?: number;
	tone?: StatusTone;
	/** Accessible name for the bar. Required when a percentage is shown. */
	ariaLabel?: string;
	/** Set to false for blocks that show only text rows instead of a bar. */
	showBar?: boolean;
	/** Extra content rendered below the detail line and bar. */
	children?: React.ReactNode;
	className?: string;
};

/** Labelled usage reading: title + meta, detail line with percentage, and a progress bar. */
export const UsageBlock = ({
	title,
	meta,
	detail,
	percentage,
	tone = "neutral",
	ariaLabel,
	showBar = true,
	children,
	className,
}: UsageBlockProps): React.ReactElement => {
	const hasPercentage = percentage !== undefined;

	return (
		<div className={merge("flex min-w-0 flex-col gap-2", className)}>
			<div className="flex items-baseline justify-between gap-2">
				<span className="text-sm font-medium text-foreground">{title}</span>
				{meta && (
					<span className="truncate text-xs text-muted-foreground tabular-nums">{meta}</span>
				)}
			</div>

			{(detail || showBar) && (
				<div className="flex flex-col gap-1.5">
					{detail && (
						<div className="flex items-baseline justify-between gap-2">
							<span className="truncate text-xs text-muted-foreground tabular-nums">{detail}</span>
							{hasPercentage && (
								<span
									className={merge(
										"shrink-0 text-xs font-medium tabular-nums",
										STATUS_TONE_TEXT_CLASS[tone],
									)}
								>
									{percentage}%
								</span>
							)}
						</div>
					)}
					{showBar && (
						<Progress
							value={hasPercentage ? Math.min(Math.max(percentage, 0), 100) : 0}
							aria-label={hasPercentage ? ariaLabel : undefined}
							aria-hidden={hasPercentage ? undefined : true}
							className={merge("h-2", STATUS_TONE_BAR_CLASS[tone])}
						/>
					)}
				</div>
			)}

			{children}
		</div>
	);
};
