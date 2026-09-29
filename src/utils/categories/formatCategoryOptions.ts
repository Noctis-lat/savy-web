export const formatCategoryOptions = (categories: Category[]): Option[] => {
	return categories.map((category) => ({
		label: category.name,
		value: category.id,
	}));
};
