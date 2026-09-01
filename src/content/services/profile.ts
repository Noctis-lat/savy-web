export const profileKeys = {
	profile: () => ["profile"] as const,
	profileDetail: () => [...profileKeys.profile(), "detail"] as const,
	onboardingValidation: () => [...profileKeys.profile(), "onboarding-validation"] as const,
};
