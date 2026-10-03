import { RefreshCw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBankIncomeVsExpenses } from "@/hooks/banks/useQueryBankIncomeVsExpenses";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { BalanceChart } from "./components/balance-chart";
import { BankHero } from "./components/bank-hero";
import { IncomeExpensesChart } from "./components/income-expenses-chart";
import { PeriodSelector } from "./components/period-selector";

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

	const { incomeVsExpenses: income, isLoading: isIncomeLoading } = useQueryBankIncomeVsExpenses(
		bank.id,
		period,
	);

	return (
		<div className="flex flex-col gap-4">
			<BankHero
				bank={bank}
				currency={currency}
				locale={locale}
			/>

			<div className="flex flex-col gap-4">
				<PeriodSelector
					value={period}
					onChange={setPeriod}
					className="hidden flex-nowrap justify-end overflow-x-auto sm:flex"
				/>

				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<BalanceChart
						bank={bank}
						currency={currency}
						locale={locale}
					/>

					<div className="flex flex-col gap-3">
						{/* Mobile only: selector sits right above the chart it controls */}
						<PeriodSelector
							value={period}
							onChange={setPeriod}
							compact
							className="flex-wrap sm:hidden"
						/>

						{isIncomeLoading ? (
							<Skeleton className="h-64 rounded-xl" />
						) : !income ? (
							<Empty
								icon={RefreshCw}
								title="No pudimos cargar ingresos vs gastos"
								description="Revisa tu conexión e inténtalo de nuevo."
							/>
						) : (
							<IncomeExpensesChart
								incomeVsExpenses={income}
								currency={currency}
								locale={locale}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
