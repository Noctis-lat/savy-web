import { Eye, EyeOff } from "lucide-react";
import { useReducer, useRef, useState } from "react";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";

import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	PERCENTAGE_DEFAULT_MAX,
	PERCENTAGE_FRACTION_DIGITS,
	PERCENTAGE_NUMBER_OPTIONS,
} from "@/content/forms/percentageFieldOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { limitFractionDigits } from "@/utils/formatters/limitFractionDigits";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";
import {
	cleanNumberInput,
	formatNumberString,
	getNewCursorPosition,
	parseDisplayToNumber,
} from "./utils/numberFormatters";

const parseToCents = (value: string): number => {
	const numeric = value.replace(/[^\d]/g, "");
	return Number(numeric || 0);
};

type FormFieldProps<T extends FieldValues> = {
	label: string;
	name: FieldPath<T>;
	form: UseFormReturn<T>;
	type?: "text" | "email" | "password" | "tel" | "number" | "currency" | "percentage";
	placeholder?: string;
	required?: boolean;
	helperText?: string;
	className?: string;
	info?: string;
	optional?: boolean;
	/** For type="number" and type="percentage": minimum allowed value (visual + RHF validation) */
	min?: number;
	/**
	 * For type="number" and type="percentage": maximum allowed value (visual + RHF validation).
	 * Defaults to 100 for type="percentage".
	 */
	max?: number;
	/** Only for type="number": allows decimal values. Default: false */
	allowDecimals?: boolean;
	/** Only for type="number": allows negative values. Default: false */
	allowNegative?: boolean;
	disabled?: boolean;
};

