import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";

export const buildBudgetPayload = (values: CreateBudgetFormValues): CreateBudgetPayload => {
	const payload: CreateBudgetPayload = {
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
