import { CheckCircle2, Landmark, Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { KpiCardMobile } from "@/components/design-system/patterns/data-display/kpi-card-mobile";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type BanksKpisProps = {
	banksInfo: BankInfo;
	total: number;
};

export const BanksKpis = ({ banksInfo, total }: BanksKpisProps): React.ReactElement => {
	return (
		<>
			<div className=" hidden sm:grid grid-cols-1 gap-4 sm:grid-cols-4">
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

			<ScaleFadeIn className="sm:hidden">
				<KpiCardMobile
					totalLabel={total === 1 ? "banco" : "bancos"}
					total={total}
					totalIcon={Landmark}
					liquidity={banksInfo.liquidity}
					debt={banksInfo.debt}
					netWorth={banksInfo.netWorth}
				/>
			</ScaleFadeIn>
		</>
	);
};
