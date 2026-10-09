import { z } from "zod";
import { getPaydaysError } from "@/utils/income-sources/getPaydaysError";

export const createIncomeSourceSchema = z
	.object({
		name: z.string().trim().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
		amount: z
			.number({ message: "El monto es obligatorio" })
			.int("El monto no es válido")
			.positive("El monto debe ser mayor a 0"),
		frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"], {
			message: "Selecciona una frecuencia",
		}),
		paydays: z.array(z.number().int()),
		destinationAccountId: z.string().min(1, "Selecciona una cuenta"),
	})
	.superRefine((values, context) => {
		const paydaysError = getPaydaysError(values.frequency, values.paydays);
		if (paydaysError) {
			context.addIssue({ code: "custom", path: ["paydays"], message: paydaysError });
		}
	});

export type CreateIncomeSourceFormValues = z.infer<typeof createIncomeSourceSchema>;
