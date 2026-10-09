import { FolderOpen } from "lucide-react";
import type React from "react";

type CategoriesHeaderProps = {
	categoriesLength: number;
};

export const CategoriesHeader = ({
	categoriesLength,
}: CategoriesHeaderProps): React.ReactElement => {
	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<FolderOpen className="h-6 w-6 text-emerald-600" />
			<div className="flex flex-col gap-1">
				<h3 className="text-sm font-medium text-foreground select-none">
					Categorías ({categoriesLength})
				</h3>
				<p className="text-xs text-muted-foreground select-none">
					Administrar las categorías de tus transacciones.
				</p>
			</div>
		</div>
	);
};
