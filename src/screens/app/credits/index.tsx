import { CreditCard, CreditCardX } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryCreditCards } from "@/hooks/credit-cards/useQueryCreditCards";
import { CreditsFilters } from "./components/credits-filters";
import { CreditsKpis } from "./components/credits-kpis";
import { CreditsList } from "./components/credits-list";

export const Credits = (): React.ReactElement => {
	const { creditCardsInfo, isLoading } = useQueryCreditCards();

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!creditCardsInfo) {
		return (
			<Empty
				icon={CreditCardX}
				title="Sin créditos"
				description="Actualmente no hay créditos disponibles."
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Créditos" }]}
		>
			<CreditsKpis info={creditCardsInfo} />
			<CreditsFilters />
			<CreditsList />
		</Screen>
	);
};
