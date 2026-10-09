import { z } from "zod";
import { PHONE_DIGITS_REGEX } from "@/schemas/regex/globalRegex";

export const profilePersonalSchema = z.object({
	firstName: z.string().trim().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
	lastName: z
		.string()
		.trim()
		.min(1, "El primer apellido es obligatorio")
		.max(100, "Máximo 100 caracteres"),
	secondLastName: z.string().trim().max(100, "Máximo 100 caracteres").optional(),
	phone: z
		.string()
		.refine((phone) => phone === "" || PHONE_DIGITS_REGEX.test(phone), {
			message: "Ingresa un teléfono de 10 dígitos",
		})
		.optional(),
});

export type ProfilePersonalFormValues = z.infer<typeof profilePersonalSchema>;
