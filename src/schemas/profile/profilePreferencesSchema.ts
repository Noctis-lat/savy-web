import { z } from "zod";

export const profilePreferencesSchema = z.object({
	currency: z.string().min(1, "La moneda es obligatoria").max(3, "Máximo 3 caracteres"),
	locale: z.string().min(1, "El idioma es obligatorio").max(10, "Máximo 10 caracteres"),
	timezone: z.string().min(1, "La zona horaria es obligatoria").max(50, "Máximo 50 caracteres"),
});

export type ProfilePreferencesFormValues = z.infer<typeof profilePreferencesSchema>;
