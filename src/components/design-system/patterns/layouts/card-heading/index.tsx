import type { LucideIcon } from "lucide-react";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type CardHeadingProps = {
	icon: LucideIcon;
	title: string;
	description?: string;
	/** Id applied to the heading so a container can reference it with aria-labelledby. */
	titleId?: string;
	className?: string;
};

export const CardHeading = ({
	icon: Icon,
	title,
	description,
	titleId,
	className,
}: CardHeadingProps): React.ReactElement => {
	return (
		<div className={merge("flex flex-row items-center gap-2", className)}>
			<Icon
				className="h-6 w-6 text-primary"
				aria-hidden="true"
			/>
			<div className="flex flex-col gap-1">
				<h3
					id={titleId}
					className="text-sm font-medium text-foreground"
				>
					{title}
				</h3>
				{description && <p className="text-xs text-muted-foreground">{description}</p>}
			</div>
		</div>
	);
};
