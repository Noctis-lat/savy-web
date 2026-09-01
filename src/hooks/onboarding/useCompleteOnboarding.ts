import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { profileKeys } from "@/content/services";
import { profileService } from "@/services/profile";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { getApiErrorMessage } from "@/utils/errors/getApiErrorMessage";

// Maps a backend onboarding field name to the wizard step that owns it.
const FIELD_TO_STEP: Record<string, number> = {
	firstName: 1,
	lastName: 1,
	secondLastName: 1,
	phone: 1,
	accounts: 2,
	incomeSources: 3,
	currency: 4,
	locale: 4,
	timezone: 4,
};

/**
 * Extracts `missingFields` from a 400 response body. The backend envelope is
 * `{ success, data, message?, missingFields? }`. Some validation paths embed
 * the list inside `message` instead, so we parse defensively.
 */
const extractMissingFields = (error: unknown): string[] => {
	if (!axios.isAxiosError(error)) return [];

	const body = error.response?.data as { missingFields?: unknown; message?: unknown } | undefined;

	if (Array.isArray(body?.missingFields)) {
		return body.missingFields.filter((field): field is string => typeof field === "string");
	}

	// Fallback: parse a "missingFields: a, b" style suffix out of the message.
	const message = typeof body?.message === "string" ? body.message : "";
	const match = message.match(/missingFields?\s*[:=]\s*([^\n]+)/i);
	if (match) {
		return match[1]
			.split(/[,;]/)
			.map((field) => field.trim())
			.filter((field) => field.length > 0);
	}

	return [];
};

export const useCompleteOnboarding = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const setProfile = useProfileStorage((state) => state.setProfile);

	return useMutation({
		mutationFn: () => profileService.completeOnboarding(),
		onSuccess: (completedProfile: Profile) => {
			// Persist immediately so the guarded routes see the fresh profile
			// before the query refetch resolves.
			setProfile(completedProfile);
			queryClient.invalidateQueries({ queryKey: profileKeys.profile() });
			// Reset the wizard so a later /app/onboarding entry starts at step 1.
			useOnboardingController.getState().reset();
			navigate(ROUTES.APP.ROOT, { replace: true });
			toast.success("¡Onboarding completado!");
		},
		onError: (error: unknown) => {
			const missingFields = extractMissingFields(error);

			if (missingFields.length > 0) {
				toast.error(`Faltan campos: ${missingFields.join(", ")}`);
				// Jump to the step that owns the first missing field, if mappable.
				const targetStep = FIELD_TO_STEP[missingFields[0]];
				if (typeof targetStep === "number") {
					useOnboardingController.getState().setStep(targetStep);
				}
				return;
			}

			toast.error(getApiErrorMessage(error, "Error al completar el onboarding"));
		},
	});
};
