import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

export const ItemActions = ({
	className,
	...props
}: React.ComponentProps<"div">): React.ReactElement => {
	return (
		<div
			data-slot="item-actions"
			className={merge("flex items-center gap-2", className)}
			{...props}
		/>
	);
};
