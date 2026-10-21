import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import type React from "react";
import { Item } from "@/components/ui/item";
import { ItemActions } from "@/components/ui/item/item-actions";
import { ItemContent } from "@/components/ui/item/item-content";
import { ItemMedia } from "@/components/ui/item/item-media";
import { merge } from "@/utils/ui/mergeStyles";
import { alertVariants } from "./style-variants";

type AlertProps = {
	variant?: import("class-variance-authority").VariantProps<
		typeof import("./style-variants").alertVariants
	>["variant"];
	title?: string;
	icon?: import("lucide-react").LucideIcon;
	action?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

const VARIANT_ICONS = {
	info: Info,
	warning: TriangleAlert,
	destructive: CircleAlert,
	secondary: Info,
	success: Info,
	default: Info,
} as const satisfies Record<string, import("lucide-react").LucideIcon>;

export const Alert = ({
	variant = "default",
	title,
	icon,
	action,
	children,
	className,
}: AlertProps): React.ReactElement => {
	const IconComponent = icon ?? VARIANT_ICONS[variant ?? "default"];

	return (
		<Item className={merge(alertVariants({ variant }), className, "flex flex-row items-center")}>
			{IconComponent && (
				<ItemMedia>
					<IconComponent className="size-4 shrink-0" />
				</ItemMedia>
			)}
			<ItemContent>
				{title && <span className="font-medium">{title}</span>}
				{children && <span className="text-xs font-light">{children}</span>}
			</ItemContent>
			{action && <ItemActions>{action}</ItemActions>}
		</Item>
	);
};
