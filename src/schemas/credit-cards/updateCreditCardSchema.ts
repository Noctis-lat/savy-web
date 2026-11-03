import { z } from "zod";

export const updateCreditCardSchema = z
	.object({
		name: z
			.string()
			.min(1, "El nombre es obligatorio")
			.max(100, "Máximo 100 caracteres")
			.optional(),
		creditLimit: z.number().positive("El límite debe ser mayor a 0").optional(),
		cutDay: z.number().int().min(1, "Mínimo 1").max(31, "Máximo 31").optional(),
		paymentDay: z.number().int().min(1, "Mínimo 1").max(31, "Máximo 31").optional(),
		interestRate: z.number().min(0, "Mínimo 0%").max(100, "Máximo 100%").optional(),
		color: z.string().optional(),
		icon: z.string().optional(),
		paymentAccountId: z.string().optional(),
		accountId: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.paymentAccountId && data.accountId && data.paymentAccountId === data.accountId) {
				return false;
			}
			return true;
		},
		{
			message: "La cuenta de pago no puede ser la misma tarjeta",
			path: ["paymentAccountId"],
		},
	);

export type UpdateCreditCardFormValues = z.infer<typeof updateCreditCardSchema>;
