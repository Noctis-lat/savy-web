import type React from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { merge } from "@/utils/ui/mergeStyles";

type FilterSelectProps = {
	label?: string;
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
};

export const FilterSelect = ({
	label,
	options,
	value,
	onChange,
	placeholder = "Seleccionar...",
	disabled = false,
	className,
	labelClassName,
	inputClassName,
}: FilterSelectProps): React.ReactElement => {
	const isActive = value && value !== "all" && value !== "";
	return (
		<div className={merge("flex flex-col gap-2", className)}>
			{label && (
				<Label
					className={labelClassName}
					htmlFor={label}
				>
					{label}
				</Label>
			)}

			<Select
				value={value ?? ""}
				onValueChange={(value) => onChange?.(value)}
				disabled={disabled}
			>
				<SelectTrigger
					id={label}
					size="sm"
					className={merge(
						"min-w-40 bg-white! text-xs text-gray-900! cursor-pointer hover:border-gray-500",
						isActive && "bg-primary/10! border-primary/20 **:text-primary! hover:border-primary!",
						disabled && "cursor-not-allowed opacity-50",
						inputClassName,
					)}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>

				<SelectContent
					side="bottom"
					position="popper"
				>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
