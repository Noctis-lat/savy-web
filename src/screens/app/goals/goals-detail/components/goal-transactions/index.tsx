import { ArrowDownUp } from "lucide-react";
import type React from "react";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";

export const GoalTransactions = (): React.ReactElement => {
	return (
		<SectionCard
			title="Transacciones"
			icon={ArrowDownUp}
			className="flex-1"
		>
			<div></div>
		</SectionCard>
	);
};
