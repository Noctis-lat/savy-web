import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { merge } from "@/utils/ui/mergeStyles";

type KpiCardProps = {
	label: string;
	value: string | number;
	delta?: number | null;
	icon?: LucideIcon;
	currency?: string;
	className?: string;
};

export const KpiCard = ({
	label,
	value,
	delta,
	icon: Icon,
	currency,
	className,
}: KpiCardProps): React.ReactElement => {
	const hasDelta = delta != null && Number.isFinite(delta);
	const isPositive = hasDelta && delta > 0;
	const isNegative = hasDelta && delta < 0;

	return (
		<GlassCard
			variant="light"
			className={merge("p-5", className)}
		>
			<div className="flex items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<span className="text-sm text-muted-foreground">{label}</span>
					<span className="text-3xl font-bold tabular-nums text-foreground">{value}</span>
				</div>

				{Icon && (
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
						<Icon className="size-5 text-primary" />
					</div>
				)}
			</div>

			{hasDelta && (
				<div
					className={merge(
						"mt-3 flex items-center gap-1 text-sm font-medium",
						isPositive && "text-primary",
						isNegative && "text-destructive",
						!isPositive && !isNegative && "text-muted-foreground",
					)}
				>
					{isPositive && <ArrowUp className="size-4" />}
					{isNegative && <ArrowDown className="size-4" />}
					<span className="tabular-nums">
						{isPositive ? "+" : ""}
						{delta.toFixed(2)}%
					</span>
					{currency && <span className="text-muted-foreground">/ {currency}</span>}
				</div>
			)}
		</GlassCard>
	);
};
