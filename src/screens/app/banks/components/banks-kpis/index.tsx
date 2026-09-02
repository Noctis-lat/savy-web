import { CheckCircle2, Landmark, Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useBanksController } from "@/storage/banks/banksController";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

export const BanksKpis = (): React.ReactElement => {
	const banksFilters = useBanksController((state) => state.banksFilters);
	const { data: banks } = useQueryBanks(banksFilters);

	const bankList = banks ?? [];
	const totalBanks = bankList.length;
	const activeBanks = bankList.filter((bank) => bank.isActive).length;
	const netWorth = bankList.reduce((sum, bank) => sum + (bank.info?.netWorth ?? 0), 0);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<ScaleFadeIn>
				<KpiCard
					label="Total bancos"
					value={totalBanks}
					icon={Landmark}
				/>
			</ScaleFadeIn>
			<ScaleFadeIn>
				<KpiCard
					label="Bancos activos"
					value={activeBanks}
					icon={CheckCircle2}
				/>
			</ScaleFadeIn>
			<ScaleFadeIn>
				<KpiCard
					label="Patrimonio total"
					value={formatCurrency(netWorth)}
					icon={Wallet}
				/>
			</ScaleFadeIn>
		</div>
	);
};
