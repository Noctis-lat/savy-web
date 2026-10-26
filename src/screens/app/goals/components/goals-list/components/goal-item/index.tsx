import { CheckCircle2, ChevronRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatDate } from "@/utils/formatters/formatDate";
import { buildRoute } from "@/utils/routing/buildRoute";
import { merge } from "@/utils/ui/mergeStyles";

type GoalItemProps = {
	goal: SavingsGoal;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const GoalItem = ({ goal }: GoalItemProps): React.ReactElement => {
	const navigate = useNavigate();
	const goalColor = goal.color ?? PRIMARY_FALLBACK;
	const percentage =
		goal.targetAmount > 0
			? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100)
			: 0;
	const isComplete = goal.currentAmount >= goal.targetAmount && goal.targetAmount > 0;

	const handleClick = (): void => {
		navigate(buildRoute(ROUTES.APP.GOALS.DETAIL, { goal_id: goal.id }));
	};

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${goalColor} 12%, transparent) 0%, color-mix(in oklch, ${goalColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={merge(
				"relative flex w-full cursor-pointer items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0 hover:brightness-115",
				!goal.isCompleted && "opacity-100",
			)}
			style={gradientStyle}
		>
			<div
				className="flex size-10 shrink-0 items-center justify-center rounded-full shadow-sm"
				style={{ backgroundColor: goalColor }}
			>
				<DynamicIcon
					name={(goal.icon ?? "target") as IconName}
					className="text-white"
					size={20}
				/>
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<div className="flex flex-row items-center gap-2">
					<span className="text-sm font-semibold text-foreground">{goal.name}</span>
					{goal.isCompleted && (
						<Badge
							variant="success"
							className="shrink-0"
						>
							<CheckCircle2 className="size-3" />
							Completada
						</Badge>
					)}
				</div>
				{goal.deadline && (
					<span className="text-xs tabular-nums text-muted-foreground">
						{formatDate(goal.deadline)}
					</span>
				)}
			</div>

			<div className="flex w-40 shrink-0 flex-col gap-1.5 sm:w-150">
				{goal.targetAmount > 0 ? (
					<div className="flex flex-col gap-2">
						<div className="flex items-baseline justify-between gap-2">
							<span className="truncate text-xs tabular-nums text-muted-foreground">
								{formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}
							</span>
							<span className={merge("shrink-0 text-xs font-medium tabular-nums text-primary")}>
								{percentage}%
							</span>
						</div>
						<Progress
							value={percentage}
							aria-label={`${percentage}% de la meta alcanzada`}
							className={merge(
								"h-2",
								isComplete && "[&_[data-slot=progress-indicator]]:bg-primary",
							)}
						/>
					</div>
				) : (
					<span className="text-right text-xs text-muted-foreground">Sin meta definida</span>
				)}
			</div>

			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
