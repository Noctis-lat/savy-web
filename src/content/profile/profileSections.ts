import { SlidersHorizontal, UserRound } from "lucide-react";

export const PROFILE_SECTIONS = {
	personal: {
		title: "Información personal",
		description: "Tu nombre aparece en tus reportes y presupuestos.",
		icon: UserRound,
	},
	preferences: {
		title: "Preferencias",
		description: "Define cómo Savy muestra tus montos, fechas y horarios.",
		icon: SlidersHorizontal,
	},
};

export const PROFILE_DEFAULT_SECTION: ProfileSectionKey = "personal";

export const PROFILE_EMPTY_VALUE_LABEL = "Sin especificar";

export const PROFILE_EMAIL_LOCKED_HINT = "El correo no se puede cambiar desde aquí";

export const PROFILE_UPDATED_MESSAGE = "Perfil actualizado";
