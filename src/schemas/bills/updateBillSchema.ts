import { z } from "zod";
import { getBillingDaysError } from "@/utils/recurring-expenses/getBillingDaysError";

export const updateBillSchema = z
	.object({
		name: z
			.string()
			.min(1, "El nombre es obligatorio")
			.max(100, "Máximo 100 caracteres")
			.optional(),
		amount: z.number().min(1).optional(),
		frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]).optional(),
		billingDays: z.array(z.number().int()).optional(),
		accountId: z.string().optional(),
		categoryId: z.string().optional(),
		url: z.string().url("URL inválida").optional().or(z.literal("")),
		color: z.string().optional(),
		icon: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.frequency && data.billingDays) {
			const billingDaysError = getBillingDaysError(data.frequency, data.billingDays);
			if (billingDaysError) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: billingDaysError,
					path: ["billingDays"],
				});
			}
		}
	});

export type UpdateBillFormValues = z.infer<typeof updateBillSchema>;
