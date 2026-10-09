import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";
import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";
import { SelectOption } from "./components/select-option";

type FormSelectProps<T extends FieldValues> = {
	label: string;
	name: FieldPath<T>;
	form: UseFormReturn<T>;
	options: Option[];
	placeholder?: string;
	required?: boolean;
	helperText?: string;
	className?: string;
	info?: string;
	disabled?: boolean;
	optional?: boolean;
	searchable?: boolean;
	searchPlaceholder?: string;
	action?: React.ReactNode;
};

export const FormSelect = <T extends FieldValues>({
	label,
	name,
	form,
	options,
	placeholder = "Seleccionar...",
	required = false,
	helperText,
	className,
	info,
	disabled,
	optional = false,
	searchable = false,
	searchPlaceholder = "Buscar...",
	action,
}: FormSelectProps<T>): React.ReactElement => {
	const error = form.formState.errors[name];
	const [search, setSearch] = useState<string>("");

	const filteredOptions = useMemo(() => {
		if (!searchable || !search.trim()) return options;
		const lower = search.toLowerCase();
		return options.filter((option) => option.label.toLowerCase().includes(lower));
	}, [options, search, searchable]);

	return (
		<div className={merge("flex flex-col gap-2 w-full", className)}>
			<Label
				htmlFor={name}
				className="flex items-center justify-between px-1 pr-1"
			>
				<div className="flex items-center flex-wrap gap-2">
					{label}
					{required && <span className="text-primary">*</span>}
					{optional && <Optional />}
				</div>

				<div className="flex items-center gap-2">
					{info && (
						<InfoCard size="xs">
							<span className="max-w-52">{info}</span>
						</InfoCard>
					)}
					{action}
				</div>
			</Label>

			<Controller
				control={form.control}
				name={name}
				render={({ field }) => (
					<Select
						onValueChange={(value) => field.onChange(value)}
						value={field.value ?? ""}
						disabled={disabled}
						onOpenChange={(open) => {
							if (!open) setSearch("");
						}}
					>
						<SelectTrigger
							id={name}
							className="w-full bg-white h-8!"
						>
							<SelectValue
								className="bg-white"
								placeholder={placeholder}
							/>
						</SelectTrigger>

						<SelectContent
							side="bottom"
							position="popper"
							avoidCollisions={false}
						>
							{searchable && (
								<div className="flex items-center gap-2 px-2 py-2 sticky top-0 bg-white border-b border-gray-100 z-10">
									<Search className="size-3.5 text-gray-400 shrink-0" />
									<Input
										value={search}
										onChange={(event) => setSearch(event.target.value)}
										placeholder={searchPlaceholder}
										className="h-7 text-xs bg-gray-50"
										onKeyDown={(event) => event.stopPropagation()}
									/>
								</div>
							)}
							{filteredOptions.length === 0 ? (
								<div className="py-4 text-center text-xs text-gray-400">Sin resultados</div>
							) : (
								filteredOptions.map((option) => (
									<SelectOption
										option={option}
										key={option.value as string}
									/>
								))
							)}
						</SelectContent>
					</Select>
				)}
			/>

			{error && <span className="text-sm text-red-500">{String(error.message)}</span>}

			{!error && helperText && (
				<span className="text-[10px] text-muted-foreground">{helperText}</span>
			)}
		</div>
	);
};
