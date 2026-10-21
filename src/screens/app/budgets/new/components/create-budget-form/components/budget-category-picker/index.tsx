import { Search, Tag } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Input } from "@/components/ui/input";
import { CategoryGroup } from "./components/category-group";

type BudgetCategoryPickerProps = {
	categories: Category[] | undefined;
	isLoading: boolean;
	selectedCategoryIds: string[];
	onAddCategory: (category: Category) => void;
};

export const BudgetCategoryPicker = ({
	categories,
	isLoading,
	selectedCategoryIds,
	onAddCategory,
}: BudgetCategoryPickerProps): React.ReactElement => {
	const [search, setSearch] = useState<string>("");

	const grouped = useMemo(() => {
		const filtered = (categories ?? []).filter((category) =>
			category.name.toLowerCase().includes(search.toLowerCase()),
		);
		return {
			income: filtered.filter((category) => category.type === "INCOME"),
			expense: filtered.filter((category) => category.type === "EXPENSE"),
		};
	}, [categories, search]);

	return (
		<div className="flex flex-col gap-3">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-600" />
				<Input
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					placeholder="Buscar categoría..."
					className="h-9 pl-9 border border-gray-200!"
					aria-label="Buscar categoría"
				/>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center py-8">
					<Spinner size={20} />
				</div>
			) : grouped.income.length === 0 && grouped.expense.length === 0 ? (
				<div className="flex flex-row items-center justify-center gap-2 py-8 text-center">
					<Tag className="size-4 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						{search ? "Sin resultados" : "No hay categorías disponibles"}
					</p>
				</div>
			) : (
				<div className="flex h-72 flex-col gap-4 overflow-y-auto">
					{grouped.income.length > 0 && (
						<CategoryGroup
							label="Ingresos"
							categories={grouped.income}
							selectedCategoryIds={selectedCategoryIds}
							onAddCategory={onAddCategory}
						/>
					)}
					{grouped.expense.length > 0 && (
						<CategoryGroup
							label="Gastos"
							categories={grouped.expense}
							selectedCategoryIds={selectedCategoryIds}
							onAddCategory={onAddCategory}
						/>
					)}
				</div>
			)}
		</div>
	);
};
