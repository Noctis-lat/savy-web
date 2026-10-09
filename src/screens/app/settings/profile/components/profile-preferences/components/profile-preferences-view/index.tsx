import type React from "react";
import {
	CURRENCY_OPTIONS,
	LOCALE_OPTIONS,
	TIMEZONE_OPTIONS,
} from "@/content/onboarding/preferenceOptions";
import { getOptionLabel } from "@/utils/forms/getOptionLabel";
import { ProfileDetailItem } from "../../../profile-detail-item";

type ProfilePreferencesViewProps = {
	profile: Profile;
};

export const ProfilePreferencesView = ({
	profile,
}: ProfilePreferencesViewProps): React.ReactElement => {
	return (
		<dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
			<ProfileDetailItem
				label="Moneda"
				value={getOptionLabel(CURRENCY_OPTIONS, profile.currency)}
			/>
			<ProfileDetailItem
				label="Idioma y región"
				value={getOptionLabel(LOCALE_OPTIONS, profile.locale)}
			/>
			<ProfileDetailItem
				label="Zona horaria"
				value={getOptionLabel(TIMEZONE_OPTIONS, profile.timezone)}
			/>
		</dl>
	);
};
