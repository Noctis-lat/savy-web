import { RefreshCw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PERIOD_OPTIONS } from "@/content/banks/bankContent";
import { useQueryBankIncomeVsExpenses } from "@/hooks/banks/useQueryBankIncomeVsExpenses";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { merge } from "@/utils/ui/mergeStyles";
import { BalanceChart } from "./components/balance-chart";
import { BankHero } from "./components/bank-hero";
import { IncomeExpensesChart } from "./components/income-expenses-chart";

const DEFAULT_CURRENCY = "MXN";
const DEFAULT_LOCALE = "es-MX";

type BankDetailHeroProps = {
	bank: Bank;
};

export const BankDetailHero = ({ bank }: BankDetailHeroProps): React.ReactElement => {
	const profile = useProfileStorage((state) => state.profile);
	const currency = profile?.currency ?? DEFAULT_CURRENCY;
	const locale = profile?.locale ?? DEFAULT_LOCALE;

	const [period, setPeriod] = useState<PeriodType>("month");

	const bankWithInfo = bank as BankWithInfo;
	const info = bankWithInfo.info;

	const incomeQuery = useQueryBankIncomeVsExpenses(bank.id, period);
	const income = incomeQuery.data;

	return (
		<div className="flex flex-col gap-4">
			<BankHero
				bank={bankWithInfo}
				currency={currency}
				locale={locale}
			/>

			<div className="flex flex-col gap-4">
				<div className="flex flex-nowrap items-center justify-end gap-1.5 overflow-x-auto">
					{PERIOD_OPTIONS.map((option) => {
						const isSelected = period === option.value;
						return (
							<Button
								key={option.value}
								type="button"
								variant={isSelected ? "default" : "outline"}
								size="sm"
								className={merge(
									"h-9 px-4 text-sm whitespace-nowrap",
									isSelected && "bg-primary text-primary-foreground",
								)}
								onClick={() => setPeriod(option.value)}
							>
								{option.shortLabel}
							</Button>
						);
					})}
				</div>

				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<ScaleFadeIn>
						<BalanceChart
							assets={info.balanceBreakdown.assets}
							liabilities={info.balanceBreakdown.liabilities}
							netWorth={info.netWorth}
							currency={currency}
							locale={locale}
						/>
					</ScaleFadeIn>

					{incomeQuery.isLoading ? (
						<Skeleton className="h-64 rounded-xl" />
					) : incomeQuery.isError || !income ? (
						<Empty
							icon={RefreshCw}
							title="No pudimos cargar ingresos vs gastos"
							description="Revisa tu conexión e inténtalo de nuevo."
							action={{
								label: "Reintentar",
								onClick: () => {
									void incomeQuery.refetch();
								},
							}}
						/>
					) : (
						<ScaleFadeIn>
							<IncomeExpensesChart
								income={income.income}
								expenses={income.expenses}
								periodLabel={income.periodLabel}
								currency={currency}
								locale={locale}
							/>
						</ScaleFadeIn>
					)}
				</div>
			</div>
		</div>
	);
};
