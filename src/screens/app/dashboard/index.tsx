import { RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { QuickActionsBar } from "@/components/design-system/patterns/data-display/quick-actions-bar";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryDashboardSummary } from "@/hooks/dashboard/useQueryDashboardSummary";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { formatDate } from "@/utils/formatters/formatDate";
import { AccountsDistributionCard } from "./components/accounts-distribution-card";
import { ActiveBudgetsCard } from "./components/active-budgets-card";
import { BanksCard } from "./components/banks-card";
import { CreditOverviewCard } from "./components/credit-overview-card";
import { NetWorthCard } from "./components/net-worth-card";
import { RecentTransactionsCard } from "./components/recent-transactions-card";
import { SavingsGoalsCard } from "./components/savings-goals-card";

const DEFAULT_CURRENCY = "MXN";
const DEFAULT_LOCALE = "es-MX";

export const Dashboard = (): React.ReactElement => {
	const query = useQueryDashboardSummary();
	const profile = useProfileStorage((state) => state.profile);

	const currency = profile?.currency ?? DEFAULT_CURRENCY;
	const locale = profile?.locale ?? DEFAULT_LOCALE;
	const fullName = `${profile?.firstName} ${profile?.lastName}`.trim();

	const isLoading = query.isLoading;
	const isError = query.isError;
	const data = query.data;

	const greeting = `Bienvenido, ${fullName}`;
	const today = formatDate(new Date());

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	if (isError || !data) {
		return (
			<div className="flex flex-1 flex-col gap-6 p-6">
				<DashboardGreeting
					greeting={greeting}
					date={today}
				/>
				<Empty
					icon={RefreshCw}
					title="No pudimos cargar tu resumen"
					description="Revisa tu conexión e inténtalo de nuevo. Si el problema continúa, vuelve a intentarlo en unos minutos."
					action={{
						label: "Reintentar",
						icon: RefreshCw,
						onClick: () => {
							void query.refetch();
						},
					}}
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<DashboardGreeting
				greeting={greeting}
				date={today}
			/>
			<QuickActionsBar />

			<StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<ScaleFadeIn className="lg:col-span-1">
					<NetWorthCard
						netWorth={data.netWorth}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>

				<ScaleFadeIn className="lg:col-span-1">
					<BanksCard
						banks={data.banks}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>

				<ScaleFadeIn className="lg:col-span-1">
					<AccountsDistributionCard
						distribution={data.accountsDistribution}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>

				<ScaleFadeIn className="lg:col-span-1">
					<RecentTransactionsCard
						transactions={data.recentTransactions}
						locale={locale}
					/>
				</ScaleFadeIn>

				<ScaleFadeIn className="lg:col-span-1">
					<ActiveBudgetsCard
						budgets={data.activeBudgets}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>

				<ScaleFadeIn className="lg:col-span-1">
					<SavingsGoalsCard
						goals={data.savingsGoals}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>

				<ScaleFadeIn className="lg:col-span-1">
					<CreditOverviewCard
						creditOverview={data.creditOverview}
						currency={currency}
						locale={locale}
					/>
				</ScaleFadeIn>
			</StaggerContainer>
		</div>
	);
};

type DashboardGreetingProps = {
	greeting: string;
	date: string;
};

const DashboardGreeting = ({ greeting, date }: DashboardGreetingProps): React.ReactElement => (
	<div className="flex flex-col gap-1">
		<h1 className="text-2xl font-semibold text-primary">{greeting}</h1>
		<p className="text-sm text-muted-foreground">{date}</p>
	</div>
);

const SKELETON_SLOTS = [
	"dashboard-skeleton-net-worth",
	"dashboard-skeleton-distribution",
	"dashboard-skeleton-transactions",
	"dashboard-skeleton-budgets",
	"dashboard-skeleton-goals",
	"dashboard-skeleton-credit",
	"dashboard-skeleton-banks",
] as const;

const DashboardSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6 p-6">
		<div className="flex flex-col gap-2">
			<Skeleton className="h-8 w-48" />
			<Skeleton className="h-4 w-64" />
		</div>
		<Skeleton className="h-10 w-full" />

		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{SKELETON_SLOTS.map((slot) => (
				<Skeleton
					key={slot}
					className="h-48 w-full rounded-xl"
				/>
			))}
		</div>
	</div>
);
