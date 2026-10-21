import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
	"flex w-full items-start gap-2.5 rounded-md border px-3 py-2 text-xs/relaxed",
	{
		variants: {
			variant: {
				default: "border-gray-200 bg-gray-100 text-foreground",
				secondary: "border-orange-200/50 bg-orange-50 text-orange-600",
				info: "border-blue-200/50 bg-blue-50 text-blue-700",
				warning: "border-amber-200/50 bg-amber-50 text-amber-700",
				success: "border-emerald-200/50 bg-emerald-50 text-emerald-700",
				destructive: "border-red-200/50 bg-red-50 text-red-700",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type AlertVariants = VariantProps<typeof alertVariants>;
