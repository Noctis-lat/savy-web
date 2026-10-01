import { Landmark, RefreshCw } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useBanksController } from "@/storage/banks/banksController";
import { enrichBanksWithStats } from "@/utils/banks/enrichBanksWithStats";
import { BankRow } from "../bank-row";
import { BanksListSkeleton } from "./components/banks-list-skeleton";

export const BanksList = (): React.ReactElement => {
	const navigate = useNavigate();

	const banksFilters = useBanksController((state) => state.banksFilters);
	const { banks, isLoading: isBanksLoading } = useQueryBanks(banksFilters);
	const { accounts, isLoading: isLoadingAccounts } = useQueryAccounts();

	const isLoading = isBanksLoading || isLoadingAccounts;

	const enrichedBanks = useMemo(() => {
		if (!banks || !accounts) return [];
		return enrichBanksWithStats(banks, accounts);
	}, [banks, accounts]);

	if (isLoading) {
		return <BanksListSkeleton />;
	}

	if (!banks) {
		return (
			<Empty
				icon={RefreshCw}
				title="No pudimos cargar los bancos"
				description="Revisa tu conexión e inténtalo de nuevo."
			/>
		);
	}

	if (banks.length === 0) {
		return (
			<ScaleFadeIn className="flex flex-col flex-1 gap-4">
				<GlassCard>
					<Empty
						icon={Landmark}
						title="Sin bancos"
						description="Agrega tu primer banco para comenzar a organizar tus cuentas."
					/>
				</GlassCard>
			</ScaleFadeIn>
		);
	}

	return (
		<StaggerContainer>
			<ScaleFadeIn>
				<GlassCard className="overflow-hidden p-0 gap-0">
					{enrichedBanks.map((bank) => (
						<BankRow
							key={bank.id}
							bank={bank}
							onClick={() => navigate(`/app/banks/${bank.id}`)}
						/>
					))}
				</GlassCard>
			</ScaleFadeIn>
		</StaggerContainer>
	);
};
