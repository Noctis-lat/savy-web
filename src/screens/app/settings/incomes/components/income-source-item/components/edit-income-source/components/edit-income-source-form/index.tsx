import type React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateCategory } from "@/components/categories/create-category";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { IncomeScheduleFields } from "@/components/income-sources/income-schedule-fields";
import { INCOME_DESTINATION_ACCOUNT_PARAMS } from "@/content/income-sources/incomeSourceContent";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { UpdateIncomeSourceFormValues } from "@/schemas/income-sources/updateIncomeSourceSchema";
import { formatCategoryOptions } from "@/utils/categories/formatCategoryOptions";
import { formatDestinationAccountOptions } from "@/utils/income-sources/formatDestinationAccountOptions";

export const EditIncomeSourceForm = (): React.ReactElement => {
	const editIncomeSourceForm = useFormContext<UpdateIncomeSourceFormValues>();
	const { control, setValue } = editIncomeSourceForm;

	const { accounts } = useQueryAccounts(INCOME_DESTINATION_ACCOUNT_PARAMS);
	const { categories } = useQueryCategories("INCOME");
	const destinationAccountId = useWatch({ control, name: "destinationAccountId" });
	const categoryId = useWatch({ control, name: "categoryId" });

	const accountOptions = formatDestinationAccountOptions(accounts);
	const hasCurrentAccount =
		!destinationAccountId || accountOptions.some((option) => option.value === destinationAccountId);

	const categoryOptions = formatCategoryOptions(categories ?? []);
	const hasCurrentCategory =
		!categoryId || !categories || categoryOptions.some((option) => option.value === categoryId);

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={editIncomeSourceForm}
				label="Nombre"
				placeholder="Ej. Salario, Freelance..."
				required
			/>

			<FormField
				name="amount"
				form={editIncomeSourceForm}
				type="currency"
				label="Monto por pago"
				placeholder="$0.00"
				required
			/>

			<IncomeScheduleFields />

			<FormSelect
				name="destinationAccountId"
				form={editIncomeSourceForm}
				label="Cuenta destino"
				options={
					hasCurrentAccount
						? accountOptions
						: [{ label: "Cuenta no encontrada", value: destinationAccountId }, ...accountOptions]
				}
				placeholder="Selecciona una cuenta..."
				helperText="Solo cuentas de débito o efectivo."
				required
			/>

			<FormSelect
				name="categoryId"
				form={editIncomeSourceForm}
				label="Categoría"
				options={
					hasCurrentCategory
						? categoryOptions
						: [{ label: "Categoría no encontrada", value: categoryId }, ...categoryOptions]
				}
				placeholder="Sin categoría"
				optional
				searchable
				searchPlaceholder="Buscar categoría..."
				action={
					<CreateCategory
						mode="icon"
						categoryType="INCOME"
						className="size-5"
						onCreated={(category) => setValue("categoryId", category.id, { shouldValidate: true })}
					/>
				}
			/>
		</div>
	);
};
