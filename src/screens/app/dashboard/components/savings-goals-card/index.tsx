import { Target } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { MiniGauge } from "@/components/design-system/patterns/data-display/mini-gauge";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type SavingsGoalsCardProps = {
	goals: DashboardSavingsGoal[];
	currency: string;
	locale: string;
	maxItems?: number;
	className?: string;
};

export const SavingsGoalsCard = ({
	goals,
	currency,
	locale,
	maxItems = 4,
	className,
}: SavingsGoalsCardProps): React.ReactElement => {
	const navigate = useNavigate();
	const visible = goals.slice(0, maxItems);
	const isEmpty = visible.length === 0;

	return (
		<SummaryCard
			title="Metas de ahorro"
			icon={Target}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.GOALS.ROOT)}
			onCreate={() => navigate(ROUTES.APP.GOALS.ROOT)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin metas"
					description="Define una meta para empezar a ahorrar."
					action={{
						label: "Crear meta",
						onClick: () => navigate(ROUTES.APP.GOALS.ROOT),
					}}
				/>
			) : (
				<div className="grid grid-cols-2 gap-4">
					{visible.map((goal) => (
						<button
							key={goal.id}
							type="button"
							onClick={() => navigate(ROUTES.APP.GOALS.ROOT)}
							className="flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent/40"
						>
							<MiniGauge
								value={goal.currentAmount}
								max={goal.targetAmount}
								label={goal.name}
								formatValue={(value) => formatCurrency(value, currency, locale)}
								color={goal.isCompleted ? "var(--color-primary)" : undefined}
							/>
							<span className="text-xs tabular-nums text-muted-foreground">
								{formatCurrency(goal.currentAmount, currency, locale)} /{" "}
								{formatCurrency(goal.targetAmount, currency, locale)}
							</span>
						</button>
					))}
				</div>
			)}
		</SummaryCard>
	);
};
