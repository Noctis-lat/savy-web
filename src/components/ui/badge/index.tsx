import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { merge } from "@/utils/ui/mergeStyles";

const badgeVariants = cva(
	"group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-2.5!",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80 font-semibold",
				secondary: "bg-orange-50 border border-orange-200/50 backdrop-blur-sm text-orange-500",
				destructive:
					"bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
				outline:
					"border-border bg-input/20 text-foreground dark:bg-input/30 [a]:hover:bg-muted [a]:hover:text-muted-foreground",
				ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
				link: "text-primary underline-offset-4 hover:underline",
				success:
					"bg-green-500/15 text-green-600 ring-1 ring-green-600/20 transition-colors [a&]:hover:bg-green-500/25",

				warning:
					"bg-amber-500/15 text-amber-600 ring-1 ring-amber-600/20 transition-colors [a&]:hover:bg-amber-500/25",

				error:
					"bg-red-500/15 text-red-600 ring-1 ring-red-600/20 transition-colors [a&]:hover:bg-red-500/25",
				info: "bg-blue-500/15 text-blue-600 ring-1 ring-blue-600/20 transition-colors [a&]:hover:bg-blue-500/25",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

function Badge({
	className,
	variant = "default",
	asChild = false,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot.Root : "span";

	return (
		<Comp
			data-slot="badge"
			data-variant={variant}
			className={merge(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
