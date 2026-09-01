import { httpClient, unwrap } from "../http-client";

export const profileService: ProfileService = {
	getProfile: async (): Promise<Profile> => {
		const response = await httpClient.get<APIResponse<Profile>>("/profiles/me");
		return unwrap<Profile>(response);
	},

	// Backend uses forbidNonWhitelisted — only UpdateProfileDto fields are allowed.
	updateProfile: async (payload: UpdateProfilePayload): Promise<Profile> => {
		const response = await httpClient.patch<APIResponse<Profile>>("/profiles/me", payload);
		return unwrap<Profile>(response);
	},

	// Returns 400 with missingFields when requirements are not met.
	validateOnboarding: async (): Promise<OnboardingValidation> => {
		const response = await httpClient.get<APIResponse<OnboardingValidation>>(
			"/profiles/onboarding/validate",
		);
		return unwrap<OnboardingValidation>(response);
	},

	completeOnboarding: async (): Promise<Profile> => {
		const response = await httpClient.post<APIResponse<Profile>>("/profiles/onboarding/complete");
		return unwrap<Profile>(response);
	},
};
