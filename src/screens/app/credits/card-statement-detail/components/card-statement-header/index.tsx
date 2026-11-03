import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StatusCallout } from "@/components/design-system/patterns/data-display/status-callout";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import {
	CARD_STATEMENT_STATUS_LABELS,
	CARD_STATEMENT_STATUS_VARIANTS,
} from "@/content/card-statements/cardStatementLabels";
import { getCardStatementHeaderStatus } from "@/utils/card-statements/getCardStatementHeaderStatus";
import { getCardStatementStatus } from "@/utils/card-statements/getCardStatementStatus";
import { formatDate } from "@/utils/formatters/formatDate";
import { CardStatementSummary } from "./components/card-statement-summary";

type CardStatementHeaderProps = {
	cardStatement: CardStatement;
	creditCard: CreditCard | undefined;
};

export const CardStatementHeader = ({
	cardStatement,
	creditCard,
}: CardStatementHeaderProps): React.ReactElement => {
	const cardColor = creditCard?.color ?? PRIMARY_FALLBACK;
	const status = getCardStatementStatus(cardStatement);
	const headerStatus = getCardStatementHeaderStatus(cardStatement);

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${cardColor} 12%, transparent) 0%, color-mix(in oklch, ${cardColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<ScaleFadeIn>
			<GlassCard className="overflow-hidden p-0 border-none">
				<div
					className="flex flex-col gap-4 p-4"
					style={gradientStyle}
				>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex min-w-0 flex-row items-center gap-4">
							<div
								className="flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm"
								style={{ backgroundColor: cardColor }}
							>
								<DynamicIcon
									name={(creditCard?.icon ?? "credit-card") as IconName}
									className="text-white"
									size={24}
								/>
							</div>

							<div className="flex min-w-0 flex-col gap-1">
								<div className="flex flex-row flex-wrap items-center gap-2">
									<h1 className="text-lg font-semibold text-foreground">Estado de cuenta</h1>
									<Badge
										variant={CARD_STATEMENT_STATUS_VARIANTS[status]}
										className="px-2 text-xs"
									>
										{CARD_STATEMENT_STATUS_LABELS[status]}
									</Badge>
									{cardStatement.isGenerated && (
										<Badge
											variant="outline"
											className="px-2 text-xs text-muted-foreground"
										>
											Automático
										</Badge>
									)}
								</div>
								<span className="text-xs text-muted-foreground tabular-nums">
									{formatDate(cardStatement.periodStart)} - {formatDate(cardStatement.periodEnd)}
								</span>
							</div>
						</div>

						<StatusCallout
							tone={headerStatus.tone}
							title={headerStatus.title}
							description={headerStatus.description}
						/>
					</div>

					<CardStatementSummary cardStatement={cardStatement} />
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
