import type { UpdateSavingsGoalFormValues } from "@/schemas/savings-goals/updateSavingsGoalSchema";
import { localDateToIso } from "@/utils/formatters/localDateToIso";

/** Builds the update payload from form values. Cleared optional fields are sent as null. */
export const buildUpdateSavingsGoalPayload = (
	values: UpdateSavingsGoalFormValues,
): UpdateSavingsGoalPayload => {
	const payload: UpdateSavingsGoalPayload = {
		name: values.name,
		targetAmount: values.targetAmount,
		color: values.color ?? null,
		icon: values.icon ?? null,
	};

	if (values.deadline) {
		payload.deadline = localDateToIso(values.deadline);
	}

	return payload;
};
