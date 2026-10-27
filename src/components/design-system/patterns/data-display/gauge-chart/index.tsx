import type React from "react";
import { useMemo } from "react";
import { merge } from "@/utils/ui/mergeStyles";

type GaugeChartProps = {
	value: number;
	max: number;
	label?: string;
	formatValue?: (value: number) => string;
	color?: string;
	className?: string;
};

const RADIUS = 120;
const STROKE_WIDTH = 20;
const CENTER_X = 160;
const CENTER_Y = 140;
const WIDTH = 320;
const HEIGHT = 168;

const SEMICIRCLE_LENGTH = Math.PI * RADIUS;

function clampRatio(value: number, max: number): number {
	if (max <= 0 || !Number.isFinite(value) || !Number.isFinite(max)) return 0;
	return Math.min(Math.max(value / max, 0), 1);
}

export const GaugeChart = ({
	value,
	max,
	label,
	formatValue,
	color = "var(--color-primary)",
	className,
}: GaugeChartProps): React.ReactElement => {
	const ratio = clampRatio(value, max);
	const dashOffset = useMemo(() => SEMICIRCLE_LENGTH * (1 - ratio), [ratio]);
	const percentage = Math.round(ratio * 100);

	const displayValue =
		max > 0 && formatValue ? formatValue(value) : max > 0 ? value.toLocaleString() : "N/A";
	const displayMax =
		max > 0 && formatValue ? formatValue(max) : max > 0 ? max.toLocaleString() : "N/A";

	const arcTransform = `rotate(-90 ${CENTER_X} ${CENTER_Y})`;
	const ariaLabel = `${label ? `${label}: ` : ""}${displayValue} de ${displayMax} (${percentage}%)`;

	return (
		<div
			role="img"
			aria-label={ariaLabel}
			className={merge("flex w-full flex-col items-center gap-2", className)}
		>
			<div className="relative w-full max-w-80">
				<svg
					className="h-auto w-full"
					viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
					fill="none"
					aria-hidden="true"
				>
					{/* Track */}
					<path
						d={`M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER_X + RADIUS} ${CENTER_Y}`}
						stroke={`color-mix(in oklch, ${color} 16%, transparent)`}
						strokeWidth={STROKE_WIDTH}
						strokeLinecap="round"
						fill="none"
					/>
					{/* Value arc */}
					{max > 0 && (
						<path
							d={`M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER_X + RADIUS} ${CENTER_Y}`}
							stroke={color}
							strokeWidth={STROKE_WIDTH}
							strokeLinecap="round"
							fill="none"
							strokeDasharray={SEMICIRCLE_LENGTH}
							strokeDashoffset={dashOffset}
							transform={arcTransform}
							className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
						/>
					)}
				</svg>

				<div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 pb-1">
					<span className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
						{displayValue}
					</span>
					<span className="text-sm font-medium tabular-nums text-muted-foreground">
						{percentage}%{max > 0 && formatValue ? ` de ${displayMax}` : ""}
					</span>
				</div>
			</div>

			{label && <span className="text-sm text-muted-foreground">{label}</span>}
		</div>
	);
};
