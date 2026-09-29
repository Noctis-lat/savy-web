import { PieChart, RefreshCw } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryTopCategoriesByAccount } from "@/hooks/categories/useQueryTopCategoriesByAccount";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type AccountCategoriesProps = {
	account: Account;
};

export const AccountCategories = ({ account }: AccountCategoriesProps): React.ReactElement => {
	const { categories, totalExpenses, isLoading } = useQueryTopCategoriesByAccount(account.id);

	if (isLoading) {
		return <Skeleton />;
	}

	if (!categories || categories.length === 0) {
		return (
			<Empty
				icon={RefreshCw}
				title="No pudimos cargar las categorías"
				description="Revisa tu conexión e inténtalo de nuevo."
				className="py-8"
			/>
		);
	}

	return (
		<ScaleFadeIn className="flex-1">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<PieChart className="size-4 text-primary" />
					<h3 className="text-sm font-semibold text-foreground">Top categorías de gasto</h3>
				</div>

				<div className="flex flex-col gap-3">
					{categories.map((category) => (
						<ProgressBar
							key={category.id}
							label={category.name}
							current={category.amount ?? 0}
							total={totalExpenses ?? 0}
							currency={account.currency}
						/>
					))}
					<span className="text-xs text-muted-foreground">
						Total de gastos: {formatCurrency(totalExpenses ?? 0, account.currency)}
					</span>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
