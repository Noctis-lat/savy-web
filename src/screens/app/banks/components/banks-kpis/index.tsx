import { CheckCircle2, CreditCard, Landmark } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";

export const BanksKpis = (): React.ReactElement => {
	const { data: banks } = useQueryBanks({ info: true });
	const { data: accounts } = useQueryAccounts();

	const stats = useMemo(() => {
		const bankList = banks ?? [];
		const accountList = accounts ?? [];
		return {
			totalBanks: bankList.length,
			activeBanks: bankList.filter((bank) => bank.isActive).length,
			totalAccounts: accountList.length,
		};
	}, [banks, accounts]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<ScaleFadeIn>
				<KpiCard
					label="Total bancos"
					value={stats.totalBanks}
					icon={Landmark}
				/>
			</ScaleFadeIn>
			<ScaleFadeIn>
				<KpiCard
					label="Cuentas"
					value={stats.totalAccounts}
					icon={CreditCard}
				/>
			</ScaleFadeIn>
			<ScaleFadeIn>
				<KpiCard
					label="Bancos activos"
					value={stats.activeBanks}
					icon={CheckCircle2}
				/>
			</ScaleFadeIn>
		</div>
	);
};
