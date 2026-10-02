import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { CATEGORY_TYPE_OPTIONS } from "@/content/categories/categoryOptions";
import type { CreateCategoryFormValues } from "@/schemas/categories/createCategorySchema";

type CreateCategoryFormProps = {
	lockedType?: CategoryType;
};

export const CreateCategoryForm = ({ lockedType }: CreateCategoryFormProps): React.ReactElement => {
	const createCategoryForm = useFormContext<CreateCategoryFormValues>();
	const { control } = createCategoryForm;

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={createCategoryForm}
				label="Nombre de la categoría"
				placeholder="Ej. Comida, Transporte, Salario..."
				required
			/>

			<FormSelect
				name="type"
				form={createCategoryForm}
				label="Tipo"
				options={CATEGORY_TYPE_OPTIONS.map((option) => ({
					label: option.label,
					value: option.value,
				}))}
				placeholder="Selecciona un tipo"
				required
				disabled={lockedType !== undefined}
			/>

			<Controller
				control={control}
				name="color"
				render={({ field }) => (
					<ColorPicker
						value={field.value}
						onChange={field.onChange}
						label="Color"
					/>
				)}
			/>

			<Controller
				control={control}
				name="icon"
				render={({ field }) => (
					<IconPicker
						value={field.value}
						onChange={field.onChange}
						label="Icono"
					/>
				)}
			/>
		</div>
	);
};
