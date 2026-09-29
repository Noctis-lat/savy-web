import type { VariantProps } from "class-variance-authority";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";
import { itemMediaVariants } from "../style-variants";

export const ItemMedia = ({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>): React.ReactElement => {
	return (
		<div
			data-slot="item-media"
			data-variant={variant}
			className={merge(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	);
};
