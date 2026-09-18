import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type DonutDatum = {
	label: string;
	value: number;
	color?: string;
};

type DonutChartProps = {
	data: DonutDatum[];
	centerLabel?: string;
	centerValue?: string;
	currency?: string;
	locale?: string;
	emptyIcon?: LucideIcon;
	className?: string;
};

const FALLBACK_COLORS = [
	"var(--color-primary)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)",
	"var(--color-chart-6)",
];

function slugifyKey(label: string): string {
	const slug = label
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug || "item";
}

export const DonutChart = ({
	data,
	centerLabel,
	centerValue,
	currency,
	locale,
	emptyIcon,
	className,
}: DonutChartProps): React.ReactElement => {
	const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

	const config = useMemo<ChartConfig>(() => {
		const entries: Record<string, { label: string; color: string }> = {};
		for (const [index, item] of data.entries()) {
			const key = slugifyKey(item.label);
			entries[key] = {
				label: item.label,
				color: item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length],
			};
		}
		return entries;
	}, [data]);

	const tooltipFormatter = useMemo(() => {
		if (!currency || !locale) return undefined;

		return (value: number | string) => {
			const numericValue = typeof value === "string" ? Number(value) : value;
			return formatCurrency(numericValue, currency, locale);
		};
	}, [currency, locale]);

	if (data.length === 0 || total === 0) {
		return (
			<Empty
				icon={emptyIcon}
				title="Sin datos"
				description="No hay información para mostrar este gráfico."
				className={merge("py-10", className)}
			/>
		);
	}

	return (
		<div className={merge("relative flex flex-col", className)}>
			<ChartContainer
				config={config}
				className="mx-auto aspect-square w-full max-w-[240px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						wrapperStyle={{ zIndex: 10 }}
						content={
							<ChartTooltipContent
								nameKey={undefined}
								formatter={
									tooltipFormatter
										? (value, name, item, _index, _payload) => {
												const key = `${item.name ?? item.dataKey ?? "value"}`;
												const itemConfig = config[key];

												return (
													<div className="flex w-full items-center gap-2">
														<div
															className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
															style={{
																backgroundColor: item.payload?.fill ?? item.color,
															}}
														/>
														<div className="flex flex-1 items-center justify-between gap-4 leading-none">
															<span className="text-muted-foreground">
																{itemConfig?.label ?? name}
															</span>
															<span className="font-mono font-medium text-foreground tabular-nums">
																{tooltipFormatter(value as number | string)}
															</span>
														</div>
													</div>
												);
											}
										: undefined
								}
							/>
						}
					/>
					<Pie
						data={data.map((item) => ({
							...item,
							name: slugifyKey(item.label),
						}))}
						dataKey="value"
						nameKey="name"
						innerRadius={55}
						outerRadius={85}
						paddingAngle={2}
						stroke="none"
					>
						{data.map((item, index) => (
							<Cell
								key={item.label}
								fill={item.color ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
							/>
						))}
					</Pie>
					<ChartLegend content={<ChartLegendContent nameKey="name" />} />
				</PieChart>
			</ChartContainer>

			{(centerLabel || centerValue) && (
				<div
					className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-0.5"
					aria-hidden="true"
				>
					{centerValue && (
						<span className="text-lg font-bold tabular-nums text-foreground">{centerValue}</span>
					)}
					{centerLabel && <span className="text-xs text-muted-foreground">{centerLabel}</span>}
				</div>
			)}
		</div>
	);
};
