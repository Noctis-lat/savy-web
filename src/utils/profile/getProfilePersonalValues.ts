import type { ProfilePersonalFormValues } from "@/schemas/profile/profilePersonalSchema";

/**
 * Maps a profile into the personal-section form values.
 * Null wire values become empty strings, and the phone is normalized to its
 * last 10 digits because the phone field only stores digits.
 */
export const getProfilePersonalValues = (profile: Profile): ProfilePersonalFormValues => ({
	firstName: profile.firstName ?? "",
	lastName: profile.lastName ?? "",
	secondLastName: profile.secondLastName ?? "",
	phone: profile.phone ? profile.phone.replace(/\D/g, "").slice(-10) : "",
});
