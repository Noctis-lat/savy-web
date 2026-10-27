import type React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormDatePicker } from "@/components/design-system/patterns/forms/form-date-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	BILLING_FREQUENCY_OPTIONS,
	MONTH_DAYS,
	WEEKDAY_OPTIONS,
} from "@/content/recurring-expenses/recurringExpenseContent";
import { formatBillingDays } from "@/utils/recurring-expenses/formatBillingDays";
import { toggleBillingDay } from "@/utils/recurring-expenses/toggleBillingDay";

type BillingScheduleValues = {
	frequency: RecurringExpenseFrequency;
	billingDays: number[];
	billingDate?: string;
};

const BILLING_DAY_LABELS: Record<RecurringExpenseFrequency, string> = {
	WEEKLY: "Día de la semana",
	BIWEEKLY: "Días del mes (elige 2)",
	MONTHLY: "Día del mes",
	YEARLY: "Día del mes",
};

/**
 * Frequency + billing days fields for recurring expense forms.
 * Must be rendered inside a FormProvider whose values include `frequency` and `billingDays`.
 * Changing the frequency clears the billing days because their meaning changes (weekday vs. day of month).
 */
export const BillingScheduleFields = (): React.ReactElement => {
	const scheduleForm = useFormContext<BillingScheduleValues>();
	const { control, setValue, formState } = scheduleForm;

	const frequency = useWatch({ control, name: "frequency" });
	const billingDays = useWatch({ control, name: "billingDays" });

	const isYearly = frequency === "YEARLY";

	const dayOptions =
		frequency === "WEEKLY"
			? WEEKDAY_OPTIONS
			: MONTH_DAYS.map((day) => ({ value: day, label: String(day) }));
	const billingDaysError = formState.errors.billingDays?.message;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label className="flex items-center gap-2 px-1">
					Frecuencia
					<span className="text-primary">*</span>
				</Label>
				<Controller
					control={control}
					name="frequency"
					render={({ field }) => (
						<div
							role="radiogroup"
							aria-label="Frecuencia"
							className="grid grid-cols-4 gap-2"
						>
							{BILLING_FREQUENCY_OPTIONS.map((option) => {
								const isSelected = field.value === option.value;
								return (
									<Button
										key={option.value}
										type="button"
										role="radio"
										aria-checked={isSelected}
										variant={isSelected ? "default" : "outline"}
										size="sm"
										onClick={() => {
											if (isSelected) return;
											field.onChange(option.value);
											setValue("billingDays", [], {
												shouldDirty: true,
												shouldValidate: true,
											});
											setValue("billingDate", undefined, {
												shouldDirty: true,
												shouldValidate: true,
											});
										}}
									>
										{option.label}
									</Button>
								);
							})}
						</div>
					)}
				/>
			</div>

			{isYearly ? (
				<FormDatePicker
					mode="single"
					name="billingDate"
					form={scheduleForm}
					label="Fecha de cobro"
					required
				/>
			) : (
				<div className="flex flex-col gap-2">
					<Label className="flex items-center gap-2 px-1">
						{BILLING_DAY_LABELS[frequency]}
						<span className="text-primary">*</span>
					</Label>
					<Controller
						control={control}
						name="billingDays"
						render={({ field }) => (
							<fieldset
								aria-label={BILLING_DAY_LABELS[frequency]}
								className="m-0 grid min-w-0 grid-cols-7 gap-1 border-0 p-0"
							>
								{dayOptions.map((option) => {
									const isSelected = field.value.includes(option.value);
									return (
										<Button
											key={option.value}
											type="button"
											aria-pressed={isSelected}
											variant={isSelected ? "default" : "outline"}
											size="sm"
											className="h-8 px-0 text-xs tabular-nums"
											onClick={() =>
												field.onChange(toggleBillingDay(field.value, option.value, frequency))
											}
										>
											{option.label}
										</Button>
									);
								})}
							</fieldset>
						)}
					/>
					{billingDaysError ? (
						<span className="text-sm text-red-500">{String(billingDaysError)}</span>
					) : (
						billingDays.length > 0 && (
							<span className="px-1 text-xs text-muted-foreground">
								{formatBillingDays(frequency, billingDays)}
							</span>
						)
					)}
				</div>
			)}
		</div>
	);
};
