import { z } from "zod";

export const updateCategorySchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	color: z.string().optional(),
	icon: z.string().optional(),
});

export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;
