import { PiggyBank } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";

type ActiveBudgetsCardProps = {
	budgets: DashboardActiveBudget[];
	currency: string;
	locale: string;
	maxItems?: number;
	className?: string;
};

export const ActiveBudgetsCard = ({
	budgets,
	currency,
	locale,
	maxItems = 4,
	className,
}: ActiveBudgetsCardProps): React.ReactElement => {
	const navigate = useNavigate();
	const visible = budgets.slice(0, maxItems);
	const isEmpty = visible.length === 0;

	return (
		<SummaryCard
			title="Presupuestos activos"
			icon={PiggyBank}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.BUDGETS.ROOT)}
			onCreate={() => navigate(ROUTES.APP.BUDGETS.ROOT)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin presupuestos"
					description="Crea un presupuesto para controlar tus gastos."
					action={{
						label: "Crear presupuesto",
						onClick: () => navigate(ROUTES.APP.BUDGETS.ROOT),
					}}
				/>
			) : (
				<div className="flex flex-col gap-4">
					{visible.map((budget) => (
						<ProgressBar
							key={budget.id}
							label={budget.categoryName}
							current={budget.spent}
							total={budget.budget}
							currency={currency}
							locale={locale}
						/>
					))}
				</div>
			)}
		</SummaryCard>
	);
};
