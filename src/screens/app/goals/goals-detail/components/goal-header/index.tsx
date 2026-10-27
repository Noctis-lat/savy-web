import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

type GoalHeaderProps = {
	savingsGoal: SavingsGoal;
};

export const GoalHeader = ({ savingsGoal }: GoalHeaderProps): React.ReactElement => {
	return <GlassCard></GlassCard>;
};
