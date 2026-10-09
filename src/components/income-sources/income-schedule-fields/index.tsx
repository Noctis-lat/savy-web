import type React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	FREQUENCY_OPTIONS,
	MONTH_DAYS,
	WEEKDAY_OPTIONS,
} from "@/content/income-sources/incomeSourceContent";
import { formatIncomePaydays } from "@/utils/income-sources/formatIncomePaydays";
import { togglePayday } from "@/utils/income-sources/togglePayday";

type IncomeScheduleValues = {
	frequency: IncomeSourceFrequency;
	paydays: number[];
};

const PAYDAY_LABELS: Record<IncomeSourceFrequency, string> = {
	WEEKLY: "Día de la semana",
	BIWEEKLY: "Días del mes (elige 2)",
	MONTHLY: "Día del mes",
};

/**
 * Frequency + paydays fields for income source forms.
 * Must be rendered inside a FormProvider whose values include `frequency` and `paydays`.
 * Changing the frequency clears the paydays because their meaning changes (weekday vs. day of month).
 */
export const IncomeScheduleFields = (): React.ReactElement => {
	const scheduleForm = useFormContext<IncomeScheduleValues>();
	const { control, setValue, formState } = scheduleForm;

	const frequency = useWatch({ control, name: "frequency" });
	const paydays = useWatch({ control, name: "paydays" });

	const dayOptions =
		frequency === "WEEKLY"
			? WEEKDAY_OPTIONS
			: MONTH_DAYS.map((day) => ({ value: day, label: String(day) }));
	const paydaysError = formState.errors.paydays?.message;

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
							className="grid grid-cols-3 gap-2"
						>
							{FREQUENCY_OPTIONS.map((option) => {
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
											setValue("paydays", [], { shouldDirty: true, shouldValidate: true });
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

			<div className="flex flex-col gap-2">
				<Label className="flex items-center gap-2 px-1">
					{PAYDAY_LABELS[frequency]}
					<span className="text-primary">*</span>
				</Label>
				<Controller
					control={control}
					name="paydays"
					render={({ field }) => (
						<fieldset
							aria-label={PAYDAY_LABELS[frequency]}
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
											field.onChange(togglePayday(field.value, option.value, frequency))
										}
									>
										{option.label}
									</Button>
								);
							})}
						</fieldset>
					)}
				/>
				{paydaysError ? (
					<span className="text-sm text-red-500">{String(paydaysError)}</span>
				) : (
					paydays.length > 0 && (
						<span className="px-1 text-xs text-muted-foreground">
							{formatIncomePaydays(frequency, paydays)}
						</span>
					)
				)}
			</div>
		</div>
	);
};
