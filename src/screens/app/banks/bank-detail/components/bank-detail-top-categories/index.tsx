import { PieChart, RefreshCw } from "lucide-react";
import type React from "react";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBankIncomeVsExpenses } from "@/hooks/banks/useQueryBankIncomeVsExpenses";
import { useQueryTopCategoriesByBank } from "@/hooks/categories/useQueryTopCategoriesByBank";
import { useProfileStorage } from "@/storage/profile/profileStorage";

const DEFAULT_CURRENCY = "MXN";
const DEFAULT_LOCALE = "es-MX";

type BankDetailTopCategoriesProps = {
	bankId: string;
};

export const BankDetailTopCategories = ({
	bankId,
}: BankDetailTopCategoriesProps): React.ReactElement => {
	const profile = useProfileStorage((state) => state.profile);
	const currency = profile?.currency ?? DEFAULT_CURRENCY;
	const locale = profile?.locale ?? DEFAULT_LOCALE;

	const topCategoriesQuery = useQueryTopCategoriesByBank(bankId);
	const incomeQuery = useQueryBankIncomeVsExpenses(bankId, "month");

	const categories = topCategoriesQuery.data ?? [];
	const totalExpenses = incomeQuery.data?.expenses ?? 0;

	if (topCategoriesQuery.isLoading) {
		return <Skeleton className="h-48 w-full rounded-xl" />;
	}

	if (topCategoriesQuery.isError) {
		return (
			<GlassCard className="p-6">
				<Empty
					icon={RefreshCw}
					title="No pudimos cargar las categorías"
					description="Revisa tu conexión e inténtalo de nuevo."
					action={{
						label: "Reintentar",
						onClick: () => {
							void topCategoriesQuery.refetch();
						},
					}}
				/>
			</GlassCard>
		);
	}

	if (categories.length === 0) {
		return (
			<GlassCard className="flex flex-col gap-4 p-6">
				<div className="flex items-center gap-2">
					<PieChart className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Top categorías de gasto</h3>
				</div>
				<Empty
					icon={PieChart}
					title="Sin gastos"
					description="No hay gastos registrados en este periodo."
				/>
			</GlassCard>
		);
	}

	return (
		<GlassCard className="flex flex-col gap-4 p-6">
			<div className="flex items-center gap-2">
				<PieChart className="size-4 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Top categorías de gasto</h3>
			</div>
			<div className="flex flex-col gap-3">
				{categories.map((category) => (
					<ProgressBar
						key={category.categoryId}
						label={category.categoryName}
						current={category.amount}
						total={totalExpenses}
						currency={currency}
						locale={locale}
					/>
				))}
			</div>
		</GlassCard>
	);
};
