import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { EditCategory } from "./components/edit-category";
import { RemoveCategory } from "./components/remove-category";

type CategoryItemProps = {
	category: Category;
	isEditing: boolean;
};

export const CategoryItem = ({ category, isEditing }: CategoryItemProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<GlassCard className="flex flex-row items-center justify-between gap-2 pr-4 py-2 relative">
				<div className="flex flex-row items-center gap-2 p-4">
					<DynamicIcon
						name={(category.icon as IconName) || "copy"}
						className="h-5 w-5 text-primary"
					/>
					<h3 className="text-sm font-medium text-foreground select-none">{category.name}</h3>
				</div>

				<Badge
					variant={category.type === "INCOME" ? "success" : "error"}
					className="px-3 text-xs"
				>
					{category.type === "INCOME" ? "Ingreso" : "Gasto"}
				</Badge>

				{isEditing && (
					<>
						<EditCategory category={category} />
						<RemoveCategory category={category} />
					</>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
