import { Pencil, UserX } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { AppTabs } from "@/components/design-system/patterns/navigation/app-tabs";
import { Button } from "@/components/ui/button";
import { PROFILE_DEFAULT_SECTION, PROFILE_SECTIONS } from "@/content/profile/profileSections";
import { useQueryProfile } from "@/hooks/profile/useQueryProfile";
import { useInlineEdit } from "@/hooks/ui/useInlineEdit";
import { isProfileSectionKey } from "@/utils/profile/isProfileSectionKey";
import { ProfileIdentity } from "../profile-identity";
import { ProfilePersonal } from "../profile-personal";
import { ProfilePreferences } from "../profile-preferences";
import { ProfileSkeleton } from "../profile-skeleton";

export const ProfileContent = (): React.ReactElement => {
	const { profile, isLoading } = useQueryProfile();
	const [activeTab, setActiveTab] = useState<ProfileSectionKey>(PROFILE_DEFAULT_SECTION);
	const {
		editingKey: editingSection,
		editButtonRef,
		startEditing,
		stopEditing,
	} = useInlineEdit<ProfileSectionKey>();

	if (isLoading) return <ProfileSkeleton />;

	if (!profile) {
		return (
			<Empty
				icon={UserX}
				title="No pudimos cargar tu perfil"
				description="Intenta de nuevo en unos minutos."
			/>
		);
	}

	const handleTabChange = (value: string): void => {
		if (!isProfileSectionKey(value)) return;

		// Leaving a tab discards its unsaved edits; focus stays on the tab the user picked.
		if (editingSection) stopEditing({ restoreFocus: false });
		setActiveTab(value);
	};

	const tabsConfig = [
		{
			label: PROFILE_SECTIONS.personal.title,
			value: "personal",
			icon: PROFILE_SECTIONS.personal.icon,
			content: (tabProfile: Profile) => (
				<ProfilePersonal
					profile={tabProfile}
					isEditing={editingSection === "personal"}
					onStopEditing={stopEditing}
				/>
			),
		},
		{
			label: PROFILE_SECTIONS.preferences.title,
			value: "preferences",
			icon: PROFILE_SECTIONS.preferences.icon,
			content: (tabProfile: Profile) => (
				<ProfilePreferences
					profile={tabProfile}
					isEditing={editingSection === "preferences"}
					onStopEditing={stopEditing}
				/>
			),
		},
	];

	// Disabled (not hidden) while editing so the tabs row never shifts and focus can return to it.
	const editButton = (
		<Button
			ref={editButtonRef}
			type="button"
			variant="outline"
			size="sm"
			className="max-md:h-10"
			aria-label={`Editar ${PROFILE_SECTIONS[activeTab].title.toLowerCase()}`}
			disabled={editingSection === activeTab}
			onClick={() => startEditing(activeTab)}
		>
			<Pencil />
			Editar
		</Button>
	);

	return (
		<div className="flex w-full flex-col gap-8 py-4">
			<ProfileIdentity profile={profile} />

			<AppTabs
				config={tabsConfig}
				data={profile}
				variant="line"
				value={activeTab}
				onValueChange={handleTabChange}
				action={editButton}
				className="gap-6"
			/>
		</div>
	);
};
