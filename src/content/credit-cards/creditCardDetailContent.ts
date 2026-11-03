/** Stable keys for skeleton placeholder rows in the credit card detail sections. */
export const CREDIT_DETAIL_SKELETON_ROWS = ["first", "second", "third", "fourth"];

/** Stable keys for the three header figures in the skeleton. */
export const CREDIT_HEADER_FIGURE_KEYS = ["available", "minPayment", "noInterestPayment"];

/** Horizontal rhythm between header figures; pairs with divide-x on the row from md up. */
export const CREDIT_HEADER_FIGURE_SPACING = "md:px-5 md:first:pl-0 md:last:pr-0";

/** Stable keys for the credit usage definition rows in the skeleton. */
export const CREDIT_USAGE_ROW_KEYS = ["used", "available", "limit"];

export const CREDIT_TRANSACTIONS_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

/** Gauge arc color for each credit utilization variant. */
export const CREDIT_USAGE_GAUGE_COLOR: Record<CreditUsageVariant, string> = {
	default: "var(--color-primary)",
	warning: "var(--color-amber-500)",
	danger: "var(--color-destructive)",
};

/** Legend dot matching the gauge arc color. */
export const CREDIT_USAGE_DOT_CLASS: Record<CreditUsageVariant, string> = {
	default: "bg-primary",
	warning: "bg-amber-500",
	danger: "bg-destructive",
};
