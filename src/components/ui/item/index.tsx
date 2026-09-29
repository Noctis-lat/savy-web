import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";
import { itemVariants } from "./style-variants";

export const Item = ({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof itemVariants> & { asChild?: boolean }): React.ReactElement => {
	const Comp = asChild ? Slot.Root : "div";
	return (
		<Comp
			data-slot="item"
			data-variant={variant}
			data-size={size}
			className={merge(itemVariants({ variant, size, className }))}
			{...props}
		/>
	);
};
