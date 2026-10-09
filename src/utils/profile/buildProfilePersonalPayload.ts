import type { ProfilePersonalFormValues } from "@/schemas/profile/profilePersonalSchema";

type ProfilePersonalPayload = Pick<
	UpdateProfilePayload,
	"firstName" | "lastName" | "secondLastName" | "phone"
>;

/**
 * Builds the PATCH payload for the personal section only.
 * Empty optional values are sent as `null` so the backend clears them.
 */
export const buildProfilePersonalPayload = (
	values: ProfilePersonalFormValues,
): ProfilePersonalPayload => {
	const secondLastName = values.secondLastName?.trim();
	const phone = values.phone?.trim();

	return {
		firstName: values.firstName.trim(),
		lastName: values.lastName.trim(),
		secondLastName: secondLastName ? secondLastName : null,
		phone: phone ? phone : null,
	};
};
