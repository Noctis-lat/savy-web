import { Plus, Trash2 } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Alert } from "@/components/design-system/primitives/alert";
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

	const watchedItems = useWatch({ control, name: "items" });
	const itemsError = createBudgetForm.formState.errors.items;

	const { totalExpense, totalIncome, balance } = useMemo(() => {
		let income = 0;
		let expense = 0;

		for (let index = 0; index < fields.length; index++) {
			const amount = watchedItems?.[index]?.amount ?? fields[index]?.amount ?? 0;
			const category = categoriesById.get(fields[index]?.categoryId);

			if (category?.type === "INCOME") {
				income += amount;
			} else {
				expense += amount;
			}
		}

		return {
			totalExpense: expense,
			totalIncome: income,
			balance: income - expense,
		};
	}, [watchedItems, fields, categoriesById]);

	if (fields.length === 0) {
		return (
			<div className="flex flex-col flex-1 items-center gap-2 rounded-lg border border-dashed border-border/50 py-10 text-center">
				<Plus className="size-6 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">Agrega categorías para presupuestar</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-between gap-3 flex-1 border border-gray-300/70 rounded-lg">
			<div className="flex flex-col gap-2 h-82 overflow-y-auto p-3">
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
								{itemError?.message ? (
									<span
										role="alert"
										className="text-xs text-red-500"
									>
										{String(itemError.message)}
									</span>
								) : null}
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

			{itemsError?.message ? (
				<span
					role="alert"
					className="text-sm text-red-500"
				>
					{String(itemsError.message)}
				</span>
			) : null}

			<div className="grid grid-cols-3 gap-4 border-t border-gray-300/70 p-3">
				{totalIncome > 0 && (
					<Alert
						variant="success"
						title="Total de ingresos"
					>
						{formatCurrency(totalIncome)}
					</Alert>
				)}

				{totalExpense > 0 && (
					<Alert
						variant="destructive"
						title="Total de gastos"
					>
						{formatCurrency(totalExpense)}
					</Alert>
				)}

				<Alert
					variant={balance > 0 ? "success" : balance < 0 ? "destructive" : "default"}
					title={
						balance > 0
							? "Dinero libre"
							: balance < 0
								? "Por encima de tus ingresos"
								: "Presupuesto equilibrado"
					}
					className={
						totalExpense === 0 && totalIncome === 0
							? "col-span-3"
							: totalExpense > 0 && totalIncome > 0
								? "col-span-1"
								: "col-span-2"
					}
				>
					{balance >= 0
						? `${formatCurrency(balance)} después de gastos`
						: `${formatCurrency(Math.abs(balance))} por encima de tus ingresos`}
				</Alert>
			</div>
		</div>
	);
};
