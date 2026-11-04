/** Icon tile color for each danger zone row tone. */
export const DANGER_ZONE_ICON_TONE_CLASS: Record<DangerZoneTone, string> = {
	neutral: "bg-muted text-muted-foreground",
	primary: "bg-primary/10 text-primary",
	destructive: "bg-destructive/10 text-destructive",
};

/** Row surface for each tone. Only destructive rows get a subtle tint. */
export const DANGER_ZONE_ROW_TONE_CLASS: Record<DangerZoneTone, string> = {
	neutral: "",
	primary: "",
	destructive: "bg-destructive/[0.03]",
};

/** Row title color for each tone. */
export const DANGER_ZONE_TITLE_TONE_CLASS: Record<DangerZoneTone, string> = {
	neutral: "text-foreground",
	primary: "text-foreground",
	destructive: "text-destructive",
};
