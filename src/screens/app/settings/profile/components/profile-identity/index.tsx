import { Lock } from "lucide-react";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PROFILE_EMAIL_LOCKED_HINT } from "@/content/profile/profileSections";
import { formatMonthYear } from "@/utils/formatters/formatMonthYear";

type ProfileIdentityProps = {
	profile: Profile;
};

export const ProfileIdentity = ({ profile }: ProfileIdentityProps): React.ReactElement => {
	const displayName = profile.fullName ?? profile.email;
	const initials = profile.initials ?? profile.email.charAt(0).toUpperCase();
	const memberSince = formatMonthYear(profile.createdAt);

	return (
		<div className="flex items-center gap-4">
			<Avatar className="size-16">
				{profile.avatarUrl && (
					<AvatarImage
						src={profile.avatarUrl}
						alt=""
					/>
				)}
				<AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
					{initials}
				</AvatarFallback>
			</Avatar>

			<div className="flex min-w-0 flex-col gap-1">
				<p className="truncate text-xl font-bold tracking-tight text-foreground">{displayName}</p>

				<p className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
					<span className="truncate">{profile.email}</span>
					<span
						title={PROFILE_EMAIL_LOCKED_HINT}
						className="inline-flex shrink-0"
					>
						<Lock
							className="size-3.5"
							aria-hidden="true"
						/>
					</span>
					<span className="sr-only">{PROFILE_EMAIL_LOCKED_HINT}</span>
				</p>

				{memberSince && (
					<p className="text-xs text-muted-foreground">Miembro desde {memberSince}</p>
				)}
			</div>
		</div>
	);
};
