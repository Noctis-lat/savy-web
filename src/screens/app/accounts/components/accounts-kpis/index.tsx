import { Coins, CreditCardX, Landmark, Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type AccountsKpisProps = {
	info: AccountsInfo | undefined;
	total: number | undefined;
};

export const AccountsKpis = ({ info, total }: AccountsKpisProps): React.ReactElement => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
			<ScaleFadeIn>
				<KpiCard
					label="Total cuentas"
					value={total ?? 0}
					icon={Wallet}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Liquidez"
					value={formatCurrency(info?.liquidity ?? 0)}
					icon={Coins}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Deuda"
					value={formatCurrency(info?.debt ?? 0)}
					icon={CreditCardX}
				/>
			</ScaleFadeIn>

			<ScaleFadeIn>
				<KpiCard
					label="Patrimonio total"
					value={formatCurrency(info?.netWorth ?? 0)}
					icon={Landmark}
				/>
			</ScaleFadeIn>
		</div>
	);
};
