import { formatCurrency } from "@/utils/formatters/formatCurrency";

/** Human status for a remaining amount (negative when exceeded). Never relies on color alone. */
export const getBudgetRemainingLabel = (remaining: number, isIncome = false): string => {
	if (isIncome) {
		if (remaining > 0) return `Faltan ${formatCurrency(remaining)}`;
		if (remaining < 0) return `Meta superada por ${formatCurrency(Math.abs(remaining))}`;
		return "Meta alcanzada";
	}

	if (remaining < 0) return `Excedido por ${formatCurrency(Math.abs(remaining))}`;
	return `Quedan ${formatCurrency(remaining)}`;
};
