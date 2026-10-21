import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";
import { toDateOnly } from "@/utils/formatters/formatDate";

/** Maps a Budget entity to the form values used by create/edit. */
export const getBudgetFormValues = (budget: Budget): CreateBudgetFormValues => ({
	name: budget.name,
	kind: budget.kind,
	period: budget.period ?? undefined,
	startDate: toDateOnly(budget.startDate),
	endDate: budget.endDate ? toDateOnly(budget.endDate) : undefined,
	items: budget.items.map((item) => ({
		categoryId: item.categoryId,
		amount: item.amount,
	})),
});
