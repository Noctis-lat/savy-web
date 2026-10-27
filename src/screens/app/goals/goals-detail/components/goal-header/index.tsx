import { CalendarClock, Flag } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GaugeChart } from "@/components/design-system/patterns/data-display/gauge-chart";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Alert } from "@/components/design-system/primitives/alert";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { getSavingsGoalStatus } from "@/utils/savings-goals/getSavingsGoalStatus";

type GoalHeaderProps = {
	savingsGoal: SavingsGoal;
};

export const GoalHeader = ({ savingsGoal }: GoalHeaderProps): React.ReactElement => {
	const goalColor = savingsGoal.color ?? PRIMARY_FALLBACK;
	const { badge, alert } = getSavingsGoalStatus(savingsGoal);

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
					className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
					style={gradientStyle}
				>
					<div className="flex min-w-0 flex-col gap-5">
						<div className="flex items-start gap-4">
							<div
								className="flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm"
								style={{ backgroundColor: goalColor }}
							>
								<DynamicIcon
									name={(savingsGoal.icon ?? "target") as IconName}
									className="text-white"
									size={24}
									aria-hidden="true"
								/>
							</div>

							<div className="flex min-w-0 flex-col gap-1.5">
								<div className="flex flex-wrap items-center gap-2">
									<h1 className="text-xl font-semibold text-foreground">{savingsGoal.name}</h1>
									<Badge variant={badge.variant}>{badge.label}</Badge>
								</div>

								<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
									<span className="flex items-center gap-1.5 tabular-nums">
										<Flag
											className="size-4"
											aria-hidden="true"
										/>
										Meta {formatCurrency(savingsGoal.targetAmount)}
									</span>
									<span className="flex items-center gap-1.5 tabular-nums">
										<CalendarClock
											className="size-4"
											aria-hidden="true"
										/>
										{savingsGoal.deadline
											? `Fecha límite: ${formatDate(savingsGoal.deadline)}`
											: "Sin fecha límite"}
									</span>
								</div>
							</div>
						</div>

						<Alert
							variant={alert.variant}
							icon={alert.icon}
							title={alert.title}
							className="sm:max-w-md"
						>
							<span className="tabular-nums">{alert.description}</span>
						</Alert>
					</div>

					<div className="flex justify-center sm:w-72">
						<GaugeChart
							value={savingsGoal.currentAmount}
							max={savingsGoal.targetAmount}
							formatValue={formatCurrency}
							color={goalColor}
						/>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
