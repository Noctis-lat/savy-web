/**
 * Ensures the current value is selectable even when it is not part of the
 * predefined options (e.g. a timezone saved from another client).
 */
export const withCurrentOption = (options: Option[], value: string | undefined): Option[] => {
	if (!value || options.some((option) => option.value === value)) return options;

	return [{ label: value, value }, ...options];
};
