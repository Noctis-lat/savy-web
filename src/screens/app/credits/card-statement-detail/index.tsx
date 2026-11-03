import { FileX } from "lucide-react";
import type React from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useDeleteCardStatementPermanent } from "@/hooks/card-statements/useDeleteCardStatementPermanent";
import { useQueryCardStatement } from "@/hooks/card-statements/useQueryCardStatement";
import { useQueryCreditCard } from "@/hooks/credit-cards/useQueryCreditCard";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { buildRoute } from "@/utils/routing/buildRoute";
import { CardStatementHeader } from "./components/card-statement-header";
import { CardStatementSkeleton } from "./components/card-statement-skeleton";
import { CardStatementTransactions } from "./components/card-statement-transactions";

export const CardStatementDetail = (): React.ReactElement => {
	const { credit_id, card_statement_id } = useParams<{
		credit_id: string;
		card_statement_id: string;
	}>();
	const navigate = useNavigate();

	const { cardStatement, isLoading: isLoadingStatement } = useQueryCardStatement(card_statement_id);
	const { creditCard, isLoading: isLoadingCreditCard } = useQueryCreditCard(credit_id);
	const { mutate: deleteStatementPermanent, isPending: isDeleting } =
		useDeleteCardStatementPermanent();

	const creditDetailRoute = buildRoute(ROUTES.APP.CREDITS.DETAIL, { credit_id: credit_id ?? "" });

	if (isLoadingStatement || isLoadingCreditCard) {
		return <CardStatementSkeleton />;
	}

	if (!cardStatement) {
		return (
			<Empty
				icon={FileX}
				title="No encontramos este estado de cuenta"
				description="Es posible que se haya eliminado o que el enlace no sea válido."
			/>
		);
	}

	const periodLabel = `${formatShortDate(cardStatement.periodStart)} - ${formatShortDate(cardStatement.periodEnd)}`;

	return (
		<Screen
			backRoute={creditDetailRoute}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Créditos", href: ROUTES.APP.CREDITS.ROOT },
				{ label: creditCard?.name ?? "Tarjeta", href: creditDetailRoute },
				{ label: `Estado de cuenta ${periodLabel}` },
			]}
		>
			<CardStatementHeader
				cardStatement={cardStatement}
				creditCard={creditCard}
			/>
			<CardStatementTransactions cardStatement={cardStatement} />
			<DangerZone
				entityName={`Estado de cuenta ${periodLabel}`}
				entityLabel="el estado de cuenta"
				isActive={false}
				onPermanentDelete={() =>
					deleteStatementPermanent(cardStatement.id, {
						onSuccess: () => navigate(creditDetailRoute),
					})
				}
				isDeleting={isDeleting}
			/>
		</Screen>
	);
};
