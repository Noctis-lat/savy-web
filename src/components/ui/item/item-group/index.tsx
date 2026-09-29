import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

export const ItemGroup = ({
	className,
	...props
}: React.ComponentProps<"div">): React.ReactElement => {
	return (
		<div
			data-slot="item-group"
			className={merge(
				"group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
				className,
			)}
			{...props}
		/>
	);
};