export const FormField = <T extends FieldValues>({
	label,
	name,
	form,
	type = "text",
	placeholder,
	required = false,
	helperText,
	className,
	info,
	optional = false,
	min,
	max,
	allowDecimals = false,
	allowNegative = false,
	disabled = false,
}: FormFieldProps<T>): React.ReactElement => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const rawRef = useRef<string>("");
	// Raw text like "5." parses to the same number as "5", so field.onChange alone may not re-render
	// and React would restore the stale controlled value — force a render whenever the raw text changes.
	const [, forceRender] = useReducer((renderCount: number) => renderCount + 1, 0);

	const isPassword = type === "password";
	const isCurrency = type === "currency";
	const isPercentage = type === "percentage";
	const isNumber = type === "number";
	const isPhone = type === "tel";

	const inputType = isPassword
		? showPassword
			? "text"
			: "password"
		: isCurrency || isNumber || isPercentage || isPhone
			? "text"
			: type;

	const error = form.formState.errors[name];

	const isNumeric = isNumber || isPercentage;
	const rangeMax = max ?? (isPercentage ? PERCENTAGE_DEFAULT_MAX : undefined);

	const getNumberRangeError = (value: number | undefined): string | undefined => {
		if (value === undefined) return undefined;
		if (min !== undefined && value < min) return `El valor mínimo es ${min}`;
		if (rangeMax !== undefined && value > rangeMax) return `El valor máximo es ${rangeMax}`;
		return undefined;
	};

	const applyRangeValidation = (value: number | undefined): void => {
		const rangeError = getNumberRangeError(value);

		if (rangeError) {
			form.setError(name, {
				type: min !== undefined && value !== undefined && value < min ? "min" : "max",
				message: rangeError,
			});
			return;
		}

		const currentError = form.formState.errors[name];
		if (currentError?.type === "min" || currentError?.type === "max") {
			form.clearErrors(name);
		}
	};

	return (
		<div className={merge("flex flex-col gap-2", className)}>
			<Label
				htmlFor={name}
				className="flex items-center justify-between px-1 pr-1"
			>
				<div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
					<div className="flex items-center gap-2 min-w-0">
						<span className="wrap-break-word">{label}</span>
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
				name={name}
				render={({ field }) => {
					const numberOptions = { allowDecimals, allowNegative };

					if (isNumeric) {
						// Keep the raw text in sync when the value changes externally (reset/setValue).
						const fieldNumber: number | undefined = field.value ?? undefined;
						const rawNumber = parseDisplayToNumber(rawRef.current) ?? undefined;
						if (fieldNumber !== rawNumber) {
							rawRef.current = fieldNumber === undefined ? "" : String(fieldNumber);
						}
					}

					const formatPhoneDisplay = (value: string): string => {
						if (!value) return "";
						const digits = value.replace(/\D/g, "").slice(0, 10);
						if (digits.length <= 2) return digits;
						if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
						return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
					};

					const displayValue = isCurrency
						? field.value
							? formatCurrency(field.value)
							: ""
						: isPercentage
							? rawRef.current
								? `${rawRef.current}%`
								: ""
							: isNumber
								? rawRef.current
									? formatNumberString(rawRef.current)
									: ""
								: isPhone
									? formatPhoneDisplay(field.value ?? "")
									: (field.value ?? "");

					// Stores the raw percentage text, syncs the field value and keeps the caret before "%".
					const commitPercentageRaw = (
						input: HTMLInputElement,
						raw: string,
						caret: number,
					): void => {
						rawRef.current = raw;
						forceRender();

						const parsed = parseDisplayToNumber(raw) ?? undefined;
						field.onChange(parsed);
						applyRangeValidation(parsed);

						requestAnimationFrame(() => {
							input.setSelectionRange(caret, caret);
						});
					};

					const currentNumericValue: number | undefined = isNumeric
						? (field.value ?? undefined)
						: undefined;
					const rangeError = isNumeric ? getNumberRangeError(currentNumericValue) : undefined;

					return (
						<div className="flex flex-col gap-1">
							<div className="relative">
								<Input
									id={name}
									type={inputType}
									placeholder={placeholder}
									value={displayValue}
									onChange={(e) => {
										if (isCurrency) {
											const cents = parseToCents(e.target.value);
											field.onChange(cents);
										} else if (isPercentage) {
											const input = e.target;
											const raw = limitFractionDigits(
												cleanNumberInput(input.value, PERCENTAGE_NUMBER_OPTIONS),
												PERCENTAGE_FRACTION_DIGITS,
											);
											const caret = Math.min(input.selectionStart ?? raw.length, raw.length);
											commitPercentageRaw(input, raw, caret);
										} else if (isNumber) {
											const input = e.target;
											const cursorBefore = input.selectionStart ?? 0;

											const raw = cleanNumberInput(input.value, numberOptions);
											rawRef.current = raw;
											forceRender();

											const formatted = formatNumberString(raw);
											const newCursor = getNewCursorPosition(raw, formatted, cursorBefore);

											const parsed = parseDisplayToNumber(raw) ?? undefined;
											field.onChange(parsed);
											applyRangeValidation(parsed);

											requestAnimationFrame(() => {
												input.setSelectionRange(newCursor, newCursor);
											});
										} else if (isPhone) {
											const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
											field.onChange(digits);
										} else {
											field.onChange(e.target.value);
										}
									}}
									onBlur={() => {
										if (isNumeric) {
											const value: number | undefined = field.value ?? undefined;
											rawRef.current = value === undefined ? "" : String(value);
											if (value !== undefined) applyRangeValidation(value);
										}
										field.onBlur();
									}}
									onKeyDown={(e) => {
										if (!isNumeric) return;

										if (isPercentage && e.key === "Backspace") {
											const input = e.currentTarget;
											const hasSelection = input.selectionStart !== input.selectionEnd;
											const caretAfterSuffix =
												input.selectionStart === input.value.length && input.value.endsWith("%");

											// Native Backspace here would only delete the "%" suffix (which is re-rendered),
											// so remove the last digit of the raw value instead.
											if (!hasSelection && caretAfterSuffix) {
												e.preventDefault();
												const raw = rawRef.current.slice(0, -1);
												commitPercentageRaw(input, raw, raw.length);
											}
											return;
										}

										const keyAllowsDecimals = isPercentage || allowDecimals;
										const keyAllowsNegative = isNumber && allowNegative;

										const allowed = new Set([
											"Backspace",
											"Delete",
											"Tab",
											"Escape",
											"Enter",
											"ArrowLeft",
											"ArrowRight",
											"ArrowUp",
											"ArrowDown",
											"Home",
											"End",
										]);

										if (allowed.has(e.key)) return;

										if (e.ctrlKey || e.metaKey) return;

										const isDot = e.key === ".";
										const isMinus = e.key === "-";
										const isDigit = /^\d$/.test(e.key);

										if (isDot && !keyAllowsDecimals) {
											e.preventDefault();
											return;
										}

										if (isMinus && !keyAllowsNegative) {
											e.preventDefault();
											return;
										}

										if (isMinus && keyAllowsNegative) {
											const input = e.currentTarget;
											if (input.selectionStart !== 0) {
												e.preventDefault();
											}
											return;
										}

										if (isDot && keyAllowsDecimals) {
											if (rawRef.current.includes(".")) {
												e.preventDefault();
											}
											return;
										}

										if (!isDigit) {
											e.preventDefault();
										}
									}}
									name={field.name}
									ref={field.ref}
									disabled={disabled}
									aria-invalid={!!error || !!rangeError}
								/>

								{isPassword && (
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className="absolute right-0 top-0 flex items-center justify-center h-full w-10 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
										tabIndex={-1}
										aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
									>
										{showPassword ? (
											<EyeOff
												size={16}
												className="text-primary"
											/>
										) : (
											<Eye
												size={16}
												className="text-primary"
											/>
										)}
									</button>
								)}
							</div>
						</div>
					);
				}}
			/>

			{error && <span className="text-sm text-red-500">{String(error.message)}</span>}

			{!error && helperText && <span className="text-xs text-muted-foreground">{helperText}</span>}
		</div>
	);
};
