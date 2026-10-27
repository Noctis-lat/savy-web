import { z } from "zod";

export const createSubscriptionSchema = z
	.object({
		name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		amount: z.number().min(1, "El monto es obligatorio"),
		frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]),
		billingDay: z.number().int().min(1, "El día de cobro es obligatorio"),
		billingDay2: z.number().int().min(1).max(31).optional(),
		accountId: z.string().min(1, "La cuenta es obligatoria"),
		categoryId: z.string().optional(),
		url: z.string().url("URL inválida").optional().or(z.literal("")),
		color: z.string().optional(),
		icon: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.frequency === "WEEKLY" && data.billingDay > 7) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Día inválido (1-7)",
				path: ["billingDay"],
			});
		}
		if (data.billingDay > 31) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Día inválido (1-31)",
				path: ["billingDay"],
			});
		}
		if (data.frequency === "BIWEEKLY") {
			if (!data.billingDay2) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "El segundo día es obligatorio",
					path: ["billingDay2"],
				});
			} else if (data.billingDay === data.billingDay2) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Los días deben ser diferentes",
					path: ["billingDay2"],
				});
			}
		}
	});

export type CreateSubscriptionFormValues = z.infer<typeof createSubscriptionSchema>;
