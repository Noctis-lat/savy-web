import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { getBudgetKindLabel } from "@/utils/budgets/getBudgetKindLabel";
import { getBudgetPeriodLabel } from "@/utils/budgets/getBudgetPeriodLabel";
import { BudgetHeaderPeriod } from "./components/budget-header-period";
import { BudgetHeaderStatus } from "./components/budget-header-status";
import { BudgetHeaderSummary } from "./components/budget-header-summary";

type BudgetHeaderProps = {
	budget: Budget;
};

export const BudgetHeader = ({ budget }: BudgetHeaderProps): React.ReactElement => {
	const budgetColor = budget.color || PRIMARY_FALLBACK;
	const periodLabel = getBudgetPeriodLabel(budget.period);

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${budgetColor} 12%, transparent) 0%, color-mix(in oklch, ${budgetColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<ScaleFadeIn>
			<GlassCard className="overflow-hidden p-0 border-none">
				<div
					className="flex flex-col gap-4 p-4"
					style={gradientStyle}
				>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex min-w-0 flex-row items-center gap-4">
							<div
								className="flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm"
								style={{ backgroundColor: budgetColor }}
							>
								<DynamicIcon
									name={(budget.icon || "piggy-bank") as IconName}
									className="text-white"
									size={24}
								/>
							</div>

							<div className="flex min-w-0 flex-col gap-1">
								<div className="flex flex-row flex-wrap items-center gap-2">
									<h1 className="text-lg font-semibold text-foreground">{budget.name}</h1>
									<Badge
										variant={budget.isActive ? "default" : "secondary"}
										className="px-2 text-xs"
									>
										{getBudgetKindLabel(budget.kind)}
									</Badge>
									{periodLabel && (
										<Badge
											variant="info"
											className="px-2 text-xs"
										>
											{periodLabel}
										</Badge>
									)}
									{!budget.isActive && (
										<Badge
											variant="outline"
											className="px-2 text-xs text-muted-foreground"
										>
											Inactivo
										</Badge>
									)}
								</div>
								<BudgetHeaderPeriod budget={budget} />
							</div>
						</div>

						<BudgetHeaderStatus budget={budget} />
					</div>

					<BudgetHeaderSummary budget={budget} />
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
