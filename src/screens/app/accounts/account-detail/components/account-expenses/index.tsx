import { TrendingUp } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { PERIOD_OPTIONS } from "@/content/banks/bankContent";
import { useQueryAccountIncomesExpenses } from "@/hooks/accounts/useQueryAccountIncomesExpenses";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type AccountExpensesProps = {
	account: Account;
};

export const AccountExpenses = ({ account }: AccountExpensesProps): React.ReactElement => {
	const [period, setPeriod] = useState<PeriodType>("month");

	const { income, expenses, isLoading, periodLabel } = useQueryAccountIncomesExpenses({
		accountId: account.id,
		period,
	});

	const hasData = (income !== undefined && income > 0) || (expenses !== undefined && expenses > 0);

	const netIncome = income ?? 0;
	const netExpenses = expenses ?? 0;
	const balance = netIncome - netExpenses;
	const isPositiveBalance = balance >= 0;

	return (
		<ScaleFadeIn className="flex-1">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<TrendingUp className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Ingresos vs gastos</h3>
					</div>
					{periodLabel ? (
						<span className="text-xs text-muted-foreground">{periodLabel}</span>
					) : null}
				</div>

				<div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto py-2">
					{PERIOD_OPTIONS.map((option) => {
						const isSelected = period === option.value;
						return (
							<Button
								key={option.value}
								type="button"
								variant={isSelected ? "default" : "outline"}
								size="sm"
								className={merge(
									"h-8 px-3 text-xs whitespace-nowrap",
									isSelected && "bg-primary text-primary-foreground",
								)}
								onClick={() => setPeriod(option.value)}
							>
								{option.shortLabel}
							</Button>
						);
					})}
				</div>

				{isLoading ? (
					<div className="flex items-center justify-center py-8">
						<Spinner
							size={24}
							className="text-primary"
						/>
					</div>
				) : !hasData ? (
					<Empty
						title="Sin datos"
						description="No hay movimientos en este periodo."
						icon={TrendingUp}
						className="py-8"
					/>
				) : (
					<>
						<div className="flex flex-row gap-4">
							<div className="flex flex-col gap-1">
								<span className="text-xs text-muted-foreground">Ingresos</span>
								<span className="text-base font-semibold text-primary tabular-nums">
									{formatCurrency(netIncome, account.currency)}
								</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-xs text-muted-foreground">Gastos</span>
								<span className="text-base font-semibold text-destructive tabular-nums">
									{formatCurrency(netExpenses, account.currency)}
								</span>
							</div>
						</div>

						{netIncome > 0 ? (
							<ProgressBar
								label="Gastos sobre ingresos"
								current={netExpenses}
								total={netIncome}
								currency={account.currency}
							/>
						) : (
							<span className="text-xs text-muted-foreground">Sin ingresos en este periodo</span>
						)}

						<span
							className={merge(
								"text-xs font-medium tabular-nums",
								isPositiveBalance ? "text-primary" : "text-destructive",
							)}
						>
							Balance: {formatCurrency(balance, account.currency)}
						</span>
					</>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
