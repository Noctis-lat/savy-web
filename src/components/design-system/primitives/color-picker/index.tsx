import { Check } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { COLOR_PALETTE } from "@/content/ui/colorPalette";
import { merge } from "@/utils/ui/mergeStyles";

type ColorPickerProps = {
	value: string | undefined;
	onChange: (color: string | undefined) => void;
	label?: string;
	disabled?: boolean;
};

export const ColorPicker = ({
	value,
	onChange,
	label = "Color",
	disabled = false,
}: ColorPickerProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const handleSelect = (color: string): void => {
		onChange(color);
		setOpen(false);
	};

	const handleClear = (): void => {
		onChange(undefined);
		setOpen(false);
	};

	return (
		<div className="flex flex-col gap-2">
			<span className="px-1 text-sm font-medium text-foreground">{label}</span>

			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						type="button"
						variant="outline"
						disabled={disabled}
						className="justify-start gap-3"
					>
						<span
							className="size-5 rounded-full border border-border"
							style={{ backgroundColor: value ?? "transparent" }}
						/>
						<span className={value ? "text-foreground" : "text-muted-foreground"}>
							{value ?? "Sin color"}
						</span>
					</Button>
				</PopoverTrigger>

				<PopoverContent
					className="w-auto p-3"
					align="start"
				>
					<div className="grid grid-cols-8 gap-2">
						{COLOR_PALETTE.map((color) => {
							const isSelected = value === color.value;

							return (
								<button
									key={color.value}
									type="button"
									onClick={() => handleSelect(color.value)}
									className={merge(
										"flex size-7 items-center justify-center rounded-md border-2 transition-all",
										isSelected ? "border-foreground scale-110" : "border-border hover:scale-110",
									)}
									style={{ backgroundColor: color.value }}
									title={color.label}
									aria-label={color.label}
								>
									{isSelected && (
										<Check
											className={merge(
												"size-3.5 drop-shadow-sm",
												["#ffffff", "#eab308", "#84cc16", "#fde047"].includes(color.value)
													? "text-black"
													: "text-white",
											)}
										/>
									)}
								</button>
							);
						})}
					</div>

					{value !== undefined && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={handleClear}
							className="mt-3 w-full text-xs text-muted-foreground"
						>
							Quitar color
						</Button>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
};
