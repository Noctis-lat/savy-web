import { zodResolver } from "@hookform/resolvers/zod";
import { es } from "date-fns/locale";
import { CalendarIcon, Check, Loader2, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FREQUENCY_OPTIONS, WEEKDAY_OPTIONS } from "@/content/income-sources/incomeSourceContent";
import {
	type IncomeSourceFormValues,
	incomeSourceSchema,
} from "@/schemas/onboarding/incomeSourceSchema";
import { formatPaydays } from "@/utils/onboarding/formatPaydays";
import { merge } from "@/utils/ui/mergeStyles";

const DEFAULT_VALUES: IncomeSourceFormValues = {
	name: "",
	amount: 0,
	frequency: "MONTHLY",
	paydays: [],
	destinationAccountId: "",
};

const buildMonthBounds = () => {
	const now = new Date();
	return {
		start: new Date(now.getFullYear(), now.getMonth(), 1),
		end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
	};
};

const dayNumbersToDates = (days: number[]): Date[] => {
	const now = new Date();
	return days.map((day) => new Date(now.getFullYear(), now.getMonth(), day));
};

const datesToDayNumbers = (dates: Date[] | undefined): number[] =>
	(dates ?? []).map((date) => date.getDate()).sort((prev, next) => prev - next);

type IncomeSourceFormProps = {
	/** Called with validated values when the user saves. */
	onSave: (values: IncomeSourceFormValues) => void | Promise<void>;
	/** Called once after a successful save, when the form is ready for the next decision. */
	onSaved?: () => void;
	saveLabel?: string;
	accountOptions: Option[];
};

export const IncomeSourceForm = ({
	onSave,
	onSaved,
	saveLabel = "Guardar fuente",
	accountOptions,
}: IncomeSourceFormProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const [showFollowUp, setShowFollowUp] = useState<boolean>(false);

	const form = useForm<IncomeSourceFormValues>({
		resolver: zodResolver(incomeSourceSchema),
		mode: "onChange",
		defaultValues: DEFAULT_VALUES,
	});

	const frequency = form.watch("frequency");

	const resetForm = (): void => {
		form.reset(DEFAULT_VALUES);
		setShowFollowUp(false);
	};

	const handleSave = form.handleSubmit(async (values) => {
		await onSave(values);
		form.reset(DEFAULT_VALUES);
		setShowFollowUp(true);
	});

	const handleAddAnother = (): void => {
		resetForm();
	};

	const handleFinish = (): void => {
		setShowFollowUp(false);
		onSaved?.();
	};

	const renderPaydayField = (): React.ReactNode => {
		if (!frequency) return null;

		if (frequency === "WEEKLY") {
			return (
				<div className="flex flex-col gap-2">
					<Label className="flex items-center gap-2 px-1">
						Día de la semana
						<span className="text-primary">*</span>
					</Label>
					<Controller
						control={form.control}
						name="paydays"
						render={({ field }) => (
							<div className="grid grid-cols-7 gap-1">
								{WEEKDAY_OPTIONS.map((option) => {
									const isSelected = field.value?.[0] === option.value;
									return (
										<Button
											key={option.value}
											type="button"
											variant={isSelected ? "default" : "outline"}
											size="sm"
											className={merge(
												"h-8 px-0 text-xs",
												isSelected && "bg-primary text-primary-foreground",
											)}
											onClick={() => field.onChange([option.value])}
										>
											{option.label}
										</Button>
									);
								})}
							</div>
						)}
					/>
					{form.formState.errors.paydays && (
						<span className="text-sm text-red-500">
							{String(form.formState.errors.paydays.message)}
						</span>
					)}
				</div>
			);
		}

		const maxSelected = frequency === "BIWEEKLY" ? 2 : 1;
		const { start, end } = buildMonthBounds();

		return (
			<div className="flex flex-col gap-2">
				<Label className="flex items-center gap-2 px-1">
					{frequency === "BIWEEKLY" ? "Días del mes" : "Día del mes"}
					<span className="text-primary">*</span>
				</Label>
				<Controller
					control={form.control}
					name="paydays"
					render={({ field }) => {
						const selected = field.value ? dayNumbersToDates(field.value) : [];

						return (
							<Popover
								open={open}
								onOpenChange={setOpen}
							>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="justify-between w-full h-8 text-xs/relaxed font-normal"
									>
										<span
											className={
												field.value && field.value.length > 0 ? "" : "text-muted-foreground"
											}
										>
											{field.value && field.value.length > 0
												? formatPaydays(field.value)
												: "Seleccionar días"}
										</span>
										<CalendarIcon className="ml-2 size-3.5 opacity-50" />
									</Button>
								</PopoverTrigger>

								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="multiple"
										selected={selected}
										locale={es}
										startMonth={start}
										endMonth={end}
										max={maxSelected}
										hideNavigation
										onSelect={(dates) => {
											field.onChange(datesToDayNumbers(dates));
											if (dates && dates.length >= maxSelected) {
												setOpen(false);
											}
										}}
									/>
								</PopoverContent>
							</Popover>
						);
					}}
				/>
				{form.formState.errors.paydays && (
					<span className="text-sm text-red-500">
						{String(form.formState.errors.paydays.message)}
					</span>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h3 className="text-base font-semibold text-foreground">Nueva fuente de ingreso</h3>
				<p className="text-xs text-muted-foreground">
					Registra cada fuente por separado para reportes más precisos.
				</p>
			</div>

			{showFollowUp ? (
				<div className="flex flex-col gap-3 rounded-md border border-border/60 bg-white/25 p-3 backdrop-blur-sm">
					<div className="flex items-center gap-2 text-sm text-foreground">
						<Check className="size-4 text-primary" />
						¿Crear otra fuente de ingreso?
					</div>
					<div className="flex flex-row gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={handleAddAnother}
							className="flex-1"
						>
							<Plus className="size-4" />
							Sí, agregar otra
						</Button>
						<Button
							type="button"
							onClick={handleFinish}
							className="flex-1"
						>
							No, terminar
						</Button>
					</div>
				</div>
			) : (
				<>
					<FormField
						name="name"
						form={form}
						label="Nombre"
						placeholder="Ej. Salario principal"
						required
					/>
					<FormField
						name="amount"
						form={form}
						type="currency"
						label="Monto"
						placeholder="0"
						required
						helperText="Monto que recibes en cada pago, en tu moneda local."
					/>
					<FormSelect
						name="frequency"
						form={form}
						label="Frecuencia"
						options={FREQUENCY_OPTIONS}
						required
					/>
					{renderPaydayField()}
					<FormSelect
						name="destinationAccountId"
						form={form}
						label="Cuenta destino"
						options={accountOptions}
						placeholder="Selecciona una cuenta..."
						required
						helperText="Cuenta donde se depositará el ingreso."
					/>
					<Button
						type="button"
						onClick={handleSave}
						disabled={form.formState.isSubmitting}
						className="w-full"
					>
						{form.formState.isSubmitting ? (
							<>
								<Loader2 className="animate-spin" />
								Guardando...
							</>
						) : (
							<>
								<Plus className="size-4" />
								{saveLabel}
							</>
						)}
					</Button>
				</>
			)}
		</div>
	);
};
