import { z } from "zod";

export const updateSavingsGoalSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	targetAmount: z.number().min(1, "La meta debe ser mayor a 0"),
	deadline: z.string().optional(),
	color: z.string().optional(),
	icon: z.string().optional(),
});

export type UpdateSavingsGoalFormValues = z.infer<typeof updateSavingsGoalSchema>;
