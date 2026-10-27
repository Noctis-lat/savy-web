import { z } from "zod";
import { getBillingDaysError } from "@/utils/recurring-expenses/getBillingDaysError";

export const createRecurringExpenseSchema = z
	.object({
		name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		amount: z.number().min(1, "El monto es obligatorio"),
		frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]),
		billingDays: z.array(z.number().int()),
		billingDate: z.string().optional(),
		accountId: z.string().min(1, "La cuenta es obligatoria"),
		categoryId: z.string().optional(),
		url: z.string().url("URL inválida").optional().or(z.literal("")),
		color: z.string().optional(),
		icon: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.frequency === "YEARLY") {
			if (!data.billingDate) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Selecciona una fecha de cobro",
					path: ["billingDate"],
				});
			}
		} else {
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

export type CreateRecurringExpenseFormValues = z.infer<typeof createRecurringExpenseSchema>;
