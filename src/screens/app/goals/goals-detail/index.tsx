import { FlagOff } from "lucide-react";
import type React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { EditSavingsGoal } from "@/components/savings-goals/edit-savings-goal";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useDeleteSavingsGoal } from "@/hooks/savings-goals/useDeleteSavingsGoal";
import { useDeleteSavingsGoalPermanent } from "@/hooks/savings-goals/useDeleteSavingsGoalPermanent";
import { useQuerySavingsGoal } from "@/hooks/savings-goals/useQuerySavingsGoal";
import { GoalHeader } from "./components/goal-header";
import { GoalProgress } from "./components/goal-progress";
import { GoalSkeleton } from "./components/goal-skeleton";
import { GoalTransactions } from "./components/goal-transactions";

export const GoalsDetail = (): React.ReactElement => {
	const { goal_id } = useParams<{ goal_id: string }>();
	const [searchParams] = useSearchParams();
	const byAccountId = searchParams.get("by") === "account_id";
	const navigate = useNavigate();

	const { savingsGoal, isLoading } = useQuerySavingsGoal(goal_id ?? "", byAccountId);
	const { account } = useQueryAccount(savingsGoal?.accountId);
	const { mutate: deleteSavingsGoal, isPending: isDeactivating } = useDeleteSavingsGoal();
	const { mutate: deleteSavingsGoalPermanent, isPending: isDeleting } =
		useDeleteSavingsGoalPermanent();

	if (isLoading) {
		return <GoalSkeleton />;
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
			action={<EditSavingsGoal savingsGoal={savingsGoal} />}
		>
			<GoalHeader savingsGoal={savingsGoal} />
			<div className="flex flex-row gap-4">
				<GoalProgress savingsGoal={savingsGoal} />
				<GoalTransactions savingsGoal={savingsGoal} />
			</div>
			<DangerZone
				entityName={savingsGoal.name}
				entityLabel="la meta"
				isActive={account?.isActive ?? true}
				onDeactivate={() => deleteSavingsGoal(savingsGoal.id)}
				onPermanentDelete={() =>
					deleteSavingsGoalPermanent(savingsGoal.id, {
						onSuccess: () => navigate(ROUTES.APP.GOALS.ROOT),
					})
				}
				isDeactivating={isDeactivating}
				isDeleting={isDeleting}
			/>
		</Screen>
	);
};
