import { FREQUENCY_LABELS } from "@/content/income-sources/incomeSourceContent";

type Frequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY";

export const getFrequencyLabel = (frequency: Frequency): string =>
	FREQUENCY_LABELS[frequency] ?? frequency;
