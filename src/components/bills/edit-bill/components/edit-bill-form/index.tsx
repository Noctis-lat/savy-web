import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CreateCategory } from "@/components/categories/create-category";
import { FormAsyncSelect } from "@/components/design-system/patterns/forms/form-async-select";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { ColorPicker } from "@/components/design-system/primitives/color-picker";
import { IconPicker } from "@/components/design-system/primitives/icon-picker";
import { BillingScheduleFields } from "@/components/recurring-expenses/billing-schedule-fields";
import { Button } from "@/components/ui/button";
import { useAccountSearchOptions } from "@/hooks/accounts/useAccountSearchOptions";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { UpdateBillFormValues } from "@/schemas/bills/updateBillSchema";

export const EditBillForm = (): React.ReactElement => {
	const editBillForm = useFormContext<UpdateBillFormValues>();
	const { control, setValue } = editBillForm;
	const selectedAccountId = useWatch({ control, name: "accountId" });
	const {
		accountOptions,
		isLoading: isLoadingAccounts,
		setAccountSearch,
	} = useAccountSearchOptions(selectedAccountId);
	const { categories } = useQueryCategories("EXPENSE");

	const categoryOptions: Option[] = (categories ?? []).map((category) => ({
		label: category.name,
		value: category.id,
	}));

	const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);

	return (
		<div className="-mx-1 flex max-h-[65vh] flex-col gap-4 overflow-y-auto px-1">
			<FormField
				name="name"
				form={editBillForm}
				label="Nombre"
				placeholder="Ej. Luz, Agua, Gas, Internet..."
				required
			/>

			<FormField
				name="amount"
				form={editBillForm}
				type="currency"
				label="Monto"
				placeholder="0.00"
				required
				allowDecimals
			/>

			<BillingScheduleFields />

			<FormAsyncSelect
				name="accountId"
				form={editBillForm}
				label="Cuenta"
				options={accountOptions}
				isLoading={isLoadingAccounts}
				onSearch={setAccountSearch}
				placeholder="Selecciona una cuenta"
				searchPlaceholder="Buscar cuenta..."
				required
			/>

			{isCreatingCategory ? (
				<CreateCategory
					mode="embedded"
					categoryType="EXPENSE"
					onCreated={(category) => {
						setValue("categoryId", category.id);
						setIsCreatingCategory(false);
					}}
					onCancel={() => setIsCreatingCategory(false)}
				/>
			) : (
				<FormSelect
					name="categoryId"
					form={editBillForm}
					label="Categoría"
					options={categoryOptions}
					placeholder="Selecciona una categoría"
					optional
					searchable
					searchPlaceholder="Buscar categoría..."
					action={
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={() => setIsCreatingCategory(true)}
							aria-label="Crear categoría"
							className="size-5 text-primary hover:bg-primary/10"
						>
							<Plus className="size-3.5" />
						</Button>
					}
				/>
			)}

			<FormField
				name="url"
				form={editBillForm}
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
