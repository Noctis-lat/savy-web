import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns";
import { CalendarPlus, CalendarX, CircleCheck, type LucideIcon, PiggyBank } from "lucide-react";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { toDateOnly } from "@/utils/formatters/formatDate";

type SavingsGoalStatus = {
	badge: { variant: "success" | "error" | "outline"; label: string };
	alert: {
		variant: "success" | "destructive" | "info";
		icon: LucideIcon;
		title: string;
		description: string;
	};
};

const DAYS_PER_MONTH = 30;

/**
 * Current state of a savings goal plus an actionable hint:
 * how much to save per month to reach the target before the deadline.
 */
export const getSavingsGoalStatus = (
	savingsGoal: SavingsGoal,
	today: Date = new Date(),
): SavingsGoalStatus => {
	const remaining = savingsGoal.targetAmount - savingsGoal.currentAmount;
	const isComplete = savingsGoal.isCompleted || (savingsGoal.targetAmount > 0 && remaining <= 0);

	if (isComplete) {
		return {
			badge: { variant: "success", label: "Completada" },
			alert: {
				variant: "success",
				icon: CircleCheck,
				title: "Meta alcanzada",
				description:
					remaining < 0
						? `Superaste tu meta por ${formatCurrency(Math.abs(remaining))}`
						: "Ya juntaste el monto que te propusiste",
			},
		};
	}

	if (!savingsGoal.deadline) {
		return {
			badge: { variant: "outline", label: "En progreso" },
			alert: {
				variant: "info",
				icon: CalendarPlus,
				title: `Te faltan ${formatCurrency(remaining)}`,
				description: "Agrega una fecha límite para saber cuánto ahorrar cada mes",
			},
		};
	}

	const deadline = parseISO(toDateOnly(savingsGoal.deadline));
	const daysLeft = differenceInCalendarDays(deadline, startOfDay(today));

	if (daysLeft < 0) {
		return {
			badge: { variant: "error", label: "Vencida" },
			alert: {
				variant: "destructive",
				icon: CalendarX,
				title: "La fecha límite ya pasó",
				description: `Te faltaron ${formatCurrency(remaining)} para llegar a tu meta`,
			},
		};
	}

	const monthsLeft = Math.max(1, Math.ceil(daysLeft / DAYS_PER_MONTH));
	const monthlyAmount = Math.ceil(remaining / monthsLeft);

	return {
		badge: { variant: "outline", label: "En progreso" },
		alert: {
			variant: "info",
			icon: PiggyBank,
			title: `Ahorra ${formatCurrency(monthlyAmount)} al mes`,
			description:
				daysLeft === 0
					? `Hoy es la fecha límite y te faltan ${formatCurrency(remaining)}`
					: `Te faltan ${formatCurrency(remaining)} y quedan ${daysLeft} ${daysLeft === 1 ? "día" : "días"} para llegar a tiempo`,
		},
	};
};
