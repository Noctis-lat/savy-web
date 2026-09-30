import type React from "react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormAsyncSelect } from "@/components/design-system/patterns/forms/form-async-select";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { FormTextarea } from "@/components/design-system/patterns/forms/form-textarea";
import { TRANSACTION_TYPE_OPTIONS } from "@/content/transactions/transactionOptions";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { UpdateTransactionFormValues } from "@/schemas/transactions/updateTransactionSchema";
import { formatAccountOptions } from "@/utils/accounts/formatAccountOptions";
import { formatCategoryOptions } from "@/utils/categories/formatCategoryOptions";

export const EditTransactionForm = (): React.ReactElement => {
	const editTransactionForm = useFormContext<UpdateTransactionFormValues>();
	const { control, setValue } = editTransactionForm;

	const [accountSearch, setAccountSearch] = useState<string>("");

	const { accounts, isLoading: isLoadingAccounts } = useQueryAccounts({
		search: accountSearch || undefined,
		isActive: true,
		sortBy: "name",
		order: "asc",
		perPage: 20,
	});

	const selectedType = useWatch({ control, name: "type" });
	const selectedAccountId = useWatch({ control, name: "accountId" });

	const categoryType = selectedType === "INCOME" ? "INCOME" : "EXPENSE";
	const { categories } = useQueryCategories(selectedType === "TRANSFER" ? undefined : categoryType);

	const showDestinationAccount = selectedType === "TRANSFER" || selectedType === "PAYMENT";

	useEffect(() => {
		if (!showDestinationAccount) {
			setValue("destinationAccountId", undefined);
		}
	}, [showDestinationAccount, setValue]);

	useEffect(() => {
		if (selectedType === "TRANSFER") {
			setValue("categoryId", undefined);
		}
	}, [selectedType, setValue]);

	const accountOptions = formatAccountOptions(accounts ?? []);
	const destinationAccountOptions = formatAccountOptions(accounts ?? [], selectedAccountId);
	const categoryOptions = formatCategoryOptions(categories ?? []);

	return (
		<div className="flex flex-col gap-4">
			<FormSelect
				name="type"
				form={editTransactionForm}
				label="Tipo"
				options={TRANSACTION_TYPE_OPTIONS}
				placeholder="Selecciona un tipo"
				required
			/>

			<FormAsyncSelect
				name="accountId"
				form={editTransactionForm}
				label={showDestinationAccount ? "Cuenta origen" : "Cuenta"}
				options={accountOptions}
				isLoading={isLoadingAccounts}
				onSearch={setAccountSearch}
				placeholder="Selecciona una cuenta"
				searchPlaceholder="Buscar cuenta..."
				required
			/>

			{showDestinationAccount && (
				<FormAsyncSelect
					name="destinationAccountId"
					form={editTransactionForm}
					label="Cuenta destino"
					options={destinationAccountOptions}
					isLoading={isLoadingAccounts}
					onSearch={setAccountSearch}
					placeholder="Selecciona cuenta destino"
					searchPlaceholder="Buscar cuenta..."
					required
				/>
			)}

			<FormField
				name="amount"
				form={editTransactionForm}
				type="currency"
				label="Monto"
				placeholder="0.00"
				required
				allowDecimals
			/>

			{selectedType !== "TRANSFER" && (
				<FormSelect
					name="categoryId"
					form={editTransactionForm}
					label="Categoría"
					options={categoryOptions}
					placeholder="Sin categoría"
					optional
					searchable
					searchPlaceholder="Buscar categoría..."
				/>
			)}

			<FormField
				name="description"
				form={editTransactionForm}
				label="Descripción"
				placeholder="Ej. Pago de nómina, Compra en supermercado..."
				optional
			/>

			<FormDatePicker
				mode="single"
				name="date"
				form={editTransactionForm}
				label="Fecha"
				optional
				maxDate={new Date()}
			/>

			<FormTextarea
				name="note"
				form={editTransactionForm}
				label="Nota"
				placeholder="Nota adicional..."
				optional
			/>
		</div>
	);
};
