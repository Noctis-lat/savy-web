import { z } from "zod";

export const createAccountSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	type: z.enum(["DEBIT", "CREDIT", "LOAN", "CASH"], {
		message: "Selecciona un tipo de cuenta",
	}),
	bankId: z.string().optional(),
	balance: z.number().min(0, "El balance no puede ser negativo").optional(),
	currency: z.string().optional(),
	color: z.string().optional(),
	icon: z.string().optional(),
});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;
