import type { UpdateSavingsGoalFormValues } from "@/schemas/savings-goals/updateSavingsGoalSchema";
import { toDateOnly } from "@/utils/formatters/formatDate";

/** Maps a SavingsGoal entity to the edit form values. */
export const getSavingsGoalFormValues = (
	savingsGoal: SavingsGoal,
): UpdateSavingsGoalFormValues => ({
	name: savingsGoal.name,
	targetAmount: savingsGoal.targetAmount,
	deadline: savingsGoal.deadline ? toDateOnly(savingsGoal.deadline) : undefined,
	color: savingsGoal.color ?? undefined,
	icon: savingsGoal.icon ?? undefined,
});
