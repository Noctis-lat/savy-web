import { FolderOpen } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateCategory } from "@/components/categories/create-category";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { useQueryCategories } from "@/hooks/categories/useQueryCategories";
import { useRoutesController } from "@/storage/settings/routesController";
import { CategoriesHeader } from "./components/categories-header";
import { CategoryItem } from "./components/category-item";

export const Categories = (): React.ReactElement => {
	const { setBreadcrumbsConfig } = useRoutesController();

	useEffect(() => {
		setBreadcrumbsConfig([
			{ label: "Inicio", href: ROUTES.APP.ROOT },
			{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT },
			{ label: "Categorías" },
		]);
	}, [setBreadcrumbsConfig]);

	const { categories, isLoading } = useQueryCategories();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!categories || categories.length === 0) {
		return (
			<Empty
				icon={FolderOpen}
				title="No hay categorías"
				description="No se han encontrado categorías."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-4 py-4">
			<div className="flex flex-row items-center justify-between">
				<CategoriesHeader categoriesLength={categories.length} />
			</div>
			<div className="grid grid-cols-4 gap-4">
				{categories.map((category) => {
					return (
						<CategoryItem
							category={category}
							key={category.id}
						/>
					);
				})}
				<CreateCategory
					mode="card"
					className="h-30"
				/>
			</div>
		</div>
	);
};
