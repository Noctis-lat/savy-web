const FIRST_FIELD_SELECTOR = [
	"input:not([disabled])",
	"textarea:not([disabled])",
	"[role='combobox']:not([disabled])",
].join(", ");

/** Moves focus to the first editable field inside the given container. */
export const focusFirstField = (container: HTMLElement | null): void => {
	container?.querySelector<HTMLElement>(FIRST_FIELD_SELECTOR)?.focus();
};
