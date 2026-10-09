/**
 * Resolves the human label of an option value.
 * Falls back to the raw value when it is not part of the options list.
 */
export const getOptionLabel = (
	options: Option[],
	value: string | undefined,
): string | undefined => {
	if (!value) return undefined;

	return options.find((option) => option.value === value)?.label ?? value;
};
