import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileKeys } from "@/content/services";
import { profileService } from "@/services/profile";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	const setProfile = useProfileStorage((state) => state.setProfile);

	return useMutation({
		mutationFn: (payload: UpdateProfilePayload) => profileService.updateProfile(payload),
		onSuccess: (updatedProfile: Profile) => {
			setProfile(updatedProfile);
			queryClient.setQueryData([profileKeys.profile], updatedProfile);
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el perfil");
		},
	});
};
