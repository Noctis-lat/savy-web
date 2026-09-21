import { Search, X } from "lucide-react";
import { DynamicIcon, type IconName, iconNames } from "lucide-react/dynamic";
import type React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SUGGESTED_ICONS } from "@/content/ui/iconPalette";
import { merge } from "@/utils/ui/mergeStyles";

type IconPickerProps = {
	value: string | undefined;
	onChange: (icon: string | undefined) => void;
	label?: string;
	disabled?: boolean;
};

const MAX_SEARCH_RESULTS = 36;

export const IconPicker = ({
	value,
	onChange,
	label = "Icono",
	disabled = false,
}: IconPickerProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");

	const displayedIcons = useMemo(() => {
		if (!search.trim()) return SUGGESTED_ICONS;
		const query = search.toLowerCase();
		return (iconNames as IconName[])
			.filter((name) => name.includes(query))
			.slice(0, MAX_SEARCH_RESULTS);
	}, [search]);

	const handleSelect = (icon: IconName): void => {
		onChange(icon);
		setOpen(false);
		setSearch("");
	};

	const handleClear = (): void => {
		onChange(undefined);
		setOpen(false);
		setSearch("");
	};

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) setSearch("");
	};

	return (
		<div className="flex flex-col gap-2">
			<span className="px-1 text-sm font-medium text-foreground">{label}</span>

			<Popover
				open={open}
				onOpenChange={handleOpenChange}
			>
				<PopoverTrigger asChild>
					<Button
						type="button"
						variant="outline"
						disabled={disabled}
						className="justify-start gap-3"
					>
						{value ? (
							<DynamicIcon
								name={value as IconName}
								className="size-5 text-primary"
							/>
						) : (
							<span className="size-5 rounded border border-dashed border-border" />
						)}
						<span className={value ? "text-foreground" : "text-muted-foreground"}>
							{value ?? "Sin icono"}
						</span>
					</Button>
				</PopoverTrigger>

				<PopoverContent
					className="w-72 p-3"
					align="start"
				>
					<div className="relative mb-3">
						<Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
						<Input
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Buscar icono..."
							className="h-8 bg-white pl-8 pr-8 text-sm"
						/>
						{search && (
							<button
								type="button"
								onClick={() => setSearch("")}
								className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
							>
								<X className="size-4" />
							</button>
						)}
					</div>

					{displayedIcons.length === 0 ? (
						<p className="py-4 text-center text-xs text-muted-foreground">
							Sin resultados para "{search}"
						</p>
					) : (
						<div className="grid grid-cols-6 gap-1.5">
							{displayedIcons.map((iconName) => {
								const isSelected = value === iconName;
								return (
									<button
										key={iconName}
										type="button"
										onClick={() => handleSelect(iconName)}
										title={iconName}
										aria-label={iconName}
										className={merge(
											"flex size-9 items-center justify-center rounded-md transition-colors",
											isSelected
												? "bg-primary/10 text-primary ring-1 ring-primary/30"
												: "text-foreground hover:bg-accent",
										)}
									>
										<DynamicIcon
											name={iconName}
											className="size-4"
										/>
									</button>
								);
							})}
						</div>
					)}

					{value !== undefined && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={handleClear}
							className="mt-3 w-full text-xs text-muted-foreground"
						>
							Quitar icono
						</Button>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
};
