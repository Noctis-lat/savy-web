type CategoryTypeOption = {
	label: string;
	value: CategoryType;
	description: string;
};

export const CATEGORY_TYPE_OPTIONS: CategoryTypeOption[] = [
	{ label: "Ingreso", value: "INCOME", description: "Categoría para ingresos" },
	{ label: "Gasto", value: "EXPENSE", description: "Categoría para gastos" },
];
