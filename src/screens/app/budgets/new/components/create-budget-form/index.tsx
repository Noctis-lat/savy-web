import { Info, Tags, Wallet } from "lucide-react";
import type React from "react";
import { useEffect, useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { CreateCategory } from "@/components/categories/create-category";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import {
	BUDGET_KIND_FORM_OPTIONS,
	BUDGET_PERIOD_FORM_OPTIONS,
} from "@/content/budgets/budgetsOptions";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";
import { BudgetCategoryPicker } from "./components/budget-category-picker";
import { BudgetItemsList } from "./components/budget-items-list";

export const CreateBudgetForm = (): React.ReactElement => {
	const createBudgetForm = useFormContext<CreateBudgetFormValues>();
	const { control, setValue, clearErrors } = createBudgetForm;

	const { categories, isLoading } = useQueryCategories();

	const selectedKind = useWatch({ control, name: "kind" });
	const items = useWatch({ control, name: "items" });

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const isRecurring = selectedKind === "RECURRING";
	const isOneTime = selectedKind === "ONE_TIME";

	useEffect(() => {
		if (selectedKind === "ONE_TIME") {
			setValue("period", undefined);
			clearErrors("period");
		}
		if (selectedKind === "RECURRING") {
			setValue("endDate", undefined);
			clearErrors("endDate");
		}
	}, [selectedKind, setValue, clearErrors]);

	const categoriesById = useMemo(() => {
		const map = new Map<string, Category>();
		for (const category of categories ?? []) {
			map.set(category.id, category);
		}
		return map;
	}, [categories]);

	const selectedCategoryIds = items.map((item) => item.categoryId);

	const handleAddCategory = (category: Category): void => {
		append({ categoryId: category.id, amount: 0 });
		const inputId = `items.${fields.length}.amount`;
		requestAnimationFrame(() => {
			document.getElementById(inputId)?.focus();
		});
	};

	const handleRemoveItem = (index: number): void => {
		remove(index);
	};

	return (
		<div className="flex flex-col gap-4">
			<SectionCard
				title="Información general"
				description="Define el nombre, tipo y periodo de tu presupuesto"
				icon={Info}
				className="border border-gray-200"
			>
				<div className="flex flex-col gap-4 pb-2">
					<FormField
						name="name"
						form={createBudgetForm}
						label="Nombre del presupuesto"
						placeholder="Ej. Gastos del mes, Viaje de vacaciones..."
						required
					/>

					<div className="flex flex-row gap-4">
						<FormSelect
							name="kind"
							form={createBudgetForm}
							label="Tipo de presupuesto"
							options={BUDGET_KIND_FORM_OPTIONS}
							placeholder="Selecciona un tipo"
							required
							className="flex-1"
						/>
					</div>

					{isRecurring && (
						<FormSelect
							name="period"
							form={createBudgetForm}
							label="Periodo"
							options={BUDGET_PERIOD_FORM_OPTIONS}
							placeholder="Selecciona un periodo"
							required
						/>
					)}

					<FormDatePicker
						mode="single"
						name="startDate"
						form={createBudgetForm}
						label="Fecha de inicio"
						required
					/>

					{isOneTime && (
						<FormDatePicker
							mode="single"
							name="endDate"
							form={createBudgetForm}
							label="Fecha de fin"
							required
							helperText="Debe ser posterior a la fecha de inicio"
						/>
					)}
				</div>
			</SectionCard>

			<SectionCard
				title="Categorías y montos"
				description="Selecciona las categorías que deseas incluir en tu presupuesto y define los montos"
				icon={Tags}
				className="border border-gray-200"
				action={<CreateCategory mode="icon" />}
			>
				<div className="flex flex-row gap-4 flex-1">
					<div className="rounded-lg border border-gray-300/70 p-4 w-sm">
						<div className="mb-2 flex items-center gap-2">
							<Wallet className="size-4 text-primary" />
							<span className="text-sm font-medium text-foreground">Selecciona categorías</span>
						</div>

						<BudgetCategoryPicker
							categories={categories}
							isLoading={isLoading}
							selectedCategoryIds={selectedCategoryIds}
							onAddCategory={handleAddCategory}
						/>
					</div>

					<BudgetItemsList
						fields={fields}
						onRemoveItem={handleRemoveItem}
						categoriesById={categoriesById}
					/>
				</div>
			</SectionCard>
		</div>
	);
};
