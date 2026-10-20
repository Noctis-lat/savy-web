import { z } from "zod";
import { isValidDateOnly } from "@/utils/formatters/isValidDateOnly";

export const createBudgetSchema = z
	.object({
		name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		kind: z.enum(["RECURRING", "ONE_TIME"], { message: "Selecciona un tipo" }),
		period: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "YEARLY"]).optional(),
		startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
		endDate: z.string().optional(),
		items: z
			.array(
				z.object({
					categoryId: z.string().min(1),
					amount: z.number().min(0),
				}),
			)
			.min(1, "Agrega al menos una categoría"),
	})
	.superRefine((data, ctx) => {
		if (data.startDate && !isValidDateOnly(data.startDate)) {
			ctx.addIssue({
				code: "custom",
				path: ["startDate"],
				message: "La fecha de inicio no es válida",
			});
		}

		if (data.kind === "RECURRING" && !data.period) {
			ctx.addIssue({
				code: "custom",
				path: ["period"],
				message: "El periodo es obligatorio para presupuestos recurrentes",
			});
		}

		if (data.kind === "ONE_TIME") {
			if (!data.endDate) {
				ctx.addIssue({
					code: "custom",
					path: ["endDate"],
					message: "La fecha de fin es obligatoria para presupuestos únicos",
				});
			} else if (!isValidDateOnly(data.endDate)) {
				ctx.addIssue({
					code: "custom",
					path: ["endDate"],
					message: "La fecha de fin no es válida",
				});
			} else if (data.startDate && isValidDateOnly(data.startDate)) {
				const start = new Date(data.startDate);
				const end = new Date(data.endDate);
				if (end <= start) {
					ctx.addIssue({
						code: "custom",
						path: ["endDate"],
						message: "La fecha de fin debe ser posterior a la fecha de inicio",
					});
				}
			}
		}

		const zeroAmounts = data.items.filter((item) => item.amount <= 0);
		if (zeroAmounts.length > 0) {
			ctx.addIssue({
				code: "custom",
				path: ["items"],
				message: "Todos los montos deben ser mayores a 0",
			});
		}

		const categoryIds = data.items.map((item) => item.categoryId);
		const hasDuplicates = new Set(categoryIds).size !== categoryIds.length;
		if (hasDuplicates) {
			ctx.addIssue({
				code: "custom",
				path: ["items"],
				message: "No puede haber categorías duplicadas",
			});
		}
	});

export type CreateBudgetFormValues = z.infer<typeof createBudgetSchema>;
