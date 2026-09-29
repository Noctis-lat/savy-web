import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

export const ItemContent = ({
	className,
	...props
}: React.ComponentProps<"div">): React.ReactElement => {
	return (
		<div
			data-slot="item-content"
			className={merge(
				"flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0.5 [&+[data-slot=item-content]]:flex-none",
				className,
			)}
			{...props}
		/>
	);
};
