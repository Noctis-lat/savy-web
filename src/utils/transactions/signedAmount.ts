export function signedAmount(type: TransactionType, amount: number): number {
	return type === "EXPENSE" || type === "PAYMENT" || type === "INSTALLMENT" ? -amount : amount;
}
