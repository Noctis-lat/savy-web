import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import type { CreateBankFormValues } from "@/schemas/banks/createBanksSchema";

export const BankEditForm = (): React.ReactElement => {
	const bankEditForm = useFormContext<CreateBankFormValues>();

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={bankEditForm}
				label="Nombre del banco"
				placeholder="Ej. BBVA, Santander..."
				required
			/>

			<Controller
				control={bankEditForm.control}
				name="color"
				render={({ field }) => (
					<ColorPicker
						value={field.value}
						onChange={field.onChange}
						label="Color"
					/>
				)}
			/>
		</div>
	);
};
