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