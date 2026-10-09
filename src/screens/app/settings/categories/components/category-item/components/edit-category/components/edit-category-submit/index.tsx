import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import type { UpdateCategoryFormValues } from "@/schemas/categories/updateCategorySchema";

type EditCategorySubmitProps = {
	categoryId: string;
	onSuccess?: () => void;
};

export const EditCategorySubmit = ({
	categoryId,
	onSuccess,
}: EditCategorySubmitProps): React.ReactElement => {
	const editCategoryForm = useFormContext<UpdateCategoryFormValues>();
	const { mutate: updateCategory, isPending } = useUpdateCategory();

	const onSubmit = (values: UpdateCategoryFormValues): void => {
		updateCategory(
			{ id: categoryId, payload: values },
			{
				onSuccess: () => {
					toast.success("Categoría actualizada");
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editCategoryForm.handleSubmit(onSubmit)}
			disabled={!editCategoryForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar cambios
				</>
			)}
		</Button>
	);
};
