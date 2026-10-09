import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileStorage = {
	profile: Profile | undefined;
	setProfile: (profile: Profile | undefined) => void;
	clearProfile: () => void;
};

export const useProfileStorage = create<ProfileStorage>()(
	persist(
		(set) => ({
			profile: undefined,

			setProfile: (profile: Profile | undefined): void => {
				set({ profile });
			},

			clearProfile: (): void => {
				set({ profile: undefined });
				useProfileStorage.persist.clearStorage();
			},
		}),
		{
			name: "savy-profile",
			partialize: (state) => ({ profile: state.profile }),
		},
	),
);
