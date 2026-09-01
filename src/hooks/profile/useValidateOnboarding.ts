import { useQuery } from "@tanstack/react-query";
import { profileKeys } from "@/content/services";
import { profileService } from "@/services/profile";

export const useValidateOnboarding = () => {
	return useQuery({
		queryKey: [profileKeys.onboardingValidation],
		queryFn: () => profileService.validateOnboarding(),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
