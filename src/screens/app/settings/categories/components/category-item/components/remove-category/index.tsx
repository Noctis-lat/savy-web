import { Trash2 } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";

type RemoveCategoryProps = {
	category: Category;
};

export const RemoveCategory = ({ category }: RemoveCategoryProps): React.ReactElement => {
	const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();

	const handleConfirm = async (): Promise<void> => {
		await deleteCategory(category.id);
		toast.success("Categoría eliminada");
	};

	return (
		<ScaleFadeIn className="absolute -top-3 right-3">
			<ConfirmDialog
				title="Eliminar categoría"
				description={`¿Seguro que quieres eliminar "${category.name}"? Esta acción no se puede deshacer.`}
				confirmText="Eliminar"
				variant="destructive"
				onConfirm={handleConfirm}
				loading={isPending}
			>
				<Button
					className="rounded-full"
					variant="destructive"
					size="icon-sm"
					aria-label="Eliminar categoría"
				>
					<Trash2 />
				</Button>
			</ConfirmDialog>
		</ScaleFadeIn>
	);
};
