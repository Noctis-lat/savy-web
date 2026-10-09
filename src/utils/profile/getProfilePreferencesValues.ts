import type { ProfilePreferencesFormValues } from "@/schemas/profile/profilePreferencesSchema";

export const getProfilePreferencesValues = (profile: Profile): ProfilePreferencesFormValues => ({
	currency: profile.currency,
	locale: profile.locale,
	timezone: profile.timezone,
});
