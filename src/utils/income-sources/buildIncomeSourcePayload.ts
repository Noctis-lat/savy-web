import type { CreateIncomeSourceFormValues } from "@/schemas/income-sources/createIncomeSourceSchema";

/** Builds the income source API payload, omitting `categoryId` when it is not set. */
export const buildIncomeSourcePayload = ({
	categoryId,
	...values
}: CreateIncomeSourceFormValues): CreateIncomeSourcePayload => ({
	...values,
	...(categoryId ? { categoryId } : {}),
});
