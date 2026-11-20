import { Check, ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";

import { InfoCard } from "@/components/design-system/patterns/data-display/info-card";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { merge } from "@/utils/ui/mergeStyles";
import { Optional } from "../optional";

type FormAsyncMultiSelectProps<T extends FieldValues> = {
	label: string;
	name: FieldPath<T>;
	form: UseFormReturn<T>;

	options: Option[];
	isLoading?: boolean;
	hasMore?: boolean;

	onSearch: (value: string) => void;
	onLoadMore: () => void;

	placeholder?: string;
	required?: boolean;
	helperText?: string;
	className?: string;
	info?: string;
	disabled?: boolean;
	optional?: boolean;
	searchValue?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const FormAsyncMultiSelect = <T extends FieldValues>({
	label,
	name,
	form,
	options,
	isLoading = false,
	hasMore = false,
	onSearch,
	onLoadMore,
	placeholder = "Select options",
	required = false,
	helperText,
	className,
	info,
	disabled,
	optional = false,
	searchValue = "",
	open,
	onOpenChange,
}: FormAsyncMultiSelectProps<T>): React.ReactElement => {
	const [internalOpen, setInternalOpen] = useState<boolean>(false);

	const error = form.formState.errors[name];

	return (
		<div className={merge("flex flex-col gap-2 w-full", className)}>
			<Label className="flex items-center justify-between px-1 pr-1">
				<div className="flex items-center flex-wrap gap-2">
					{label}
					{required && <span className="text-primary">*</span>}
					{optional && <Optional />}
				</div>

				{info && (
					<InfoCard size="xs">
						<span className="max-w-52">{info}</span>
					</InfoCard>
				)}
			</Label>

			<Controller
				control={form.control}
				name={name}
				render={({ field }) => {
					const selectedValues: string[] = field.value ?? [];

					const toggleOption = (value: string) => {
						if (selectedValues.includes(value)) {
							field.onChange(selectedValues.filter((option) => option !== value));
						} else {
							field.onChange([...selectedValues, value]);
						}
					};

					const selectedLabels = options
						.filter((opt) => selectedValues.includes(opt.value))
						.map((opt) => opt.label);

					const MAX_VISIBLE = 3;
					const visibleLabels = selectedLabels.slice(0, MAX_VISIBLE);
					const remainingCount = selectedLabels.length - MAX_VISIBLE;

					const displayText =
						selectedLabels.length === 0
							? placeholder
							: remainingCount > 0
								? `${visibleLabels.join(", ")} +${remainingCount}`
								: visibleLabels.join(", ");

					return (
						<Popover
							open={open ?? internalOpen}
							onOpenChange={onOpenChange ?? setInternalOpen}
						>
							<PopoverTrigger asChild>
								<Button
									type="button"
									variant="outline"
									role="combobox"
									aria-expanded={open}
									className="w-full justify-between h-8 overflow-hidden rounded-md pr-2"
									disabled={disabled}
								>
									<span className="truncate text-xs">{displayText}</span>
									<ChevronDown
										className={merge(
											"opacity-50 transition-transform duration-200",
											open && "rotate-180",
										)}
									/>
								</Button>
							</PopoverTrigger>

							<PopoverContent
								align="start"
								sideOffset={4}
								className="p-0 overflow-visible"
								style={{ width: "var(--radix-popover-trigger-width)" }}
								onWheel={(e) => e.stopPropagation()}
							>
								<Command
									shouldFilter={false}
									onKeyDown={(e) => e.stopPropagation()}
								>
									<CommandInput
										placeholder="Buscar..."
										value={searchValue}
										onValueChange={onSearch}
									/>

									<CommandList className="max-h-64 h-fit overflow-y-auto">
										<CommandEmpty className="text-sm text-gray-500">
											{isLoading ? "Buscando..." : "Sin resultados."}
										</CommandEmpty>

										<CommandGroup>
											{options.map((option) => {
												const isSelected = selectedValues.includes(option.value);

												return (
													<CommandItem
														key={option.value}
														onSelect={() => toggleOption(option.value)}
														className="cursor-pointer hover:bg-primary/10! hover:text-primary! border border-transparent"
													>
														<Check
															className={merge(
																"mr-2 h-4 w-4 text-primary!",
																isSelected ? "opacity-100" : "opacity-0",
															)}
														/>
														{option.label}
													</CommandItem>
												);
											})}
										</CommandGroup>

										{hasMore && (
											<div className="p-2">
												<Button
													type="button"
													variant="link"
													size="sm"
													className="w-full text-xs h-fit"
													onClick={onLoadMore}
													disabled={isLoading}
													onMouseDown={(e) => e.preventDefault()}
												>
													{isLoading ? "Cargando..." : "Cargar más"}
												</Button>
											</div>
										)}
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					);
				}}
			/>

			{error && <span className="text-sm text-red-500">{String(error.message)}</span>}

			{!error && helperText && (
				<span className="text-[10px] text-muted-foreground">{helperText}</span>
			)}
		</div>
	);
};
