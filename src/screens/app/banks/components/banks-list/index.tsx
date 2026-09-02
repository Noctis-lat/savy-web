import { Landmark, RefreshCw } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
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
	const searchQuery = useBanksController((state) => state.searchQuery);

	const banksQuery = useQueryBanks(banksFilters);
	const accountsQuery = useQueryAccounts();

	const isLoading = banksQuery.isLoading || accountsQuery.isLoading;
	const isError = banksQuery.isError || accountsQuery.isError;

	const enrichedBanks = useMemo(() => {
		if (!banksQuery.data || !accountsQuery.data) return [];
		return enrichBanksWithStats(banksQuery.data, accountsQuery.data);
	}, [banksQuery.data, accountsQuery.data]);

	const filteredBanks = useMemo(() => {
		if (!searchQuery) return enrichedBanks;
		const query = searchQuery.toLowerCase();
		return enrichedBanks.filter((bank) => bank.name.toLowerCase().includes(query));
	}, [enrichedBanks, searchQuery]);

	if (isLoading) {
		return <BanksListSkeleton />;
	}

	if (isError) {
		return (
			<Empty
				icon={RefreshCw}
				title="No pudimos cargar los bancos"
				description="Revisa tu conexión e inténtalo de nuevo."
				action={{
					label: "Reintentar",
					icon: RefreshCw,
					onClick: () => {
						void banksQuery.refetch();
						void accountsQuery.refetch();
					},
				}}
			/>
		);
	}

	if (filteredBanks.length === 0) {
		return (
			<GlassCard>
				<Empty
					icon={Landmark}
					title="Sin bancos"
					description="Agrega tu primer banco para comenzar a organizar tus cuentas."
					action={{
						label: "Agregar banco",
						onClick: () => navigate(ROUTES.APP.BANKS_NEW),
					}}
				/>
			</GlassCard>
		);
	}

	return (
		<StaggerContainer>
			<ScaleFadeIn>
				<GlassCard className="overflow-hidden p-0">
					{filteredBanks.map((bank) => (
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
