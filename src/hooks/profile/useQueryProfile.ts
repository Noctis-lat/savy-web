import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { profileKeys } from "@/content/services";
import { profileService } from "@/services/profile";
import { useAuthStorage } from "@/storage/authStorage";
import { useProfileStorage } from "@/storage/profile/profileStorage";

const PROFILE_STALE_TIME = 1000 * 60 * 15;

export const useQueryProfile = () => {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);
	const setProfile = useProfileStorage((state) => state.setProfile);
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: [profileKeys.profile],
		queryFn: () => profileService.getProfile(),
		enabled: isAuthenticated,
		retry: false,
		staleTime: PROFILE_STALE_TIME,
		gcTime: 1000 * 60 * 20,
		meta: { suppressToast: true },
	});

	// Sync fetched profile into the persisted zustand store.
	useEffect(() => {
		if (query.data) {
			setProfile(query.data);
		}
	}, [query.data, setProfile]);

	// Clear profile from storage on error so the guard does not show stale data.
	useEffect(() => {
		if (query.isError) {
			setProfile(null);
			queryClient.setQueryData([profileKeys.profile], null);
		}
	}, [query.isError, setProfile, queryClient]);

	// undefined while loading, Profile | null otherwise
	const profile = query.status === "pending" ? undefined : (query.data ?? null);

	return { profile, isLoading: query.status === "pending" };
};
