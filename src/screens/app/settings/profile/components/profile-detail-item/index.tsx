import type React from "react";
import { PROFILE_EMPTY_VALUE_LABEL } from "@/content/profile/profileSections";
import { merge } from "@/utils/ui/mergeStyles";

type ProfileDetailItemProps = {
	label: string;
	value: string | undefined;
};

export const ProfileDetailItem = ({ label, value }: ProfileDetailItemProps): React.ReactElement => {
	return (
		<div className="flex min-w-0 flex-col gap-1">
			<dt className="text-xs text-muted-foreground">{label}</dt>
			<dd
				className={merge(
					"wrap-break-word text-sm",
					value ? "font-medium text-foreground" : "text-muted-foreground",
				)}
			>
				{value ?? PROFILE_EMPTY_VALUE_LABEL}
			</dd>
		</div>
	);
};
