import { CheckCircle2 } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";

type CategoryGroupProps = {
	label: string;
	categories: Category[];
	selectedCategoryIds: string[];
	onAddCategory: (category: Category) => void;
};

export const CategoryGroup = ({
	label,
	categories,
	selectedCategoryIds,
	onAddCategory,
}: CategoryGroupProps): React.ReactElement => {
	return (
		<div className="flex flex-col gap-1">
			<span className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
				{label}
			</span>
			{categories.map((category) => {
				const isSelected = selectedCategoryIds.includes(category.id);

				return (
					<button
						key={category.id}
						type="button"
						onClick={() => onAddCategory(category)}
						disabled={isSelected}
						className="flex flex-row items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
						aria-label={isSelected ? `${category.name} ya agregada` : `Agregar ${category.name}`}
					>
						<span
							className={`flex size-7 items-center justify-center rounded-md ${category.type === "INCOME" ? "bg-emerald-500/10" : "bg-red-500/10"}`}
						>
							<DynamicIcon
								name={(category.icon as IconName) || "tag"}
								className={`size-4 ${category.type === "INCOME" ? "text-emerald-600" : "text-red-600"}`}
							/>
						</span>
						<span className="flex-1 truncate text-foreground">{category.name}</span>
						{isSelected && <CheckCircle2 className="size-4 text-muted-foreground" />}
					</button>
				);
			})}
		</div>
	);
};
