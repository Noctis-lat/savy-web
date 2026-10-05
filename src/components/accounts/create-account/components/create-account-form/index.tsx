import type React from "react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { FormSwitch } from "@/components/design-system/patterns/forms/form-switch";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { CREATE_ACCOUNT_TYPE_OPTIONS } from "@/content/accounts/createAccountTypeOptions";
import {
	CREATE_ACCOUNT_DEFAULT_VALUES,
	CREDIT_CARD_FIELDS,
	LOAN_FIELDS,
	SAVINGS_FIELDS,
} from "@/content/accounts/createAccountValues";
import { CURRENCY_OPTIONS } from "@/content/onboarding/preferenceOptions";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";
import { CreditCardFields } from "./components/credit-card-fields";
import { LoanFields } from "./components/loan-fields";
import { SavingsFields } from "./components/savings-fields";

export const CreateAccountForm = (): React.ReactElement => {
	const createAccountForm = useFormContext<CreateAccountFormValues>();
	const { control, setValue, clearErrors } = createAccountForm;
	const { banks } = useQueryBanks({ isActive: true, sortBy: "name", order: "asc" });

	const selectedBankId = useWatch({ control, name: "bankId" });
	const selectedType = useWatch({ control, name: "type" });

	const isCredit = selectedType === "CREDIT";
	const isLoan = selectedType === "LOAN";
	const isSavings = selectedType === "SAVINGS";

	useEffect(() => {
		// Clear fields that don't belong to the selected type so hidden values/errors never leak.
		const staleFields: Array<keyof CreateAccountFormValues> = [
			...(selectedType === "CREDIT" ? [] : CREDIT_CARD_FIELDS),
			...(selectedType === "LOAN" ? [] : LOAN_FIELDS),
			...(selectedType === "SAVINGS" ? [] : SAVINGS_FIELDS),
			...(selectedType === "CREDIT" || selectedType === "LOAN" ? [] : (["interestRate"] as const)),
		];

		// Reset to defaults (not undefined) so fields like `isCashSavings` keep their boolean shape.
		for (const staleField of staleFields) {
			setValue(staleField, CREATE_ACCOUNT_DEFAULT_VALUES[staleField]);
		}
		clearErrors(staleFields);
	}, [selectedType, setValue, clearErrors]);

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
		<div className="-mx-1 flex max-h-[65vh] flex-col gap-4 overflow-y-auto px-1">
			<FormField
				name="name"
				form={createAccountForm}
				label="Nombre de la cuenta"
				placeholder="Ej. Cuenta principal, Tarjeta de crédito..."
				required
			/>

			<div className="flex flex-row items-start gap-3">
				<FormSelect
					name="type"
					form={createAccountForm}
					label="Tipo de cuenta"
					options={CREATE_ACCOUNT_TYPE_OPTIONS.map((option) => ({
						label: option.label,
						value: option.value,
					}))}
					placeholder="Selecciona un tipo"
					required
					className="min-w-0 flex-1"
				/>

				{isSavings && (
					<FormSwitch
						name="isCashSavings"
						form={createAccountForm}
						label="Tipo de ahorro"
						inactiveText="Débito"
						activeText="Efectivo"
						className="shrink-0 gap-2 [&>div]:h-8"
					/>
				)}
			</div>

			<FormSelect
				name="bankId"
				form={createAccountForm}
				label="Banco"
				options={bankOptions}
				placeholder="Sin banco"
				optional
				searchable
				searchPlaceholder="Buscar banco..."
			/>

			<FormField
				name="balance"
				form={createAccountForm}
				type="currency"
				label="Balance inicial"
				placeholder="0.00"
				optional
				allowDecimals
			/>

			{isCredit && <CreditCardFields />}

			{isLoan && <LoanFields />}

			{isSavings && <SavingsFields />}

			<FormSelect
				name="currency"
				form={createAccountForm}
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
