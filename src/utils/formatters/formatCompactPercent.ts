/** Formats a decimal ratio as a percentage without trailing zeros: 0.36 → "36%", 0.365 → "36.5%". */
export const formatCompactPercent = (value: number): string => {
	return `${Number((value * 100).toFixed(2))}%`;
};
