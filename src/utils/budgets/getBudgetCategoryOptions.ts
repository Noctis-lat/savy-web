/** Filter options for the categories tracked by a budget, deduped and sorted by name. */
export const getBudgetCategoryOptions = (budget: Budget): Option[] => {
	const optionsById = new Map<string, Option>();

	for (const item of budget.items) {
		optionsById.set(item.category.id, { label: item.category.name, value: item.category.id });
	}

	return Array.from(optionsById.values()).sort((prev, next) =>
		prev.label.localeCompare(next.label, "es"),
	);
};
