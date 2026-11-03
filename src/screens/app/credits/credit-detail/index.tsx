import { CreditCardX } from "lucide-react";
import type React from "react";
import { useParams, useSearchParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { EditCreditCard } from "@/components/credit-cards/edit-credit-card";
import { PayCreditCard } from "@/components/credit-cards/pay-credit-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryCreditCard } from "@/hooks/credit-cards/useQueryCreditCard";
import { CreditDetailHeader } from "./components/credit-detail-header";
import { CreditDetailSkeleton } from "./components/credit-detail-skeleton";
import { CreditStatements } from "./components/credit-statements";
import { CreditTransactions } from "./components/credit-transactions";
import { CreditUsage } from "./components/credit-usage";

export const CreditDetail = (): React.ReactElement => {
	const { credit_id } = useParams<{ credit_id: string }>();
	const [searchParams] = useSearchParams();
	const byAccountId = searchParams.get("by") === "account_id";

	const { creditCard, isLoading } = useQueryCreditCard(credit_id, byAccountId);

	if (isLoading) {
		return <CreditDetailSkeleton />;
	}

	if (!creditCard) {
		return (
			<Empty
				icon={CreditCardX}
				title="No encontramos este crédito"
				description="Es posible que se haya eliminado o que el enlace no sea válido."
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.CREDITS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Créditos", href: ROUTES.APP.CREDITS.ROOT },
				{ label: creditCard.name },
			]}
			action={
				<div className="flex flex-row items-center gap-2">
					<EditCreditCard creditCard={creditCard} />
					<PayCreditCard creditCard={creditCard} />
				</div>
			}
		>
			<CreditDetailHeader creditCard={creditCard} />
			<CreditUsage creditCard={creditCard} />
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<CreditTransactions creditCard={creditCard} />
				<CreditStatements creditCard={creditCard} />
			</div>
		</Screen>
	);
};
