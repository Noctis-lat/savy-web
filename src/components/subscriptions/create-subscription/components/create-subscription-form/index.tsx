import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { BillingScheduleFields } from "@/components/recurring-expenses/billing-schedule-fields";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { CreateSubscriptionFormValues } from "@/schemas/subscriptions/createSubscriptionSchema";

export const CreateSubscriptionForm = (): React.ReactElement => {
	const createSubscriptionForm = useFormContext<CreateSubscriptionFormValues>();
	const { control } = createSubscriptionForm;
	const { accounts } = useQueryAccounts({ isActive: true });
	const { categories } = useQueryCategories("EXPENSE");

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
				form={createSubscriptionForm}
				label="Nombre"
				placeholder="Ej. Netflix, Spotify, Adobe..."
				required
			/>

			<FormField
				name="amount"
				form={createSubscriptionForm}
				type="currency"
				label="Monto"
				placeholder="0.00"
				required
				allowDecimals
			/>

			<BillingScheduleFields />

			<FormSelect
				name="accountId"
				form={createSubscriptionForm}
				label="Cuenta"
				options={accountOptions}
				placeholder="Selecciona una cuenta"
				required
				searchable
				searchPlaceholder="Buscar cuenta..."
			/>

			<FormSelect
				name="categoryId"
				form={createSubscriptionForm}
				label="Categoría"
				options={categoryOptions}
				placeholder="Selecciona una categoría"
				optional
				searchable
				searchPlaceholder="Buscar categoría..."
			/>

			<FormField
				name="url"
				form={createSubscriptionForm}
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
