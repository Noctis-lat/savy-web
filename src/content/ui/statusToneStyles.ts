import { CircleAlert, CircleCheck, Clock, Info, type LucideIcon } from "lucide-react";
import type { AlertVariants } from "@/components/design-system/primitives/alert/style-variants";

export const STATUS_TONE_ALERT_VARIANT: Record<
	StatusTone,
	NonNullable<AlertVariants["variant"]>
> = {
	success: "success",
	warning: "warning",
	danger: "destructive",
	neutral: "default",
};

export const STATUS_TONE_ICON: Record<StatusTone, LucideIcon> = {
	success: CircleCheck,
	warning: Clock,
	danger: CircleAlert,
	neutral: Info,
};

/** Progress indicator color by tone. Neutral and success keep the primary color. */
export const STATUS_TONE_BAR_CLASS: Record<StatusTone, string> = {
	success: "",
	warning: "[&_[data-slot=progress-indicator]]:bg-amber-500",
	danger: "[&_[data-slot=progress-indicator]]:bg-destructive",
	neutral: "",
};

/** Percentage text color by tone, same palette as the budget usage blocks. */
export const STATUS_TONE_TEXT_CLASS: Record<StatusTone, string> = {
	success: "text-primary",
	warning: "text-amber-600",
	danger: "text-destructive",
	neutral: "text-primary",
};
