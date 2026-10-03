import { Coins, CreditCardX, Landmark, Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { KpiCardMobile } from "@/components/design-system/patterns/data-display/kpi-card-mobile";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type AccountsKpisProps = {
	info: AccountsInfo | undefined;
	total: number | undefined;
};

export const AccountsKpis = ({ info, total }: AccountsKpisProps): React.ReactElement => {
	console.log("Accounts neto:", info?.netWorth);
	return (
		<>
			<div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-4">
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

			<ScaleFadeIn className="sm:hidden">
				<KpiCardMobile
					totalLabel={total === 1 ? "cuenta" : "cuentas"}
					total={total ?? 0}
					totalIcon={Wallet}
					liquidity={info?.liquidity ?? 0}
					debt={info?.debt ?? 0}
					netWorth={info?.netWorth ?? 0}
				/>
			</ScaleFadeIn>
		</>
	);
};
