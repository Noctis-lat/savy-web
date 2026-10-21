import type React from "react";
import { useFormContext } from "react-hook-form";
import { CreateCategory } from "@/components/categories/create-category";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { IncomeScheduleFields } from "@/components/income-sources/income-schedule-fields";
import { INCOME_DESTINATION_ACCOUNT_PARAMS } from "@/content/income-sources/incomeSourceContent";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { CreateIncomeSourceFormValues } from "@/schemas/income-sources/createIncomeSourceSchema";
import { formatCategoryOptions } from "@/utils/categories/formatCategoryOptions";
import { formatDestinationAccountOptions } from "@/utils/income-sources/formatDestinationAccountOptions";

export const CreateIncomeSourceForm = (): React.ReactElement => {
	const createIncomeSourceForm = useFormContext<CreateIncomeSourceFormValues>();
	const { setValue } = createIncomeSourceForm;
	const { accounts } = useQueryAccounts(INCOME_DESTINATION_ACCOUNT_PARAMS);
	const { categories } = useQueryCategories("INCOME");

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={createIncomeSourceForm}
				label="Nombre"
				placeholder="Ej. Salario, Freelance..."
				required
			/>

			<FormField
				name="amount"
				form={createIncomeSourceForm}
				type="currency"
				label="Monto por pago"
				placeholder="$0.00"
				required
			/>

			<IncomeScheduleFields />

			<FormSelect
				name="destinationAccountId"
				form={createIncomeSourceForm}
				label="Cuenta destino"
				options={formatDestinationAccountOptions(accounts)}
				placeholder="Selecciona una cuenta..."
				helperText="Solo cuentas de débito o efectivo."
				required
			/>

			<FormSelect
				name="categoryId"
				form={createIncomeSourceForm}
				label="Categoría"
				options={formatCategoryOptions(categories ?? [])}
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
