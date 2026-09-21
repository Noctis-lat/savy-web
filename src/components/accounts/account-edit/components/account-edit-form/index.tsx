import type React from "react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { CURRENCY_OPTIONS } from "@/content/onboarding/preferenceOptions";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import type { UpdateAccountFormValues } from "@/schemas/accounts/updateAccountSchema";

export const AccountEditForm = (): React.ReactElement => {
	const accountEditForm = useFormContext<UpdateAccountFormValues>();
	const { control, setValue } = accountEditForm;
	const { data: banks } = useQueryBanks({ isActive: true, sortBy: "name", order: "asc" });

	const selectedBankId = useWatch({ control, name: "bankId" });

	useEffect(() => {
		if (!selectedBankId || !banks) return;
		const selectedBank = banks.find((bank) => bank.id === selectedBankId);
		if (selectedBank?.color) {
			setValue("color", selectedBank.color);
		}
	}, [selectedBankId, banks, setValue]);

	const bankOptions: Option[] = (banks ?? []).map((bank) => ({
		label: bank.name,
		value: bank.id,
	}));

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={accountEditForm}
				label="Nombre de la cuenta"
				placeholder="Ej. Cuenta principal, Tarjeta de crédito..."
				required
			/>

			<FormSelect
				name="bankId"
				form={accountEditForm}
				label="Banco"
				options={bankOptions}
				placeholder="Sin banco"
				optional
				searchable
				searchPlaceholder="Buscar banco..."
			/>

			<FormField
				name="balance"
				form={accountEditForm}
				type="currency"
				label="Balance"
				placeholder="0.00"
				optional
				allowDecimals
			/>

			<FormSelect
				name="currency"
				form={accountEditForm}
				label="Moneda"
				options={CURRENCY_OPTIONS}
				placeholder="Selecciona una moneda"
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
