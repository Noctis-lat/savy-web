import type React from "react";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import type { UpdateCreditCardFormValues } from "@/schemas/credit-cards/updateCreditCardSchema";

const NO_PAYMENT_ACCOUNT_VALUE = "";

export const EditCreditCardForm = (): React.ReactElement => {
	const editCreditCardForm = useFormContext<UpdateCreditCardFormValues>();
	const { control } = editCreditCardForm;

	const { accounts } = useQueryAccounts({ isActive: true });

	const paymentAccountOptions = useMemo<Option[]>(() => {
		const debitCashAccounts = (accounts ?? []).filter(
			(account) => account.type === "DEBIT" || account.type === "CASH",
		);
		return [
			{ label: "Sin cuenta", value: NO_PAYMENT_ACCOUNT_VALUE },
			...debitCashAccounts.map((account) => ({
				label: account.name,
				value: account.id,
			})),
		];
	}, [accounts]);

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={editCreditCardForm}
				type="text"
				label="Nombre"
				placeholder="Ej. Visa Oro"
				optional
			/>

			<FormField
				name="creditLimit"
				form={editCreditCardForm}
				type="currency"
				label="Límite de crédito"
				placeholder="0.00"
				optional
			/>

			<div className="flex gap-3">
				<FormField
					name="cutDay"
					form={editCreditCardForm}
					type="number"
					label="Día de corte"
					min={1}
					max={31}
					className="flex-1"
				/>
				<FormField
					name="paymentDay"
					form={editCreditCardForm}
					type="number"
					label="Día de pago"
					min={1}
					max={31}
					className="flex-1"
				/>
			</div>

			<FormField
				name="interestRate"
				form={editCreditCardForm}
				type="percentage"
				label="Tasa anual"
				placeholder="36.5"
				min={0}
				max={100}
				optional
			/>

			<FormSelect
				name="paymentAccountId"
				form={editCreditCardForm}
				label="Cuenta de pago"
				options={paymentAccountOptions}
				placeholder="Sin cuenta de pago"
				optional
				helperText="Cuenta desde donde se pagan los montos de esta tarjeta"
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
