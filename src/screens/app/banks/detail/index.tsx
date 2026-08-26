import { Edit3, RefreshCw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { PERIOD_OPTIONS } from "@/content/banks/bankContent";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { useQueryBankAccounts } from "@/hooks/banks/useQueryBankAccounts";
import { useQueryBankCreditCards } from "@/hooks/banks/useQueryBankCreditCards";
import { useQueryBankIncomeVsExpenses } from "@/hooks/banks/useQueryBankIncomeVsExpenses";
import { useQueryBankLoans } from "@/hooks/banks/useQueryBankLoans";
import { useQueryTopCategoriesByBank } from "@/hooks/categories/useQueryTopCategoriesByBank";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { merge } from "@/utils/ui/mergeStyles";
import { AccountsGrid } from "./components/accounts-grid";
import { BalanceChart } from "./components/balance-chart";
import { BankHero } from "./components/bank-hero";
import { DetailSkeleton } from "./components/detail-skeleton";
import { IncomeExpensesChart } from "./components/income-expenses-chart";
import { LoansSection } from "./components/loans-section";
import { TopCategories } from "./components/top-categories";

const DEFAULT_CURRENCY = "MXN";
const DEFAULT_LOCALE = "es-MX";

export const BankDetail = (): React.ReactElement => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const profile = useProfileStorage((state) => state.profile);
	const currency = profile?.currency ?? DEFAULT_CURRENCY;
	const locale = profile?.locale ?? DEFAULT_LOCALE;
	const [period, setPeriod] = useState<string>("month");

	const bankId = id ?? "";

	const bankQuery = useQueryBank(bankId, true);
	const incomeQuery = useQueryBankIncomeVsExpenses(bankId, period as PeriodType);
	const accountsQuery = useQueryBankAccounts(bankId);
	const creditCardsQuery = useQueryBankCreditCards(bankId);
	const loansQuery = useQueryBankLoans(bankId);
	const topCategoriesQuery = useQueryTopCategoriesByBank(bankId);

	const isLoading =
		bankQuery.isLoading ||
		incomeQuery.isLoading ||
		accountsQuery.isLoading ||
		creditCardsQuery.isLoading ||
		loansQuery.isLoading ||
		topCategoriesQuery.isLoading;

	const isError =
		bankQuery.isError || incomeQuery.isError || accountsQuery.isError || creditCardsQuery.isError;

	const bank = bankQuery.data;
	const income = incomeQuery.data;
	const accounts = accountsQuery.data ?? [];
	const creditCards = creditCardsQuery.data ?? [];
	const loans = loansQuery.data ?? [];
	const topCategories = topCategoriesQuery.data ?? [];

	if (isLoading) {
		return <DetailSkeleton />;
	}

	if (isError || !bank || !income) {
		return (
			<div className="flex flex-1 flex-col gap-6 p-6">
				<AppBreadcrumbs
					backRoute={ROUTES.APP.BANKS}
					config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: "Detalle" }]}
				/>
				<Empty
					icon={RefreshCw}
					title="No pudimos cargar la información del banco"
					description="Revisa tu conexión e inténtalo de nuevo."
					action={{
						label: "Reintentar",
						icon: RefreshCw,
						onClick: () => {
							void bankQuery.refetch();
							void incomeQuery.refetch();
							void accountsQuery.refetch();
							void creditCardsQuery.refetch();
							void loansQuery.refetch();
							void topCategoriesQuery.refetch();
						},
					}}
				/>
			</div>
		);
	}

	const bankWithInfo = bank as BankWithInfo;
	const info = bankWithInfo.info;
	const editRoute = ROUTES.APP.BANKS_EDIT.replace(":id", bankId);

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<AppBreadcrumbs
					backRoute={ROUTES.APP.BANKS}
					config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: bank.name }]}
				/>
				<Button
					variant="outline"
					onClick={() => navigate(editRoute)}
				>
					<Edit3 className="size-4" />
					Editar
				</Button>
			</div>

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
				</div>
			</div>

			<ScaleFadeIn>
				<TopCategories
					categories={topCategories}
					totalExpenses={income.expenses}
					currency={currency}
					locale={locale}
				/>
			</ScaleFadeIn>

			<AccountsGrid
				accounts={accounts}
				creditCards={creditCards}
				bankName={bank.name}
				bankColor={bank.color}
			/>

			{loans.length > 0 && (
				<ScaleFadeIn>
					<LoansSection
						loans={loans}
						accounts={accounts}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>
			)}
		</div>
	);
};
