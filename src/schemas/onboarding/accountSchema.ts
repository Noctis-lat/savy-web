import { z } from "zod";

export const accountSchema = z.object({
	name: z.string().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	type: z.enum(["DEBIT", "CASH"], {
		message: "Selecciona un tipo de cuenta",
	}),
	bankId: z.string().nullable().optional(),
	currency: z.string().min(1, "La moneda es obligatoria"),
	balance: z.number(),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
