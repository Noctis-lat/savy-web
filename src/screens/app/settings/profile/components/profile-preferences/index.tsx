import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CrossFade } from "@/components/design-system/patterns/animations/cross-fade";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { CardHeading } from "@/components/design-system/patterns/layouts/card-heading";
import { PROFILE_SECTIONS } from "@/content/profile/profileSections";
import {
	type ProfilePreferencesFormValues,
	profilePreferencesSchema,
} from "@/schemas/profile/profilePreferencesSchema";
import { getProfilePreferencesValues } from "@/utils/profile/getProfilePreferencesValues";
import { ProfilePreferencesActions } from "./components/profile-preferences-actions";
import { ProfilePreferencesForm } from "./components/profile-preferences-form";
import { ProfilePreferencesView } from "./components/profile-preferences-view";

type ProfilePreferencesProps = {
	profile: Profile;
	isEditing: boolean;
	onStopEditing: () => void;
};

export const ProfilePreferences = ({
	profile,
	isEditing,
	onStopEditing,
}: ProfilePreferencesProps): React.ReactElement => {
	const profilePreferencesForm = useForm<ProfilePreferencesFormValues>({
		resolver: zodResolver(profilePreferencesSchema),
		mode: "onChange",
		defaultValues: getProfilePreferencesValues(profile),
	});
	const { reset } = profilePreferencesForm;

	// While not editing, keep the form mirroring the latest profile so entering edit
	// mode (or leaving it by any path) always starts from fresh, saved values.
	useEffect(() => {
		if (!isEditing) reset(getProfilePreferencesValues(profile));
	}, [profile, isEditing, reset]);

	const handleCancel = (): void => {
		reset(getProfilePreferencesValues(profile));
		onStopEditing();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>): void => {
		// Radix popovers (selects) prevent default when they consume Escape.
		if (event.key !== "Escape" || event.defaultPrevented) return;

		event.preventDefault();
		handleCancel();
	};

	return (
		<ScaleFadeIn>
			<div className="flex w-full flex-col gap-3">
				<CardHeading
					icon={PROFILE_SECTIONS.preferences.icon}
					title={PROFILE_SECTIONS.preferences.title}
					description={PROFILE_SECTIONS.preferences.description}
				/>
				<GlassCard className="gap-6 p-6 md:p-8">
					<CrossFade activeKey={isEditing ? "edit" : "view"}>
						{isEditing ? (
							<FormProvider {...profilePreferencesForm}>
								<form
									noValidate
									aria-label={`Editar ${PROFILE_SECTIONS.preferences.title.toLowerCase()}`}
									className="flex flex-col gap-6"
									onSubmit={(event) => event.preventDefault()}
									onKeyDown={handleKeyDown}
								>
									<ProfilePreferencesForm />
									<ProfilePreferencesActions
										onSuccess={onStopEditing}
										onCancel={handleCancel}
									/>
								</form>
							</FormProvider>
						) : (
							<ProfilePreferencesView profile={profile} />
						)}
					</CrossFade>
				</GlassCard>
			</div>
		</ScaleFadeIn>
	);
};
