import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type FilterToggleProps = {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	icon?: React.ComponentType<{ className?: string }>;
	disabled?: boolean;
	className?: string;
};

export const FilterToggle = ({
	label,
	checked,
	onChange,
	icon: Icon,
	disabled = false,
	className,
}: FilterToggleProps): React.ReactElement => {
	const handleToggle = (): void => {
		if (!disabled) onChange(!checked);
	};

	return (
		<button
			type="button"
			onClick={handleToggle}
			disabled={disabled}
			aria-pressed={checked}
			className={merge(
				"flex h-9 items-center gap-2 rounded-md border border-border bg-white px-3 text-sm font-medium text-gray-900 cursor-pointer transition-colors hover:border-gray-500",
				checked && "bg-primary/10 border-primary/20 text-primary hover:border-primary",
				disabled && "cursor-not-allowed opacity-50",
				className,
			)}
		>
			{Icon && <Icon className="size-4" />}
			<span>{label}</span>
		</button>
	);
};
