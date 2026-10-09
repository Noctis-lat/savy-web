import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

export const CreditCardFields = (): React.ReactElement => {
	const createAccountForm = useFormContext<CreateAccountFormValues>();

	return (
		<div className="flex flex-col gap-4">
			<p className="text-xs font-medium text-muted-foreground">Datos de la tarjeta</p>

			<FormField
				name="creditLimit"
				form={createAccountForm}
				type="currency"
				label="Límite de crédito"
				placeholder="0.00"
				required
				helperText="Monto máximo disponible en la tarjeta."
			/>

			<div className="flex flex-row gap-3">
				<FormField
					name="cutDay"
					form={createAccountForm}
					type="number"
					label="Día de corte"
					placeholder="15"
					min={1}
					max={31}
					required
					className="flex-1"
				/>
				<FormField
					name="paymentDay"
					form={createAccountForm}
					type="number"
					label="Día de pago"
					placeholder="25"
					min={1}
					max={31}
					required
					className="flex-1"
				/>
			</div>

			<FormField
				name="interestRate"
				form={createAccountForm}
				type="percentage"
				label="Tasa anual"
				placeholder="36.5"
				min={0}
				max={100}
				required
			/>
		</div>
	);
};
