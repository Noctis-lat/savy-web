type Option = {
	label: string;
	value: string;
	description?: string;
};

type NavigatorItem = {
	sectionId: string;
	label: string;
	icon: import("react").ElementType;
};

type BreadcrumbItemConfig =
	| { label: string; href: string }
	| { label: string; href?: never };

	type PeriodType = "day" | "week" | "month" | "other_month" | "quarter" | "semester" | "year" | undefined;

	type PeriodOption = {
	label: string;
	shortLabel: string;
	value: PeriodType;
};

/** Semantic tone shared by status callouts and usage blocks. */
type StatusTone = "success" | "warning" | "danger" | "neutral";

/** Plain data for a StatusCallout: helpers return it, components render it. */
type StatusCalloutContent = {
	tone: StatusTone;
	title: string;
	description: string;
};

/** Visual tone of a DangerZone row. */
type DangerZoneTone = "neutral" | "primary" | "destructive";
