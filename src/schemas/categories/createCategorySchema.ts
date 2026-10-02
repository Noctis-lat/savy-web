import { z } from "zod";

export const createCategorySchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	type: z.enum(["INCOME", "EXPENSE"], {
		message: "Selecciona un tipo de categoría",
	}),
	color: z.string().optional(),
	icon: z.string().optional(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
