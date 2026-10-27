import { z } from "zod";

export const updateRecurringExpenseSchema = z
	.object({
		name: z
			.string()
			.min(1, "El nombre es obligatorio")
			.max(100, "Máximo 100 caracteres")
			.optional(),
		amount: z.number().min(1).optional(),
		frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]).optional(),
		billingDay: z.number().int().min(1).max(31).optional(),
		billingDay2: z.number().int().min(1).max(31).optional(),
		accountId: z.string().optional(),
		categoryId: z.string().optional(),
		url: z.string().url("URL inválida").optional().or(z.literal("")),
		color: z.string().optional(),
		icon: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.frequency === "WEEKLY" && data.billingDay && data.billingDay > 7) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Día inválido (1-7)",
				path: ["billingDay"],
			});
		}
		if (
			data.frequency === "BIWEEKLY" &&
			data.billingDay &&
			data.billingDay2 &&
			data.billingDay === data.billingDay2
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Los días deben ser diferentes",
				path: ["billingDay2"],
			});
		}
	});

export type UpdateRecurringExpenseFormValues = z.infer<typeof updateRecurringExpenseSchema>;
