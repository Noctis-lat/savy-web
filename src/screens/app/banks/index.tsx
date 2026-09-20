import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateBank } from "@/components/banks/create-bank";
import { Screen } from "@/components/design-system/primitives/screen";
import { BanksFilters } from "./components/banks-filters";
import { BanksKpis } from "./components/banks-kpis";
import { BanksList } from "./components/banks-list";

export const Banks = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Bancos" }]}
			action={<CreateBank />}
		>
			<BanksKpis />
			<BanksFilters />
			<BanksList />
		</Screen>
	);
};
