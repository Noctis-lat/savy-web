import { CircleFadingArrowUp } from "lucide-react";
import type React from "react";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";

type GoalProgressProps = {
	savingsGoal: SavingsGoal;
};

export const GoalProgress = ({ savingsGoal }: GoalProgressProps): React.ReactElement => {
	const remaining = savingsGoal.targetAmount - savingsGoal.currentAmount;
	const isComplete = remaining <= 0 && savingsGoal.targetAmount > 0;
	const hasDeadline = savingsGoal.deadline !== null;

	return (
		<SectionCard
			title="Detalle del progreso"
			icon={CircleFadingArrowUp}
			className="flex-1"
		>
			<div className="flex flex-col gap-4">
				<ProgressBar
					label="Ahorrado"
					current={savingsGoal.currentAmount}
					total={savingsGoal.targetAmount}
				/>

				<div className="flex flex-col gap-2 border-t border-border/30 pt-3">
					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Ahorrado</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatCurrency(savingsGoal.currentAmount)}
						</span>
					</div>
					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">Meta</span>
						<span className="text-sm font-semibold tabular-nums text-foreground">
							{formatCurrency(savingsGoal.targetAmount)}
						</span>
					</div>
					<div className="flex flex-row items-baseline justify-between">
						<span className="text-sm text-muted-foreground">
							{isComplete ? "Sobrante" : "Restante"}
						</span>
						<span
							className={`text-sm font-semibold tabular-nums ${isComplete ? "text-primary" : "text-foreground"}`}
						>
							{formatCurrency(Math.abs(remaining))}
						</span>
					</div>
					{hasDeadline && (
						<div className="flex flex-row items-baseline justify-between">
							<span className="text-sm text-muted-foreground">Fecha límite</span>
							<span className="text-sm font-semibold tabular-nums text-foreground">
								{formatDate(savingsGoal.deadline)}
							</span>
						</div>
					)}
				</div>
			</div>
		</SectionCard>
	);
};
