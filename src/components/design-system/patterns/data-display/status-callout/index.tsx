import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Alert } from "@/components/design-system/primitives/alert";
import { STATUS_TONE_ALERT_VARIANT, STATUS_TONE_ICON } from "@/content/ui/statusToneStyles";
import { merge } from "@/utils/ui/mergeStyles";

type StatusCalloutProps = {
	tone: StatusTone;
	title: string;
	description: string;
	/** Overrides the default icon for the tone. */
	icon?: LucideIcon;
	className?: string;
};

/** Compact tinted status box for detail headers: icon, short bold title and one sentence. */
export const StatusCallout = ({
	tone,
	title,
	description,
	icon,
	className,
}: StatusCalloutProps): React.ReactElement => {
	return (
		<Alert
			variant={STATUS_TONE_ALERT_VARIANT[tone]}
			title={title}
			icon={icon ?? STATUS_TONE_ICON[tone]}
			className={merge("w-full sm:w-auto sm:max-w-xs", className)}
		>
			<span className="tabular-nums">{description}</span>
		</Alert>
	);
};
