export function isEditableTransaction(
	transaction: Transaction,
): transaction is EditableTransaction {
	return transaction.type !== "INSTALLMENT";
}
