import type React from "react";
import { useParams, useSearchParams } from "react-router";
import { useQuerySavingsGoal } from "@/hooks/savings-goals/useQuerySavingsGoal";

export const GoalsDetail = (): React.ReactElement => {
	const { goal_id } = useParams<{ goal_id: string }>();
	const [searchParams] = useSearchParams();
	const byAccountId = searchParams.get("by") === "account_id";

	const { savingsGoal, isLoading } = useQuerySavingsGoal(goal_id ?? "", byAccountId);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!savingsGoal) {
		return <div>No se encontró la meta</div>;
	}

	return <div>{savingsGoal.name}</div>;
};
