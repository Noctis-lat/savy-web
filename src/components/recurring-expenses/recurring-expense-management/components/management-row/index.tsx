import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type ManagementRowProps = {
	title: string;
	description: string;
	action?: React.ReactElement;
	titleClassName?: string;
};

export const ManagementRow = ({
	title,
	description,
	action,
	titleClassName,
}: ManagementRowProps): React.ReactElement => {
	return (
		<div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex flex-col gap-0.5">
				<p className={merge("text-sm font-medium text-foreground", titleClassName)}>{title}</p>
				<p className="max-w-prose text-xs text-muted-foreground">{description}</p>
			</div>

			{action && <div className="shrink-0">{action}</div>}
		</div>
	);
};
