import type React from "react";
import { useEffect } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useCreditCardTransactionsController } from "@/storage/credit-cards/creditCardTransactionsController";
import { CreditTransactionsActions } from "./components/credit-transactions-actions";
import { CreditTransactionsHeader } from "./components/credit-transactions-header";
import { CreditTransactionsList } from "./components/credit-transactions-list";

type CreditTransactionsProps = {
	creditCard: CreditCard;
};

export const CreditTransactions = ({ creditCard }: CreditTransactionsProps): React.ReactElement => {
	const resetFilters = useCreditCardTransactionsController((state) => state.resetFilters);

	// Filters are scoped to a single credit card: clear them when leaving or switching cards.
	useEffect(() => {
		if (!creditCard.id) return;
		return () => resetFilters();
	}, [creditCard.id, resetFilters]);

	return (
		<ScaleFadeIn className="h-full min-w-0">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<CreditTransactionsHeader creditCard={creditCard} />
				<CreditTransactionsActions />
				<CreditTransactionsList creditCard={creditCard} />
			</GlassCard>
		</ScaleFadeIn>
	);
};
