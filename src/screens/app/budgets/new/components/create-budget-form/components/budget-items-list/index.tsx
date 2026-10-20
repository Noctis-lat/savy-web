import { Plus, Trash2 } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { parseCurrencyToCents } from "@/utils/formatters/parseCurrencyToCents";

type BudgetItemsListProps = {
	fields: { id: string; categoryId: string; amount: number }[];
	onRemoveItem: (index: number) => void;
	categoriesById: Map<string, Category>;
};

export const BudgetItemsList = ({
	fields,
	onRemoveItem,
	categoriesById,
}: BudgetItemsListProps): React.ReactElement => {
	const createBudgetForm = useFormContext<CreateBudgetFormValues>();
	const { control } = createBudgetForm;

	const itemsError = createBudgetForm.formState.errors.items;
	const total = fields.reduce((sum, field) => sum + (field.amount ?? 0), 0);

	if (fields.length === 0) {
		return (
			<div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border/50 py-10 text-center">
				<Plus className="size-6 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">Agrega categorías para presupuestar</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-2">
				{fields.map((field, index) => {
					const category = categoriesById.get(field.categoryId);
					const itemError = createBudgetForm.formState.errors.items?.[index]?.amount;

					return (
						<div
							key={field.id}
							className="flex flex-row items-center gap-3 rounded-lg border border-border/60 p-3"
						>
							<span
								className={`flex size-8 shrink-0 items-center justify-center rounded-md ${category?.type === "INCOME" ? "bg-emerald-500/10" : "bg-red-500/10"}`}
							>
								<DynamicIcon
									name={(category?.icon as IconName) || "tag"}
									className={`size-4 ${category?.type === "INCOME" ? "text-emerald-600" : "text-red-600"}`}
								/>
							</span>

							<div className="flex min-w-0 flex-1 flex-col gap-1">
								<div className="flex flex-row items-center gap-2">
									<span className="truncate text-sm font-medium text-foreground">
										{category?.name ?? "Categoría"}
									</span>
									<Badge
										variant={category?.type === "INCOME" ? "success" : "error"}
										className="shrink-0"
									>
										{category?.type === "INCOME" ? "Ingreso" : "Gasto"}
									</Badge>
								</div>
							</div>

							<div className="flex flex-col gap-1">
								<Controller
									control={control}
									name={`items.${index}.amount`}
									render={({ field: controllerField }) => (
										<Input
											id={`items.${index}.amount`}
											type="text"
											inputMode="numeric"
											value={controllerField.value ? formatCurrency(controllerField.value) : ""}
											onChange={(event) => {
												controllerField.onChange(parseCurrencyToCents(event.target.value));
											}}
											onBlur={controllerField.onBlur}
											name={controllerField.name}
											ref={controllerField.ref}
											placeholder="$0.00"
											className="h-9 w-32 text-right"
											aria-label={`Monto para ${category?.name ?? "categoría"}`}
											aria-invalid={!!itemError}
										/>
									)}
								/>
								{itemError && (
									<span
										role="alert"
										className="text-xs text-red-500"
									>
										{String(itemError.message)}
									</span>
								)}
							</div>

							<button
								type="button"
								onClick={() => onRemoveItem(index)}
								className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
								aria-label={`Quitar ${category?.name ?? "categoría"}`}
							>
								<Trash2 className="size-4" />
							</button>
						</div>
					);
				})}
			</div>

			{itemsError && (
				<span
					role="alert"
					className="text-sm text-red-500"
				>
					{String(itemsError.message)}
				</span>
			)}

			<div className="flex flex-row items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
				<span className="text-sm font-medium text-muted-foreground">Total presupuestado</span>
				<span className="text-sm font-semibold text-foreground">{formatCurrency(total)}</span>
			</div>
		</div>
	);
};
