import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

export const ItemTitle = ({
	className,
	...props
}: React.ComponentProps<"div">): React.ReactElement => {
	return (
		<div
			data-slot="item-title"
			className={merge(
				"line-clamp-1 flex w-fit items-center gap-2 text-xs/relaxed leading-snug font-medium underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
};
