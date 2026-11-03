import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type CreditHeaderFigureProps = {
	label: string;
	value: string;
	helper?: string;
	/** Larger value to give the row a clear entry point. */
	isPrimary?: boolean;
	tone?: "default" | "danger" | "muted";
	helperTone?: "muted" | "danger";
	/** "end" right-aligns the figure from md up; on mobile figures stay left-aligned. */
	align?: "start" | "end";
	className?: string;
};

export const CreditHeaderFigure = ({
	label,
	value,
	helper,
	isPrimary = false,
	tone = "default",
	helperTone = "muted",
	align = "start",
	className,
}: CreditHeaderFigureProps): React.ReactElement => {
	return (
		<div
			className={merge(
				"flex min-w-0 flex-col gap-0.5",
				align === "end" && "md:items-end md:text-right",
				className,
			)}
		>
			<dt className="text-xs text-muted-foreground">{label}</dt>
			<dd
				className={merge(
					"max-w-full truncate tabular-nums",
					isPrimary ? "text-lg font-bold md:text-xl" : "text-base font-semibold md:text-lg",
					tone === "danger" && "text-destructive",
					tone === "muted" && "text-muted-foreground",
					tone === "default" && "text-foreground",
				)}
			>
				{value}
			</dd>
			{helper && (
				<dd
					className={merge(
						"text-xs tabular-nums",
						helperTone === "danger" ? "font-medium text-destructive" : "text-muted-foreground",
					)}
				>
					{helper}
				</dd>
			)}
		</div>
	);
};
