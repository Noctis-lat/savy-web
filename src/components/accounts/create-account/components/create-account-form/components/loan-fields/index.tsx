import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

export const LoanFields = (): React.ReactElement => {
	const createAccountForm = useFormContext<CreateAccountFormValues>();

	return (
		<div className="flex flex-col gap-4">
			<p className="text-xs font-medium text-muted-foreground">Datos del préstamo</p>

			<FormField
				name="principal"
				form={createAccountForm}
				type="currency"
				label="Monto del préstamo"
				placeholder="0.00"
				required
				helperText="Monto original del préstamo."
			/>

			<div className="flex flex-row gap-3">
				<FormField
					name="monthlyPayment"
					form={createAccountForm}
					type="currency"
					label="Pago mensual"
					placeholder="0.00"
					required
					className="flex-1"
				/>
				<FormField
					name="termMonths"
					form={createAccountForm}
					type="number"
					label="Plazo (meses)"
					placeholder="36"
					min={1}
					required
					className="flex-1"
				/>
			</div>

			<div className="flex flex-row gap-3">
				<FormField
					name="interestRate"
					form={createAccountForm}
					type="percentage"
					label="Tasa anual"
					placeholder="15.5"
					min={0}
					max={100}
					required
					className="flex-1"
				/>
				<FormDatePicker
					mode="single"
					name="startDate"
					form={createAccountForm}
					label="Fecha de inicio"
					required
					className="flex-1"
				/>
			</div>
		</div>
	);
};
