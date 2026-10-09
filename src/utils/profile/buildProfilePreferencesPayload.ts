import type { ProfilePreferencesFormValues } from "@/schemas/profile/profilePreferencesSchema";

type ProfilePreferencesPayload = Pick<UpdateProfilePayload, "currency" | "locale" | "timezone">;

/** Builds the PATCH payload for the preferences section only. */
export const buildProfilePreferencesPayload = (
	values: ProfilePreferencesFormValues,
): ProfilePreferencesPayload => ({
	currency: values.currency,
	locale: values.locale,
	timezone: values.timezone,
});
