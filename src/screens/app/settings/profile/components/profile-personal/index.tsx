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
	type ProfilePersonalFormValues,
	profilePersonalSchema,
} from "@/schemas/profile/profilePersonalSchema";
import { getProfilePersonalValues } from "@/utils/profile/getProfilePersonalValues";
import { ProfilePersonalActions } from "./components/profile-personal-actions";
import { ProfilePersonalForm } from "./components/profile-personal-form";
import { ProfilePersonalView } from "./components/profile-personal-view";

type ProfilePersonalProps = {
	profile: Profile;
	isEditing: boolean;
	onStopEditing: () => void;
};

export const ProfilePersonal = ({
	profile,
	isEditing,
	onStopEditing,
}: ProfilePersonalProps): React.ReactElement => {
	const profilePersonalForm = useForm<ProfilePersonalFormValues>({
		resolver: zodResolver(profilePersonalSchema),
		mode: "onChange",
		defaultValues: getProfilePersonalValues(profile),
	});
	const { reset } = profilePersonalForm;

	// While not editing, keep the form mirroring the latest profile so entering edit
	// mode (or leaving it by any path) always starts from fresh, saved values.
	useEffect(() => {
		if (!isEditing) reset(getProfilePersonalValues(profile));
	}, [profile, isEditing, reset]);

	const handleCancel = (): void => {
		reset(getProfilePersonalValues(profile));
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
					icon={PROFILE_SECTIONS.personal.icon}
					title={PROFILE_SECTIONS.personal.title}
					description={PROFILE_SECTIONS.personal.description}
				/>
				<GlassCard className="gap-6 p-6 md:p-8">
					<CrossFade activeKey={isEditing ? "edit" : "view"}>
						{isEditing ? (
							<FormProvider {...profilePersonalForm}>
								<form
									noValidate
									aria-label={`Editar ${PROFILE_SECTIONS.personal.title.toLowerCase()}`}
									className="flex flex-col gap-6"
									onSubmit={(event) => event.preventDefault()}
									onKeyDown={handleKeyDown}
								>
									<ProfilePersonalForm />
									<ProfilePersonalActions
										onSuccess={onStopEditing}
										onCancel={handleCancel}
									/>
								</form>
							</FormProvider>
						) : (
							<ProfilePersonalView profile={profile} />
						)}
					</CrossFade>
				</GlassCard>
			</div>
		</ScaleFadeIn>
	);
};
