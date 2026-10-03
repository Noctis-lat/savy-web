export const FREQUENCY_OPTIONS: Option[] = [
	{ label: "Semanal", value: "WEEKLY" },
	{ label: "Quincenal", value: "BIWEEKLY" },
	{ label: "Mensual", value: "MONTHLY" },
];

export const FREQUENCY_LABELS: Record<string, string> = {
	WEEKLY: "Semanal",
	BIWEEKLY: "Quincenal",
	MONTHLY: "Mensual",
	YEARLY: "Anual",
};

export const WEEKDAY_OPTIONS: { value: number; label: string }[] = [
	{ value: 1, label: "Lun" },
	{ value: 2, label: "Mar" },
	{ value: 3, label: "Mié" },
	{ value: 4, label: "Jue" },
	{ value: 5, label: "Vie" },
	{ value: 6, label: "Sáb" },
	{ value: 7, label: "Dom" },
];
