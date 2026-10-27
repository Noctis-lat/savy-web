import { CalendarClock } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GaugeChart } from "@/components/design-system/patterns/data-display/gauge-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";

type GoalHeaderProps = {
	savingsGoal: SavingsGoal;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const GoalHeader = ({ savingsGoal }: GoalHeaderProps): React.ReactElement => {
	const goalColor = savingsGoal.color ?? PRIMARY_FALLBACK;
	const isComplete =
		savingsGoal.currentAmount >= savingsGoal.targetAmount && savingsGoal.targetAmount > 0;

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${goalColor} 12%, transparent) 0%, color-mix(in oklch, ${goalColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<ScaleFadeIn>
			<GlassCard
				variant="light"
				className="overflow-hidden p-0"
			>
				<div
					className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start sm:gap-8"
					style={gradientStyle}
				>
					<div className="flex flex-col items-center gap-3 sm:items-start">
						<div className="flex flex-row items-center gap-3">
							<div
								className="flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm"
								style={{ backgroundColor: goalColor }}
							>
								<DynamicIcon
									name={(savingsGoal.icon ?? "target") as IconName}
									className="text-white"
									size={24}
								/>
							</div>

							<div className="flex min-w-0 flex-col gap-1">
								<div className="flex flex-row items-center gap-2">
									<h1 className="text-lg font-semibold text-foreground">{savingsGoal.name}</h1>
									{savingsGoal.isCompleted && <Badge variant="success">Completada</Badge>}
								</div>
								{savingsGoal.deadline && (
									<div className="flex flex-row items-center gap-1.5 text-muted-foreground">
										<CalendarClock className="size-3.5" />
										<span className="text-xs tabular-nums">
											Meta para el {formatDate(savingsGoal.deadline)}
										</span>
									</div>
								)}
							</div>
						</div>

						<div className="flex flex-col gap-3 sm:mt-2">
							<div className="flex flex-row items-baseline gap-2">
								<span className="text-sm text-muted-foreground">Ahorrado</span>
								<span className="text-lg font-semibold tabular-nums text-foreground">
									{formatCurrency(savingsGoal.currentAmount)}
								</span>
							</div>
							<div className="flex flex-row items-baseline gap-2">
								<span className="text-sm text-muted-foreground">Meta</span>
								<span className="text-lg font-semibold tabular-nums text-foreground">
									{formatCurrency(savingsGoal.targetAmount)}
								</span>
							</div>
							<div className="flex flex-row items-baseline gap-2">
								<span className="text-sm text-muted-foreground">
									{isComplete ? "Sobrante" : "Restante"}
								</span>
								<span
									className={merge(
										"text-lg font-semibold tabular-nums",
										isComplete ? "text-primary" : "text-foreground",
									)}
								>
									{formatCurrency(Math.abs(savingsGoal.targetAmount - savingsGoal.currentAmount))}
								</span>
							</div>
						</div>
					</div>

					<div className="flex shrink-0 justify-center sm:ml-auto">
						<GaugeChart
							value={savingsGoal.currentAmount}
							max={savingsGoal.targetAmount}
							label={isComplete ? "Meta alcanzada" : "Progreso"}
							formatValue={formatCurrency}
							color={goalColor}
						/>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
