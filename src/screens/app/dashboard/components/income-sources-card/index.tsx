import { Wallet } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { getFrequencyLabel } from "@/utils/onboarding/getFrequencyLabel";

type IncomeSourcesCardProps = {
	incomeSources: DashboardIncomeSourcesSummary;
	currency: string;
	locale: string;
	maxItems?: number;
	className?: string;
};

export const IncomeSourcesCard = ({
	incomeSources,
	currency,
	locale,
	maxItems = 4,
	className,
}: IncomeSourcesCardProps): React.ReactElement => {
	const navigate = useNavigate();
	const visible = incomeSources.sources.slice(0, maxItems);
	const isEmpty = visible.length === 0;

	return (
		<SummaryCard
			title="Fuentes de ingreso"
			icon={Wallet}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.SETTINGS.INCOME_SOURCES)}
			onCreate={() => navigate(ROUTES.APP.SETTINGS.INCOME_SOURCES)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin fuentes de ingreso"
					description="Registra una fuente para ver tu ingreso mensual estimado."
					action={{
						label: "Agregar fuente",
						onClick: () => navigate(ROUTES.APP.SETTINGS.INCOME_SOURCES),
					}}
				/>
			) : (
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2">
						<span className="text-xs text-muted-foreground">Ingreso mensual estimado</span>
						<span className="text-sm font-semibold tabular-nums text-primary">
							{formatCurrency(incomeSources.estimatedMonthlyTotal, currency, locale)}
						</span>
					</div>

					<div className="flex flex-col gap-2">
						{visible.map((source) => (
							<div
								key={source.id}
								className="flex items-center justify-between text-sm"
							>
								<div className="flex flex-col">
									<span className="font-medium text-foreground">{source.name}</span>
									<span className="text-xs text-muted-foreground">
										{getFrequencyLabel(source.frequency)}
									</span>
								</div>
								<span className="font-medium tabular-nums text-foreground">
									{formatCurrency(source.amount, currency, locale)}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</SummaryCard>
	);
};
