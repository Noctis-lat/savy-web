import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import type React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { merge } from "@/utils/ui/mergeStyles";

type FilterSortSelectProps = {
	options: Option[];
	sortValue: string;
	order: "asc" | "desc";
	onSortChange: (value: string) => void;
	onOrderChange: (order: "asc" | "desc") => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

export const FilterSortSelect = ({
	options,
	sortValue,
	order,
	onSortChange,
	onOrderChange,
	placeholder = "Ordenar por...",
	disabled = false,
	className,
}: FilterSortSelectProps): React.ReactElement => {
	const isActive = sortValue && sortValue !== "all" && sortValue !== "";
	const isAsc = order === "asc";

	const handleOrderToggle = (): void => {
		onOrderChange(isAsc ? "desc" : "asc");
	};

	return (
		<div className={merge("flex items-center gap-0", className)}>
			<Select
				value={sortValue ?? ""}
				onValueChange={(value) => onSortChange(value)}
				disabled={disabled}
			>
				<SelectTrigger
					className={merge(
						"min-w-40 rounded-r-none border-r-0 bg-white! text-gray-900! cursor-pointer hover:border-gray-500",
						isActive && "bg-primary/10! border-primary/20 **:text-primary! hover:border-primary!",
						disabled && "cursor-not-allowed opacity-50",
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

			<Toggle
				variant="outline"
				pressed={!isAsc}
				onPressedChange={handleOrderToggle}
				disabled={disabled}
				aria-label={isAsc ? "Orden ascendente" : "Orden descendente"}
				className={merge(
					"rounded-l-none border-input bg-white! text-gray-900! hover:border-gray-500",
					isActive && "bg-primary/10! border-primary/20 text-primary! hover:border-primary!",
				)}
			>
				{isAsc ? <ArrowUpAZ className="size-4" /> : <ArrowDownAZ className="size-4" />}
			</Toggle>
		</div>
	);
};
