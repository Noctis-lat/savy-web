import { Search } from "lucide-react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { merge } from "@/utils/ui/mergeStyles";

type SearchInputProps = {
	value: string | undefined;
	onCommit: (value: string | undefined) => void;
	placeholder?: string;
	className?: string;
};

export const SearchInput = ({
	value,
	onCommit,
	placeholder = "Buscar...",
	className,
}: SearchInputProps): React.ReactElement => {
	const { localValue, onChange } = useSearch({
		externalValue: value,
		onCommit,
	});

	return (
		<div className={merge("relative flex flex-col gap-2", className)}>
			<Input
				value={localValue}
				onChange={(event) => onChange(event.target.value)}
				className="sm:min-w-sm bg-white pl-8"
				placeholder={placeholder}
			/>
			<Search className="absolute top-2 left-2 h-4 w-4 text-gray-400" />
		</div>
	);
};
