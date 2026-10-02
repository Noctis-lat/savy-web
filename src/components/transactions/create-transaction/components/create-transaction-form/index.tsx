import { Plus } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateCategory } from "@/components/categories/create-category";
import { FormAsyncSelect } from "@/components/design-system/patterns/forms/form-async-select";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { FormTextarea } from "@/components/design-system/patterns/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { TRANSACTION_TYPE_OPTIONS } from "@/content/transactions/transactionOptions";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import type { CreateTransactionFormValues } from "@/schemas/transactions/createTransactionSchema";
import { formatAccountOptions } from "@/utils/accounts/formatAccountOptions";
import { formatCategoryOptions } from "@/utils/categories/formatCategoryOptions";

type CreateTransactionFormProps = {
	preselectedAccountId?: string;
};

export const CreateTransactionForm = ({
	preselectedAccountId,
}: CreateTransactionFormProps): React.ReactElement => {
	const createTransactionForm = useFormContext<CreateTransactionFormValues>();
	const { control, setValue } = createTransactionForm;

	const [accountSearch, setAccountSearch] = useState<string>("");
	const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);

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
	const { categories, isLoading: isLoadingCategories } = useQueryCategories(
		selectedType === "TRANSFER" ? undefined : categoryType,
	);

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

	const categoryPlaceholder = isLoadingCategories
		? "Cargando categorías..."
		: categoryOptions.length === 0
			? "Sin categorías"
			: "Selecciona una categoría";

	return (
		<div className="flex flex-col gap-4 max-h-170 overflow-y-auto">
			<FormSelect
				name="type"
				form={createTransactionForm}
				label="Tipo"
				options={TRANSACTION_TYPE_OPTIONS}
				placeholder="Selecciona un tipo"
				required
			/>

			<FormAsyncSelect
				name="accountId"
				form={createTransactionForm}
				label={showDestinationAccount ? "Cuenta origen" : "Cuenta"}
				options={accountOptions}
				isLoading={isLoadingAccounts}
				onSearch={setAccountSearch}
				placeholder="Selecciona una cuenta"
				searchPlaceholder="Buscar cuenta..."
				required
				disabled={!!preselectedAccountId}
			/>

			{showDestinationAccount && (
				<FormAsyncSelect
					name="destinationAccountId"
					form={createTransactionForm}
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
				form={createTransactionForm}
				type="currency"
				label="Monto"
				placeholder="0.00"
				required
				allowDecimals
			/>

			{selectedType !== "TRANSFER" &&
				(isCreatingCategory ? (
					<CreateCategory
						key={categoryType}
						mode="embedded"
						categoryType={categoryType}
						onCreated={(category) => {
							setValue("categoryId", category.id);
							setIsCreatingCategory(false);
						}}
						onCancel={() => setIsCreatingCategory(false)}
					/>
				) : (
					<FormSelect
						name="categoryId"
						form={createTransactionForm}
						label="Categoría"
						options={categoryOptions}
						placeholder={categoryPlaceholder}
						disabled={isLoadingCategories || categoryOptions.length === 0}
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
				))}

			<FormField
				name="description"
				form={createTransactionForm}
				label="Descripción"
				placeholder="Ej. Pago de nómina, Compra en supermercado..."
				optional
			/>

			<FormDatePicker
				mode="single"
				name="date"
				form={createTransactionForm}
				label="Fecha"
				optional
				maxDate={new Date()}
			/>

			<FormTextarea
				name="note"
				form={createTransactionForm}
				label="Nota"
				placeholder="Nota adicional..."
				optional
			/>
		</div>
	);
};
