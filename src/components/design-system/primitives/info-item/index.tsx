import { Copy, ExternalLink, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { TruncatedText } from "@/components/design-system/primitives/truncated-text";
import { Item } from "@/components/ui/item";
import { ItemActions } from "@/components/ui/item/item-actions";
import { ItemContent } from "@/components/ui/item/item-content";
import { ItemMedia } from "@/components/ui/item/item-media";
import { ItemTitle } from "@/components/ui/item/item-title";
import { merge } from "@/utils/ui/mergeStyles";

type BaseInfoItemProps = {
	icon: LucideIcon;
	label?: string;
	className?: string;
	copyable?: boolean;
	isLink?: boolean;
};

type InfoItemWithValue = BaseInfoItemProps & {
	value: string | undefined;
	children?: never;
};

type InfoItemWithChildren = BaseInfoItemProps & {
	children: ReactNode;
	value?: never;
};

type InfoItemProps = InfoItemWithValue | InfoItemWithChildren;

export const InfoItem = ({
	icon,
	label,
	value,
	children,
	className,
	copyable = false,
	isLink = false,
}: InfoItemProps): React.ReactElement => {
	const Icon = icon;

	const handleClick = async () => {
		if (!value) return;

		if (isLink) {
			window.open(value, "_blank", "noopener,noreferrer");
			return;
		}

		if (copyable) {
			try {
				await navigator.clipboard.writeText(value);

				toast.info("Copiado al portapapeles");
			} catch {
				toast.error("No se pudo copiar");
			}
		}
	};

	return (
		<Item
			variant={value || children ? "outline" : "muted"}
			size="xs"
			className={merge(
				"group transition-all duration-300 select-none",
				value || children ? "hover:bg-gray-50 hover:border-gray-300/50" : "border-gray-300/50",
				(copyable || isLink) && value ? "cursor-pointer" : "",
				className,
			)}
			onClick={handleClick}
		>
			<ItemMedia
				variant="icon"
				className={merge(
					"text-gray-500 transition-colors",
					value || children ? "group-hover:text-gray-950" : "",
				)}
			>
				<Icon size={18} />
			</ItemMedia>

			<ItemContent className="min-w-0">
				{label && (
					<ItemTitle
						className={merge(
							"text-gray-500 transition-colors flex items-center",
							value || children ? "group-hover:text-gray-950" : "",
						)}
					>
						{label}
					</ItemTitle>
				)}

				{children ? (
					<div
						className={merge(
							"text-gray-500 text-xs capitalize",
							children ? "group-hover:text-gray-700" : "",
						)}
					>
						{children}
					</div>
				) : (
					<TruncatedText
						text={value ?? "-"}
						className={merge("text-gray-500 text-xs", value ? "group-hover:text-gray-700" : "")}
					/>
				)}
			</ItemContent>

			{copyable && value && (
				<ItemActions>
					<Copy className="size-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
				</ItemActions>
			)}

			{isLink && value && (
				<ItemActions>
					<ExternalLink className="size-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
				</ItemActions>
			)}
		</Item>
	);
};
