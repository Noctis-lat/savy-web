import type React from "react";
import { Button } from "@/components/ui/button";
import { PERIOD_OPTIONS } from "@/content/banks/bankContent";
import { merge } from "@/utils/ui/mergeStyles";

type PeriodSelectorProps = {
	value: PeriodType;
	onChange: (period: PeriodType) => void;
	compact?: boolean;
	className?: string;
};

export const PeriodSelector = ({
	value,
	onChange,
	compact = false,
	className,
}: PeriodSelectorProps): React.ReactElement => {
	return (
		<fieldset
			aria-label="Periodo de ingresos y gastos"
			className={merge("m-0 flex min-w-0 items-center gap-1.5 border-0 p-0", className)}
		>
			{PERIOD_OPTIONS.map((option) => {
				const isSelected = value === option.value;
				return (
					<Button
						key={option.value}
						type="button"
						variant={isSelected ? "default" : "outline"}
						size="sm"
						aria-pressed={isSelected}
						className={merge(
							"whitespace-nowrap",
							compact ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm",
							isSelected && "bg-primary text-primary-foreground",
						)}
						onClick={() => onChange(option.value)}
					>
						{option.shortLabel}
					</Button>
				);
			})}
		</fieldset>
	);
};
