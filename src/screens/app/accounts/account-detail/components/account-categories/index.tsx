import { PieChart, RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { useQueryAccountIncomesExpenses } from "@/hooks/accounts/useQueryAccountIncomesExpenses";
import { useQueryTopCategoriesByAccount } from "@/hooks/categories/useQueryTopCategoriesByAccount";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type AccountCategoriesProps = {
	account: Account;
};

export const AccountCategories = ({ account }: AccountCategoriesProps): React.ReactElement => {
	const topCategoriesQuery = useQueryTopCategoriesByAccount(account.id);
	const { expenses } = useQueryAccountIncomesExpenses({
		accountId: account.id,
		period: "month",
	});

	const categories = topCategoriesQuery.data ?? [];
	const totalExpenses = expenses ?? 0;

	return (
		<ScaleFadeIn className="flex-1">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<PieChart className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Top categorías de gasto</h3>
				</div>

				{topCategoriesQuery.isLoading ? (
					<div className="flex items-center justify-center py-8">
						<Spinner
							size={24}
							className="text-primary"
						/>
					</div>
				) : topCategoriesQuery.isError ? (
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
						className="py-8"
					/>
				) : categories.length === 0 ? (
					<Empty
						icon={PieChart}
						title="Sin gastos"
						description="No hay gastos registrados en este periodo."
						className="py-8"
					/>
				) : (
					<div className="flex flex-col gap-3">
						{categories.map((category) => (
							<ProgressBar
								key={category.categoryId}
								label={category.categoryName}
								current={category.amount}
								total={totalExpenses}
								currency={account.currency}
							/>
						))}
						<span className="text-xs text-muted-foreground">
							Total de gastos: {formatCurrency(totalExpenses, account.currency)}
						</span>
					</div>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
