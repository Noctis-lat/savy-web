import type React from "react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { RECURRING_EXPENSE_FREQUENCY_OPTIONS } from "@/content/recurring-expenses/recurringExpensesOptions";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { UpdateRecurringExpenseFormValues } from "@/schemas/recurring-expenses/updateRecurringExpenseSchema";

export const EditPaymentForm = (): React.ReactElement => {
	const editPaymentForm = useFormContext<UpdateRecurringExpenseFormValues>();
	const { control, setValue, clearErrors, getValues } = editPaymentForm;
	const { accounts } = useQueryAccounts({ isActive: true });
	const { categories } = useQueryCategories("EXPENSE");

	const selectedFrequency = useWatch({ control, name: "frequency" });

	const isBiweekly = selectedFrequency === "BIWEEKLY";
	const isWeekly = selectedFrequency === "WEEKLY";

	useEffect(() => {
		if (isWeekly) {
			const currentDay = getValues("billingDay");
			if (currentDay && currentDay > 7) {
				setValue("billingDay", 1);
			}
		}
		if (!isBiweekly) {
			setValue("billingDay2", undefined);
			clearErrors("billingDay2");
		}
	}, [isWeekly, isBiweekly, setValue, clearErrors, getValues]);

	const accountOptions: Option[] = (accounts ?? []).map((account) => ({
		label: account.name,
		value: account.id,
	}));

	const categoryOptions: Option[] = (categories ?? []).map((category) => ({
		label: category.name,
		value: category.id,
	}));

	return (
		<div className="-mx-1 flex max-h-[65vh] flex-col gap-4 overflow-y-auto px-1">
			<FormField
				name="name"
				form={editPaymentForm}
				label="Nombre"
				placeholder="Ej. Renta, Internet, Suscripción..."
				required
			/>

			<FormField
				name="amount"
				form={editPaymentForm}
				type="currency"
				label="Monto"
				placeholder="0.00"
				required
				allowDecimals
			/>

			<FormSelect
				name="frequency"
				form={editPaymentForm}
				label="Frecuencia"
				options={RECURRING_EXPENSE_FREQUENCY_OPTIONS}
				placeholder="Selecciona una frecuencia"
				required
			/>

			<div className="flex flex-row items-start gap-3">
				<FormField
					name="billingDay"
					form={editPaymentForm}
					type="number"
					label="Día de cobro"
					placeholder={isWeekly ? "Día de la semana (1-7)" : "Día del mes (1-31)"}
					required
					min={1}
					max={isWeekly ? 7 : 31}
					className="min-w-0 flex-1"
				/>

				{isBiweekly && (
					<FormField
						name="billingDay2"
						form={editPaymentForm}
						type="number"
						label="Segundo día de cobro"
						placeholder="Día del mes (1-31)"
						required
						min={1}
						max={31}
						className="min-w-0 flex-1"
					/>
				)}
			</div>

			<FormSelect
				name="accountId"
				form={editPaymentForm}
				label="Cuenta"
				options={accountOptions}
				placeholder="Selecciona una cuenta"
				required
				searchable
				searchPlaceholder="Buscar cuenta..."
			/>

			<FormSelect
				name="categoryId"
				form={editPaymentForm}
				label="Categoría"
				options={categoryOptions}
				placeholder="Selecciona una categoría"
				optional
				searchable
				searchPlaceholder="Buscar categoría..."
			/>

			<FormField
				name="url"
				form={editPaymentForm}
				label="URL"
				placeholder="https://..."
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
