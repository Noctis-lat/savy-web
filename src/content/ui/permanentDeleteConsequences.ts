/** Cascade consequences of DELETE /{resource}/{id}/permanent, shown in the DangerZone delete row and dialog. */
export const PERMANENT_DELETE_CONSEQUENCES = {
	bank: "Se eliminan también sus cuentas, transacciones, tarjetas, préstamos y metas de ahorro.",
	account:
		"Se eliminan también sus transacciones y la tarjeta, préstamo o meta de ahorro asociados.",
	creditCard: "Se eliminan también su cuenta, sus estados de cuenta y sus transacciones.",
	savingsGoal: "Se eliminan también su cuenta y sus transacciones.",
};
