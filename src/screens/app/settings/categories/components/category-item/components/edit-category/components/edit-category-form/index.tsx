import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import type { UpdateCategoryFormValues } from "@/schemas/categories/updateCategorySchema";

export const EditCategoryForm = (): React.ReactElement => {
	const editCategoryForm = useFormContext<UpdateCategoryFormValues>();
	const { control } = editCategoryForm;

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={editCategoryForm}
				label="Nombre de la categoría"
				placeholder="Ej. Comida, Transporte..."
				required
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
