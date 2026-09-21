import { z } from "zod";

export const updateAccountSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	bankId: z.string().optional(),
	balance: z.number().optional(),
	currency: z.string().optional(),
	color: z.string().optional(),
	icon: z.string().optional(),
});

export type UpdateAccountFormValues = z.infer<typeof updateAccountSchema>;
