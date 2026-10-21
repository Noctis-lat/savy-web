import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";

/** Builds the update payload from form values. Items, if present, replace all existing items. */
export const buildUpdateBudgetPayload = (values: CreateBudgetFormValues): UpdateBudgetPayload => {
	const payload: UpdateBudgetPayload = {
		name: values.name,
		kind: values.kind,
		startDate: values.startDate,
		items: values.items.map((item) => ({
			categoryId: item.categoryId,
			amount: item.amount,
		})),
	};

	if (values.kind === "RECURRING" && values.period) {
		payload.period = values.period;
	}

	if (values.endDate) {
		payload.endDate = values.endDate;
	}

	return payload;
};
