import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQuerySavingsGoals } from "@/hooks/savings-goals/useQuerySavingsGoals";
import { GoalsActions } from "./components/goals-actions";
import { GoalsKpis } from "./components/goals-kpis";
import { GoalsList } from "./components/goals-list";

export const Goals = (): React.ReactElement => {
	const { info, isLoading } = useQuerySavingsGoals();

	if (isLoading) {
		return (
			<Screen
				backRoute={ROUTES.APP.ROOT}
				breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Metas" }]}
			>
				<div className="flex items-center justify-center py-20">
					<div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
				</div>
			</Screen>
		);
	}

	if (!info) {
		return <Empty />;
	}

	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Metas" }]}
		>
			<GoalsKpis info={info} />
			<GoalsActions />
			<GoalsList />
		</Screen>
	);
};
