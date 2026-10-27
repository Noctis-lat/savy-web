import { CircleFadingArrowUp } from "lucide-react";
import type React from "react";
import { MiniGauge } from "@/components/design-system/patterns/data-display/mini-gauge";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type GoalProgressProps = {
	savingsGoal: SavingsGoal;
};

export const GoalProgress = ({ savingsGoal }: GoalProgressProps): React.ReactElement => {
	return (
		<SectionCard
			title="Progreso de la meta"
			icon={CircleFadingArrowUp}
			className="flex-1"
		>
			<MiniGauge
				label={savingsGoal.name}
				value={savingsGoal.currentAmount}
				max={savingsGoal.targetAmount}
				formatValue={formatCurrency}
			/>
		</SectionCard>
	);
};
