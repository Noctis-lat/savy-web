import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateAccount } from "@/components/accounts/create-account";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQuerySavingsGoals } from "@/hooks/savings-goals/useQuerySavingsGoals";
import { GoalsActions } from "./components/goals-actions";
import { GoalsKpis } from "./components/goals-kpis";
import { GoalsList } from "./components/goals-list";
import { GoalsSkeleton } from "./components/goals-skeleton";

export const Goals = (): React.ReactElement => {
	const { info, isLoading } = useQuerySavingsGoals();

	if (isLoading) {
		return <GoalsSkeleton />;
	}

	if (!info) {
		return <Empty />;
	}

	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Metas" }]}
			action={<CreateAccount type="SAVINGS" />}
		>
			<GoalsKpis info={info} />
			<GoalsActions />
			<GoalsList />
		</Screen>
	);
};
