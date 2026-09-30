import { z } from "zod";

export const updateTransactionSchema = z
	.object({
		accountId: z.string().min(1, "Selecciona una cuenta"),
		type: z.enum(["INCOME", "EXPENSE", "TRANSFER", "PAYMENT"], {
			message: "Selecciona un tipo de transacción",
		}),
		amount: z.number().positive("El monto debe ser mayor a 0"),
		destinationAccountId: z.string().optional(),
		categoryId: z.string().optional(),
		description: z.string().max(200, "Máximo 200 caracteres").optional(),
		note: z.string().max(500, "Máximo 500 caracteres").optional(),
		date: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.type === "TRANSFER" || data.type === "PAYMENT") {
				return !!data.destinationAccountId;
			}
			return true;
		},
		{
			message: "Selecciona una cuenta destino",
			path: ["destinationAccountId"],
		},
	)
	.refine(
		(data) => {
			if (
				data.type === "TRANSFER" &&
				data.destinationAccountId &&
				data.destinationAccountId === data.accountId
			) {
				return false;
			}
			return true;
		},
		{
			message: "La cuenta destino debe ser diferente a la cuenta origen",
			path: ["destinationAccountId"],
		},
	);

export type UpdateTransactionFormValues = z.infer<typeof updateTransactionSchema>;
