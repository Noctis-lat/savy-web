import { z } from "zod";

export const createBankSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	color: z.string().optional(),
});

export type CreateBankFormValues = z.infer<typeof createBankSchema>;
