/**
 * Uppercases the first character of a string.
 * @example capitalizeFirst("martes 27 de octubre") // "Martes 27 de octubre"
 */
export const capitalizeFirst = (value: string): string => {
	return value.charAt(0).toUpperCase() + value.slice(1);
};
