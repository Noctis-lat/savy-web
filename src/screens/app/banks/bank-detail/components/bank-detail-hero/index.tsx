import { RefreshCw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PERIOD_OPTIONS } from "@/content/banks/bankContent";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { useQueryBankIncomeVsExpenses } from "@/hooks/banks/useQueryBankIncomeVsExpenses";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { merge } from "@/utils/ui/mergeStyles";
import { BalanceChart } from "./components/balance-chart";
import { BankHero } from "./components/bank-hero";
import { IncomeExpensesChart } from "./components/income-expenses-chart";

const DEFAULT_CURRENCY = "MXN";
const DEFAULT_LOCALE = "es-MX";

type BankDetailHeroProps = {
	bankId: string;
};

export const BankDetailHero = ({ bankId }: BankDetailHeroProps): React.ReactElement => {
	const profile = useProfileStorage((state) => state.profile);
	const currency = profile?.currency ?? DEFAULT_CURRENCY;
	const locale = profile?.locale ?? DEFAULT_LOCALE;

	const [period, setPeriod] = useState<PeriodType>("month");

	const bankQuery = useQueryBank(bankId, true);
	const incomeQuery = useQueryBankIncomeVsExpenses(bankId, period);

	const bank = bankQuery.data;
	const income = incomeQuery.data;

	if (bankQuery.isLoading) {
		return (
			<div className="flex flex-col gap-4">
				<Skeleton className="h-32 w-full rounded-xl" />
				<div className="flex justify-end">
					<Skeleton className="h-9 w-40 rounded-md" />
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<Skeleton className="h-64 rounded-xl" />
					<Skeleton className="h-64 rounded-xl" />
				</div>
			</div>
		);
	}

	if (bankQuery.isError || !bank) {
		return (
			<Empty
				icon={RefreshCw}
				title="No pudimos cargar la información del banco"
				description="Revisa tu conexión e inténtalo de nuevo."
				action={{
					label: "Reintentar",
					onClick: () => {
						void bankQuery.refetch();
					},
				}}
			/>
		);
	}

	const bankWithInfo = bank as BankWithInfo;
	const info = bankWithInfo.info;

	return (
		<div className="flex flex-col gap-4">
			<ScaleFadeIn>
				<BankHero
					bankName={bank.name}
					bankColor={bank.color}
					isActive={bank.isActive}
					netWorth={info.netWorth}
					liquidity={info.liquidity}
					debt={info.debt}
					currency={currency}
					locale={locale}
				/>
			</ScaleFadeIn>

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
					{incomeQuery.isLoading ? (
						<>
							<Skeleton className="h-64 rounded-xl" />
							<Skeleton className="h-64 rounded-xl" />
						</>
					) : incomeQuery.isError || !income ? (
						<Empty
							icon={RefreshCw}
							title="No pudimos cargar los gráficos"
							description="Revisa tu conexión e inténtalo de nuevo."
							action={{
								label: "Reintentar",
								onClick: () => {
									void incomeQuery.refetch();
								},
							}}
						/>
					) : (
						<>
							<ScaleFadeIn>
								<BalanceChart
									assets={info.balanceBreakdown.assets}
									liabilities={info.balanceBreakdown.liabilities}
									netWorth={info.netWorth}
									currency={currency}
									locale={locale}
								/>
							</ScaleFadeIn>
							<ScaleFadeIn>
								<IncomeExpensesChart
									income={income.income}
									expenses={income.expenses}
									periodLabel={income.periodLabel}
									currency={currency}
									locale={locale}
								/>
							</ScaleFadeIn>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
