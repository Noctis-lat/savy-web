import type React from "react";
import { formatPhone } from "@/utils/formatters/formatPhone";
import { ProfileDetailItem } from "../../../profile-detail-item";

type ProfilePersonalViewProps = {
	profile: Profile;
};

export const ProfilePersonalView = ({ profile }: ProfilePersonalViewProps): React.ReactElement => {
	return (
		<dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
			<ProfileDetailItem
				label="Nombre"
				value={profile.firstName ?? undefined}
			/>
			<ProfileDetailItem
				label="Primer apellido"
				value={profile.lastName ?? undefined}
			/>
			<ProfileDetailItem
				label="Segundo apellido"
				value={profile.secondLastName ?? undefined}
			/>
			<ProfileDetailItem
				label="Teléfono"
				value={profile.phone ? formatPhone(profile.phone) : undefined}
			/>
		</dl>
	);
};
