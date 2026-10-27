import { format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarClock, PauseCircle } from "lucide-react";
import type React from "react";
import { SectionCard } from "@/components/design-system/patterns/data-display/section-card";
import { UPCOMING_CHARGES_COUNT } from "@/content/recurring-expenses/recurringExpenseContent";
import { capitalizeFirst } from "@/utils/formatters/capitalizeFirst";
import { getBillingSchedule } from "@/utils/recurring-expenses/getBillingSchedule";
import { getDaysUntilLabel } from "@/utils/recurring-expenses/getDaysUntilLabel";
import { BillingCycleProgress } from "./components/billing-cycle-progress";
import { UpcomingChargeRow } from "./components/upcoming-charge-row";

type RecurringExpenseScheduleProps = {
	recurringExpense: RecurringExpense;
	referenceDate?: Date;
};

export const RecurringExpenseSchedule = ({
	recurringExpense,
	referenceDate = new Date(),
}: RecurringExpenseScheduleProps): React.ReactElement => {
	const today = startOfDay(referenceDate);
	const { previous, upcoming } = getBillingSchedule(
		recurringExpense.frequency,
		recurringExpense.billingDays,
		today,
		UPCOMING_CHARGES_COUNT,
	);
	const [nextCharge] = upcoming;

	const renderContent = (): React.ReactNode => {
		if (!recurringExpense.isActive) {
			return (
				<div className="flex flex-col items-center gap-2 py-6 text-center">
					<PauseCircle
						className="size-8 text-muted-foreground"
						aria-hidden="true"
					/>
					<p className="text-sm font-medium text-foreground">Sin cobros programados</p>
					<p className="max-w-xs text-xs text-muted-foreground">
						Este cargo está desactivado y no generará nuevos cobros.
					</p>
				</div>
			);
		}

		if (recurringExpense.frequency === "YEARLY") {
			return (
				<div className="flex flex-col gap-1.5">
					<p className="text-lg font-semibold tracking-tight text-foreground">
						Cada año, el día {recurringExpense.billingDays[0]}
					</p>
					<p className="max-w-prose text-sm text-muted-foreground">
						El mes de cobro anual aún no se registra, por lo que no podemos calcular la fecha
						exacta.
					</p>
				</div>
			);
		}

		if (!nextCharge) {
			return <p className="text-sm text-muted-foreground">Sin días de cobro configurados.</p>;
		}

		return (
			<div className="flex flex-col gap-5">
				<div className="flex flex-wrap items-center gap-3">
					<p className="text-2xl font-semibold tracking-tight text-foreground">
						{capitalizeFirst(format(nextCharge, "EEEE d 'de' MMMM", { locale: es }))}
					</p>
					<span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
						{getDaysUntilLabel(nextCharge, today)}
					</span>
				</div>

				{previous && (
					<BillingCycleProgress
						previous={previous}
						next={nextCharge}
						referenceDate={today}
					/>
				)}

				<div className="flex flex-col gap-1">
					<h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Próximos cobros
					</h4>
					<ul className="divide-y divide-border/40">
						{upcoming.map((chargeDate, index) => (
							<UpcomingChargeRow
								key={chargeDate.toISOString()}
								date={chargeDate}
								amount={recurringExpense.amount}
								isNext={index === 0}
							/>
						))}
					</ul>
				</div>
			</div>
		);
	};

	return (
		<SectionCard
			title="Próximo cobro"
			icon={CalendarClock}
			className="h-full"
			contentClassName="mt-4"
		>
			{renderContent()}
		</SectionCard>
	);
};
