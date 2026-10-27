import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import type { UpdateSavingsGoalFormValues } from "@/schemas/savings-goals/updateSavingsGoalSchema";

export const EditSavingsGoalForm = (): React.ReactElement => {
	const editSavingsGoalForm = useFormContext<UpdateSavingsGoalFormValues>();
	const { control } = editSavingsGoalForm;

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={editSavingsGoalForm}
				label="Nombre de la meta"
				placeholder="Ej. Fondo de emergencia, Viaje..."
				required
			/>

			<FormField
				name="targetAmount"
				form={editSavingsGoalForm}
				type="currency"
				label="Monto objetivo"
				placeholder="0.00"
				required
				allowDecimals
			/>

			<FormDatePicker
				mode="single"
				name="deadline"
				form={editSavingsGoalForm}
				label="Fecha límite"
				optional
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
