import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

export const SavingsFields = (): React.ReactElement => {
	const createAccountForm = useFormContext<CreateAccountFormValues>();

	return (
		<div className="flex flex-col gap-4">
			<p className="text-xs font-medium text-muted-foreground">Datos del ahorro</p>

			<FormField
				name="savingsTargetAmount"
				form={createAccountForm}
				type="currency"
				label="Meta de ahorro"
				placeholder="0.00"
				required
				helperText="Monto que quieres alcanzar con esta cuenta."
			/>

			<FormDatePicker
				mode="single"
				name="savingsDeadline"
				form={createAccountForm}
				label="Fecha límite"
				optional
			/>
		</div>
	);
};
