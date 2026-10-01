import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Matcher } from "react-day-picker";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";
import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate, formatDateRange } from "@/utils/formatters/formatDate";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";

const parseDate = (value?: string) => {
	if (!value) return undefined;
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day);
};

const parseRange = (value?: string) => {
	const [from, to] = value?.split("|") ?? [];

	return {
		from: parseDate(from),
		to: parseDate(to),
	};
};

const formatSingle = (date?: Date) => {
	if (!date) return "";
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const formatRange = (from?: Date, to?: Date) => {
	if (!from && !to) return "";
	if (from && !to) return from.toISOString();
	if (from && to) return `${from.toISOString()}|${to.toISOString()}`;
	return "";
};

const parseMultiple = (value?: string[]): Date[] | undefined => {
	if (!value || value.length === 0) return undefined;
	return value.map((iso) => parseDate(iso)).filter((date): date is Date => Boolean(date));
};

const formatMultiple = (dates?: Date[]): string => {
	if (!dates || dates.length === 0) return "";
	const days = dates.map((date) => date.getDate()).sort((prev, next) => prev - next);
	if (days.length === 1) return `Día ${days[0]}`;
	return `Días ${days.join(", ")}`;
};

type BaseProps<T extends FieldValues> = {
	label: string;
	form: UseFormReturn<T>;
	required?: boolean;
	helperText?: string;
	className?: string;
	info?: string;
	optional?: boolean;
	disabled?: boolean;
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Matcher | Matcher[];
	maxSelected?: number;
	disableNavigation?: boolean;
};

type Props<T extends FieldValues> =
	| (BaseProps<T> & {
			mode: "single";
			name: FieldPath<T>;
	  })
	| (BaseProps<T> & {
			mode: "range";
			name: FieldPath<T>;
	  })
	| (BaseProps<T> & {
			mode: "multiple";
			name: FieldPath<T>;
	  });

export const FormDatePicker = <T extends FieldValues>({
	label,
	form,
	required,
	helperText,
	className,
	info,
	optional,
	disabled = false,
	disabledDates,
	minDate,
	maxDate,
	maxSelected,
	disableNavigation,
	...props
}: Props<T>): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={merge("flex flex-col gap-2", className)}>
			<Label className="flex items-center justify-between px-1 pr-1">
				<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
					<div className="flex items-center gap-2">
						<span>{label}</span>
						{required && <span className="text-primary">*</span>}
					</div>
					{optional && <Optional />}
				</div>

				{info && (
					<InfoCard size="xs">
						<span className="max-w-45">{info}</span>
					</InfoCard>
				)}
			</Label>

			<Controller
				control={form.control}
				name={props.name}
				render={({ field }) => {
					if (props.mode === "single") {
						const date = parseDate(field.value);

						return (
							<Popover
								open={open}
								onOpenChange={setOpen}
							>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="justify-between w-full h-8 text-xs/relaxed font-normal"
										disabled={disabled}
									>
										<span className={date ? "" : "text-muted-foreground"}>
											{date ? formatDate(date) : "Elige una fecha"}
										</span>
										<CalendarIcon className="ml-2 size-3.5 opacity-50" />
									</Button>
								</PopoverTrigger>

								<PopoverContent className="w-full p-2">
									<Calendar
										mode="single"
										disabled={disabled ? true : disabledDates}
										selected={date}
										locale={es}
										onSelect={(date) => {
											field.onChange(formatSingle(date));
											setOpen(false);
										}}
									/>
								</PopoverContent>
							</Popover>
						);
					}

					if (props.mode === "range") {
						const { from, to } = parseRange(field.value);

						return (
							<Popover
								open={open}
								onOpenChange={setOpen}
							>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="justify-between w-full"
										disabled={disabled}
									>
										{formatDateRange(from, to)}
										<CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
									</Button>
								</PopoverTrigger>

								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="range"
										disabled={disabled ? true : disabledDates}
										selected={{ from, to }}
										onSelect={(range) => {
											field.onChange(formatRange(range?.from, range?.to));

											if (range?.from && range?.to) {
												setOpen(false);
											}
										}}
										numberOfMonths={2}
										fixedWeeks
									/>
								</PopoverContent>
							</Popover>
						);
					}

					const selectedDates = parseMultiple(field.value);
					const now = new Date();
					const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
					const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

					return (
						<Popover
							open={open}
							onOpenChange={setOpen}
						>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="justify-between w-full h-8 text-xs/relaxed font-normal"
									disabled={disabled}
								>
									<span
										className={
											selectedDates && selectedDates.length > 0 ? "" : "text-muted-foreground"
										}
									>
										{selectedDates && selectedDates.length > 0
											? formatMultiple(selectedDates)
											: "Seleccionar días"}
									</span>
									<CalendarIcon className="ml-2 size-3.5 opacity-50" />
								</Button>
							</PopoverTrigger>

							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="multiple"
									disabled={disabled ? true : disabledDates}
									selected={selectedDates}
									locale={es}
									startMonth={disableNavigation ? monthStart : undefined}
									endMonth={disableNavigation ? monthEnd : undefined}
									max={maxSelected}
									onSelect={(dates) => {
										const next = (dates ?? []).map((date) => formatSingle(date));
										field.onChange(next);

										if (maxSelected && next.length >= maxSelected) {
											setOpen(false);
										}
									}}
								/>
							</PopoverContent>
						</Popover>
					);
				}}
			/>

			{(() => {
				const error = form.formState.errors[props.name];

				if (error) {
					return <span className="text-sm text-red-500">{String(error.message)}</span>;
				}

				return helperText && <span className="text-xs text-muted-foreground">{helperText}</span>;
			})()}
		</div>
	);
};
