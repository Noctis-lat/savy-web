import type React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { IncomeScheduleFields } from "@/components/income-sources/income-schedule-fields";
import { INCOME_DESTINATION_ACCOUNT_PARAMS } from "@/content/income-sources/incomeSourceContent";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import type { CreateIncomeSourceFormValues } from "@/schemas/income-sources/createIncomeSourceSchema";
import { formatDestinationAccountOptions } from "@/utils/income-sources/formatDestinationAccountOptions";

export const CreateIncomeSourceForm = (): React.ReactElement => {
	const createIncomeSourceForm = useFormContext<CreateIncomeSourceFormValues>();
	const { accounts } = useQueryAccounts(INCOME_DESTINATION_ACCOUNT_PARAMS);

	return (
		<div className="flex flex-col gap-4">
			<FormField
				name="name"
				form={createIncomeSourceForm}
				label="Nombre"
				placeholder="Ej. Salario, Freelance..."
				required
			/>

			<FormField
				name="amount"
				form={createIncomeSourceForm}
				type="currency"
				label="Monto por pago"
				placeholder="$0.00"
				required
			/>

			<IncomeScheduleFields />

			<FormSelect
				name="destinationAccountId"
				form={createIncomeSourceForm}
				label="Cuenta destino"
				options={formatDestinationAccountOptions(accounts)}
				placeholder="Selecciona una cuenta..."
				helperText="Solo cuentas de débito o efectivo."
				required
			/>
		</div>
	);
};
