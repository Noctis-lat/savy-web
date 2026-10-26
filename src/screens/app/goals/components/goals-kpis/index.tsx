import { PiggyBank, Target } from "lucide-react";
import type React from "react";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type GoalsKpisProps = {
	info: SavingsGoalsInfo;
};

export const GoalsKpis = ({ info }: GoalsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<KpiCard
				icon={Target}
				label="Metas de ahorro"
				value={info.totalSavingsGoals}
			/>

			<KpiCard
				icon={PiggyBank}
				label="Total ahorrado"
				value={formatCurrency(info.totalSaved)}
			/>
		</div>
	);
};
