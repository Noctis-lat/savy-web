import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type PayAccountCardProps = {
	name: string;
	color: string;
	icon: string | null;
	label: string;
	value: string;
	valueTone?: "default" | "danger";
	className?: string;
};

export const PayAccountCard = ({
	name,
	color,
	icon,
	label,
	value,
	valueTone = "default",
	className,
}: PayAccountCardProps): React.ReactElement => {
	return (
		<div
			className={merge(
				"flex min-w-0 flex-col gap-2 rounded-lg border border-border/50 bg-card p-3",
				className,
			)}
		>
			<div className="flex items-center gap-2">
				<div
					className="flex size-10 shrink-0 items-center justify-center rounded-full"
					style={{ backgroundColor: color }}
				>
					<DynamicIcon
						name={(icon ?? "wallet") as IconName}
						className="text-white"
						size={18}
					/>
				</div>
				<span className="truncate text-sm font-medium text-foreground">{name}</span>
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-xs text-muted-foreground">{label}</span>
				<span
					className={merge(
						"text-sm font-semibold tabular-nums",
						valueTone === "danger" ? "text-destructive" : "text-foreground",
					)}
				>
					{value}
				</span>
			</div>
		</div>
	);
};
