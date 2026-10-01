import { BanknoteX } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateBank } from "@/components/banks/create-bank";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useBanksController } from "@/storage/banks/banksController";
import { BanksFilters } from "./components/banks-filters";
import { BanksKpis } from "./components/banks-kpis";
import { BanksList } from "./components/banks-list";

export const Banks = (): React.ReactElement => {
	const banksFilters = useBanksController((state) => state.banksFilters);
	const { banksInfo, isLoading, total } = useQueryBanks(banksFilters);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!banksInfo) {
		return (
			<Empty
				title="No pudimos cargar tus bancos."
				description="Hay un error de conexion, reintenta mas tarde."
				icon={BanknoteX}
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Bancos" }]}
			action={<CreateBank />}
		>
			<BanksKpis
				total={total ?? 0}
				banksInfo={banksInfo}
			/>
			<BanksFilters />
			<BanksList />
		</Screen>
	);
};
