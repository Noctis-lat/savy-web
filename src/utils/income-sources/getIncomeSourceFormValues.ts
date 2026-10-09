import type { UpdateIncomeSourceFormValues } from "@/schemas/income-sources/updateIncomeSourceSchema";

/** Maps an income source into the edit form values. */
export const getIncomeSourceFormValues = (
	incomeSource: IncomeSource,
): UpdateIncomeSourceFormValues => ({
	name: incomeSource.name,
	amount: incomeSource.amount,
	frequency: incomeSource.frequency,
	paydays: [...incomeSource.paydays].sort((prev, next) => prev - next),
	destinationAccountId: incomeSource.destinationAccountId,
});
