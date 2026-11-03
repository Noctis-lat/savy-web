import { ArrowUpDown, CalendarClock, RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useQueryCardStatementTransactions } from "@/hooks/card-statements/useQueryCardStatementTransactions";
import { StatementInstallmentRow } from "./components/statement-installment-row";
import { StatementMovementRow } from "./components/statement-movement-row";
import { StatementSection } from "./components/statement-section";
import { StatementTransactionsSkeleton } from "./components/statement-transactions-skeleton";

type CardStatementTransactionsProps = {
	cardStatement: CardStatement;
};

export const CardStatementTransactions = ({
	cardStatement,
}: CardStatementTransactionsProps): React.ReactElement => {
	const { statementTransactions, isLoading, isError } = useQueryCardStatementTransactions(
		cardStatement.id,
	);

	if (isLoading) {
		return <StatementTransactionsSkeleton />;
	}

	if (isError || !statementTransactions) {
		return (
			<ScaleFadeIn>
				<GlassCard>
					<Empty
						icon={RefreshCw}
						title="No pudimos cargar los movimientos"
						description="Revisa tu conexión e inténtalo de nuevo."
						className="py-8"
					/>
				</GlassCard>
			</ScaleFadeIn>
		);
	}

	// Backend order is meaningful (installments first, then purchases, payments, fees): filter, never sort.
	const installmentTransactions = statementTransactions.filter(
		(statementTransaction) => statementTransaction.installment !== null,
	);
	const movementTransactions = statementTransactions.filter(
		(statementTransaction) => statementTransaction.installment === null,
	);

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<StatementSection
				title="Mensualidades"
				icon={CalendarClock}
				count={installmentTransactions.length}
				emptyTitle="Sin mensualidades"
				emptyDescription="No hay compras a meses cobradas en este periodo."
			>
				{installmentTransactions.map((statementTransaction) => (
					<StatementInstallmentRow
						key={statementTransaction.id}
						statementTransaction={statementTransaction}
					/>
				))}
			</StatementSection>

			<StatementSection
				title="Movimientos"
				icon={ArrowUpDown}
				count={movementTransactions.length}
				emptyTitle="Sin movimientos en este periodo"
				emptyDescription="Las compras, pagos y comisiones del periodo aparecerán aquí."
			>
				{movementTransactions.map((statementTransaction) => (
					<StatementMovementRow
						key={statementTransaction.id}
						statementTransaction={statementTransaction}
					/>
				))}
			</StatementSection>
		</div>
	);
};
