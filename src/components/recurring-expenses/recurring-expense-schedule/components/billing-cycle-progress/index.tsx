import { format } from "date-fns";
import { es } from "date-fns/locale";
import type React from "react";
import { getBillingCycleProgress } from "@/utils/recurring-expenses/getBillingCycleProgress";
import { getDaysRemainingLabel } from "@/utils/recurring-expenses/getDaysRemainingLabel";

type BillingCycleProgressProps = {
	previous: Date;
	next: Date;
	referenceDate: Date;
};

export const BillingCycleProgress = ({
	previous,
	next,
	referenceDate,
}: BillingCycleProgressProps): React.ReactElement => {
	const progress = getBillingCycleProgress(previous, next, referenceDate);
	const remainingLabel = getDaysRemainingLabel(next, referenceDate);

	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm font-medium text-foreground tabular-nums">{remainingLabel}</span>

			<div
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={progress}
				aria-valuetext={remainingLabel}
				aria-label="Avance del ciclo de cobro"
				className="h-1.5 w-full overflow-hidden rounded-full bg-primary/10"
			>
				<div
					className="h-full rounded-full bg-primary"
					style={{ width: `${progress}%` }}
				/>
			</div>

			<div className="flex justify-between text-xs text-muted-foreground tabular-nums">
				<span>Último cobro {format(previous, "d MMM", { locale: es })}</span>
				<span>Próximo {format(next, "d MMM", { locale: es })}</span>
			</div>
		</div>
	);
};
