import { format } from "date-fns";
import { es } from "date-fns/locale";
import type React from "react";
import { capitalizeFirst } from "@/utils/formatters/capitalizeFirst";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type UpcomingChargeRowProps = {
	date: Date;
	amount: number;
	isNext: boolean;
};

export const UpcomingChargeRow = ({
	date,
	amount,
	isNext,
}: UpcomingChargeRowProps): React.ReactElement => {
	return (
		<li
			className={merge(
				"flex items-center justify-between gap-4 py-2.5 text-sm",
				isNext ? "text-foreground" : "text-muted-foreground",
			)}
		>
			<span className="tabular-nums">
				{capitalizeFirst(format(date, "EEE d MMM yyyy", { locale: es }))}
			</span>
			<span className="font-medium tabular-nums">{formatCurrency(amount)}</span>
		</li>
	);
};
