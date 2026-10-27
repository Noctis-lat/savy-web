import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams, useSearchParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQuerySavingsGoal } from "@/hooks/savings-goals/useQuerySavingsGoal";
import { GoalDangerZone } from "./components/goal-danger-zone";
import { GoalHeader } from "./components/goal-header";
import { GoalProgress } from "./components/goal-progress";
import { GoalTransactions } from "./components/goal-transactions";

export const GoalsDetail = (): React.ReactElement => {
	const { goal_id } = useParams<{ goal_id: string }>();
	const [searchParams] = useSearchParams();
	const byAccountId = searchParams.get("by") === "account_id";

	const { savingsGoal, isLoading } = useQuerySavingsGoal(goal_id ?? "", byAccountId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!savingsGoal) {
		return (
			<Empty
				title="Sin informacion"
				description="La meta de ahorro que solicitaste no pudo ser encontrada."
				icon={FlagOff}
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Metas de ahorro", href: ROUTES.APP.GOALS.ROOT },
				{ label: savingsGoal.name },
			]}
		>
			<GoalHeader savingsGoal={savingsGoal} />
			<div className="flex flex-row gap-4">
				<GoalProgress savingsGoal={savingsGoal} />
				<GoalTransactions />
			</div>
			<GoalDangerZone savingsGoal={savingsGoal} />
		</Screen>
	);
};
