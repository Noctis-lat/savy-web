import { FileText, RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useQueryCardStatements } from "@/hooks/card-statements/useQueryCardStatements";
import { CreditStatementRow } from "./components/credit-statement-row";
import { CreditStatementsSkeleton } from "./components/credit-statements-skeleton";

type CreditStatementsProps = {
	creditCard: CreditCard;
};

export const CreditStatements = ({ creditCard }: CreditStatementsProps): React.ReactElement => {
	const { cardStatements, isLoading, isError } = useQueryCardStatements({
		creditCardId: creditCard.id,
		sortBy: "periodEnd",
		order: "desc",
	});

	if (isLoading) {
		return <CreditStatementsSkeleton />;
	}

	const statementCount = cardStatements?.length ?? 0;

	return (
		<ScaleFadeIn className="h-full min-w-0">
			{/* Container query: rows switch to the wide columns layout based on the card width, not the viewport. */}
			<GlassCard className="@container h-full overflow-hidden p-0 gap-0">
				<div className="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
					<div className="flex items-center gap-2">
						<FileText className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Estados de cuenta</h3>
					</div>
					{!isError && (
						<span className="text-xs text-muted-foreground tabular-nums">
							{statementCount} {statementCount === 1 ? "periodo" : "periodos"}
						</span>
					)}
				</div>

				{isError || !cardStatements ? (
					<Empty
						icon={RefreshCw}
						title="No pudimos cargar los estados de cuenta"
						description="Revisa tu conexión e inténtalo de nuevo."
						className="py-6"
					/>
				) : statementCount === 0 ? (
					<Empty
						icon={FileText}
						title="Sin estados de cuenta"
						description={`Después del corte del día ${creditCard.cutDay} verás aquí el saldo y los pagos del periodo.`}
						className="py-6"
					/>
				) : (
					<StaggerContainer className="flex flex-col">
						{cardStatements.map((cardStatement) => (
							<CreditStatementRow
								key={cardStatement.id}
								cardStatement={cardStatement}
							/>
						))}
					</StaggerContainer>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
