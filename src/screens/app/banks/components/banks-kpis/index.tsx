import { CheckCircle2, Landmark, Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BanksKpisProps = {
	banksInfo: BankInfo;
	total: number;
};

export const BanksKpis = ({ banksInfo, total }: BanksKpisProps): React.ReactElement => {
	console.log("Bank neto:", banksInfo.netWorth);
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
			<ScaleFadeIn>
				<KpiCard
					label="Total bancos"
					value={total}
					icon={Landmark}
				/>
			</ScaleFadeIn>
			<ScaleFadeIn>
				<KpiCard
					label="Liquidez"
					value={formatCurrency(banksInfo.liquidity)}
					icon={CheckCircle2}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Deuda"
					value={formatCurrency(banksInfo.debt)}
					icon={CheckCircle2}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Patrimonio total"
					value={formatCurrency(banksInfo.netWorth)}
					icon={Wallet}
				/>
			</ScaleFadeIn>
		</div>
	);
};
