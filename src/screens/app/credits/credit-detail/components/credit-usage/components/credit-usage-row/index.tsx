import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type CreditUsageRowProps = {
	label: string;
	value: string;
	/** Legend dot linking the row to the gauge. Omit for rows without a gauge counterpart. */
	dotClassName?: string;
	valueClassName?: string;
};

export const CreditUsageRow = ({
	label,
	value,
	dotClassName,
	valueClassName,
}: CreditUsageRowProps): React.ReactElement => {
	return (
		<div className="flex items-baseline justify-between gap-3 text-sm">
			<dt className="flex min-w-0 items-center gap-2 text-muted-foreground">
				{dotClassName && (
					<span
						aria-hidden="true"
						className={merge("size-2 shrink-0 rounded-full", dotClassName)}
					/>
				)}
				<span className="truncate">{label}</span>
			</dt>
			<dd className={merge("shrink-0 font-medium text-foreground tabular-nums", valueClassName)}>
				{value}
			</dd>
		</div>
	);
};
